import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getUserInfo, setAddressStudentUpdate, setDoBStudentUpdate, setGenderStudentUpdate, setNameStudentUpdate, setParentNameStudentUpdate, setParentPhoneStudentUpdate, setStatusStudentUpdate, updateStudentApi, setEdit, setAddressTeacherUpdate, setDoBTeacherUpdate, setGenderTeacherUpdate, setNameTeacherUpdate, setDegreeTeacherUpdate, setStatusTeacherUpdate, updateTeacherApi, setMajorTeacherUpdate, deleteUserInfoApi, setYearOfAdmissionStudentUpdate, setYearOfExperienceTeacherUpdate } from './UserInfoData'
import { getClassStudent } from '../../redux&hook/slice/classstudent'
import type { ClassStudent, Student, Teacher } from '../../type/user'
import { getClassMajor } from '../../redux&hook/slice/classmajor'
import { useNavigate, useParams } from 'react-router-dom'
import { getMajor } from '../../redux&hook/slice/major'
import { getClassStudy } from '../../redux&hook/slice/classstudy'
import { FaTrash } from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdLibraryBooks } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoMailOpenOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

const UserInfoPage = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const { major } = useAppSelector((state) => state.getMajor)
    const { data, updateStudent, updateTeacher, edit } = useAppSelector((state) => state.getUserInfo)
    const { pass, totalFail, totalPass, totalStudying, classStudent } = useAppSelector((state) => state.getClassStudent)
    const { classMajor } = useAppSelector((state) => state.getClassMajor)
    const { totalClass, classStudy } = useAppSelector((state) => state.getClassStudy)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUserInfo({ id: id ?? "" }))
    }, [id])

    useEffect(() => {
        dispatch(getClassStudent({ selected: id ?? "" }))
    }, [id])

    useEffect(() => {
        dispatch(getClassMajor({ selected: id ?? "" }))
    }, [id])

    useEffect(() => {
        dispatch(getMajor({}))
    }, [])

    useEffect(() => {
        dispatch(getClassStudy({ id: id ?? "" }))
    }, [id])

    const role = localStorage.getItem("role")

    // Convert điểm sang hệ 4
    const convertGPA = (e: number) => {
        if (e >= 9) return 4.0;
        if (e >= 8) return 3.5;
        if (e >= 7) return 3.0;
        if (e >= 6) return 2.5;
    }

    // Tính GPA
    const calculateGPA = (e: ClassStudent[]) => {
        const total = e.reduce((sum, item) => {
            const gpa = convertGPA(Number(item?.mark?.total)) ?? 0
            const credit = item.classStudyId.subjectId?.numberCredits
            return sum + gpa * credit
        }, 0)

        const totalCredit = e.reduce((sum, item) => sum + item.classStudyId.subjectId?.numberCredits, 0)

        return (total / totalCredit).toFixed(2)
    }

    function toExactISO(dateStr: any) {
        const [day, month, year] = dateStr.split("/");

        // Tạo date theo UTC, không bị lệch ngày
        const date = new Date(Date.UTC(year, month - 1, day));

        return date.toISOString().replace("Z", "+00:00");
    }


    const handleSubmitStudent = (e: any) => {
        e.preventDefault()
        dispatch(updateStudentApi({ id: id ?? "", updateStudent: updateStudent }))
        dispatch(setEdit(!edit))
    }

    const handleSubmitTeacher = (e: any) => {
        e.preventDefault()
        dispatch(updateTeacherApi({ id: id ?? "", updateTeacher: updateTeacher }))
        dispatch(setEdit(!edit))
    }

    const handleEdit = (e: any) => {
        e.preventDefault()
        dispatch(setEdit(!edit))
    }

    const handleCancel = (e: any) => {
        e.preventDefault()
        dispatch(setEdit(!edit))
    }

    const handleDelete = (e: any) => {
        e.preventDefault()
        dispatch(deleteUserInfoApi({ id: id ?? "" }))
        navigate(`/${role}`)
    }


    return (
        <div className='min-h-screen flex gap-5 p-[50px] bg-[#F3F4FF]'>
            {/* Hiển thị thông tin cơ bản của học sinh */}
            <div className={`w-[30%] border-gray-400 border-3 rounded-xl bg-white shadow-lg ${!edit && role === "student" ? "block" : "hidden"}`}>
                <div className="relative  ">
                    <div className='relative overflow-hidden bg-[#4D44B5] w-full h-[150px] '>
                        <div className='z-0 border-[#ffd54f] absolute top-[70%] right-[5%] w-[120px] h-[120px]  lg:w-[150px] lg:h-[150px] lg:top-[55%] lg:right-[5%] xl:w-[200px] xl:h-[200px] xl:top-[46%] xl:right-[5%] rounded-full  border-10'></div>
                        <div className=' z-10 absolute top-[85%] right-[20%] w-[100px] h-[100px] lg:top-[75%] lg:right-[22%] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px] xl:top-[68%] xl:right-[27%] rounded-full  border-10 border-[#ff8a65]'></div>
                    </div>
                    <img className='border-10 border-white absolute top-[50%] left-[8%] w-[150px] h-[150px] rounded-full' src={data[0]?.accountId.avatarUrl} alt="" />
                </div>

                <div className={`pb-5 pl-5 pr-5 pt-20`}>
                    <h1 className='text-[32px] font-bold mt-5' >{data[0]?.name}</h1>
                    <p className='text-[24px] mt-3 text-gray-400' >Student</p>
                    <div className='flex mt-5 font-semibold'>
                        <div className='flex w-[50%] items-center gap-5 '>
                            <BsGenderAmbiguous className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                            <p className='text-[22px]'>{data[0]?.gender}</p>
                        </div>

                        <div className='flex w-[50%] items-center gap-5 '>
                            <LiaBirthdayCakeSolid className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                            <p className=' truncate text-[22px]'>{new Date(data[0]?.dateOfBirth).toLocaleDateString('vi-VN')}</p>
                        </div>
                    </div>


                    <div className='flex mt-5 font-semibold items-center gap-5 '>
                        <FaBusinessTime className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                        <p className='text-[22px]'>{(data[0] as Student)?.yearOfAdmission}</p>
                    </div>


                    <div className='flex mt-5 font-semibold items-center gap-5 '>
                        <IoMailOpenOutline className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                        <p title={data[0]?.accountId.accountEmail} className='text-[22px] truncate'>{data[0]?.accountId.accountEmail}</p>
                    </div>

                    <div className='flex mt-5 font-semibold items-center gap-5 '>
                        <IoLocationOutline className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                        <p className='text-[22px]'>{data[0]?.address}</p>
                    </div>

                    <div className='mt-5'>
                        <h1 className='mt-3 text-[26px] font-bold'>About:</h1>
                        <p className='mt-3 text-[22px] font-normal'>{data[0]?.accountId.bio}</p>

                    </div>

                    <div className='mt-3'>
                        <h1 className='mt-3 text-[26px] font-bold' >Parent:</h1>
                        <div className='flex mt-5 font-semibold items-center gap-5 '>
                            <RxAvatar className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                            <p title={data[0]?.accountId.accountEmail} className='text-[22px] truncate'>{(data[0] as Student)?.parentName}</p>
                        </div>

                        <div className='flex mt-5 font-semibold items-center gap-5 '>
                            <MdOutlinePhoneIphone className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                            <p className='text-[22px]'>{(data[0] as Student)?.parentPhone}</p>
                        </div>
                    </div>



                    <div className='flex justify-end'>
                        <button className=' hover:cursor-pointer flex justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' onClick={handleEdit} > Edit</button>
                    </div>
                </div>


            </div>

            {/* Hiển thị thông tin cơ bản của giáo viên */}
            <div className={`  overflow-hidden border-gray-400 border-3 rounded-xl w-[30%] bg-white shadow-lg ${!edit && role === "teacher" ? "block" : "hidden"}`}>
                <div className="relative  ">
                    <div className='relative overflow-hidden bg-[#4D44B5] w-full h-[150px] '>
                        <div className='z-0 border-[#ffd54f] absolute top-[70%] right-[5%] w-[120px] h-[120px]  lg:w-[150px] lg:h-[150px] lg:top-[55%] lg:right-[5%] xl:w-[200px] xl:h-[200px] xl:top-[46%] xl:right-[5%] rounded-full  border-10'></div>
                        <div className=' z-10 absolute top-[85%] right-[20%] w-[100px] h-[100px] lg:top-[75%] lg:right-[22%] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px] xl:top-[68%] xl:right-[27%] rounded-full  border-10 border-[#ff8a65]'></div>
                    </div>
                    <img className='border-10 border-white absolute top-[50%] left-[8%] w-[150px] h-[150px] rounded-full' src={data[0]?.accountId.avatarUrl} alt="" />
                </div>

                <div className={`pb-5 pl-5 pr-5 pt-20 text-[#303972]`}>
                    <h1 className='text-[32px] font-bold mt-5 ' >{data[0]?.name}</h1>
                    <p className='text-[24px] mt-3 text-gray-400' >Teacher</p>
                    <div className='flex mt-5 font-semibold'>
                        <div className='flex w-[50%] items-center gap-5 '>
                            <BsGenderAmbiguous className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                            <p className='text-[22px]'>{data[0]?.gender}</p>
                        </div>

                        <div className='flex w-[50%] items-center gap-5 '>
                            <LiaBirthdayCakeSolid className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                            <p className='text-[22px]'>{new Date(data[0]?.dateOfBirth).toLocaleDateString('vi-VN')}</p>
                        </div>
                    </div>

                    <div className='flex mt-5 font-semibold'>
                        <div className='flex w-[50%] items-center gap-5 '>
                            <MdLibraryBooks className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                            <p className='text-[22px]'>{data[0]?.major}</p>
                        </div>

                        <div className='flex w-[50%] items-center gap-5 '>
                            <FaBusinessTime className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                            <p className='text-[22px]'>{(data[0] as Teacher)?.yearExperience} year</p>
                        </div>
                    </div>

                    <div className='flex mt-5 font-semibold items-center gap-5 '>
                        <IoMailOpenOutline className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                        <p title={data[0]?.accountId.accountEmail} className='text-[22px] truncate'>{data[0]?.accountId.accountEmail}</p>
                    </div>

                    <div className='flex mt-5 font-semibold items-center gap-5 '>
                        <IoLocationOutline className='text-white w-[35px] h-[35px] p-1.5 rounded-full bg-[#FB7D5B]' />
                        <p className='text-[22px]'>{data[0]?.address}</p>
                    </div>

                    <div className='mt-5'>
                        <h1 className='mt-3 text-[26px] font-bold'>About:</h1>
                        <p className='mt-3 text-[22px] font-normal'>{data[0]?.accountId.bio}</p>

                    </div>

                    <div className='mt-5'>

                        <ul className='mt-3 text-[26px] font-bold list-disc' >Degree:
                            <li className='mt-3 ml-7 text-[22px] font-medium'> {(data[0] as Teacher)?.degree}</li>
                        </ul>
                    </div>

                    <div className='flex justify-end'>
                        <button className=' hover:cursor-pointer flex justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' onClick={handleEdit} > Edit</button>
                    </div>
                </div>
            </div>


            {/* Chỉnh sửa thông tin cơ bản của học sinh */}
            <div className={`w-[30%] border-gray-400 border-3 rounded-xl bg-white shadow-lg ${edit && role === "student" ? "block" : "hidden"}`}>
                <div className="relative  ">
                    <div className='relative overflow-hidden bg-[#4D44B5] w-full h-[150px] '>
                        <div className='z-0 border-[#ffd54f] absolute top-[70%] right-[5%] w-[120px] h-[120px]  lg:w-[150px] lg:h-[150px] lg:top-[55%] lg:right-[5%] xl:w-[200px] xl:h-[200px] xl:top-[46%] xl:right-[5%] rounded-full  border-10'></div>
                        <div className=' z-10 absolute top-[85%] right-[20%] w-[100px] h-[100px] lg:top-[75%] lg:right-[22%] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px] xl:top-[68%] xl:right-[27%] rounded-full  border-10 border-[#ff8a65]'></div>
                    </div>
                    <img className='border-10 border-white absolute top-[50%] left-[8%] w-[150px] h-[150px] rounded-full' src={data[0]?.accountId.avatarUrl} alt="" />
                </div>

                <form className='p-5 mt-12' onSubmit={handleSubmitStudent} action="">
                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Name</h1>
                        <input className='flex-1 p-2' type="text" onChange={(e) => dispatch(setNameStudentUpdate(e.target.value))} value={updateStudent.name} />
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Address</h1>
                        <input className='flex-1 p-2' type="text" onChange={(e) => dispatch(setAddressStudentUpdate(e.target.value))} value={updateStudent.address} />
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Gender</h1>
                        <select className='flex-1 p-2 border border-gray-300 rounded-lg' value={updateStudent.gender} onChange={(e) => dispatch(setGenderStudentUpdate(e.target.value))} name="" id="">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Parent Name</h1>
                        <input className='flex-1 p-2 ' type="text" onChange={(e) => dispatch(setParentNameStudentUpdate(e.target.value))} value={updateStudent.parentName} />
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Parent Phone</h1>
                        <input className='flex-1 p-2' type="text" onChange={(e) => dispatch(setParentPhoneStudentUpdate(e.target.value))} value={updateStudent.parentPhone} />
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Date of Birth</h1>
                        <input className='flex-1 p-2' type="date" onChange={(e) => toExactISO(dispatch(setDoBStudentUpdate(e.target.value)))} value={updateStudent.dateOfBirth ? updateStudent.dateOfBirth.split("T")[0] : ""} />
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Year Of Admission</h1>
                        <input className='flex-1 p-2' type="number" onChange={(e) => dispatch(setYearOfAdmissionStudentUpdate(e.target.value))} value={updateStudent.yearOfAdmission} />
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Status</h1>
                        <select className='flex-1 p-2 border border-gray-300 rounded-lg' value={updateStudent.status ? "true" : "false"} onChange={(e) => dispatch(setStatusStudentUpdate(e.target.value))} name="" id="">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>

                    <div className='flex justify-around mt-3 flex-col lg:flex-row'>
                        <button className=' hover:cursor-pointer flex justify-center lg:justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' onClick={handleCancel}>Cancel</button>
                        <button className='hover:cursor-pointer flex justify-center lg:justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' type='submit'>Confirm</button>
                    </div>
                </form>
            </div>

            {/* Chỉnh sửa thông tin cơ bản của giáo viên */}
            <div className={`w-[30%] border-gray-400 border-3 rounded-xl overflow-hidden bg-white shadow-lg ${edit && role === "teacher" ? "block" : "hidden"}`}>
                <div className="relative  ">
                    <div className='relative overflow-hidden bg-[#4D44B5] w-full h-[150px] '>
                        <div className='z-0 border-[#ffd54f] absolute top-[70%] right-[5%] w-[120px] h-[120px]  lg:w-[150px] lg:h-[150px] lg:top-[55%] lg:right-[5%] xl:w-[200px] xl:h-[200px] xl:top-[46%] xl:right-[5%] rounded-full  border-10'></div>
                        <div className=' z-10 absolute top-[85%] right-[20%] w-[100px] h-[100px] lg:top-[75%] lg:right-[22%] lg:w-[120px] lg:h-[120px] xl:w-[150px] xl:h-[150px] xl:top-[68%] xl:right-[27%] rounded-full  border-10 border-[#ff8a65]'></div>
                    </div>
                    <img className='border-10 border-white absolute top-[50%] left-[8%] w-[150px] h-[150px] rounded-full' src={data[0]?.accountId.avatarUrl} alt="" />
                </div>
                <form className='p-5 mt-12' onSubmit={handleSubmitTeacher} action="">
                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Name</h1>
                        <input className='flex-1 p-2' type="text" onChange={(e) => dispatch(setNameTeacherUpdate(e.target.value))} value={updateTeacher.name} />
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Address</h1>
                        <input className='flex-1 p-2' type="text" onChange={(e) => dispatch(setAddressTeacherUpdate(e.target.value))} value={updateTeacher.address} />
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Gender</h1>
                        <select className='flex-1 p-2 border border-gray-300 rounded-lg' value={updateTeacher.gender} onChange={(e) => dispatch(setGenderTeacherUpdate(e.target.value))} name="" id="">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Major</h1>
                        <select className='flex-1 p-2 border border-gray-300 rounded-lg' value={updateTeacher.major} onChange={(e) => dispatch(setMajorTeacherUpdate(e.target.value))} name="" id="">
                            {major.map((e) =>
                                <option value={e.majorCode}>{e.majorName}</option>)}

                        </select>
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Degree</h1>
                        <input className='flex-1 p-2 ' type="text" onChange={(e) => dispatch(setDegreeTeacherUpdate(e.target.value))} value={updateTeacher.degree} />
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Date of Birth</h1>
                        <input className='flex-1 p-2' type="date" onChange={(e) => toExactISO(dispatch(setDoBTeacherUpdate(e.target.value)))} value={updateTeacher.dateOfBirth ? updateTeacher.dateOfBirth.split("T")[0] : ""} />
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Year of Experience</h1>
                        <input className='flex-1 p-2' type="text" onChange={(e) => dispatch(setYearOfExperienceTeacherUpdate(e.target.value))} value={updateTeacher.yearExperience} />
                    </div>

                    <div className='flex gap-5 pt-5 flex-col lg:flex-row'>
                        <h1 className='text-[24px] font-bold ' >Status</h1>
                        <select className='flex-1 p-2 border border-gray-300 rounded-lg' value={updateStudent.status ? "true" : "false"} onChange={(e) => dispatch(setStatusTeacherUpdate(e.target.value))} name="" id="">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>

                    <div className='flex flex-col lg:flex-row justify-around mt-3'>
                        <button className=' hover:cursor-pointer flex justify-center lg:justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' onClick={handleCancel}>Cancel</button>
                        <button className='hover:cursor-pointer flex justify-center lg:justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' type='submit'>Confirm</button>
                    </div>
                </form>
            </div>

            {/* Thông tin thêm nếu là học sinh */}
            <div className={`w-[70%] ${role === "student" ? "block" : "hidden"}`}>

                <div className='flex gap-5'>
                    <div className='bg-white border-gray-400 border-3 shadow-md rounded-xl w-[33%] p-5 flex flex-col justify-center items-center'>
                        <h1 className='text-[32px] font-bold'>{totalPass}</h1>
                        <p className='text-[28px] font-medium'> Subjects Pass</p>
                    </div>

                    <div className='bg-white border-gray-400 border-3 shadow rounded-xl w-[33%] flex flex-col justify-center items-center'>
                        <h1 className='text-[32px] font-bold'>{totalFail}</h1>
                        <p className='text-[28px] font-medium'>Subjects Fail</p>
                    </div>

                    <div className='bg-white border-gray-400 border-3 shadow rounded-xl w-[33%] flex flex-col justify-center items-center'>
                        <h1 className='text-[32px] font-bold'>{totalStudying}</h1>
                        <p className='text-[28px] font-medium'>Subjects Studying</p>
                    </div>
                </div>

                <div className='bg-white border-gray-400 border-3 shadow rounded-xl p-5 mt-5'>
                    <h1 className='text-[32px] font-bold'>GPA</h1>
                    <p className='text-[28px] flex justify-center'>{totalPass > 0 ? calculateGPA(pass) : 0}</p>
                </div>

                {/* Thông tin lớp major */}
                <h1 className=' mt-5 text-[32px] font-bold'>Class Major</h1>

                <div className='mt-5 bg-white border-gray-400 border-3 shadow-xl shadow-indigo-100 rounded-xl'>
                    <div className='flex gap-1 text-[16px] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                        <div className='w-[30%] pt-5 pb-5'>Class Name</div>
                        <div className='w-[15%] pt-5 pb-5'>Class Code</div>
                        <div className='w-[25%] pt-5 pb-5'>Teacher Name</div>
                        <div className='w-[20%] pt-5 pb-5'>Major Name</div>
                        {/* <div className='w-[10%] pt-5 pb-5'>Mã ngành</div> */}
                        <div className='w-[10%] pt-5 pb-5'>Year</div>
                    </div>

                    <div className='flex gap-1 text-[18px] border-b pl-5 pr-5 border-gray-300 border-dotted' >
                        <div className='truncate w-[30%] pt-5 pb-5' title={classMajor[0]?.className}>{classMajor[0]?.className}</div>
                        <div className='truncate w-[15%] pt-5 pb-5' title={classMajor[0]?.classCode}>{classMajor[0]?.classCode}</div>
                        <div className='truncate w-[25%] pt-5 pb-5' title={classMajor[0]?.teacherId?.name}>{classMajor[0]?.teacherId?.name}</div>
                        <div className='truncate w-[20%] pt-5 pb-5' title={classMajor[0]?.majorId?.majorName}>{classMajor[0]?.majorId?.majorName}</div>
                        {/* <div className='w-[10%] pt-5 pb-5'>{classMajor[0]?.majorId?.majorCode}</div> */}
                        <div className='w-[10%] pt-5 pb-5' title={String(classMajor[0]?.year)}>{classMajor[0]?.year}</div>
                    </div>

                </div>
                {/* Thông tin các lớp đang học */}
                <h1 className=' mt-5 text-[32px] font-bold'>Class Study</h1>

                <div className='mt-5 bg-white border-gray-400 border-3 shadow rounded-xl'>

                    <div className='flex gap-1 text-[16px] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                        <div className='w-[10%] pt-5 pb-5'>Class Code</div>
                        <div className='w-[20%] pt-5 pb-5'>Subject Name</div>
                        <div className='w-[20%] pt-5 pb-5'>Teacher Name</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>Regular</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>Final</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>Total</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>GPA</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>Status</div>
                    </div>
                    {classStudent.map((e) => {

                        return <div key={e._id} className='flex gap-1 text-[18px] border-b pl-5 pr-5 border-gray-300 border-dotted' >
                            <div className='truncate w-[10%] pt-5 pb-5' title={e.classStudyId.classCode}>{e.classStudyId.classCode}</div>
                            <div className='truncate w-[20%] pt-5 pb-5' title={e.classStudyId.subjectId?.subjectName}>{e.classStudyId.subjectId?.subjectName}</div>
                            <div className='truncate w-[20%] pt-5 pb-5' title={e.classStudyId.teacherId?.name}>{e.classStudyId.teacherId?.name}</div>
                            <div className='w-[10%] pt-5 pb-5 flex justify-center'>{e.mark.regular}</div>
                            <div className='w-[10%] pt-5 pb-5 flex justify-center'>{e.mark.final}</div>
                            <div className='w-[10%] pt-5 pb-5 flex justify-center'>{e.mark.total}</div>
                            <div className='w-[10%] pt-5 pb-5 flex justify-center'>{convertGPA(Number(e.mark.total))}</div>
                            <div className="w-[10%] text-[14px] flex items-center" >
                                <h1 className={`flex border rounded-xl items-center justify-center w-[100%] h-[30%] font-bold pt-5 pb-5 ${e.status === "Pass" ? 'text-green-600 border-green-600 bg-green-100' : 'text-red-600 border-red-600 bg-red-100'}`}>{e.status}</h1>
                            </div>
                        </div>
                    }
                    )}
                </div>

                <div className='mt-5 flex justify-end'>
                    <FaTrash onClick={handleDelete} className='text-[26px] text-[#4D44B5] hover:cursor-pointer' />
                </div>
            </div>

            {/* Thông tin thêm nếu là giáo viên */}
            <div className={`w-[70%] text-[#303972] ${role === "teacher" ? "block" : "hidden"}`}>
                <div className='bg-white border-gray-400 border-3 shadow rounded-xl p-5 mt-5'>
                    <h1 className='text-[32px] font-bold'>Total Class Teaching</h1>
                    <p className='text-[28px] flex justify-center font-semibold'>{totalClass}</p>
                </div>

                {/* Thông tin lớp major */}
                <h1 className=' mt-5 text-[32px] font-bold'>Class Major</h1>

                <div className='mt-5 bg-white border-gray-400 border-3 shadow rounded-xl'>
                    <div className='flex text-[16px] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                        <div className='w-[30%] pt-5 pb-5'>Class Name</div>
                        <div className='w-[15%] pt-5 pb-5'>Class Code</div>
                        <div className='w-[25%] pt-5 pb-5'>Teacher Name</div>
                        <div className='w-[20%] pt-5 pb-5'>Major Name</div>
                        {/* <div className='w-[10%] pt-5 pb-5'>Mã ngành</div> */}
                        <div className='w-[10%] pt-5 pb-5'>Year</div>
                    </div>

                    <div className='flex text-[18px] border-b pl-5 pr-5 border-gray-300 border-dotted' >
                        <div className='truncate w-[30%] pt-5 pb-5' title={classMajor[0]?.className}>{classMajor[0]?.className}</div>
                        <div className='truncate w-[15%] pt-5 pb-5' title={classMajor[0]?.classCode}>{classMajor[0]?.classCode}</div>
                        <div className='truncate w-[25%] pt-5 pb-5' title={classMajor[0]?.teacherId?.name}>{classMajor[0]?.teacherId?.name}</div>
                        <div className='truncate w-[20%] pt-5 pb-5' title={classMajor[0]?.majorId?.majorName}>{classMajor[0]?.majorId?.majorName}</div>
                        {/* <div className='w-[10%] pt-5 pb-5'>{classMajor[0]?.majorId?.majorCode}</div> */}
                        <div className='w-[10%] pt-5 pb-5' title={String(classMajor[0]?.year)}>{classMajor[0]?.year}</div>
                    </div>

                </div>
                {/* Thông tin các lớp đang học */}
                <h1 className=' mt-5 text-[32px] font-bold'>Class Teaching</h1>

                <div className='mt-5 bg-white  border-gray-400 border-3 shadow rounded-xl'>

                    <div className='flex text-[16px] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                        <div className='w-[15%] pt-5 pb-5'>Class Code</div>
                        <div className='w-[25%] pt-5 pb-5'>Class Name</div>
                        <div className='w-[15%] pt-5 pb-5'>Start Date</div>
                        <div className='w-[15%] pt-5 pb-5'>End Date</div>
                        <div className='w-[15%] pt-5 pb-5'>Time</div>
                        <div className='w-[15%] pt-5 pb-5'>Date of Week</div>
                    </div>
                    {classStudy.map((e) => {
                        return <div key={e._id} className='flex text-[18px] border-b pl-5 pr-5 border-gray-300 border-dotted' >
                            <div className='w-[15%] pt-5 pb-5'>{e.classCode}</div>
                            <div className='w-[25%] pt-5 pb-5'>{e.subjectId.subjectName}</div>
                            <div className='w-[15%] pt-5 pb-5'>{new Date(e.startDate).toLocaleDateString("vi-VN")}</div>
                            <div className='w-[15%] pt-5 pb-5'>{new Date(e.endDate).toLocaleDateString("vi-VN")}</div>
                            <div className='w-[15%] pt-5 pb-5'>{e.startTime} - {e.endTime}</div>
                            <div className='w-[15%] pt-5 pb-5'>{e.dateOfWeek}</div>

                        </div>
                    }
                    )}
                </div>

                <div className='mt-5 flex justify-end'>
                    <FaTrash onClick={handleDelete} className='text-[26px] text-[#303972] hover:cursor-pointer' />
                </div>
            </div>
        </div >
    )
}

export default UserInfoPage