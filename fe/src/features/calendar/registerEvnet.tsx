// --- giữ nguyên các import ---
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Search, BookOpen, Calendar, GraduationCap } from "lucide-react";
import { get, post } from "../../axios/ultil.tsx";

interface Subject {
  _id: string;
  name: string;
  code: string;
  semester: number;
}

interface FormData {
  major: string;
  subjectCode: string;
  september: string;
}

const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [majorFromLocal, setMajorFromLocal] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // Lấy major từ localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setMajorFromLocal(user.majorId);
    setUserRole(user.role || ""); // Lưu role của user
    setValue("major", user.majorId);
  }, [setValue]);

  const septemberValue = watch("september");

  // Fetch subjects khi chọn học kỳ
  useEffect(() => {
    if (septemberValue) {
      fetchSubjectsBySemester(septemberValue);
    }
  }, [septemberValue]);

  // Call API
  const fetchSubjectsBySemester = async (semester: string) => {
    const token = localStorage.getItem("accessToken") || "";
    setLoading(true);

    try {
      const response = await get(
        "/subject/semester",
        { semester, major: majorFromLocal },
        { token }
      );

      setSubjects(response.data);
      setFilteredSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search filter
  const handleSearch = (searchTerm: string) => {
    const filtered = subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubjects(filtered);
  };

  // Submit
  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Bạn cần đăng nhập!");
        return;
      }

      const payload = {
        major: majorFromLocal,
        subjectCode: data.subjectCode,
        september: data.september,
      };

      console.log("Payload:", payload);

      const response = await post("/api/submit", payload, { token });

      alert("Gửi dữ liệu thành công!");
      console.log(response.data);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-center space-x-3">
              <GraduationCap className="w-10 h-10 text-white" />
              <h1 className="text-3xl font-bold text-white">Quản lý Môn học</h1>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">

            {/* Major */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Chuyên ngành (Major)
              </label>

              <input
                type="text"
                value={majorFromLocal}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
              />
            </div>

            {/* September / Semester */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                Học kỳ (Semester) <span className="text-red-500">*</span>
              </label>

              <select
                {...register("september", { required: "Vui lòng chọn học kỳ" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="">-- Chọn học kỳ --</option>
                <option value="1">Học kỳ 1</option>
                <option value="2">Học kỳ 2</option>
                <option value="3">Học kỳ 3</option>
              </select>

              {errors.september && (
                <p className="text-red-500 text-sm">{errors.september.message}</p>
              )}
            </div>

            {/* Search */}
            {septemberValue && (
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Search className="w-5 h-5 mr-2 text-purple-600" />
                  Tìm kiếm môn học
                </label>

                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc mã..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
            )}

            {/* Subject List */}
            {septemberValue && (
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                  Chọn môn học
                </label>

                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-purple-600"></div>
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto border rounded-lg">
                    {filteredSubjects.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Không tìm thấy môn học nào
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
                        {filteredSubjects.map((subject) => (
                          <button
                            key={subject._id}
                            type="button"
                            onClick={() => {
                              setSelectedSubject(subject);
                              setValue("subjectCode", subject._id);
                            }}
                            className={`p-4 border-2 rounded-lg text-left transition-all ${
                              selectedSubject?._id === subject._id
                                ? "border-purple-600 bg-purple-50 shadow-md"
                                : "border-gray-200 hover:border-purple-400 hover:bg-purple-25"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800">{subject.name}</div>
                                <div className="text-sm text-gray-500 mt-1">
                                  Mã: {subject.code}
                                </div>
                              </div>
                              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs whitespace-nowrap ml-2">
                                HK{subject.semester}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {errors.subjectCode && (
                  <p className="text-red-500 text-sm">{errors.subjectCode.message}</p>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              onClick={() => handleSubmit(onSubmit)}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg text-lg font-semibold"
            >
              {loading ? "Đang xử lý..." : "Gửi dữ liệu"}
            </button>

            {/* Hiển thị thông tin môn học được chọn */}
            {selectedSubject && (
              <div className="mt-8 pt-8 border-t-2 border-purple-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông tin môn học</h2>
                <div className="bg-purple-50 p-6 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Tên môn học:</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedSubject.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mã môn học:</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedSubject.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Học kỳ:</p>
                    <p className="text-lg font-semibold text-gray-800">Học kỳ {selectedSubject.semester}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Nút gửi dữ liệu - chỉ hiển thị cho admin */}
            {userRole === "admin" && (
              <div className="mt-8">
                <button
                  type="submit"
                  onClick={() => handleSubmit(onSubmit)}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition"
                >
                  {loading ? "Đang xử lý..." : "Gửi dữ liệu"}
                </button>
              </div>
            )}

          </form>

        </div>
      </div>
    </div>
  );
};

export default SubjectManagement;
