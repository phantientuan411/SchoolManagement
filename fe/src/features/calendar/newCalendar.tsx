import React, { useEffect, useState } from "react";
import { X, Plus, Save, ArrowLeft } from "lucide-react";
import { get, post } from "../../axios/ultil.tsx";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = ["Sáng", "Chiều", "Tối"];

type Subject = {
  _id: string;
  subjectName: string;
  subjectCode: string;
  majorId: string;
  numberCredits: number;
  totalFee: number;
};

type Major = {
  _id: string;
  majorName: string;
  majorCode: string;
};

type ClassMajor = {
  _id: string;
  classCode: string;
  className: string;
  majorId: string;
  year: number;
};

type Lesson = {
  subjectId: string;
  subjectName: string;
  period: string;
  room: string;
};

type PeriodOption = {
  value: string;
  label: string;
};

const AddTimeTable: React.FC = () => {
  // Form states
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  // Dropdown data
  const [majors, setMajors] = useState<Major[]>([]);
  const [classes, setClasses] = useState<ClassMajor[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassMajor[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);

  // Timetable data: [rowIndex][colIndex] = Lesson[]
  const [timetable, setTimetable] = useState<(Lesson[] | null)[][]>(
    Array(3).fill(null).map(() => Array(7).fill(null))
  );

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentCell, setCurrentCell] = useState<{row: number; col: number} | null>(null);
  const [modalSubject, setModalSubject] = useState("");
  const [modalPeriod, setModalPeriod] = useState("");
  const [modalRoom, setModalRoom] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const semesters = [
    { value: "1", label: "Kỳ 1" },
    { value: "2", label: "Kỳ 2" },
    { value: "3", label: "Kỳ 3" },
    { value: "4", label: "Kỳ 4" },
    { value: "5", label: "Kỳ 5" },
    { value: "6", label: "Kỳ 6" },
    { value: "7", label: "Kỳ 7" },
    { value: "8", label: "Kỳ 8" },
    { value: "9", label: "Kỳ 9" },
  ];

  // Period options based on time slot
  const getPeriodOptions = (timeSlot: string): PeriodOption[] => {
    if (timeSlot === "Sáng") {
      return [
        { value: "1-2", label: "Tiết 1-2" },
        { value: "1-3", label: "Tiết 1-3" },
        { value: "1-4", label: "Tiết 1-4" },
        { value: "1-5", label: "Tiết 1-5" },
        { value: "2-3", label: "Tiết 2-3" },
        { value: "2-4", label: "Tiết 2-4" },
        { value: "2-5", label: "Tiết 2-5" },
        { value: "3-4", label: "Tiết 3-4" },
        { value: "3-5", label: "Tiết 3-5" },
        { value: "4-5", label: "Tiết 4-5" }
      ];
    } else if (timeSlot === "Chiều") {
      return [
        { value: "6-7", label: "Tiết 6-7" },
        { value: "6-8", label: "Tiết 6-8" },
        { value: "6-9", label: "Tiết 6-9" },
        { value: "6-10", label: "Tiết 6-10" },
        { value: "7-8", label: "Tiết 7-8" },
        { value: "7-9", label: "Tiết 7-9" },
        { value: "7-10", label: "Tiết 7-10" },
        { value: "8-9", label: "Tiết 8-9" },
        { value: "8-10", label: "Tiết 8-10" },
        { value: "9-10", label: "Tiết 9-10" }
      ];
    } else {
      return [
        { value: "11-12", label: "Tiết 11-12" },
        { value: "11-13", label: "Tiết 11-13" },
        { value: "11-14", label: "Tiết 11-14" },
        { value: "11-15", label: "Tiết 11-15" },
        { value: "12-13", label: "Tiết 12-13" },
        { value: "12-14", label: "Tiết 12-14" },
        { value: "12-15", label: "Tiết 12-15" },
        { value: "13-14", label: "Tiết 13-14" },
        { value: "13-15", label: "Tiết 13-15" },
        { value: "14-15", label: "Tiết 14-15" }
      ];
    }
  };

  // Parse period string to array of numbers
  const parsePeriod = (period: string): number[] => {
    const [start, end] = period.split('-').map(Number);
    const periods: number[] = [];
    for (let i = start; i <= end; i++) {
      periods.push(i);
    }
    return periods;
  };

  // Check if two periods overlap
  const periodsOverlap = (period1: string, period2: string): boolean => {
    const p1 = parsePeriod(period1);
    const p2 = parsePeriod(period2);
    return p1.some(p => p2.includes(p));
  };

  // Check if can add more lessons to a cell
  const canAddLesson = (row: number, col: number): boolean => {
    const cell = timetable[row][col];
    if (!cell || cell.length === 0) return true;

    const timeSlot = timeSlots[row];
    const maxPeriod = timeSlot === "Sáng" ? 5 : timeSlot === "Chiều" ? 10 : 15;

    return !cell.some(lesson => {
      const periods = parsePeriod(lesson.period);
      return periods.includes(maxPeriod);
    });
  };

  // Check if a new period conflicts with existing lessons
  const hasConflict = (row: number, col: number, newPeriod: string): boolean => {
    const cell = timetable[row][col];
    if (!cell || cell.length === 0) return false;

    return cell.some(lesson => periodsOverlap(lesson.period, newPeriod));
  };

  // Get available period options (exclude conflicting ones)
  const getAvailablePeriodOptions = (row: number, col: number): PeriodOption[] => {
    const allOptions = getPeriodOptions(timeSlots[row]);
    const cell = timetable[row][col];
    
    if (!cell || cell.length === 0) return allOptions;

    return allOptions.filter(option => {
      return !cell.some(lesson => periodsOverlap(lesson.period, option.value));
    });
  };

  // Mock fetch functions - Replace with actual API calls
  const fetchMajors = async () => {
    const token = localStorage.getItem("accessToken") ?? "";
    try {
      const response = await get('/major/', {}, { token });
      setMajors(response.data.data);
    } catch (error) {
      console.error("Error fetching majors:", error);
    }
  };

  const fetchClasses = async () => {
    const token = localStorage.getItem("accessToken") ?? "";
    try {
      const response = await get('/classmajor/all', {}, { token });
      setClasses(response.data.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchSubjects = async (majorId: string) => {
    const token = localStorage.getItem("accessToken") ?? "";
    try {
      const response = await get(`/subject/majorId/${majorId}`, {}, { token });
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    setLoadingDropdowns(true);
    fetchMajors();
    fetchClasses();
    setLoadingDropdowns(false);
  }, []);

  useEffect(() => {
    if (selectedMajor) {
      fetchSubjects(selectedMajor);
    } else {
      setSubjects([]);
    }
  }, [selectedMajor]);

  useEffect(() => {
    let filtered = [...classes];
    if (selectedMajor) filtered = filtered.filter(c => c.majorId === selectedMajor);
    if (selectedYear) filtered = filtered.filter(c => c.year.toString() === selectedYear);
    setFilteredClasses(filtered);
    if (selectedClass && !filtered.find(c => c._id === selectedClass)) {
      setSelectedClass("");
    }
  }, [selectedMajor, selectedYear, classes]);

  const openModal = (row: number, col: number) => {
    if (!canAddLesson(row, col)) {
      alert(`Không thể thêm môn học vào ô này vì đã có môn học kéo dài đến tiết cuối buổi ${timeSlots[row]}!`);
      return;
    }

    setCurrentCell({ row, col });
    setModalSubject("");
    setModalPeriod("");
    setModalRoom("");
    setShowModal(true);
  };

  const addLesson = () => {
    if (!modalSubject || !modalPeriod || !modalRoom || !currentCell) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (hasConflict(currentCell.row, currentCell.col, modalPeriod)) {
      alert("Tiết học này bị trùng với môn học đã có trong ô!");
      return;
    }

    const subject = subjects.find(s => s._id === modalSubject);
    if (!subject) return;

    const newLesson: Lesson = {
      subjectId: modalSubject,
      subjectName: subject.subjectName,
      period: modalPeriod,
      room: modalRoom
    };

    setTimetable(prev => {
      const newTimetable = prev.map(row => [...row]);
      const cell = newTimetable[currentCell.row][currentCell.col];
      
      if (cell === null) {
        newTimetable[currentCell.row][currentCell.col] = [newLesson];
      } else {
        newTimetable[currentCell.row][currentCell.col] = [...cell, newLesson];
      }
      
      return newTimetable;
    });

    setShowModal(false);
    setModalSubject("");
    setModalPeriod("");
    setModalRoom("");
  };

  const removeLesson = (row: number, col: number, lessonIndex: number) => {
    setTimetable(prev => {
      const newTimetable = prev.map(row => [...row]);
      const cell = newTimetable[row][col];
      
      if (cell && Array.isArray(cell)) {
        const updatedCell = cell.filter((_, idx) => idx !== lessonIndex);
        newTimetable[row][col] = updatedCell.length > 0 ? updatedCell : null;
      }
      
      return newTimetable;
    });
  };

  const handleSubmit = async () => {
    if (!selectedYear || !selectedMajor || !selectedClass || !selectedSemester) {
      alert("Vui lòng chọn đầy đủ Năm, Chuyên ngành, Lớp và Kỳ học");
      return;
    }

    const rows = timetable.map(row => 
      row.map(cell => {
        if (!cell) return null;
        return cell.map(lesson => ({
          name: lesson.subjectId,
          period: lesson.period,
          room: lesson.room
        }));
      })
    );

    const dataUser = localStorage.getItem("user");
    const user = dataUser ? JSON.parse(dataUser) : null;

    const payload = {
      rows,
      major: selectedMajor,
      className: selectedClass,
      september: selectedSemester,
      year: selectedYear,
      createdBy: user?._id || ""
    };

    console.log("Submitting payload:", JSON.stringify(payload, null, 2));

    try {
      setLoading(true);
      // const response = await post('/timetable/', payload, { token });
      alert("Tạo thời khóa biểu thành công!");
      window.history.back();
    } catch (error) {
      console.error("Error creating timetable:", error);
      alert("Lỗi khi tạo thời khóa biểu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
            <span>Quay lại</span>
          </button>
          <h1 className="text-3xl font-bold">Tạo Thời Khóa Biểu Mới</h1>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="text-blue-600 font-semibold animate-pulse mb-4">
            Đang lưu dữ liệu...
          </div>
        )}

        {/* Form thông tin cơ bản - Style giống Calendar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-2 border-gray-300">
          <h2 className="text-xl font-bold mb-4">🔍 Thông tin thời khóa biểu</h2>
          
          <div className="flex gap-3 flex-wrap items-center">
            {/* Year Dropdown */}
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[120px]"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              disabled={loadingDropdowns}
            >
              <option value="">-- Chọn năm --</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            {/* Major Dropdown */}
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[180px]"
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              disabled={loadingDropdowns}
            >
              <option value="">-- Chọn chuyên ngành --</option>
              {majors.map(major => (
                <option key={major._id} value={major._id}>
                  {major.majorCode} - {major.majorName}
                </option>
              ))}
            </select>

            {/* Semester Dropdown */}
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[180px]"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="">-- Chọn kỳ học --</option>
              {semesters.map(sem => (
                <option key={sem.value} value={sem.value}>
                  {sem.label}
                </option>
              ))}
            </select>

            {/* Class Dropdown */}
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[200px]"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              disabled={loadingDropdowns || filteredClasses.length === 0}
            >
              <option value="">-- Chọn lớp --</option>
              {filteredClasses.map(cls => (
                <option key={cls._id} value={cls._id}>
                  {cls.classCode} - {cls.className}
                </option>
              ))}
            </select>
          </div>

          {loadingDropdowns && (
            <div className="text-sm text-gray-600 mt-3">
              Đang tải danh sách...
            </div>
          )}

          {!selectedMajor && (
            <div className="mt-4 text-center text-orange-600 bg-orange-50 p-3 rounded border border-orange-200">
            Vui lòng chọn Chuyên ngành để bắt đầu thêm môn học
            </div>
          )}
        </div>

        {/* Timetable Grid - Style giống Calendar */}
        <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-gray-300">
          <h2 className="text-xl font-bold mb-4">\ Lịch học trong tuần</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-gray-100 p-3 w-24 font-bold">Buổi</th>
                  {days.map((day, idx) => (
                    <th key={idx} className="border border-gray-300 bg-blue-600 text-white p-3 min-w-[180px] font-bold">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, rowIdx) => (
                  <tr key={rowIdx}>
                    <td className="border border-gray-300 bg-gray-100 p-3 font-bold text-center">
                      {slot}
                    </td>
                    {days.map((_, colIdx) => {
                      const canAdd = canAddLesson(rowIdx, colIdx);
                      return (
                        <td key={colIdx} className="border border-gray-300 p-2 align-top bg-white">
                          <div className="min-h-[120px]">
                            {/* Existing lessons */}
                            {timetable[rowIdx][colIdx]?.map((lesson, lessonIdx) => (
                              <div
                                key={lessonIdx}
                                className="bg-yellow-200 border-2 border-black rounded p-2 mb-2 relative shadow-sm"
                              >
                                <button
                                  onClick={() => removeLesson(rowIdx, colIdx, lessonIdx)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 shadow"
                                >
                                  <X size={12} />
                                </button>
                                <div className="text-sm font-bold mb-1">Môn: {lesson.subjectName}</div>
                                <div className="text-xs text-gray-700">Tiết: {lesson.period}</div>
                                <div className="text-xs text-gray-700">Phòng: {lesson.room}</div>
                              </div>
                            ))}
                            
                            {/* Add button */}
                            {canAdd && (
                              <button
                                onClick={() => openModal(rowIdx, colIdx)}
                                className="w-full border-2 border-dashed border-gray-400 rounded p-2 hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
                                disabled={!selectedMajor}
                              >
                                <Plus size={16} />
                                <span className="text-sm font-semibold">Thêm môn</span>
                              </button>
                            )}

                            {/* Cannot add message */}
                            {!canAdd && (
                              <div className="text-xs text-red-600 text-center p-2 bg-red-50 rounded border border-red-300 font-semibold">
                                Đã đầy (tiết cuối)
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors font-semibold"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !selectedYear || !selectedMajor || !selectedClass || !selectedSemester}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-semibold"
          >
            <Save size={18} />
            {loading ? "Đang lưu..." : "Lưu thời khóa biểu"}
          </button>
        </div>
      </div>

      {/* Modal thêm môn học */}
      {showModal && currentCell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 border-2 border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                Thêm môn học - {timeSlots[currentCell.row]} - {days[currentCell.col]}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Môn học *</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={modalSubject}
                  onChange={(e) => setModalSubject(e.target.value)}
                >
                  <option value="">-- Chọn môn học --</option>
                  {subjects.map(subject => (
                    <option key={subject._id} value={subject._id}>
                      {subject.subjectCode} - {subject.subjectName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Tiết học *</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={modalPeriod}
                  onChange={(e) => setModalPeriod(e.target.value)}
                >
                  <option value="">-- Chọn tiết --</option>
                  {getAvailablePeriodOptions(currentCell.row, currentCell.col).map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {getAvailablePeriodOptions(currentCell.row, currentCell.col).length === 0 && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">Không còn tiết nào khả dụng</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Phòng học *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ví dụ: A101, B203..."
                  value={modalRoom}
                  onChange={(e) => setModalRoom(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 font-semibold"
              >
                Hủy
              </button>
              <button
                onClick={addLesson}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTimeTable;