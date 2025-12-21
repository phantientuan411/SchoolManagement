import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook.ts'
import { useEffect, useRef, useState } from 'react'
import { getSubjectDetail } from '../../redux&hook/slice/subject.ts'
import { MdOutlineModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { delClassStudy, editClassCode, editDateOfWeek, editEndDate, editEndTime, editStartDate, editStartTime, newClassCode, newDateOfWeek, newEndDate, newEndTime, newStartDate, newStartTime, newSubject, newTeacherId, patchClassStudy, postClassStudy, resetEditClassStudy, resetNewClassStudy, setEdited } from '../../redux&hook/slice/classstudy.ts';
import { getTeacher } from '../listTeacher/ListTeacherData.tsx';

const ListSubject = () => {
    const boxNewClass = useRef<HTMLDivElement | null>(null)
    const boxEditClass = useRef<HTMLDivElement | null>(null)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const { id } = useParams()

    const major = localStorage.getItem("selectedMajor")

    const [isEdit, setIsEdit] = useState(false)

    const [isNew, setIsNew] = useState(false)

    const { subjectDetail } = useAppSelector((state) => state.getSubject)

    const { newClassStudy, editClassStudy, edited, classStudy } = useAppSelector((state) => state.getClassStudy)

    const { teacher } = useAppSelector((state) => state.getTeacher)

    useEffect(() => {
        if (!id) return
        dispatch(getSubjectDetail({ id: id }))
    }, [id, classStudy])

    useEffect(() => {
        dispatch(getTeacher({
            pageId: 1,
            pageSize: 100,
            searchName: "",
            major: major ? major : ""
        }))
    }, [])

    const date = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]


    const toExactISO = (dateStr: string) => {
        const [year, month, day] = dateStr.split("-");
        return new Date(Number(year), Number(month) - 1, Number(day)).toISOString();
    };

    const clickConfirmNew = (e: any) => {
        e.preventDefault()
        dispatch(postClassStudy({ newClassStudy: newClassStudy }))
        setIsNew(false)
        dispatch(resetNewClassStudy())
    }

    const clickNew = () => {
        setIsNew(true)
        dispatch(newSubject(subjectDetail[0]._id))

        setTimeout(() => {
            boxNewClass.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100)
    }

    const handleClickTrash = (e: React.MouseEvent, item: string) => {
        e.stopPropagation();
        e.preventDefault()
        dispatch(delClassStudy({ id: item }))
    };

    const handleClickEdit = (e: React.MouseEvent, item: any) => {
        e.stopPropagation();
        e.preventDefault()
        dispatch(setEdited(item._id))
        dispatch(editClassCode(item.classCode))
        dispatch(editStartDate(item.startDate))
        dispatch(editEndDate(item.endDate))
        dispatch(editStartTime(item.startTime))
        dispatch(editEndTime(item.endTime))
        dispatch(editDateOfWeek(item.dateOfWeek))
        setIsEdit(true)

        setTimeout(() => {
            boxEditClass.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100)
    }

    const clickConfirmEdit = (e: any) => {
        e.preventDefault()
        dispatch(patchClassStudy({ editClassStudy: editClassStudy, id: edited }))
        setIsEdit(false)
        dispatch(resetEditClassStudy())

    }

    const toInputDate = (dateString?: string | null) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return ""; // kiểm tra date hợp lệ
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <div className='min-h-screen flex flex-col gap-5 pt-[50px] pl-[200px] pr-[200px] bg-[#F3F4FF]'>
            <h1 className='text-[32px] font-bold pb-5'>Manage Major - Subject: {subjectDetail[0]?.subjectName}</h1>

            <div className='grid grid-cols-3 gap-5 pb-5'>
                <div className='bg-white rounded-2xl shadow-lg shadow-indigo-100 p-6 flex flex-col gap-5'>
                    <h1 className='text-[24px] text-gray-400'>Total Classes</h1>
                    <div className='flex gap-5 text-[28px] font-semibold items-center'>

                        <span>{subjectDetail[0]?.classstudy.length}</span>
                    </div>
                </div>

                <div className='bg-white rounded-2xl shadow-lg shadow-indigo-100 p-6 flex flex-col gap-5'>
                    <h1 className='text-[24px] text-gray-400'>Number of Credit</h1>
                    <div className='flex gap-5 text-[28px] font-semibold items-center'>

                        <span>{subjectDetail[0]?.numberCredits}</span>
                    </div>
                </div>

                <div className='bg-white rounded-2xl shadow-lg shadow-indigo-100 p-6 flex flex-col gap-5'>
                    <h1 className='text-[24px] text-gray-400'>Total Fee</h1>
                    <div className='flex gap-5 text-[28px] font-semibold items-center'>

                        <span>{subjectDetail[0]?.totalFee}</span>
                    </div>
                </div>

            </div>

            <div className='bg-white mb-10 rounded-2xl shadow-lg shadow-indigo-100 p-6'>

                {/* List class study */}
                <div className={`rounded-xl bg-white`}>
                    <div className='flex items-center text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted'>
                        <div className='w-[10%] pt-5 pb-5 '>No.</div>
                        <div className='w-[10%] pt-5 pb-5 '>Class Code</div>
                        <div className='w-[15%] pt-5 pb-5'>Start Date</div>
                        <div className='w-[15%] pt-5 pb-5'>End Date</div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center'>Start Time</div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center'>End Time</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>Date of Week</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>Action</div>
                    </div>

                    {subjectDetail[0]?.classstudy.map((e, index) =>
                        <div onClick={() => navigate(`/classStudyDetails/${e._id}`)} className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                            <div className='w-[10%] pt-5 pb-5'>{index + 1}</div>
                            <div className='w-[10%] pt-5 pb-5 '>{e.classCode}</div>
                            <div className='w-[15%] pt-5 pb-5'>{new Date(e.startDate).toLocaleDateString('vi-VN')}</div>
                            <div className='w-[15%] pt-5 pb-5'>{new Date(e.endDate).toLocaleDateString('vi-VN')}</div>
                            <div className='w-[15%] pt-5 pb-5 flex justify-center'>{e.startTime}</div>
                            <div className='w-[15%] pt-5 pb-5 flex justify-center'>{e.endTime}</div>
                            <div className='w-[10%] pt-5 pb-5 flex justify-center'>{e.dateOfWeek}</div>
                            <div className='w-[10%] pt-5 pb-5 flex justify-center items-center gap-8 text-[#303972] font-extrabold'>
                                <MdOutlineModeEdit onClick={(event) => handleClickEdit(event, e)} />
                                <FaTrash onClick={(event) => handleClickTrash(event, e._id)} />
                            </div>
                        </div>)}
                </div>

                <div className='flex justify-end pt-5'>
                    <button onClick={clickNew} className='bg-[#4D44B5] text-white font-semibold p-3 rounded-xl hover:cursor-pointer'>New Class Study</button>
                </div>
            </div>

            {/* New Class Study */}
            <div ref={boxNewClass} className={`bg-white mb-10 rounded-2xl shadow-lg shadow-indigo-100 p-6 ${isNew ? "block" : "hidden"}`}>
                <h1 className='font-semibold text-[24px] pb-5 text-[#303972]'>New Class Study</h1>
                <form className='grid grid-cols-2 gap-5' onSubmit={clickConfirmNew} action="">
                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Class Code</h2>
                        <input className='flex-1 p-2' type="text" value={newClassStudy.classCode} onChange={(e) => dispatch(newClassCode(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Teacher</h2>
                        <select value={newClassStudy.teacherId || ""} onChange={(e) => dispatch(newTeacherId(e.target.value))} className='border border-gray-300 rounded-xl flex-1 p-2' name="" id="">
                            <option value="">Please Choose Teacher</option>
                            {teacher.map((e) =>
                                <option value={e._id}>{e.name}</option>
                            )}
                        </select>
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Start Date</h2>
                        <input className='flex-1 p-2' type="date" value={toInputDate(newClassStudy.startDate)} onChange={(e) => dispatch(newStartDate(toExactISO(e.target.value)))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>End date</h2>
                        <input className='flex-1 p-2' type="date" value={toInputDate(newClassStudy.endDate)} onChange={(e) => dispatch(newEndDate(toExactISO(e.target.value)))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Start Time</h2>
                        <input className='flex-1 p-2' type="text" value={newClassStudy.startTime} onChange={(e) => dispatch(newStartTime(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>End Time</h2>
                        <input className='flex-1 p-2' type="text" value={newClassStudy.endTime} onChange={(e) => dispatch(newEndTime(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Date of Week</h2>
                        <select value={newClassStudy.dateOfWeek || ""} onChange={(e) => dispatch(newDateOfWeek(e.target.value))} className='border border-gray-300 rounded-xl flex-1 p-2' name="" id="">
                            <option value="">Please Choose Date</option>
                            {date.map((e) =>
                                <option value={e}>{e}</option>
                            )}
                        </select>
                    </div>

                    <div className=' flex gap-10 justify-center'>
                        <button className='text-white p-3 rounded-xl bg-[#4D44B5] hover:cursor-pointer ' type='submit'>Confirm</button>
                        <button className='text-white p-3 rounded-xl bg-[#4D44B5] hover:cursor-pointer ' onClick={() => setIsNew(false)}>Cancel</button>
                    </div>
                </form>

            </div>

            {/* Edit Class Study */}
            <div ref={boxEditClass} className={`bg-white mb-10 rounded-2xl shadow-lg shadow-indigo-100 p-6 ${isEdit ? "block" : "hidden"}`}>
                <h1 className='font-semibold text-[24px] pb-5 text-[#303972]'>Edit Class Study</h1>
                <form className='grid grid-cols-2 gap-5' onSubmit={clickConfirmEdit} action="">
                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Class Code</h2>
                        <input className='flex-1 p-2' type="text" value={editClassStudy.classCode} onChange={(e) => dispatch(editClassCode(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Start Date</h2>
                        <input className='flex-1 p-2' type="date" value={toInputDate(editClassStudy.startDate)} onChange={(e) => dispatch(editStartDate(toExactISO(e.target.value)))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>End date</h2>
                        <input className='flex-1 p-2' type="date" value={toInputDate(editClassStudy.endDate)} onChange={(e) => dispatch(editEndDate(toExactISO(e.target.value)))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Start Time</h2>
                        <input className='flex-1 p-2' type="text" value={editClassStudy.startTime} onChange={(e) => dispatch(editStartTime(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>End Time</h2>
                        <input className='flex-1 p-2' type="text" value={editClassStudy.endTime} onChange={(e) => dispatch(editEndTime(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Date of Week</h2>
                        <select value={editClassStudy.dateOfWeek || ""} onChange={(e) => dispatch(editDateOfWeek(e.target.value))} className='border border-gray-300 rounded-xl flex-1 p-2' name="" id="">
                            <option value="">Please Choose Date</option>
                            {date.map((e) =>
                                <option value={e}>{e}</option>
                            )}
                        </select>
                    </div>

                    <div></div>

                    <div className=' flex gap-10 justify-center '>
                        <button className='text-white p-3 rounded-xl bg-[#4D44B5] hover:cursor-pointer ' type='submit'>Confirm</button>
                        <button className='text-white p-3 rounded-xl bg-[#4D44B5] hover:cursor-pointer ' onClick={() => setIsEdit(false)}>Cancel</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ListSubject