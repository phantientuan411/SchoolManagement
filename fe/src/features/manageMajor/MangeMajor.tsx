
import ListMajorPage from '../listMajor/ListMajorPage.tsx'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getMajor } from '../../redux&hook/slice/major'
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const MangeMajor = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const { major } = useAppSelector((state) => state.getMajor)

    useEffect(() => {
        dispatch(getMajor({}))
    }, [])
    return (
        <div className='min-h-screen flex-col gap-5 pt-[50px] pl-[200px] pr-[200px] bg-[#F3F4FF]'>
            <div className="bg-white rounded-2xl shadow-lg shadow-indigo-100 p-6">
                <h1 className='text-[32px] font-bold pb-5'>Manage Major</h1>
                <div className='grid grid-cols-3 gap-5 font-semibold'>
                    <div className='rounded-xl flex flex-col gap-5 p-5 border border-amber-200 bg-amber-100 text-amber-400 text-[24px]'>
                        <span>Major</span>
                        <span className='font-semibold'>5</span>
                    </div>

                    <div className='rounded-xl flex flex-col gap-5 p-5 border border-green-200 bg-green-100 text-green-400 text-[24px]'>
                        <span>Class Major</span>
                        <span className='font-semibold'>5</span>
                    </div>

                    <div className='rounded-xl flex flex-col gap-5 p-5 border border-blue-200 bg-blue-100 text-blue-400 text-[24px]'>
                        <span>Subject</span>
                        <span className='font-semibold'>5</span>
                    </div>

                    <div className='rounded-xl flex flex-col gap-5 p-5 border border-red-200 bg-red-100 text-red-400 text-[24px]'>
                        <span>Class Study</span>
                        <span className='font-semibold'>5</span>
                    </div>

                    <div className='rounded-xl flex flex-col gap-5 p-5 border border-purple-200 bg-purple-100 text-purple-400 text-[24px]'>
                        <span>Student</span>
                        <span className='font-semibold'>5</span>
                    </div>

                    <div className='rounded-xl flex flex-col gap-5 p-5 border border-yellow-200 bg-yellow-100 text-yellow-400 text-[24px]'>
                        <span>Teacher</span>
                        <span className='font-semibold'>5</span>
                    </div>
                </div>
            </div>

            <div className='pt-5 pb-15'>
                <h1 className='text-[32px] font-bold pb-5'>Major</h1>
                <div className='grid grid-cols-3 gap-5  bg-[#F3F4FF] '>
                    {major.map((e) =>
                        <div onClick={() => {
                            navigate(`/majorDetails/${e._id}`)
                            localStorage.setItem("selectedMajor", `${e.majorCode}`)
                        }} className='rounded-xl shadow-lg shadow-indigo-100 bg-white overflow-hidden hover:cursor-pointer transition-all duration-300 hover:scale-105'>
                            <div className='p-5 flex flex-col gap-3 text-white bg-[#4D44B5] font-bold'>
                                <h1 className='text-[28px]'>{e.majorName}</h1>
                                <p>Code: {e.majorCode}</p>
                            </div>

                            <div className='flex flex-col gap-5 p-5 '>
                                <p><span className='font-bold'>Major:</span> {e.majorName}</p>
                                <div className='flex gap-5'>
                                    <div className='flex flex-col gap-3'>
                                        <h1 className='text-[28px] font-bold'>{e.classMajors?.length}</h1>
                                        <p>Class</p>
                                    </div>

                                    <div className='flex flex-col gap-3 '>
                                        <h1 className='text-[28px] font-bold'>{e.students?.length}</h1>
                                        <p>Student</p>
                                    </div>

                                    <div className='flex flex-col gap-3 '>
                                        <h1 className='text-[28px] font-bold'>{e.teachers?.length}</h1>
                                        <p>Teacher</p>
                                    </div>

                                    <div className='flex flex-col gap-3 '>
                                        <h1 className='text-[28px] font-bold'>{e.subjects?.length}</h1>
                                        <p>Subject</p>
                                    </div>
                                </div>
                            </div>

                            <div className='p-5 flex justify-between'>
                                <p className='text-gray-400'>Click to see details</p>
                                <FaChevronDown className='p-2 w-7 h-7 rounded-full bg-gray-100 ' />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MangeMajor