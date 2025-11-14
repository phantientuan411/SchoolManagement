import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getUserInfo } from './UserInfoData'
import { getClassStudent } from '../../redux&hook/slice/classstudent'

const UserInfoPage = () => {
    const dispatch = useAppDispatch()
    const { id, data } = useAppSelector((state) => state.getUserInfo)
    const { total, totalFail, totalPass, totalStudying, classStudent } = useAppSelector((state) => state.getClassStudent)


    useEffect(() => {
        dispatch(getUserInfo({ id: id }))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getClassStudent({ selected: id }))
    }, [dispatch, id])
    console.log(classStudent, totalPass)
    return (
        <div className='flex gap-5 p-[50px]'>
            <div className='w-[30%] border rounded-xl'>
                <img className='w-[150px] h-[150px]' src={data[0]?.accountId.avatarUrl} alt="" />
                <h1>{data[0]?.name}</h1>
                <p>{data[0]?.address}</p>
            </div>

            <div className='w-[70%] '>

                <div className='flex gap-5'>
                    <div className='border rounded-xl w-[33%] p-5 flex flex-col justify-center items-center'>
                        <h1 className='text-[32px] font-bold'>{totalPass}</h1>
                        <p className='text-[28px] font-medium'> Subjects Pass</p>
                    </div>

                    <div className='border rounded-xl w-[33%] flex flex-col justify-center items-center'>
                        <h1 className='text-[32px] font-bold'>{totalFail}</h1>
                        <p className='text-[28px] font-medium'>Subjects Fail</p>
                    </div>

                    <div className='border rounded-xl w-[33%] flex flex-col justify-center items-center'>
                        <h1 className='text-[32px] font-bold'>{totalStudying}</h1>
                        <p className='text-[28px] font-medium'>Subjects Studying</p>
                    </div>
                </div>

                <div className='border rounded-xl p-5 mt-5'>
                    <h1 className='text-[32px] font-bold'>GPA</h1>
                    <p className='text-[28px] font-medium'></p>
                </div>

                <h1 className=' mt-5 text-[32px] font-bold'>Class Study</h1>

                <div className='mt-5 border rounded-xl'>

                    <div className='flex text-[16px] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                        <div className='w-[30%] pt-5 pb-5'>Class Name</div>
                        <div className='w-[30%] pt-5 pb-5'>Teacher Name</div>
                        <div className='w-[10%] pt-5 pb-5'>Regular</div>
                        <div className='w-[10%] pt-5 pb-5'>Final</div>
                        <div className='w-[10%] pt-5 pb-5'>Total</div>
                        <div className='w-[10%] pt-5 pb-5'>Status</div>
                    </div>
                    {classStudent.map((e) =>
                        <div className='flex text-[16px] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted' >
                            <div className='w-[30%] pt-5 pb-5'>{e.classStudyId}</div>
                            <div className='w-[30%] pt-5 pb-5'>{e.classStudyId}</div>
                            <div className='w-[10%] pt-5 pb-5'>{e.mark.regular}</div>
                            <div className='w-[10%] pt-5 pb-5'>{e.mark.final}</div>
                            <div className='w-[10%] pt-5 pb-5'>{e.mark.total}</div>
                            <div className='w-[10%] pt-5 pb-5'>{e.status}</div>
                        </div>)}
                </div>

            </div>

        </div>
    )
}

export default UserInfoPage