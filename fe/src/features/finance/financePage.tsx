import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getInvestment, setPageId, setPagination } from '../../redux&hook/slice/investment'
import { useEffect } from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { getStudentPayment, setPageIdStudent, setPaginationStudent } from '../../redux&hook/slice/studentpayment';
import { getTeacherSalary, setPageIdTeacher, setPaginationTeacher } from '../../redux&hook/slice/teachersalary';
import { IncomePieChart } from '../../component/IncomePieChart';
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { getTeacher } from '../listTeacher/ListTeacherData';
import { getStudent } from '../listStudent/ListStudentData';
import { getExpense, setPageIdExpense, setPaginationExpense } from '../../redux&hook/slice/expense';
import ExpenseTeacherChart from '../../component/ExpenseChart';

const FinancePage = () => {
    const dispatch = useAppDispatch()
    const { pageId, pageSize, pagination, totalInvestment, totalPage, investment, totalAmountInvestment } = useAppSelector((state) => state.getInvestment)
    const { pageIdStudent, pageSizeStudent, paginationStudent, totalPageStudent, totalStudentPayment, studentPayment, totalAmountPayment } = useAppSelector((state) => state.getStudentPayment)
    const { pageIdTeacher, pageSizeTeacher, paginationTeacher, totalPageTeacher, totalTeacherSalary, teacherSalary, totalAmountTeacher } = useAppSelector((state) => state.getTeacherSalary)
    const { pageIdExpense, pageSizeExpense, paginationExpense, totalAmountExpense, totalExpense, totalPageExpense, expense } = useAppSelector((state) => state.getExpense)
    const { totalStudent, sort } = useAppSelector((state) => state.getStudent)
    const { totalTeacher } = useAppSelector((state) => state.getTeacher)

    useEffect(() => {
        dispatch(getTeacher({
            pageId: 0,
            pageSize: 0,
            searchName: "",
            major: ""
        }))
    }, [])

    useEffect(() => {
        dispatch(getStudent({
            pageId: 0,
            pageSize: 0,
            searchName: "",
            sort: sort
        }));
    }, [])

    useEffect(() => {
        dispatch(getInvestment({
            pageId: pageId,
            pageSize: pageSize,
        }));
    }, [pageId])

    useEffect(() => {
        dispatch(getStudentPayment({
            pageIdStudent: pageIdStudent,
            pageSizeStudent: pageSizeStudent,
        }));
    }, [pageIdStudent])

    useEffect(() => {
        dispatch(getTeacherSalary({
            pageIdTeacher: pageIdTeacher,
            pageSizeTeacher: pageSizeTeacher,
        }));
    }, [pageIdTeacher])

    useEffect(() => {
        dispatch(getExpense({
            pageIdExpense: pageIdExpense,
            pageSizeExpense: pageSizeExpense
        }))
    }, [pageIdExpense])

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
            if (total === 2) {
                pagination = []
                pagination.push(1, 2)
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
            if (total === 2) {
                pagination = []
                pagination.push(1, 2)
            }
            return dispatch(setPaginationExpense(pagination))
        }
        listPagination(pageIdExpense, totalPageExpense)
    }, [pageIdExpense, totalPageExpense])

    const investmentTotal = totalAmountInvestment?.[0]?.totalAmount || 0;
    const paymentTotal = totalAmountPayment?.[0]?.totalAmount || 0;
    const salaryTotal = totalAmountTeacher.reduce((sum, e) => sum + e.totalAmount, 0)
    const expenseTotal = totalAmountExpense.reduce((sum, e) => sum + e.totalAmount, 0)

    return (
        <div className='pt-[50px] pb-[50px] pl-[200px] pr-[200px] bg-[#F3F4FF]'>
            <h1 className=' text-[32px] font-bold mb-[25px]'>Finance</h1>
            <div className='flex gap-5'>
                <div className='rounded-xl w-[30%] bg-white flex gap-5 p-10 items-center'>
                    <div className='w-[60px] h-[60px] rounded-full bg-[#4D44B5] text-white flex justify-center items-center'>
                        <PiStudentBold className=' text-[32px]' />
                    </div>

                    <div>
                        <h2 className='text-gray-400 text-[20px]'>Total Student</h2>
                        <h1 className='text-[#303972] text-[30px] font-bold'>{totalStudent}</h1>
                    </div>
                </div>

                <div className='rounded-xl w-[30%] bg-white flex gap-5 p-10 items-center'>
                    <div className='w-[60px] h-[60px] rounded-full bg-[#FB7D5B] text-white flex justify-center items-center'>
                        <GiTeacher className=' text-[32px]' />
                    </div>

                    <div>
                        <h2 className='text-gray-400 text-[20px]'>Total Teacher</h2>
                        <h1 className='text-[#303972] text-[30px] font-bold'>{totalTeacher}</h1>
                    </div>
                </div>

                <div className='rounded-xl w-[40%] bg-white flex gap-5 p-10 items-center'>
                    <div className='w-[60px] h-[60px] rounded-full bg-[#FCC43E] text-white flex justify-center items-center'>
                        <MdOutlineAccountBalanceWallet className=' text-[32px]' />
                    </div>

                    <div>
                        <h2 className='text-gray-400 text-[20px]'>School Balance</h2>
                        <div className='flex gap-5'>
                            <p className='text-green-400 font-bold'>{(investmentTotal + paymentTotal).toLocaleString('vi-VN')}</p>
                            <p className='text-red-400 font-bold'>{(salaryTotal + expenseTotal).toLocaleString('vi-VN')}</p>
                        </div>
                        <h1 className='text-[#303972] text-[30px] font-bold'>{(investmentTotal + paymentTotal - salaryTotal - expenseTotal).toLocaleString('vi-VN')} VND</h1>
                    </div>
                </div>
            </div>
            <h1 className='text-[25px] font-bold mb-5 mt-5' > Investment</h1>
            <div className='flex gap-5'>
                <div className='rounded-xl w-[60%] bg-white '>

                    <div className='flex text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                        <div className='w-[20%] pt-5 pb-5'>Donor</div>
                        <div className='w-[20%] pt-5 pb-5'>Amount</div>
                        <div className='w-[20%] pt-5 pb-5'>Date</div>
                        <div className='w-[25%] pt-5 pb-5'>Note</div>
                        <div className='w-[15%] pt-5 pb-5'>Status</div>
                    </div>

                    {investment.map((e) =>
                        <div className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200 eclis'>
                            <div className='w-[20%] pt-5 pb-5'>{e.donor}</div>
                            <div className='w-[20%] pt-5 pb-5'>{(e.amount).toLocaleString("vi-VN")}</div>
                            <div className='w-[20%] pt-5 pb-5'>{new Date(e.date).toLocaleDateString("vi-VN")}</div>
                            <div className='w-[25%] pt-5 pb-5'>{e.note}</div>
                            <div className={`w-[15%] pt-5 pb-5 ${e.completed === true ? "text-green-500" : "text-red-500"}`}>{e.completed === true ? "Completed" : "Pending"}</div>
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
                                <div className={`hover:cursor-pointer border-[#A098AE] rounded-full border w-[51px] h-[51px] text-[18px] text-[#A098AE] flex justify-center items-center select-none ${e === pageId ? 'bg-[#4D44B5] text-white' : ""}`}
                                    onClick={() => e <= totalPage && dispatch(setPageId(e))}>{e}</div>
                            )}
                            <IoMdArrowDropright className='text-[30px]' onClick={() => dispatch(setPageId(pageId === totalPage ? pageId : pageId + 1))} />

                        </div>

                    </div>
                </div>

                <div className='rounded-xl w-[40%] bg-white p-5 '>
                    <IncomePieChart
                        totalAmountInvestment={investmentTotal}
                        totalAmountPayment={paymentTotal}
                    />
                </div>
            </div>

            <div className='flex gap-5 mt-5'>
                <div className='w-[50%]'>
                    <h1 className='text-[25px] font-bold mb-[22px]'> Student Payment</h1>
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
                                <div className='w-[30%] pt-5 pb-5 min-w-0 truncate'>{e.studentId._id}</div>
                                <div className='w-[20%] pt-5 pb-5'>{(e.amount).toLocaleString("vi-VN")}</div>
                                <div className='w-[15%] pt-5 pb-5'>{e.type}</div>
                                <div className={`w-[15%] pt-5 pb-5 ${e.paid === true ? "text-green-500" : "text-red-500"}`}>
                                    {e.paid === true ? "Completed" : "Pending"}</div>
                            </div>
                        )}

                        {/* Tổng số và phân trang */}
                        <div className='flex justify-between p-5 items-center'>
                            <div>
                                <p>Showing <span className='font-bold'>{pageIdStudent} - {totalPageStudent}</span> from <span className='font-bold'>{totalStudentPayment} data</span></p>
                            </div>

                            <div className='flex gap-2 justify-center items-center'>
                                <IoMdArrowDropleft className='text-[30px]' onClick={() => dispatch(setPageIdStudent(pageIdStudent === 1 ? pageIdStudent : pageIdStudent - 1))} />
                                {paginationStudent.map(e =>
                                    <div className={`hover:cursor-pointer border-[#A098AE] rounded-full border w-[51px] h-[51px] text-[18px] text-[#A098AE] flex justify-center items-center select-none ${e === pageIdStudent ? 'bg-[#4D44B5] text-white' : ""}`}
                                        onClick={() => e <= totalPageStudent && dispatch(setPageIdStudent(e))}>{e}</div>
                                )}
                                <IoMdArrowDropright className='text-[30px]' onClick={() => dispatch(setPageIdStudent(pageIdStudent === totalPageStudent ? pageIdStudent : pageIdStudent + 1))} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-[50%]'>
                    <h1 className='text-[25px] font-bold mb-[22px]'> Teacher Salary</h1>
                    <div className='rounded-xl bg-white  '>

                        <div className='flex text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                            <div className='w-[30%] pt-5 pb-5'>Teacher Name</div>
                            <div className='w-[25%] pt-5 pb-5 flex justify-center'>Amount</div>
                            <div className='w-[15%] pt-5 pb-5 flex justify-center'>Month</div>
                            <div className='w-[15%] pt-5 pb-5 flex justify-center'>Year</div>
                            <div className='w-[15%] pt-5 pb-5 flex justify-center'>Status</div>
                        </div>

                        {teacherSalary.map((e) =>
                            <div className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                                <div className='w-[30%] pt-5 pb-5'>{e.teacherId.name}</div>
                                <div className='w-[25%] pt-5 pb-5 flex justify-center'>{(e.amount).toLocaleString("vi-VN")}</div>
                                <div className='w-[15%] pt-5 pb-5 justify-center flex'>{e.month}</div>
                                <div className='w-[15%] pt-5 pb-5 flex justify-center'>{e.year}</div>
                                <div className={`w-[15%] pt-5 pb-5 flex justify-center ${e.paid === true ? "text-green-500" : "text-red-500"}`}>{e.paid === true ? "Completed" : "Pending"}</div>
                            </div>
                        )}

                        {/* Tổng số và phân trang */}
                        <div className='flex justify-between p-5 items-center'>
                            <div>
                                <p>Showing <span className='font-bold'>{pageIdTeacher} - {totalPageTeacher}</span> from <span className='font-bold'>{totalTeacherSalary} data</span></p>
                            </div>

                            <div className='flex gap-2 justify-center items-center'>
                                <IoMdArrowDropleft className='text-[30px]' onClick={() => dispatch(setPageIdTeacher(pageIdTeacher === 1 ? pageIdTeacher : pageIdTeacher - 1))} />
                                {paginationTeacher.map(e =>
                                    <div className={`hover:cursor-pointer border-[#A098AE] rounded-full border w-[51px] h-[51px] text-[18px] text-[#A098AE] flex justify-center items-center select-none ${e === pageIdTeacher ? 'bg-[#4D44B5] text-white' : ""}`}
                                        onClick={() => e <= totalPageTeacher && dispatch(setPageIdTeacher(e))}>{e}</div>
                                )}
                                <IoMdArrowDropright className='text-[30px]' onClick={() => dispatch(setPageIdTeacher(pageIdTeacher === totalPageTeacher ? pageIdTeacher : pageIdTeacher + 1))} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className='text-[25px] font-bold mt-5'> Expense</h1>
            <div className='flex gap-5  mt-5'>
                <div className='w-[40%]'>

                    <div className='rounded-xl bg-white  '>

                        <div className='flex text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                            <div className='w-[25%] pt-5 pb-5'>Type</div>
                            <div className='w-[20%] pt-5 pb-5 flex justify-center'>Amount</div>
                            <div className='w-[20%] pt-5 pb-5 flex justify-center'>Month</div>
                            <div className='w-[15%] pt-5 pb-5 flex justify-center'>Year</div>
                            <div className='w-[20%] pt-5 pb-5 flex justify-center'>Status</div>
                        </div>

                        {expense.map((e) =>
                            <div className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                                <div className='w-[25%] pt-5 pb-5'>{e.type}</div>
                                <div className='w-[20%] pt-5 pb-5 flex justify-center'>{(e.amount).toLocaleString("vi-VN")}</div>
                                <div className='w-[20%] pt-5 pb-5 flex justify-center'>{e.month}</div>
                                <div className='w-[15%] pt-5 pb-5 flex justify-center'>{e.year}</div>
                                <div className={`w-[20%] pt-5 pb-5 flex justify-center ${e.paid === true ? "text-green-500" : "text-red-500"}`}>{e.paid === true ? "Completed" : "Pending"}</div>
                            </div>
                        )}

                        {/* Tổng số và phân trang */}
                        <div className='flex justify-between p-5 items-center'>
                            <div>
                                <p>Showing <span className='font-bold'>{pageIdExpense} - {totalPageExpense}</span> from <span className='font-bold'>{totalExpense} data</span></p>
                            </div>

                            <div className='flex gap-2 justify-center items-center'>
                                <IoMdArrowDropleft className='text-[30px]' onClick={() => dispatch(setPageIdExpense(pageIdExpense === 1 ? pageIdExpense : pageIdExpense - 1))} />
                                {paginationExpense.map(e =>
                                    <div className={`hover:cursor-pointer border-[#A098AE] rounded-full border w-[51px] h-[51px] text-[18px] text-[#A098AE] flex justify-center items-center select-none ${e === pageIdExpense ? 'bg-[#4D44B5] text-white' : ""}`}
                                        onClick={() => e <= totalPageExpense && dispatch(setPageIdExpense(e))}>{e}</div>
                                )}
                                <IoMdArrowDropright className='text-[30px]' onClick={() => dispatch(setPageIdExpense(pageIdExpense === totalPageTeacher ? pageIdExpense : pageIdExpense + 1))} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-[60%] p-5 rounded-xl bg-white'>
                    <ExpenseTeacherChart totalAmountExpense={totalAmountExpense} totalAmountTeacher={totalAmountTeacher}></ExpenseTeacherChart>
                </div>
            </div>
        </div>
    )
}

export default FinancePage