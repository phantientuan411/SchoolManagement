export interface ClassInfo {
  _id: string;
  classCode: string;
  className: string;
  teacherId: string;
  majorId: string;
  year: number;
}

export interface MajorInfo {
  _id: string;
  majorName: string;
  majorCode: string;
}

export interface TReeLogin {
  _id: string;
  accountId: string;
  classId: ClassInfo;
  name: string;
  address: string;
  gender: string;
  dateOfBird: string;
  parentPhone: string;
  parentName: string;
  status: boolean;
  major: MajorInfo;
  yearOfAdmission: number;
}

export interface TeacherInfo {
  _id: string;
  name: string;
  email: string;
  subjects: string[];
}

export interface AdminInfo {
  _id: string;
  username: string;
  role: "admin" | "superadmin";
}

export interface Account {
  _id: string;
  accountName: string;
  accountEmail: string;
  accountPassword: string;
  phone: string;
  isActive: boolean;
  role: "student" | "teacher" | "staff" | "admin";
  avatarUrl: string;
  avatarId: string;
  bio: string
}

export interface Student {
  _id: string;
  accountId: Account;
  classId: ClassInfo;
  name: string;
  address: string;
  gender: string
  parentPhone: string;
  parentName: string;
  status: boolean;
  major: string;
  yearOfAdmission: number;
  dateOfBirth: string;
}

export interface Teacher {
  _id: string;
  accountId: Account;
  teacherCode: string;
  name: string;
  address: string;
  gender: "male" | "female"
  dateOfBirth: string;
  degree: string;
  major: string;
  yearExperience: string;
  status: boolean;
}

export interface Mark {
  regular: number
  final: number
  total: number
}

export interface ClassStudent {
  _id: string
  studentId: string
  classStudyId: string
  mark: Mark
  status: "Pass" | "Fail" | "Studying"
}