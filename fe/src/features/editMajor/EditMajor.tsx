import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getTeacher } from '../listTeacher/ListTeacherData'
import { useNavigate } from 'react-router-dom'

const EditMajor = () => {

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getTeacher({
            pageId: 1,
            pageSize: 100,
            searchName: "",
            major: ""
        }))
    }, [])

    const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    const dispatch = useAppDispatch()

    const { teacher } = useAppSelector((state) => state.getTeacher)


    const classStudy = localStorage.getItem("classStudy")

    const parseClassStudy = classStudy ? JSON.parse(classStudy) : null

    const { subjectId, teacherId, ...newClassStudy } = parseClassStudy

    const [editClassStudy] = useState({ ...newClassStudy, teacherId: parseClassStudy.teacherId._id })

    const handleSubmit = () => {
        navigate("/major")
    }

    const handleCancel = () => {
        navigate("/major")
    }

    return (
        <div className=' min-h-screen bg-[#F3F4FF] flex gap-5 flex-col justify-center items-center  '>
            <h1 className=' text-[#303972] text-[32px] font-bold'>EDIT MAJOR</h1>
            <div className='bg-white w-[800px]  rounded-xl overflow-hidden'>
                <div className='bg-[#4D44B5]'>
                    <h1 className='text-white text-[28px] p-3 pl-10'>Clas Study Detail</h1>
                </div>

                <form className='pl-5 pr-5 pb-5' action="">
                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[22px] text-[#303972] font-bold '>Class Code</h1>
                        <input className="flex-1 p-2" type="text" value={editClassStudy.classCode} />
                    </div>

                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[22px] text-[#303972] font-bold '>Teacher</h1>
                        <select className='flex-1 p-2 border border-gray-300 rounded-lg' name="" id="">
                            <option value={parseClassStudy.teacherId._id}>{parseClassStudy.teacherId.name}</option>
                            {teacher.map((e) =>
                                <option value={e._id}>{e.name}</option>
                            )}
                        </select>
                    </div>
                </form>
            </div>

            <div className='bg-white w-[800px]  rounded-xl overflow-hidden'>
                <div className='bg-[#4D44B5]'>
                    <h1 className='text-white text-[28px] p-3 pl-10'>Class Study Time</h1>
                </div>

                <form className='pl-5 pr-5 pb-5' action="">
                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[22px] text-[#303972] font-bold '>Start Date</h1>
                        <input className="flex-1 p-2" type="date" value={(editClassStudy.startDate).split("T")[0]} />
                    </div>

                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[22px] text-[#303972] font-bold '>End Date</h1>
                        <input className="flex-1 p-2" type="date" value={(editClassStudy.endDate).split("T")[0]} />
                    </div>

                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[22px] text-[#303972] font-bold '>Start Time</h1>
                        <input className="flex-1 p-2" type="text" value={editClassStudy.startTime} />
                    </div>

                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[22px] text-[#303972] font-bold '>End Time</h1>
                        <input className="flex-1 p-2" type="text" value={editClassStudy.endTime} />
                    </div>

                    <div className='flex gap-5 pt-5'>
                        <h1 className='text-[22px] text-[#303972] font-bold '>Date of Week</h1>
                        <select className='flex-1 p-2 border border-gray-300 rounded-lg' name="" id="" value={editClassStudy.dateOfWeek}>
                            {day.map((e) =>
                                <option value={e}>{e}</option>)}
                        </select>
                    </div>
                </form>
            </div>

            <div className='flex justify-around gap-5'>
                <button className='hover:cursor-pointer flex justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' onClick={handleSubmit}>Confirm</button>
                <button className='hover:cursor-pointer flex justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' onClick={handleCancel} >Cancel</button>
            </div>
        </div>
    )
}

export default EditMajor