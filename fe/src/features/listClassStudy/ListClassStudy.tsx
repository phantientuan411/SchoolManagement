import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../redux&hook/hook'
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClassStudyDetail } from '../../redux&hook/slice/classstudy';


const ListClassStudy = () => {
    const dispatch = useAppDispatch()

    const { id } = useParams()

    const { classStudyDetail, studentDetail } = useAppSelector((state) => state.getClassStudy)

    useEffect(() => {
        if (!id) return
        dispatch(getClassStudyDetail({ id: id }))
    })

    return (
        <div className='min-h-screen flex flex-col gap-5 pt-[50px] pl-[200px] pr-[200px] bg-[#F3F4FF]'>
            <h1 className='text-[32px] font-bold pb-5'>Manage Major - Class Study: {classStudyDetail[0]?.classCode}</h1>

            <div className='grid grid-cols-2 gap-5 pb-5'>
                <div className='bg-white rounded-2xl shadow-lg shadow-indigo-100 p-6 flex flex-col gap-5'>
                    <h1 className='text-[24px] text-gray-400'>Total Student</h1>
                    <div className='flex gap-5 text-[28px] font-semibold items-center'>
                        <PiStudentFill />
                        <span>{studentDetail.length}</span>
                    </div>
                </div>

                <div className='bg-white rounded-2xl shadow-lg shadow-indigo-100 p-6 flex flex-col gap-5'>
                    <h1 className='text-[24px] text-gray-400'>Teacher</h1>
                    <div className='flex gap-5 text-[28px] font-semibold items-center'>
                        <FaChalkboardTeacher />
                        <span>{classStudyDetail[0]?.teacherId.name}</span>
                    </div>
                </div>

            </div>

            <div className='bg-white mb-10 rounded-2xl shadow-lg shadow-indigo-100 p-6'>
                <div className='flex gap-7 border-b border-gray-400 font-semibold text-[22px]'>
                    <div className={`pb-5! hover:cursor-pointer border-b text-[#4D44B5] border-[#4D44B5]`} >Student List</div>
                </div>
                {/* Student List */}
                <div className={`rounded-xl bg-white`}>
                    <div className='flex items-center text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted'>
                        <div className='w-[10%] pt-5 pb-5 '>No.</div>
                        <div className='w-[25%] pt-5 pb-5 '>Student Name</div>
                        <div className='w-[20%] pt-5 pb-5'>Student Code</div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center'>Regular</div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center'>Final</div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center'>Total</div>
                    </div>

                    {studentDetail?.map((e, index) =>
                        <div className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                            <div className='w-[10%] pt-5 pb-5 '>{index + 1}</div>
                            <div className='w-[25%] pt-5 pb-5 '>{e.studentId?.name}</div>
                            <div className='w-[20%] pt-5 pb-5'>{e.studentId?._id}</div>
                            <div className='w-[15%] pt-5 pb-5 flex justify-center'>{e.mark.regular}</div>
                            <div className='w-[15%] pt-5 pb-5 flex justify-center'>{e.mark.final}</div>
                            <div className='w-[15%] pt-5 pb-5 flex justify-center'>{e.mark.total}</div>
                        </div>)}

                </div>
            </div>
        </div>
    )
}

export default ListClassStudy