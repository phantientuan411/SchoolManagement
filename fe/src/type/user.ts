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
