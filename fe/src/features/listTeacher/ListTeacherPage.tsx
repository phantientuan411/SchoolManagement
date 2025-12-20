import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getTeacher, setPagination, setPageId, setSearchName } from './ListTeacherData'
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { GrSearch } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";
import { setId } from '../userInfo/UserInfoData';
import { useNavigate } from 'react-router-dom';

const ListTeacherPage = () => {
    const dispatch = useAppDispatch()
    const { teacher, pageId, pageSize, searchName, major, totalPage, totalTeacher, pagination } = useAppSelector((state) => state.getTeacher)

    const navigate = useNavigate()

    // Render dữ liệu giáo viên
    useEffect(() => {
        dispatch(getTeacher({
            pageId: pageId,
            pageSize: pageSize,
            searchName: searchName,
            major: major
        }))
    }, [dispatch, pageId, pageSize, searchName, major])

    // Render dữ liệu số trang
    useEffect(() => {
        const listPagination = (item: number, total: number) => {
            let pagination: number[] = []
            if (item === 1) {
                pagination.push(item, item + 1, item + 2)

            } else if (item === total) {
                pagination.push(item - 2, item - 1, item)
            } else {
                pagination.push(item - 1, item, item + 1)
            }
            return dispatch(setPagination(pagination))
        }
        listPagination(pageId, totalPage)
    }, [pageId, totalPage])

    const selectTeacher = (e: string) => {
        dispatch(setId(e))
        localStorage.setItem("role", "teacher")
        // dispatch(setRole("teacher"))
        navigate(`/userinfo/${e}`)
    }

    const handleCreateTeacher = () => {
        localStorage.setItem("role", "teacher")
        navigate("/createaccount")
    }

    return (
        <div className='p-[50px] bg-[#F3F4FF]'>
            <h1 className='text-[#303972] text-[32px] font-bold mb-[25px]'>TEACHERS</h1>
            <div className='mb-[25px] flex justify-between'>
                <div className='flex items-center relative' >
                    <input
                        className='w-[350px] h-[60px] bg-white rounded-[50px]! pl-20 text-[18px]'
                        type="text"
                        placeholder=" Search here..."
                        value={searchName}
                        onChange={(e) => {
                            dispatch(setSearchName(e.target.value));
                            dispatch(setPageId(1))
                        }}
                    />
                    <GrSearch className='text-[#4D44B5] absolute left-10 font-bold text-[18px]' />
                </div>

                <div className='flex items-center relative'>
                    <button onClick={handleCreateTeacher} className='hover:cursor-pointer text-[20px] bg-[#4D44B5] text-white pt-5 pb-5 pl-15 pr-10 rounded-full'>New Teacher</button>
                    <FaPlus className='text-white absolute left-7 font-bold text-[18px]' />
                </div>

            </div>

            <div className='rounded-xl  '>
                <div className='grid grid-cols-4 gap-4'>
                    {teacher.map((e) =>
                        <div onClick={() => selectTeacher(e.accountId._id)} className='bg-white rounded-xl flex flex-col justify-center items-center p-5 hover:cursor-pointer hover:bg-gray-200'>
                            <img className='mb-5 w-[120px] h-[120px] rounded-full' src={e.accountId.avatarUrl} alt="" />
                            <h1 className='mb-5 text-[26px] text-[#303972] font-bold'>{e.name}</h1>
                            <h2 className='mb-5 text-[20px] text-[#A098AE] font-medium'>{e.major}</h2>
                            <p className='text-[20px] text-[#A098AE] font-normal'>{e.accountId.accountEmail}</p>

                        </div>
                    )}

                </div>


                {/* Tổng số và phân trang */}
                <div className='flex justify-between p-5 items-center'>
                    <div>
                        <p>Showing <span className='font-bold'>{pageId} - {totalPage}</span> from <span className='font-bold'>{totalTeacher} data</span></p>
                    </div>

                    <div className='flex gap-2 justify-center items-center'>
                        <IoMdArrowDropleft className='text-[30px]' onClick={() => dispatch(setPageId(pageId === 1 ? pageId : pageId - 1))} />
                        {pagination.map(e =>
                            <div className={`border-[#A098AE] rounded-full border w-[51px] h-[51px] text-[18px] text-[#A098AE] flex justify-center items-center select-none ${e === pageId ? 'bg-[#4D44B5] text-white' : ""}`}
                                onClick={() => e <= totalPage && dispatch(setPageId(e))}>{e}</div>
                        )}
                        <IoMdArrowDropright className='text-[30px]' onClick={() => dispatch(setPageId(pageId === totalPage ? pageId : pageId + 1))} />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ListTeacherPage