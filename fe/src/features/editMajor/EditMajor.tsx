import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getTeacher } from '../listTeacher/ListTeacherData'

const EditMajor = () => {

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

    const isEdit = localStorage.getItem("isEdit")

    const classStudy = localStorage.getItem("classStudy")

    const parseClassStudy = classStudy ? JSON.parse(classStudy) : null

    const { subjectId, teacherId, ...newClassStudy } = parseClassStudy

    const [editClassStudy, setEditClassStudy] = useState({ ...newClassStudy, teacherId: parseClassStudy.teacherId._id })


    return (
        <div>
            <h1>EditMajor</h1>
            <div>
                <div>

                </div>

                <form action="">
                    <div className='flex'>
                        <h1>Class Code</h1>
                        <input className="flex-1" type="text" value={editClassStudy.classCode} />
                    </div>

                    <div className='flex'>
                        <h1>Teacher</h1>
                        <select className='flex-1' name="" id="">
                            <option value={parseClassStudy.teacherId._id}>{parseClassStudy.teacherId.name}</option>
                            {teacher.map((e) =>
                                <option value={e._id}>{e.name}</option>
                            )}
                        </select>

                    </div>

                    <div className='flex'>
                        <h1>Start Date</h1>
                        <input className="flex-1" type="date" value={(editClassStudy.startDate).split("T")[0]} />
                    </div>

                    <div className='flex'>
                        <h1>End Date</h1>
                        <input className="flex-1" type="date" value={(editClassStudy.endDate).split("T")[0]} />
                    </div>

                    <div className='flex'>
                        <h1>Start Time</h1>
                        <input className="flex-1" type="text" value={editClassStudy.startTime} />
                    </div>

                    <div className='flex'>
                        <h1>End Time</h1>
                        <input className="flex-1" type="text" value={editClassStudy.endTime} />
                    </div>

                    <div className='flex'>
                        <h1>Date of Week</h1>
                        <select className='flex-1' name="" id="" value={editClassStudy.dateOfWeek}>
                            {day.map((e) =>
                                <option value={e}>{e}</option>)}
                        </select>

                    </div>

                    <button></button>
                </form>

            </div>
        </div>
    )
}

export default EditMajor