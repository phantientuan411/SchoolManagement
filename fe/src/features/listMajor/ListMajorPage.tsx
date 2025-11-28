import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getMajor } from '../../redux&hook/slice/major'
import { getSubjectEqualMajor, toggleMajor } from '../../redux&hook/slice/subject'
import ListSubject from '../listSubject/ListSubject'
import { MdOutlineModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const ListMajorPage = () => {
    const dispatch = useAppDispatch()

    const { major } = useAppSelector((state) => state.getMajor)

    const { majorOpen } = useAppSelector((state) => state.getSubject)

    useEffect(() => {
        dispatch(getMajor({}))
    }, [major])

    const handleClickMajor = async (e: string) => {
        await dispatch(getSubjectEqualMajor({ majorId: e }))
        dispatch(toggleMajor(e))
        console.log(majorOpen)
    }

    return (
        <div className='p-[50px] bg-[#F3F4FF] min-h-screen'>
            <h1 className='text-[#303972] text-[32px] font-bold mb-[25px]'> MAJORS</h1>
            <div className='rounded-xl'>
                <div className='flex text-[22px] text-[#303972] font-bold pl-5 pr-5 bg-white rounded-xl' >
                    <div className='w-[10%] pt-5 pb-5 flex justify-center'>No.</div>
                    <div className='w-[50%] pt-5 pb-5 flex justify-center'>Major Name</div>
                    <div className='w-[30%] pt-5 pb-5 flex justify-center'>Major Code</div>
                    <div className='w-[10%] pt-5 pb-5 flex justify-center'>Action</div>
                </div>

                {major.map((e, index) =>
                    <div key={e._id} onClick={() => handleClickMajor(e._id)} className='hover:cursor-pointer bg-[#F3F4FF] pt-5 flex flex-col gap-3' >
                        <div className='flex text-[24px] font-semibold pl-5 pr-5 bg-white rounded-xl' >
                            <div className='w-[10%] pt-5 pb-5 flex justify-center'>{index + 1}</div>
                            <div className='w-[50%] pt-5 pb-5 flex justify-center'>{e.majorName}</div>
                            <div className='w-[30%] pt-5 pb-5 flex justify-center'>{e.majorCode}</div>
                            <div className='w-[10%] pt-5 pb-5 flex justify-center items-center gap-8 text-[#303972] font-extrabold'>
                                <MdOutlineModeEdit />
                                <FaTrash />
                            </div>
                        </div>
                        {majorOpen.includes(e._id) ? <ListSubject></ListSubject> : null}
                    </div>
                )}
            </div>

        </div>
    )
}

export default ListMajorPage