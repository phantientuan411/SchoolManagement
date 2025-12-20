import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Search, BookOpen, Calendar, GraduationCap, Users } from "lucide-react";
import { get, post } from "../../axios/ultil.tsx";

interface Subject {
  majorId: string;
  subjectName: string;
  subjectCode: string;
  numberCredits: number;
  _id: string;
  totalFee: number;
  semester: number;
}

interface Major {
  _id: string;
  majorName: string;
}

interface FormData {
  major: string;
  semester: string;
  subjectCode: string;
}

type Role = "admin" | "student" | "";

const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState(false);

  const [userMajorId, setUserMajorId] = useState<string>("");
  const [userMajorName, setUserMajorName] = useState<string>("");
  const [role, setRole] = useState<Role>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // ===== Lấy user + role từ localStorage =====
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Bạn cần đăng nhập!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user?.role) {
      setRole(user.role);
    }

    // Nếu là học sinh, lấy major từ user
    if (user?.role === "student" && user?.acountInform?.major) {
      setUserMajorId(user.acountInform.major._id);
      setUserMajorName(user.acountInform.major.majorName);
      setValue("major", user.acountInform.major._id);
    }

    // Nếu là admin, fetch danh sách majors
    if (user?.role === "admin") {
      fetchMajors();
    }
  }, [setValue]);

  // ===== Fetch danh sách chuyên ngành (CHỈ ADMIN) =====
  const fetchMajors = async () => {
    const token = localStorage.getItem("accessToken") || "";
    try {
      const response = await get("/major", {}, { token });
      setMajors(response.data.data || []);
    } catch (error) {
      console.error("Error fetching majors:", error);
      alert("Không thể tải danh sách chuyên ngành!");
    }
  };

  const majorValue = watch("major");
  const semesterValue = watch("semester");

  // ===== Fetch môn học khi chọn kỳ học =====
  useEffect(() => {
    // Với học sinh: cần có semester
    // Với admin: cần có cả major và semester
    if (role === "student" && semesterValue && userMajorId) {
      fetchSubjectsBySemester(userMajorId, semesterValue);
    } else if (role === "admin" && majorValue && semesterValue) {
      fetchSubjectsBySemester(majorValue, semesterValue);
    }
  }, [semesterValue, majorValue, userMajorId, role]);

  const fetchSubjectsBySemester = async (major: string, semester: string) => {
    const token = localStorage.getItem("accessToken") || "";
    setLoading(true);

    try {
      const response = await post(
        "/subject/semester",
        { semester: Number(semester), major },
        { token }
      );

      setSubjects(response.data.data || []);
      setFilteredSubjects(response.data.data || []);
    } catch (error: any) {
      console.error("Error fetching subjects:", error);
      if (error.response?.status === 404) {
        setSubjects([]);
        setFilteredSubjects([]);
      } else {
        alert("Có lỗi khi tải danh sách môn học!");
      }
    } finally {
      setLoading(false);
    }
  };



  // ===== Submit (CHỈ ADMIN) =====
  const onSubmit = async (data: FormData) => {
    if (role !== "admin") {
      alert("Bạn không có quyền thực hiện thao tác này!");
      return;
    }

    if (!data.subjectCode) {
      alert("Vui lòng chọn môn học!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Bạn cần đăng nhập!");
        return;
      }

      const payload = {
        major: data.major,
        semester: data.semester,
        subjectCode: data.subjectCode,
      };

      await post("/api/submit", payload, { token });
      alert("Gửi dữ liệu thành công!");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-10 h-10 text-white" />
                <h1 className="text-3xl font-bold text-white">
                  Quản lý Môn học
                </h1>
              </div>

              <span className="text-white text-sm italic">
                Role: {role === "admin" ? "Admin" : "Học sinh"}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">

            {/* ADMIN: Chọn chuyên ngành */}
            {role === "admin" && (
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  Chuyên ngành <span className="text-red-500">*</span>
                </label>

                <select
                  {...register("major", { required: "Vui lòng chọn chuyên ngành" })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">-- Chọn chuyên ngành --</option>
                  {majors.map((major) => (
                    <option key={major._id} value={major._id}>
                      {major.majorName}
                    </option>
                  ))}
                </select>

                {errors.major && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.major.message}
                  </p>
                )}
              </div>
            )}

            {/* STUDENT: Hiển thị chuyên ngành (read-only) */}
            {role === "student" && (
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                  Chuyên ngành
                </label>
                <input
                  type="text"
                  value={userMajorName}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 border rounded-lg cursor-not-allowed"
                />
              </div>
            )}

            {/* Chọn Học kỳ */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                Học kỳ <span className="text-red-500">*</span>
              </label>

              <select
                {...register("semester", { required: "Vui lòng chọn học kỳ" })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                disabled={role === "admin" && !majorValue}
              >
                <option value="">-- Chọn học kỳ --</option>
                <option value="1">Học kỳ 1</option>
                <option value="2">Học kỳ 2</option>
                <option value="3">Học kỳ 3</option>
              </select>

              {errors.semester && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.semester.message}
                </p>
              )}

              {role === "admin" && !majorValue && (
                <p className="text-gray-500 text-xs mt-1">
                  * Vui lòng chọn chuyên ngành trước
                </p>
              )}
            </div>

            

            {/* Danh sách môn học */}
            {semesterValue && (
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                  Danh sách môn học
                </label>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
                    <p className="mt-2 text-gray-600">Đang tải...</p>
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto border rounded-lg p-2 space-y-2">
                    {filteredSubjects.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p>Không tìm thấy môn học cho học kỳ này</p>
                      </div>
                    ) : (
                      filteredSubjects.map((subject) => (
                        <label
                          key={subject._id}
                          className={`flex items-center p-4 border rounded-lg transition-all ${
                            role === "admin"
                              ? "cursor-pointer hover:bg-purple-50 hover:border-purple-300"
                              : "cursor-not-allowed bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            value={subject._id}
                            disabled={role !== "admin"}
                            className="w-4 h-4 text-purple-600"
                            {...register("subjectCode", {
                              required:
                                role === "admin"
                                  ? "Vui lòng chọn môn học"
                                  : false,
                            })}
                          />
                          <div className="ml-4 flex-1">
                            <div className="text-sm text-gray-500 mt-1">
                             {subject.subjectName}
                            </div>
                          </div>
                          <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                            Học kỳ {subject.semester}
                          </span>
                        </label>
                      ))
                    )}
                  </div>
                )}

                {errors.subjectCode && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.subjectCode.message}
                  </p>
                )}
              </div>
            )}

            {/* Thông báo cho học sinh */}
            {role === "student" && semesterValue && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700 text-center">
                  ℹ️ Bạn đang xem danh sách môn học của học kỳ {semesterValue}
                </p>
              </div>
            )}

            {/* Nút Submit - CHỈ ADMIN */}
            {role === "admin" && (
              <button
                type="submit"
                disabled={loading || !semesterValue}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang xử lý..." : "Gửi dữ liệu"}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubjectManagement;