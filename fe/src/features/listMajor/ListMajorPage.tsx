
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { useNavigate, useParams } from 'react-router-dom';
import { getMajorDetails } from '../../redux&hook/slice/major';
import { MdOutlineClass } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { delSubject, editNumberCredits, editSubjectCode, editSubjectName, editTotalFee, newMajorId, newNumberCredits, newSubjectCode, newSubjectName, newTotalFee, patchSubject, postSubject, resetEditSubject, resetNewSubject, setSelectedSubject } from '../../redux&hook/slice/subject';
import { delClassMajor, patchClassMajor, postClassMajor, resetEditClassMajor, resetNewClassMajor, setEditClassCode, setEditClassName, setEditTeacherId, setEditYear, setNewClassCode, setNewClassName, setNewMajorId, setNewTeacherId, setNewYear, setSelectedClassMajor } from '../../redux&hook/slice/classmajor';
import { getTeacher } from '../listTeacher/ListTeacherData';


const ListMajorPage = () => {
    const navigate = useNavigate()

    const [selected, setSelected] = useState("class")

    const major = localStorage.getItem("selectedMajor")

    const { id } = useParams()

    const dispatch = useAppDispatch()

    const { majorDetails } = useAppSelector((state) => state.getMajor)

    const { newSubject, editSubject, selectedSubject } = useAppSelector((state) => state.getSubject)

    const { newClassMajor, editClassMajor, selectedClassMajor } = useAppSelector((state) => state.getClassMajor)

    const { teacher } = useAppSelector((state) => state.getTeacher)

    useEffect(() => {
        if (!id) return
        dispatch(getMajorDetails({ id: id }))
    }, [majorDetails])

    useEffect(() => {
        dispatch(getTeacher({
            pageId: 1,
            pageSize: 100,
            searchName: "",
            major: major ? major : ""
        }))
    }, [])

    const filterTeacherName = (e: string) => {
        const filter = majorDetails[0]?.teachers.filter((item) => item._id === e)
        return filter[0].name
    }

    const filterNumberStudent = (e: string) => {
        const filter = majorDetails[0]?.students.filter((item) => item.classId === e)
        return filter.length
    }

    const selectStudent = (e: string) => {
        localStorage.setItem("role", "student")
        // dispatch(setRole("student"))
        navigate(`/userinfo/${e}`)
    }

    const selectTeacher = (e: string) => {
        localStorage.setItem("role", "teacher")
        // dispatch(setRole("teacher"))
        navigate(`/userinfo/${e}`)
    }

    const handelClickSubject = (e: string, code: string) => {
        navigate(`/subjectDetails/${e}`)
        localStorage.setItem("selectedMajor", `${code}`)
    }

    const [isEdit, setIsEdit] = useState(false)

    const [isNew, setIsNew] = useState(false)

    const clickNewSubject = () => {
        setIsNew(true)
        dispatch(newMajorId(majorDetails[0]?._id))
    }

    const confirmNewSubject = (e: any) => {
        e.preventDefault()
        dispatch(postSubject(newSubject))
        dispatch(resetNewSubject())
        setIsNew(false)
        useEffect(() => {
            if (!id) return
            dispatch(getMajorDetails({ id: id }))
        }, [])
    }

    const handleClickTrashSubject = (e: React.MouseEvent, item: string) => {
        e.stopPropagation();
        e.preventDefault()
        dispatch(delSubject({ id: item }))
    };

    const handleClickEditSubject = (e: React.MouseEvent, item: any) => {
        e.stopPropagation();
        e.preventDefault()

        dispatch(setSelectedSubject(item._id))
        dispatch(editSubjectCode(item.subjectCode))
        dispatch(editSubjectName(item.subjectName))
        dispatch(editNumberCredits(Number(item.numberCredits)))

        setIsEdit(true)
    }

    const confirmEditSubject = (e: any) => {
        e.preventDefault()
        dispatch(patchSubject({ id: selectedSubject, editSubject: editSubject }))
        dispatch(resetEditSubject())
        setIsEdit(false)
        useEffect(() => {
            if (!id) return
            dispatch(getMajorDetails({ id: id }))
        }, [])
    }

    const clickNewClass = () => {
        setIsNew(true)
        dispatch(setNewMajorId(majorDetails[0]?._id))
    }

    const confirmNewClass = (e: any) => {
        e.preventDefault()
        dispatch(postClassMajor({ newClassMajor: newClassMajor }))
        dispatch(resetNewClassMajor())
        setIsNew(false)
        useEffect(() => {
            if (!id) return
            dispatch(getMajorDetails({ id: id }))
        }, [])
    }

    const handleClickTrashClass = (e: React.MouseEvent, item: string) => {
        e.stopPropagation();
        e.preventDefault()
        dispatch(delClassMajor({ id: item }))
    };

    const handleClickEditClass = (e: React.MouseEvent, item: any) => {
        e.stopPropagation();
        e.preventDefault()

        dispatch(setSelectedClassMajor(item._id))
        dispatch(setEditClassCode(item.classCode))
        dispatch(setEditClassName(item.className))
        dispatch(setEditYear(Number(item.year)))
        dispatch(setEditTeacherId(item.teacherId))

        setIsEdit(true)
    }

    const confirmEditClass = (e: any) => {
        e.preventDefault()
        dispatch(patchClassMajor({ id: selectedClassMajor, editClassMajor: editClassMajor }))
        dispatch(resetEditClassMajor())
        setIsEdit(false)
        useEffect(() => {
            if (!id) return
            dispatch(getMajorDetails({ id: id }))
        }, [])
    }

    return (
        <div className='min-h-screen flex flex-col gap-5 pt-[50px] pl-[200px] pr-[200px] bg-[#F3F4FF]'>
            <h1 className='text-[32px] font-bold pb-5'>Manage Major - Major: {majorDetails[0]?.majorName}</h1>

            <div className='grid grid-cols-3 gap-5 pb-5'>
                <div className='bg-white rounded-2xl shadow-lg shadow-indigo-100 p-6 flex flex-col gap-5'>
                    <h1 className='text-[24px] text-gray-400'>Total Classes</h1>
                    <div className='flex gap-5 text-[28px] font-semibold items-center'>
                        <MdOutlineClass />
                        <span>{majorDetails[0]?.classMajors.length}</span>
                    </div>
                </div>

                <div className='bg-white rounded-2xl shadow-lg shadow-indigo-100 p-6 flex flex-col gap-5'>
                    <h1 className='text-[24px] text-gray-400'>Total Students</h1>
                    <div className='flex gap-5 text-[28px] font-semibold items-center'>
                        <PiStudentFill />
                        <span>{majorDetails[0]?.students.length}</span>
                    </div>
                </div>

                <div className='bg-white rounded-2xl shadow-lg shadow-indigo-100 p-6 flex flex-col gap-5'>
                    <h1 className='text-[24px] text-gray-400'>Total Teachers</h1>
                    <div className='flex gap-5 text-[28px] font-semibold items-center'>
                        <FaChalkboardTeacher />
                        <span>{majorDetails[0]?.teachers.length}</span>
                    </div>
                </div>

            </div>

            <div className='bg-white mb-10 rounded-2xl shadow-lg shadow-indigo-100 p-6'>
                <div className='flex gap-7 border-b border-gray-400 font-semibold text-[22px]'>
                    <div className={`pb-5! hover:cursor-pointer ${selected === "class" ? 'border-b text-[#4D44B5] border-[#4D44B5]' : ''}`} onClick={() => setSelected("class")}>Class Major List</div>
                    <div className={`pb-5! hover:cursor-pointer ${selected === "student" ? 'border-b text-[#4D44B5] border-[#4D44B5]' : ''}`} onClick={() => setSelected("student")}>Student List</div>
                    <div className={`pb-5! hover:cursor-pointer ${selected === "teacher" ? 'border-b text-[#4D44B5] border-[#4D44B5]' : ''}`} onClick={() => setSelected("teacher")}>Teacher List</div>
                    <div className={`pb-5! hover:cursor-pointer ${selected === "subject" ? 'border-b text-[#4D44B5] border-[#4D44B5]' : ''}`} onClick={() => setSelected("subject")}>Subjects List</div>
                </div>

                {/* Classes List */}
                <div className={`rounded-xl bg-white ${selected === "class" ? "block" : 'hidden'}`}>
                    <div className='flex items-center text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted'>
                        <div className='w-[10%] pt-5 pb-5 '>No.</div>
                        <div className='w-[10%] pt-5 pb-5 '>Class Code</div>
                        <div className='w-[20%] pt-5 pb-5'>Class Name</div>
                        <div className='w-[20%] pt-5 pb-5'>Teacher Name</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>Year</div>
                        <div className='w-[20%] pt-5 pb-5 flex justify-center'>Number of Student</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>Action</div>
                    </div>

                    {majorDetails[0]?.classMajors.map((e, index) =>
                        <div onClick={() => navigate(`/classMajorDetails/${e._id}`)} className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                            <div className='w-[10%] pt-5 pb-5'>{index + 1}</div>
                            <div className='w-[10%] pt-5 pb-5 '>{e.classCode}</div>
                            <div className='w-[20%] pt-5 pb-5'>{e.className}</div>
                            <div className='w-[20%] pt-5 pb-5'>{filterTeacherName(e.teacherId)}</div>
                            <div className='w-[10%] pt-5 pb-5 flex justify-center'>{e.year}</div>
                            <div className='w-[20%] pt-5 pb-5 flex justify-center'>
                                <div className='text-green-400 bg-green-100 border-green-400 p-3 rounded-xl'>{filterNumberStudent(e._id)} Student</div>
                            </div>
                            <div className='w-[10%] pt-5 pb-5 flex justify-center items-center gap-8 text-[#303972] font-extrabold'>
                                <MdOutlineModeEdit onClick={(event) => handleClickEditClass(event, e)} />
                                <FaTrash onClick={(event) => handleClickTrashClass(event, e._id)} />
                            </div>
                        </div>)}

                    <div className='flex justify-end pt-5'>
                        <button onClick={clickNewClass} className='bg-[#4D44B5] text-white font-semibold p-3 rounded-xl hover:cursor-pointer'>New Class Major</button>
                    </div>

                </div>

                {/* Student List */}
                <div className={`rounded-xl bg-white ${selected === "student" ? "block" : 'hidden'}`}>
                    <div className='flex items-center text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted'>
                        <div className='w-[10%] pt-5 pb-5 '>No.</div>
                        <div className='w-[25%] pt-5 pb-5 '>Student Name</div>
                        <div className='w-[25%] pt-5 pb-5'>Student Code</div>
                        <div className='w-[10%] pt-5 pb-5'>Address</div>
                        <div className='w-[10%] pt-5 pb-5'>Gender</div>
                        <div className='w-[20%] pt-5 pb-5 flex justify-center'>Year Of Admission</div>
                    </div>

                    {majorDetails[0]?.students.map((e, index) =>
                        <div onClick={() => selectStudent(e.accountId)} className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                            <div className='w-[10%] pt-5 pb-5 '>{index + 1}</div>
                            <div className='w-[25%] pt-5 pb-5 '>{e.name}</div>
                            <div className='w-[25%] pt-5 pb-5'>{e._id}</div>
                            <div className='w-[10%] pt-5 pb-5'>{e.address}</div>
                            <div className='w-[10%] pt-5 pb-5'>{e.gender}</div>
                            <div className='w-[20%] pt-5 pb-5 flex justify-center'>{e.yearOfAdmission}</div>
                        </div>)}

                </div>

                {/* Teacher List */}
                <div className={`rounded-xl bg-white ${selected === "teacher" ? "block" : 'hidden'}`}>
                    <div className='flex items-center text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted'>
                        <div className='w-[10%] pt-5 pb-5 '>No.</div>
                        <div className='w-[25%] pt-5 pb-5 '>Teacher Name</div>
                        <div className='w-[15%] pt-5 pb-5'>Teacher Code</div>
                        <div className='w-[20%] pt-5 pb-5'>Address</div>
                        <div className='w-[10%] pt-5 pb-5'>Gender</div>
                        <div className='w-[20%] pt-5 pb-5 flex justify-center'>Year Of Experience</div>
                    </div>

                    {majorDetails[0]?.teachers.map((e, index) =>
                        <div onClick={() => selectTeacher(e.accountId)} className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                            <div className='w-[10%] pt-5 pb-5 '>{index + 1}</div>
                            <div className='w-[25%] pt-5 pb-5 '>{e.name}</div>
                            <div className='w-[15%] pt-5 pb-5'>{e.teacherCode}</div>
                            <div className='w-[20%] pt-5 pb-5'>{e.address}</div>
                            <div className='w-[10%] pt-5 pb-5'>{e.gender}</div>
                            <div className='w-[20%] pt-5 pb-5 flex justify-center'>{e.yearExperience}</div>
                        </div>)}

                </div>

                {/* Subject List */}
                <div className={`rounded-xl bg-white ${selected === "subject" ? "block" : 'hidden'}`}>
                    <div className='flex items-center text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted'>
                        <div className='w-[10%] pt-5 pb-5 '>No.</div>
                        <div className='w-[20%] pt-5 pb-5 '>Subject Name</div>
                        <div className='w-[20%] pt-5 pb-5 flex justify-center'>Subject Code</div>
                        <div className='w-[20%] pt-5 pb-5 flex justify-center'>Number Credit</div>
                        <div className='w-[20%] pt-5 pb-5 flex justify-center'>Total Fee</div>
                        <div className='w-[10%] pt-5 pb-5 flex justify-center'>Action</div>
                    </div>

                    {majorDetails[0]?.subjects.map((e, index) =>
                        <div onClick={() => handelClickSubject(e._id, majorDetails[0].majorCode)} className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                            <div className='w-[10%] pt-5 pb-5 '>{index + 1}</div>
                            <div className='w-[20%] pt-5 pb-5 '>{e.subjectName}</div>
                            <div className='w-[20%] pt-5 pb-5 flex justify-center'>{e.subjectCode}</div>
                            <div className='w-[20%] pt-5 pb-5 flex justify-center'>{e.numberCredits}</div>
                            <div className='w-[20%] pt-5 pb-5 flex justify-center'>{e.totalFee}</div>
                            <div className='w-[10%] pt-5 pb-5 flex justify-center items-center gap-8 text-[#303972] font-extrabold'>
                                <MdOutlineModeEdit onClick={(event) => handleClickEditSubject(event, e)} />
                                <FaTrash onClick={(event) => handleClickTrashSubject(event, e._id)} />
                            </div>
                        </div>)}

                    <div className='flex justify-end pt-5'>
                        <button onClick={clickNewSubject} className='bg-[#4D44B5] text-white font-semibold p-3 rounded-xl hover:cursor-pointer'>New Subject</button>
                    </div>
                </div>
            </div>

            {/* New Subject */}
            <div className={`bg-white mb-10 rounded-2xl shadow-lg shadow-indigo-100 p-6 ${isNew && selected === "subject" ? "block" : "hidden"}`}>
                <h1 className='font-semibold text-[24px] pb-5 text-[#303972]'>New Subject</h1>
                <form className='grid grid-cols-2 gap-5' onSubmit={confirmNewSubject} action="">
                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Subject Code</h2>
                        <input className='flex-1 p-2' type="text" value={newSubject.subjectCode} onChange={(e) => dispatch(newSubjectCode(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Subject Name</h2>
                        <input className='flex-1 p-2' type="text" value={newSubject.subjectName} onChange={(e) => dispatch(newSubjectName(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Number Credit</h2>
                        <input className='flex-1 p-2' type="number" value={newSubject.numberCredits} onChange={(e) => {
                            dispatch(newNumberCredits(Number(e.target.value)));
                            dispatch(newTotalFee(Number(e.target.value) * 300000))
                        }} />
                    </div>

                    <div className=' flex gap-10 justify-center'>
                        <button className='text-white p-3 rounded-xl bg-[#4D44B5] hover:cursor-pointer ' type='submit'>Confirm</button>
                        <button className='text-white p-3 rounded-xl bg-[#4D44B5] hover:cursor-pointer ' onClick={() => setIsNew(false)}>Cancel</button>
                    </div>
                </form>

            </div>

            {/* Edit Subject */}
            <div className={`bg-white mb-10 rounded-2xl shadow-lg shadow-indigo-100 p-6 ${isEdit && selected === "subject" ? "block" : "hidden"}`}>
                <h1 className='font-semibold text-[24px] pb-5 text-[#303972]'>Edit Subject</h1>
                <form className='grid grid-cols-2 gap-5' onSubmit={confirmEditSubject} action="">
                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Subject Code</h2>
                        <input className='flex-1 p-2' type="text" value={editSubject.subjectCode} onChange={(e) => dispatch(editSubjectCode(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Subject Name</h2>
                        <input className='flex-1 p-2' type="text" value={editSubject.subjectName} onChange={(e) => dispatch(editSubjectName(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Number Credit</h2>
                        <input className='flex-1 p-2' type="number" value={editSubject.numberCredits} onChange={(e) => {
                            dispatch(editNumberCredits(Number(e.target.value)));
                            dispatch(editTotalFee(Number(e.target.value) * 300000))
                        }} />
                    </div>

                    <div className=' flex gap-10 justify-center'>
                        <button className='text-white p-3 rounded-xl bg-[#4D44B5] hover:cursor-pointer ' type='submit'>Confirm</button>
                        <button className='text-white p-3 rounded-xl bg-[#4D44B5] hover:cursor-pointer ' onClick={() => setIsEdit(false)}>Cancel</button>
                    </div>
                </form>

            </div>

            {/* New class */}
            <div className={`bg-white mb-10 rounded-2xl shadow-lg shadow-indigo-100 p-6 ${isNew && selected === "class" ? "block" : "hidden"}`}>
                <h1 className='font-semibold text-[24px] pb-5 text-[#303972]'>New Class Major</h1>
                <form className='grid grid-cols-2 gap-5 ' onSubmit={confirmNewClass} action="">
                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Class Code</h2>
                        <input className='flex-1 p-2' type="text" value={newClassMajor.classCode} onChange={(e) => dispatch(setNewClassCode(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Class Name</h2>
                        <input className='flex-1 p-2' type="text" value={newClassMajor.className} onChange={(e) => dispatch(setNewClassName(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Teacher</h2>
                        <select value={newClassMajor?.teacherId || ""} onChange={(e) => dispatch(setNewTeacherId(e.target.value))} className='border border-gray-300 rounded-xl flex-1 p-2' name="" id="">
                            <option value="">Please Choose Teacher</option>
                            {teacher.map((e) =>
                                <option value={e._id}>{e.name}</option>
                            )}
                        </select>
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Year</h2>
                        <input className='flex-1 p-2' type="number" value={newClassMajor.year} onChange={(e) => dispatch(setNewYear(e.target.value))} />
                    </div>

                    <div></div>

                    <div className=' flex gap-10 justify-center'>
                        <button className='text-white p-3 rounded-xl bg-[#4D44B5] hover:cursor-pointer ' type='submit'>Confirm</button>
                        <button className='text-white p-3 rounded-xl bg-[#4D44B5] hover:cursor-pointer ' onClick={() => setIsNew(false)}>Cancel</button>
                    </div>
                </form>

            </div>

            {/* Edit class */}
            <div className={`bg-white mb-10 rounded-2xl shadow-lg shadow-indigo-100 p-6 ${isEdit && selected === "class" ? "block" : "hidden"}`}>
                <h1 className='font-semibold text-[24px] pb-5 text-[#303972]'>Edit Class Major</h1>
                <form className='grid grid-cols-2 gap-5' onSubmit={confirmEditClass} action="">
                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Class Code</h2>
                        <input className='flex-1 p-2' type="text" value={editClassMajor.classCode} onChange={(e) => dispatch(setEditClassCode(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Class Name</h2>
                        <input className='flex-1 p-2' type="text" value={editClassMajor.className} onChange={(e) => dispatch(setEditClassName(e.target.value))} />
                    </div>

                    <div className='flex gap-3 items-center'>
                        <h2 className='text-[20px] font-semibold'>Year</h2>
                        <input className='flex-1 p-2' type="number" value={editClassMajor.year} onChange={(e) => dispatch(setEditYear(e.target.value))} />
                    </div>

                    <div className=' flex gap-10 justify-center'>
                        <button className='text-white p-3 rounded-xl bg-[#4D44B5] hover:cursor-pointer ' type='submit'>Confirm</button>
                        <button className='text-white p-3 rounded-xl bg-[#4D44B5] hover:cursor-pointer ' onClick={() => setIsEdit(false)}>Cancel</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ListMajorPage