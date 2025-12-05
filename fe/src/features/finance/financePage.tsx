import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getInvestment, setPageId, setPagination } from '../../redux&hook/slice/investment'
import { useEffect } from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { getStudentPayment, setPageIdStudent, setPaginationStudent } from '../../redux&hook/slice/studentpayment';
import { getTeacherSalary, setPageIdTeacher, setPaginationTeacher } from '../../redux&hook/slice/teachersalary';

const FinancePage = () => {
    const dispatch = useAppDispatch()
    const { pageId, pageSize, pagination, totalInvestment, totalPage, investment } = useAppSelector((state) => state.getInvestment)
    const { pageIdStudent, pageSizeStudent, paginationStudent, totalPageStudent, totalStudent, studentPayment } = useAppSelector((state) => state.getStudentPayment)
    const { pageIdTeacher, pageSizeTeacher, paginationTeacher, totalPageTeacher, totalTeacher, teacherSalary } = useAppSelector((state) => state.getTeacherSalary)

    useEffect(() => {
        dispatch(getInvestment({
            pageId: pageId,
            pageSize: pageSize,
        }));
    }, [])

    useEffect(() => {
        dispatch(getStudentPayment({
            pageIdStudent: pageIdStudent,
            pageSizeStudent: pageSizeStudent,
        }));
    }, [])

    useEffect(() => {
        dispatch(getTeacherSalary({
            pageIdTeacher: pageIdTeacher,
            pageSizeTeacher: pageSizeTeacher,
        }));
    }, [])

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
        const listPagination = (item: number, total: number) => {
            let pagination: number[] = []
            if (item === 1) {
                pagination.push(item, item + 1, item + 2)

            } else if (item === total) {
                pagination.push(item - 2, item - 1, item)
            } else {
                pagination.push(item - 1, item, item + 1)
            }
            return dispatch(setPaginationTeacher(pagination))
        }
        listPagination(pageIdTeacher, totalPageTeacher)
    }, [pageIdTeacher, totalPageTeacher])

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
            return dispatch(setPaginationStudent(pagination))
        }
        listPagination(pageIdStudent, totalPageStudent)
    }, [pageIdStudent, totalPageStudent])

    return (
        <div className='p-[50px] bg-[#F3F4FF]'>
            <h1 className='text-[#303972] text-[32px] font-bold mb-[25px]'>Finance</h1>
            <h1 className='text-[#303972] text-[32px] font-bold mb-[22px]'> Investment</h1>
            <div className='rounded-xl bg-white mb-5 '>

                <div className='flex text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                    <div className='w-[30%] pt-5 pb-5'>Donor</div>
                    <div className='w-[20%] pt-5 pb-5'>Amount</div>
                    <div className='w-[20%] pt-5 pb-5'>Date</div>
                    <div className='w-[15%] pt-5 pb-5'>Note</div>
                    <div className='w-[15%] pt-5 pb-5'>Status</div>
                </div>

                {investment.map((e) =>
                    <div className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                        <div className='w-[30%] pt-5 pb-5'>{e.donor}</div>
                        <div className='w-[20%] pt-5 pb-5'>{e.amount}</div>
                        <div className='w-[20%] pt-5 pb-5'>{e.date}</div>
                        <div className='w-[15%] pt-5 pb-5'>{e.note}</div>
                        <div className='w-[15%] pt-5 pb-5'>{e.completed === true ? "Completed" : "Pending"}</div>
                    </div>
                )}

                {/* Tổng số và phân trang */}
                <div className='flex justify-between p-5 items-center'>
                    <div>
                        <p>Showing <span className='font-bold'>{pageId} - {totalPage}</span> from <span className='font-bold'>{totalInvestment} data</span></p>
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

            <div className='flex gap-5'>
                <div className='w-[50%]'>
                    <h1 className='text-[#303972] text-[32px] font-bold mb-[22px]'> Student Payment</h1>
                    <div className='rounded-xl bg-white  '>

                        <div className='flex text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                            <div className='w-[20%] pt-5 pb-5'>Student Name</div>
                            <div className='w-[30%] pt-5 pb-5'>Student Code</div>
                            <div className='w-[20%] pt-5 pb-5'>Amount</div>
                            <div className='w-[15%] pt-5 pb-5'>Type</div>
                            <div className='w-[15%] pt-5 pb-5'>Status</div>
                        </div>

                        {studentPayment.map((e) =>
                            <div className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                                <div className='w-[20%] pt-5 pb-5'>{e.studentId.name}</div>
                                <div className='w-[30%] pt-5 pb-5'>{e.studentId._id}</div>
                                <div className='w-[20%] pt-5 pb-5'>{e.amount}</div>
                                <div className='w-[15%] pt-5 pb-5'>{e.type}</div>
                                <div className='w-[15%] pt-5 pb-5'>{e.paid === true ? "Completed" : "Pending"}</div>
                            </div>
                        )}

                        {/* Tổng số và phân trang */}
                        <div className='flex justify-between p-5 items-center'>
                            <div>
                                <p>Showing <span className='font-bold'>{pageIdStudent} - {totalPageStudent}</span> from <span className='font-bold'>{totalStudent} data</span></p>
                            </div>

                            <div className='flex gap-2 justify-center items-center'>
                                <IoMdArrowDropleft className='text-[30px]' onClick={() => dispatch(setPageIdStudent(pageIdStudent === 1 ? pageIdStudent : pageIdStudent - 1))} />
                                {paginationStudent.map(e =>
                                    <div className={`border-[#A098AE] rounded-full border w-[51px] h-[51px] text-[18px] text-[#A098AE] flex justify-center items-center select-none ${e === pageIdStudent ? 'bg-[#4D44B5] text-white' : ""}`}
                                        onClick={() => e <= totalPageStudent && dispatch(setPageIdStudent(e))}>{e}</div>
                                )}
                                <IoMdArrowDropright className='text-[30px]' onClick={() => dispatch(setPageIdStudent(pageIdStudent === totalPageStudent ? pageIdStudent : pageIdStudent + 1))} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-[50%]'>
                    <h1 className='text-[#303972] text-[32px] font-bold mb-[22px]'> Teacher Salary</h1>
                    <div className='rounded-xl bg-white  '>

                        <div className='flex text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                            <div className='w-[30%] pt-5 pb-5'>Teacher Name</div>
                            <div className='w-[20%] pt-5 pb-5'>Amount</div>
                            <div className='w-[20%] pt-5 pb-5'>Month</div>
                            <div className='w-[15%] pt-5 pb-5'>Year</div>
                            <div className='w-[15%] pt-5 pb-5'>Status</div>
                        </div>

                        {teacherSalary.map((e) =>
                            <div className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                                <div className='w-[30%] pt-5 pb-5'>{e.teacherId.name}</div>
                                <div className='w-[20%] pt-5 pb-5'>{e.amount}</div>
                                <div className='w-[20%] pt-5 pb-5'>{e.month}</div>
                                <div className='w-[15%] pt-5 pb-5'>{e.year}</div>
                                <div className='w-[15%] pt-5 pb-5'>{e.paid === true ? "Completed" : "Pending"}</div>
                            </div>
                        )}

                        {/* Tổng số và phân trang */}
                        <div className='flex justify-between p-5 items-center'>
                            <div>
                                <p>Showing <span className='font-bold'>{pageIdTeacher} - {totalPageTeacher}</span> from <span className='font-bold'>{totalTeacher} data</span></p>
                            </div>

                            <div className='flex gap-2 justify-center items-center'>
                                <IoMdArrowDropleft className='text-[30px]' onClick={() => dispatch(setPageIdTeacher(pageIdTeacher === 1 ? pageIdTeacher : pageIdTeacher - 1))} />
                                {paginationTeacher.map(e =>
                                    <div className={`border-[#A098AE] rounded-full border w-[51px] h-[51px] text-[18px] text-[#A098AE] flex justify-center items-center select-none ${e === pageIdTeacher ? 'bg-[#4D44B5] text-white' : ""}`}
                                        onClick={() => e <= totalPageTeacher && dispatch(setPageIdTeacher(e))}>{e}</div>
                                )}
                                <IoMdArrowDropright className='text-[30px]' onClick={() => dispatch(setPageIdTeacher(pageIdTeacher === totalPageTeacher ? pageIdTeacher : pageIdTeacher + 1))} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinancePage