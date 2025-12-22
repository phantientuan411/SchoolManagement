import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getStudent, setPageId, setPagination, setSearchName, setSortField } from './ListStudentData'
import { IoMdArrowDropleft, IoMdArrowDropright, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { GrSearch } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";
import { setId } from '../userInfo/UserInfoData';
import { useNavigate } from 'react-router-dom';

const ListStudentPage = () => {
    const dispatch = useAppDispatch()
    const { student, totalPage, totalStudent, pageId, pagination, pageSize, searchName, sort, selectedStudent } = useAppSelector((state) => state.getStudent)
    const navigate = useNavigate()

    // Render dữ liệu học sinh
    useEffect(() => {
        dispatch(getStudent({
            pageId: pageId,
            pageSize: pageSize,
            searchName: searchName,
            sort: sort
        }));
    }, [dispatch, pageId, pageSize, searchName, sort])

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

    useEffect(() => {
        console.log("Selected student updated:", selectedStudent);
    }, [selectedStudent]);

    // Hàm set Sort
    const setSort = (key: "name" | "classId" | "dateOfBirth" | "major" | "_id") => {
        if (sort[key] === "") {
            dispatch(setSortField({ field: key, value: "asc" }))
        } else if (sort[key] === "asc") {
            dispatch(setSortField({ field: key, value: "desc" }))
        } else {
            dispatch(setSortField({ field: key, value: "" }))
        }
    }

    const selectStudent = (e: string) => {
        dispatch(setId(e))
        localStorage.setItem("role", "student")
        // dispatch(setRole("student"))
        navigate(`/userinfo/${e}`)
    }

    const handleCreateStudent = () => {
        localStorage.setItem("role", "student")
        navigate("/createaccount")
    }

    return (
        <div className='pt-[50px] p-[50px] bg-[#F3F4FF]'>
            <h1 className='text-[#303972] text-[32px] font-bold mb-[25px]'>STUDENTS</h1>
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
                    <button onClick={handleCreateStudent} className='hover:cursor-pointer text-[20px] bg-[#4D44B5] text-white pt-5 pb-5 pl-15 pr-10 rounded-full'>New Student</button>
                    <FaPlus className='text-white absolute left-7 font-bold text-[18px]' />
                </div>

            </div>

            <div className='rounded-xl bg-white  '>

                {/* Tiêu đề bảng  */}
                <div className='flex text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                    <div onClick={() => setSort("name")} className='hover:cursor-pointer w-[20%] pt-5 pb-5 justify-center flex gap-5 items-center'>
                        <p>Name</p>
                        {sort.name === "asc"
                            ? <IoMdArrowDropup className='text-[25px] text-red-700' />
                            : (sort.name === "desc" ? <IoMdArrowDropdown className='text-[25px] text-green-700' /> : null)}
                    </div>
                    <div onClick={() => setSort("_id")} className='hover:cursor-pointer w-[15%] pt-5 pb-5 justify-center flex gap-5 items-center'>
                        <p>ID</p>
                        {sort._id === "asc"
                            ? <IoMdArrowDropup className='text-[25px] text-red-700' />
                            : (sort._id === "desc" ? <IoMdArrowDropdown className='text-[25px] text-green-700' /> : null)}
                    </div>
                    <div onClick={() => setSort("dateOfBirth")} className='hover:cursor-pointer w-[15%] pt-5 pb-5 justify-center flex gap-5 items-center'>
                        <p>Date</p>
                        {sort.dateOfBirth === "asc"
                            ? <IoMdArrowDropup className='text-[25px] text-red-700' />
                            : (sort.dateOfBirth === "desc" ? <IoMdArrowDropdown className='text-[25px] text-green-700' /> : null)}
                    </div>
                    <div className='w-[20%] pt-5 pb-5 flex justify-center'>Paren Name</div>
                    <div className='w-[10%] pt-5 pb-5 flex justify-center'>City</div>
                    <div className='w-[10%] pt-5 pb-5 flex justify-center'>Contact</div>
                    <div onClick={() => setSort("classId")} className='hover:cursor-pointer w-[10%] pt-5 pb-5 justify-center flex gap-5 items-center'>
                        <p>Grade</p>
                        {sort.classId === "asc"
                            ? <IoMdArrowDropup className='text-[25px] text-red-700' />
                            : (sort.classId === "desc" ? <IoMdArrowDropdown className='text-[25px] text-green-700' /> : null)}
                    </div>
                </div>

                {/* List danh sách học sinh */}
                {student.map(e =>
                    <div onClick={() => selectStudent(e.accountId._id)} className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                        <div className='gap-5 items-center w-[20%] pt-5 pb-5 flex  text-[20px] font-bold'>
                            <img className='w-10 h-10 rounded-4xl' src={e.accountId.avatarUrl} alt="" />
                            <h1 title={e.name} className='truncate'>{e.name}</h1>
                        </div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center text-[20px] font-semibold text-[#4D44B5]' >{"#" + e._id.slice(e._id.indexOf("ff"))}</div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center text-[16px] font-normal text-[#A098AE]'>{new Date(e.dateOfBirth).toLocaleDateString("vi-VN")}</div>
                        <div title={e.parentName} className='truncate w-[20%] pt-5 pb-5 flex justify-center text-[16px] font-normal text-[#A098AE]'>{e.parentName}</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center text-[16px] font-normal text-[#A098AE]'>{e.address}</div>
                        <div title={e.accountId.accountEmail} className='w-[10%] pt-5 pb-5 flex justify-center truncate'>{e.accountId.accountEmail}</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center overflow-hidden'>{e.classId.classCode}</div>
                    </div>
                )}

                {/* Tổng số và phân trang */}
                <div className='flex justify-between p-5 items-center'>
                    <div>
                        <p>Showing <span className='font-bold'>{pageId} - {totalPage}</span> from <span className='font-bold'>{totalStudent} data</span></p>
                    </div>

                    <div className='flex gap-2 justify-center items-center'>
                        <IoMdArrowDropleft className='hover:cursor-pointer text-[30px]' onClick={() => dispatch(setPageId(pageId === 1 ? pageId : pageId - 1))} />
                        {pagination.map(e =>
                            <div className={`hover:cursor-pointer border-[#A098AE] rounded-full border w-[51px] h-[51px] text-[18px] text-[#A098AE] flex justify-center items-center select-none ${e === pageId ? 'bg-[#4D44B5] text-white' : ""}`}
                                onClick={() => e <= totalPage && dispatch(setPageId(e))}>{e}</div>
                        )}
                        <IoMdArrowDropright className='hover:cursor-pointer text-[30px]' onClick={() => dispatch(setPageId(pageId === totalPage ? pageId : pageId + 1))} />

                    </div>

                </div>
            </div>
        </div>
    )
}


export default ListStudentPage