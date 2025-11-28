import { useAppDispatch, useAppSelector } from '../../redux&hook/hook.ts'
import { useEffect, useState } from 'react'
import { getClassStudyEqualSubject, toggleSubject } from '../../redux&hook/slice/classstudy.ts'
import ListClassStudy from '../listClassStudy/ListClassStudy.tsx'
import { IoCaretDown } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";


const ListSubject = () => {
    const dispatch = useAppDispatch()

    const { majorId, subjectEqualMajor } = useAppSelector((state) => state.getSubject)

    const { subjectOpen } = useAppSelector((state) => state.getClassStudy)

    const [majId, setMajId] = useState("")

    useEffect(() => {
        setMajId(majorId)
    }, [])

    const handleClickSubject = async (e: string, event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        await dispatch(getClassStudyEqualSubject({ subjectId: e }))
        dispatch(toggleSubject(e))
    }

    return (
        <div className='flex gap-5'>
            <IoCaretDown className='text-red-600 text-2xl' />
            <div className='flex-1 flex flex-col gap-3'>
                <h1 className='text-[#303972] text-[24px] font-bold'>Subjects</h1>
                <div className='text-[#303972] flex text-[20px] font-bold pl-5 pr-5 bg-white rounded-xl' >
                    <div className='w-[10%] pt-5 pb-5 flex justify-center'>No.</div>
                    <div className='w-[15%] pt-5 pb-5 flex justify-center'>Subject Code</div>
                    <div className='w-[30%] pt-5 pb-5 flex justify-center'>Subject Name</div>
                    <div className='w-[15%] pt-5 pb-5 flex justify-center'>Number Credit</div>
                    <div className='w-[20%] pt-5 pb-5 flex justify-center'>Total Fee</div>
                    <div className='w-[10%] pt-5 pb-5 flex justify-center'>Action</div>
                </div>

                {subjectEqualMajor[majId]?.map((e, index) =>
                    <div onClick={(event) => handleClickSubject(e._id, event)} key={e._id} className='flex flex-col gap-2' >
                        <div className='flex text-[22px] font-semibold pl-5 pr-5 bg-white rounded-xl' >
                            <div className='w-[10%] pt-5 pb-5 flex justify-center'>{index + 1}</div>
                            <div className='w-[15%] pt-5 pb-5 flex justify-center'>{e.subjectCode}</div>
                            <div className='w-[30%] pt-5 pb-5 flex justify-center'>{e.subjectName}</div>
                            <div className='w-[15%] pt-5 pb-5 flex justify-center'>{e.numberCredits}</div>
                            <div className='w-[20%] pt-5 pb-5 flex justify-center'>{e.totalFee}</div>
                            <div className='w-[10%] pt-5 pb-5 flex justify-center items-center gap-8 text-[#303972] font-extrabold'>
                                <MdOutlineModeEdit />
                                <FaTrash />
                            </div>
                        </div>
                        {subjectOpen.includes(e._id) ? <ListClassStudy></ListClassStudy> : null}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListSubject