import { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux&hook/hook'
import { IoCaretDown } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import type { ClassStudy } from '../../type/user';

const ListClassStudy = () => {
    const navigate = useNavigate()

    const [subId, setSubId] = useState("")

    const { classStudyEqualSubject, subjectId } = useAppSelector((state) => state.getClassStudy)

    useEffect(() => {
        setSubId(subjectId)
    }, [])

    const handleEdit = (e: ClassStudy) => {
        localStorage.setItem("isEdit", "ClassStudy")
        localStorage.setItem("classStudy", JSON.stringify(e))
        navigate("/majorEdit")

    }
    return (
        <div className='flex gap-5'>
            <IoCaretDown className='text-red-600 text-2xl' />
            <div className='flex flex-col gap-2 flex-1'>
                <h1 className='text-[#303972] text-[20px] font-bold'>Classes</h1>
                <div className='flex text-[18px] text-[#303972] font-bold pl-5 pr-5 rounded-xl bg-white' >
                    <div className='w-[5%] pt-5 pb-5 flex justify-center'>No.</div>
                    <div className='w-[10%] pt-5 pb-5 flex justify-center'>Class Code</div>
                    <div className='w-[15%] pt-5 pb-5 flex justify-center'>Teacher Name</div>
                    <div className='w-[15%] pt-5 pb-5 flex justify-center'>Start Date</div>
                    <div className='w-[15%] pt-5 pb-5 flex justify-center'>End Date</div>
                    <div className='w-[10%] pt-5 pb-5 flex justify-center'>Start Time</div>
                    <div className='w-[10%] pt-5 pb-5 flex justify-center'>End Time</div>
                    <div className='w-[10%] pt-5 pb-5 flex justify-center'>Date Of Week</div>
                    <div className='w-[10%] pt-5 pb-5 flex justify-center'>Action</div>
                </div>
                {classStudyEqualSubject[subId]?.map((e, index) =>
                    <div key={e._id} className='flex text-[20px] pl-5 pr-5 rounded-xl bg-white font-semibold' >
                        <div className='w-[5%] pt-5 pb-5 flex justify-center'>{index + 1}</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>{e.classCode}</div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center'>{e.teacherId.name}</div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center'>{new Date(e.startDate).toLocaleDateString("vi-VN")}</div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center'>{new Date(e.endDate).toLocaleDateString("vi-VN")}</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>{e.startTime}</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>{e.endTime}</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>{e.dateOfWeek}</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center items-center gap-8 text-[#303972] font-extrabold'>
                            <MdOutlineModeEdit onClick={() => handleEdit(e)} />
                            <FaTrash />
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default ListClassStudy