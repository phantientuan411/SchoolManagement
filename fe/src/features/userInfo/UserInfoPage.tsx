import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getUserInfo, setAddressStudentUpdate, setDoBStudentUpdate, setGenderStudentUpdate, setNameStudentUpdate, setParentNameStudentUpdate, setParentPhoneStudentUpdate, setStatusStudentUpdate, setRole, updateStudentApi, setEdit } from './UserInfoData'
import { getClassStudent } from '../../redux&hook/slice/classstudent'
import type { Student } from '../../type/user'
import { getClassMajor } from '../../redux&hook/slice/classmajor'

const UserInfoPage = () => {
    const dispatch = useAppDispatch()
    const { id, data, role, updateStudent, edit } = useAppSelector((state) => state.getUserInfo)
    const { total, totalFail, totalPass, totalStudying, classStudent } = useAppSelector((state) => state.getClassStudent)
    const { classMajor } = useAppSelector((state) => state.getClassMajor)

    useEffect(() => {
        dispatch(getUserInfo({ id: id, role: role }))
    }, [id, role])

    useEffect(() => {
        dispatch(getClassStudent({ selected: id }))
    }, [id])

    useEffect(() => {
        dispatch(getClassMajor({ selected: id }))
    }, [id])

    const convertGPA = (e: number) => {
        if (e >= 9) return 4.0;
        if (e >= 8) return 3.5;
        if (e >= 7) return 3.0;
        if (e >= 6) return 2.5;
    }

    // console.log("data", data)
    // console.log("role", role)
    // console.log("classMajor", classMajor)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        dispatch(updateStudentApi({ id: id, updateStudent: updateStudent }))
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
    return (
        <div className='flex gap-5 p-[50px] bg-white'>
            <div className={`w-[30%] border-gray-400 border-3 rounded-xl p-5 bg-white shadow-lg ${edit ? "hidden" : "block"}`}>
                <img className='w-[150px] h-[150px] rounded-xl' src={data[0]?.accountId.avatarUrl} alt="" />
                <h1 className='text-[32px] font-bold mt-5' >{data[0]?.name}</h1>

                <p className='text-[28px] mt-3'>{data[0]?.gender}</p>

                <p className='text-[28px] mt-3'>{new Date(data[0]?.dateOfBirth).toLocaleDateString('vi-VN')}</p>

                <p className='text-[28px] mt-3'>{(data[0] as Student)?.yearOfAdmission}</p>

                <div className='flex gap-3 mt-3'>
                    <div className='border-gray-400 border-3 shadow rounded-xl w-[50%] p-5 flex flex-col justify-center items-center'>
                        <p className='text-[20px] font-medium'>Address</p>
                        <p className='text-[26px] font-bold'>{data[0]?.address}</p>
                    </div>

                    <div className='border-gray-400 border-3 shadow rounded-xl w-[50%] p-5 flex flex-col justify-center items-center'>
                        <p className='text-[20px] font-medium'>Time Zone</p>
                        <p className='text-[26px] font-bold'>UTC +7 </p>

                    </div>
                </div>

                <div className='mt-3'>
                    <h1 className='mt-3 text-[26px] font-bold' >Parent</h1>
                    <p className='mt-3 text-[20px] font-medium'>Parent Name: <span className='font-normal'>{(data[0] as Student)?.parentName}</span> </p>
                    <p className='mt-3 text-[20px] font-medium'>Parent Phone: <span className='font-normal'>{(data[0] as Student)?.parentPhone}</span> </p>
                </div>

                <div className='flex justify-end'>
                    <button className=' flex justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' onClick={handleEdit} > Edit</button>
                </div>

            </div>

            <div className={`w-[30%] border-gray-400 border-3 rounded-xl p-5 bg-white shadow-lg ${edit ? "block" : "hidden"}`}>
                <form onSubmit={handleSubmit} action="">
                    <img className='w-[150px] h-[150px] rounded-xl' src={data[0]?.accountId.avatarUrl} alt="" />

                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[24px] font-bold ' >Name</h1>
                        <input className='flex-1' type="text" onChange={(e) => dispatch(setNameStudentUpdate(e.target.value))} value={updateStudent.name} />
                    </div>

                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[24px] font-bold ' >Address</h1>
                        <input className='flex-1' type="text" onChange={(e) => dispatch(setAddressStudentUpdate(e.target.value))} value={updateStudent.address} />
                    </div>

                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[24px] font-bold ' >Gender</h1>
                        <input className='flex-1' type="text" onChange={(e) => dispatch(setGenderStudentUpdate(e.target.value))} value={updateStudent.gender} />
                    </div>

                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[24px] font-bold ' >Parent Name</h1>
                        <input className='flex-1' type="text" onChange={(e) => dispatch(setParentNameStudentUpdate(e.target.value))} value={updateStudent.parentName} />
                    </div>

                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[24px] font-bold ' >Parent Phone</h1>
                        <input className='flex-1' type="text" onChange={(e) => dispatch(setParentPhoneStudentUpdate(e.target.value))} value={updateStudent.parentPhone} />
                    </div>

                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[24px] font-bold ' >Date of Birth</h1>
                        <input className='flex-1' type="text" onChange={(e) => dispatch(setDoBStudentUpdate(e.target.value))} value={new Date(updateStudent.dateOfBirth).toLocaleDateString("vi-VN")} />
                    </div>

                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[24px] font-bold ' >Status</h1>
                        <input className='flex-1' type="text" onChange={(e) => dispatch(setStatusStudentUpdate(e.target.value))} value={new Date(updateStudent.dateOfBirth).toLocaleDateString("vi-VN")} />
                    </div>

                    <div className='flex justify-around mt-3'>
                        <button className=' flex justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' onClick={handleCancel}>Cancel</button>
                        <button className=' flex justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' type='submit'>Confirm</button>
                    </div>
                </form>
            </div>



            {/* Thông tin thêm nếu là học sinh */}
            <div className={`w-[70%] ${role === "student" ? "block" : "hidden"}`}>

                <div className='flex gap-5'>
                    <div className='border-gray-400 border-3 shadow rounded-xl w-[33%] p-5 flex flex-col justify-center items-center'>
                        <h1 className='text-[32px] font-bold'>{totalPass}</h1>
                        <p className='text-[28px] font-medium'> Subjects Pass</p>
                    </div>

                    <div className='border-gray-400 border-3 shadow rounded-xl w-[33%] flex flex-col justify-center items-center'>
                        <h1 className='text-[32px] font-bold'>{totalFail}</h1>
                        <p className='text-[28px] font-medium'>Subjects Fail</p>
                    </div>

                    <div className='border-gray-400 border-3 shadow rounded-xl w-[33%] flex flex-col justify-center items-center'>
                        <h1 className='text-[32px] font-bold'>{totalStudying}</h1>
                        <p className='text-[28px] font-medium'>Subjects Studying</p>
                    </div>
                </div>

                <div className='border-gray-400 border-3 shadow rounded-xl p-5 mt-5'>
                    <h1 className='text-[32px] font-bold'>GPA</h1>
                    <p className='text-[28px] font-medium'></p>
                </div>

                {/* Thông tin lớp major */}
                <h1 className=' mt-5 text-[32px] font-bold'>Class Major</h1>

                <div className='mt-5  border-gray-400 border-3 shadow rounded-xl'>
                    <div className='flex text-[16px] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                        <div className='w-[25%] pt-5 pb-5'>Class Name</div>
                        <div className='w-[10%] pt-5 pb-5'>Class Code</div>
                        <div className='w-[25%] pt-5 pb-5'>Teacher Name</div>
                        <div className='w-[20%] pt-5 pb-5'>Major Name</div>
                        <div className='w-[10%] pt-5 pb-5'>Major Code</div>
                        <div className='w-[10%] pt-5 pb-5'>year</div>
                    </div>

                    <div className='flex text-[18px] border-b pl-5 pr-5 border-gray-300 border-dotted' >
                        <div className='w-[25%] pt-5 pb-5'>{classMajor[0]?.className}</div>
                        <div className='w-[10%] pt-5 pb-5'>{classMajor[0]?.classCode}</div>
                        <div className='w-[25%] pt-5 pb-5'>{classMajor[0]?.teacherId?.name}</div>
                        <div className='w-[20%] pt-5 pb-5'>{classMajor[0]?.majorId?.majorName}</div>
                        <div className='w-[10%] pt-5 pb-5'>{classMajor[0]?.majorId?.majorCode}</div>
                        <div className='w-[10%] pt-5 pb-5'>{classMajor[0]?.year}</div>
                    </div>

                </div>
                {/* Thông tin các lớp đang học */}
                <h1 className=' mt-5 text-[32px] font-bold'>Class Study</h1>

                <div className='mt-5  border-gray-400 border-3 shadow rounded-xl'>

                    <div className='flex text-[16px] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                        <div className='w-[25%] pt-5 pb-5'>Class Name</div>
                        <div className='w-[25%] pt-5 pb-5'>Teacher Name</div>
                        <div className='w-[10%] pt-5 pb-5'>Regular</div>
                        <div className='w-[10%] pt-5 pb-5'>Final</div>
                        <div className='w-[10%] pt-5 pb-5'>Total</div>
                        <div className='w-[10%] pt-5 pb-5'>GPA</div>
                        <div className='w-[10%] pt-5 pb-5'>Status</div>
                    </div>
                    {classStudent.map((e) => {

                        return <div key={e._id} className='flex text-[18px] border-b pl-5 pr-5 border-gray-300 border-dotted' >
                            <div className='w-[25%] pt-5 pb-5'>{e.classStudyId.subjectId.subjectName}</div>
                            <div className='w-[25%] pt-5 pb-5'>{e.classStudyId.teacherId.name}</div>
                            <div className='w-[10%] pt-5 pb-5'>{e.mark.regular}</div>
                            <div className='w-[10%] pt-5 pb-5'>{e.mark.final}</div>
                            <div className='w-[10%] pt-5 pb-5'>{e.mark.total}</div>
                            <div className='w-[10%] pt-5 pb-5'>{convertGPA(Number(e.mark.total))}</div>
                            <div className={`w-[10%] font-bold pt-5 pb-5 ${e.status === "Pass" ? 'text-green-600' : 'text-red-600'}`}>{e.status}</div>
                        </div>
                    }
                    )}
                </div>

            </div>

        </div >
    )
}

export default UserInfoPage