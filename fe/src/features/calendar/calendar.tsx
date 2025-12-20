import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../../axios/ultil.tsx";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const times = ["Sáng", "Chiều", "Tối"];

type Lesson = {
  name: {
    majorId: string;
    numberCredits: number;
    subjectCode: string;
    subjectName: string;
    totalFee: number;
    _id: string;
  };
  period: string;
  room: string;
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
  teacherId: string;
  majorId: string;
  year: number;
};

const Calendar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState<(Lesson[] | null)[][]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Filter states
  const [inputYear, setInputYear] = useState("");
  const [inputMajor, setInputMajor] = useState("");
  const [inputSe, setInputSe] = useState("");
  const [inputClass, setInputClass] = useState("");

  // Dropdown data
  const [majors, setMajors] = useState<Major[]>([]);
  const [classes, setClasses] = useState<ClassMajor[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassMajor[]>([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);

  const dataUser: any = localStorage.getItem("user");
  const user = dataUser ? JSON.parse(dataUser) : null;

  // Generate years (current year ± 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  //september
  const septembers = [1, 2, 3, 4, 5];



  useEffect(() => {
    fetchCurrentWeekData();
    if (user?.role === "admin") {
      fetchDropdownData();
    }
  }, []);

  // Fetch majors and classes for dropdowns
  const fetchDropdownData = async () => {
    const token = localStorage.getItem("accessToken") ?? "";
    try {
      setLoadingDropdowns(true);

      // Fetch majors
      const majorsResponse = await get('/major/', {}, { token });

      if (majorsResponse?.data) {
        setMajors(Array.isArray(majorsResponse.data.data) ? majorsResponse.data.data : []);
      }

      // Fetch classes
      const classesResponse = await get('/classmajor/all', {}, { token });

      if (classesResponse?.data) {
        const classesData = Array.isArray(classesResponse.data.data) ? classesResponse.data.data : [];
        setClasses(classesData);
        setFilteredClasses(classesData);
      }
    } catch (error) {
      console.error("❌ Error fetching dropdown data:", error);
    } finally {
      setLoadingDropdowns(false);
    }
  };

  // Filter classes based on selected major and year
  useEffect(() => {
    let filtered = [...classes];

    if (inputMajor) {
      filtered = filtered.filter(c => c.majorId === inputMajor);
    }

    if (inputYear) {
      filtered = filtered.filter(c => c.year.toString() === inputYear);
    }

    setFilteredClasses(filtered);

    // Reset class selection if it's no longer in filtered list
    if (inputClass && !filtered.find(c => c._id === inputClass)) {
      setInputClass("");
    }
  }, [inputMajor, inputYear, classes]);
  
    const fetchCurrentWeekData = async () => {
      const token = localStorage.getItem("accessToken") ?? "";
      try {
        setLoading(true);
        const response = await get('/timetable/', {}, { token });
  
  
        if (response?.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          const eventData = response.data.data[0];
          const transformedData = transformBackendData(eventData);
          setData(transformedData);
          setHasSearched(true);
        } else {
          setData(getEmptyGrid());
        }
      } catch (error) {
        console.error("❌ Error fetching timetable:", error);
        setData(getEmptyGrid());
      } finally {
        setLoading(false);
      }
    };
  
  const handleSearch = async () => {
    const token = localStorage.getItem("accessToken") ?? "";

    if (!inputSe || !inputClass) {
      alert("Vui lòng chọn ít nhất học kỳ và lớp học để tìm kiếm.");
      return;
    }

    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (inputYear) params.append('year', inputYear);
      if (inputMajor) params.append('major', inputMajor);
      if (inputSe) params.append('september', inputSe);
      if (inputClass) params.append('className', inputClass);


      const response = await get(`/timetable/search?${params.toString()}`, {}, { token });


      const resultData = Array.isArray(response) ? response : response?.data;
      console.log(resultData);
      
      if (resultData && resultData.length > 0) {
        const eventData = resultData[0];
        const transformedData = transformBackendData(eventData);
        setData(transformedData);
        setHasSearched(true);
        localStorage.setItem("lastEventSelected", JSON.stringify(resultData[0]));
      } else {
        alert(response.error || "Không có dữ liệu");
        setData(getEmptyGrid());
        setHasSearched(false);
      }
    } catch (error) {
      console.error("❌ Error searching timetable:", error);
      alert("Lỗi khi tìm kiếm");
      setData(getEmptyGrid());
      setHasSearched(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInputYear("");
    setInputMajor("");
    setInputClass("");
    setInputSe("");
    setData(getEmptyGrid());
    setHasSearched(false);
    fetchCurrentWeekData();
  };

  const getEmptyGrid = (): (Lesson[] | null)[][] => {
    return Array(3).fill(null).map(() => Array(7).fill(null));
  };

  const transformBackendData = (eventData: any): (Lesson[] | null)[][] => {
    const emptyGrid: (Lesson[] | null)[][] = getEmptyGrid();

    if (!eventData || !eventData.rows || !Array.isArray(eventData.rows)) {
      return emptyGrid;
    }


    eventData.rows.forEach((row: any[], rowIndex: number) => {
      if (rowIndex >= 3) return;
      if (!Array.isArray(row)) return;

      row.forEach((cell: any, colIndex: number) => {
        if (colIndex >= 7) return;
        if (!cell || !Array.isArray(cell) || cell.length === 0) {
          emptyGrid[rowIndex][colIndex] = null;
          return;
        }

        const lessons: Lesson[] = [];

        cell.forEach((lessonData: any, lessonIndex: number) => {
          if (!lessonData || typeof lessonData !== 'object') return;

          let nameObject: any = {
            majorId: "",
            numberCredits: 0,
            subjectCode: "",
            subjectName: "Unknown",
            totalFee: 0,
            _id: ""
          };

          if (typeof lessonData.name === 'object' && lessonData.name !== null) {
            nameObject = {
              majorId: lessonData.name.majorId || "",
              numberCredits: lessonData.name.numberCredits || 0,
              subjectCode: lessonData.name.subjectCode || "",
              subjectName: lessonData.name.subjectName || lessonData.name.name || "Unknown",
              totalFee: lessonData.name.totalFee || 0,
              _id: lessonData.name._id || ""
            };
          } else if (typeof lessonData.name === 'string') {
            nameObject = {
              majorId: "",
              numberCredits: 0,
              subjectCode: "",
              subjectName: lessonData.name.length === 24
                ? `Subject_${lessonData.name.slice(-6)}`
                : lessonData.name,
              totalFee: 0,
              _id: lessonData.name
            };
          }

          lessons.push({
            name: nameObject,
            period: lessonData.period || "",
            room: lessonData.room || ""
          });
        });

        emptyGrid[rowIndex][colIndex] = lessons.length > 0 ? lessons : null;
      });
    });

    return emptyGrid;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const displayData = data.length === 0 ? getEmptyGrid() : data;

    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellWidth = 150;
    const headerWidth = 120;
    const headerHeight = 80;
    const cardHeight = 90;
    const padding = 5;
    const cardPadding = 3;

    const rowHeights = times.map((_, rowIndex) => {
      let maxLessons = 0;
      for (let colIndex = 0; colIndex < days.length; colIndex++) {
        const lessons = displayData[rowIndex]?.[colIndex];
        if (lessons && Array.isArray(lessons)) {
          maxLessons = Math.max(maxLessons, lessons.length);
        }
      }
      return maxLessons > 0 ? maxLessons * cardHeight + (maxLessons - 1) * cardPadding : cardHeight;
    });

    const totalHeight = headerHeight + rowHeights.reduce((a, b) => a + b, 0);
    canvas.width = headerWidth + cellWidth * days.length;
    canvas.height = totalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const today = currentDate;
    const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;

    // Header ngày
    days.forEach((day, index) => {
      ctx.fillStyle = index === dayIndex ? "#facc15" : "#4f46e5";
      ctx.fillRect(headerWidth + index * cellWidth, 0, cellWidth, headerHeight);
      ctx.fillStyle = "white";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(day, headerWidth + index * cellWidth + cellWidth / 2, headerHeight / 2);
    });

    // Header thời gian và vẽ lưới
    let yOffset = headerHeight;
    for (let row = 0; row < times.length; row++) {
      const rowHeight = rowHeights[row];
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(0, yOffset, headerWidth, rowHeight);

      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(times[row], headerWidth / 2, yOffset + rowHeight / 2);

      for (let col = 0; col < days.length; col++) {
        const x = headerWidth + col * cellWidth;
        ctx.strokeStyle = "#d1d5db";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, yOffset, cellWidth, rowHeight);
      }

      yOffset += rowHeight;
    }

    // Vẽ dữ liệu lessons
    yOffset = headerHeight;
    for (let row = 0; row < times.length; row++) {
      const rowHeight = rowHeights[row];

      for (let col = 0; col < days.length; col++) {
        const lessons = displayData[row]?.[col];
        if (!lessons || !Array.isArray(lessons) || lessons.length === 0) continue;

        const x = headerWidth + col * cellWidth;

        lessons.forEach((lesson, lessonIndex) => {
          const y = yOffset + lessonIndex * (cardHeight + cardPadding);

          ctx.fillStyle = "#d7ef7aff";
          ctx.fillRect(x + padding, y + padding, cellWidth - padding * 2, cardHeight - padding * 2);

          ctx.strokeStyle = "#070707ff";
          ctx.lineWidth = 2;
          ctx.strokeRect(x + padding, y + padding, cellWidth - padding * 2, cardHeight - padding * 2);

          ctx.fillStyle = "black";
          ctx.font = "bold 12px sans-serif";
          ctx.textAlign = "left";
          ctx.textBaseline = "top";

          const maxWidth = cellWidth - padding * 2 - 10;

          const truncateText = (text: string, maxLen: number) => {
            return text.length > maxLen ? text.substring(0, maxLen - 3) + "..." : text;
          };

          ctx.fillText(truncateText(`Môn: ${lesson.name.subjectName}`, 18), x + padding + 5, y + padding + 5, maxWidth);
          ctx.fillText(`Tiết: ${lesson.period}`, x + padding + 5, y + padding + 23, maxWidth);
          ctx.fillText(`Phòng: ${lesson.room}`, x + padding + 5, y + padding + 41, maxWidth);

          if (lessons.length > 1) {
            ctx.fillStyle = "#4f46e5";
            ctx.font = "bold 10px sans-serif";
            ctx.textAlign = "right";
            ctx.fillText(`#${lessonIndex + 1}`, x + cellWidth - padding - 5, y + padding + 5);
          }
        });
      }

      yOffset += rowHeight;
    }
  }, [data, currentDate]);


  return (
    <div className="h-auto w-10/12 bg-gray-50 flex flex-col items-center mt-20 mx-auto">
      <h2 className="text-3xl font-bold mr-auto mb-4">Time Table</h2>

      {loading && (
        <div className="text-blue-600 font-semibold animate-pulse mb-4">
          Đang tải dữ liệu...
        </div>
      )}

      <div className="w-full mx-auto flex justify-between items-start mb-4 gap-4 flex-wrap">


        {user?.role === "admin" && (
          <div className="flex-1">
            <div className="flex gap-2 flex-wrap items-center">

              {/* Year Dropdown */}
              <select
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={inputYear}
                onChange={(e) => setInputYear(e.target.value)}
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
                value={inputMajor}
                onChange={(e) => setInputMajor(e.target.value)}
                disabled={loadingDropdowns}
              >
                <option value="">-- Chọn chuyên ngành --</option>
                {majors.map(major => (
                  <option key={major._id} value={major._id}>
                    {major.majorCode} - {major.majorName}
                  </option>
                ))}
              </select>

              {/* September */}
              <select
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[180px]"
                value={inputSe}
                onChange={(e) => setInputSe(e.target.value)}
              >
                <option value="">-- Chọn kì --</option>
                {septembers.map(sep => (
                  <option key={sep} value={sep}>Kì {sep}</option>
                ))}
              </select>

              {/* Class Dropdown */}
              <select
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[200px]"
                value={inputClass}
                onChange={(e) => setInputClass(e.target.value)}
                disabled={loadingDropdowns || filteredClasses.length === 0}
              >
                <option value="">-- Chọn lớp --</option>
                {filteredClasses.map(classItem => (
                  <option key={classItem._id} value={classItem._id}>
                    {classItem.classCode} - {classItem.className}
                  </option>
                ))}
              </select>

              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                onClick={handleSearch}
                disabled={loading || loadingDropdowns}
              >
                Tìm
              </button>

              <button
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                onClick={handleReset}
                disabled={loading || loadingDropdowns}
              >
                Reset
              </button>

              <Link to={"/calendar/add"}>
                <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">
                  New TimeTable
                </button>
              </Link>
              {hasSearched && (
                <Link to={"/edit"}>
                  <button className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition-colors">
                    Edit TimeTable
                  </button>
                </Link>
              )}


            </div>


            {loadingDropdowns && (
              <div className="text-sm text-gray-600 mt-2">
                Đang tải danh sách...
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-auto max-h-[700px] overflow-auto border-2 border-gray-300 rounded-lg shadow-xl">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Calendar;