import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { createAccountApi, resetCreateAccount, setAccountEmail, setAccountName, setAccountPassword, setClassMajor, setMajor, setRole } from './NewAccountData'
import { useNavigate } from 'react-router-dom'
import { getMajor } from '../../redux&hook/slice/major'
import { getAllClassMajor } from '../../redux&hook/slice/classmajor'

const NewAccountPage = () => {
    const dispatch = useAppDispatch()
    const { createAccount } = useAppSelector((state) => state.createAccount)
    const { allMajor } = useAppSelector((state) => state.getClassMajor)
    const { major } = useAppSelector((state) => state.getMajor)
    const navigate = useNavigate()

    useEffect(() => {
        const role = localStorage.getItem("role")
        if (role) {
            dispatch(setRole(role))
        }
    }, [])

    useEffect(() => {
        dispatch(getMajor({}))
    }, [])

    useEffect(() => {
        dispatch(getAllClassMajor({}))
    }, [])

    const handleSubmitCreate = (e: any) => {
        e.preventDefault();
        dispatch(createAccountApi({ createAccount: createAccount }))
        console.log(createAccount)
        dispatch(resetCreateAccount())
        navigate(`/${createAccount.role}`)
    }

    const handleCancel = (e: any) => {
        e.preventDefault()
        navigate(`/${createAccount.role}`)
    }


    return (
        <div className=' min-h-screen bg-[#F3F4FF] flex flex-col justify-center items-center '>
            <h1 className='  text-[#303972] text-[32px] font-bold mb-[25px]'>CREATE ACCOUNT</h1>
            <form className='w-[1000px] h-[500px] border-gray-400 border-3 rounded-xl p-5 bg-white shadow-lg' onSubmit={handleSubmitCreate} action="">
                <div className='flex gap-5 pt-5'>
                    <h1 className='text-[24px] font-bold '>Name</h1>
                    <input className='flex-1 p-2' type="text" onChange={(e) => dispatch(setAccountName(e.target.value))} value={createAccount.accountName} />
                </div>
                <div className='flex gap-5 pt-5'>
                    <h1 className='text-[24px] font-bold '>Email</h1>
                    <input className='flex-1 p-2' type="text" onChange={(e) => dispatch(setAccountEmail(e.target.value))} value={createAccount.accountEmail} />
                </div>
                <div className='flex gap-5 pt-5'>
                    <h1 className='text-[24px] font-bold '>Password</h1>
                    <input className='flex-1 p-2' type="text" onChange={(e) => dispatch(setAccountPassword(e.target.value))} value={createAccount.accountPassword} />
                </div>
                <div className='flex gap-5 pt-5'>
                    <h1 className='text-[24px] font-bold '>Role</h1>
                    <input className='flex-1 p-2' type="text" readOnly value={createAccount.role} />
                </div>
                <div className='flex gap-5 pt-5'>
                    <h1 className='text-[24px] font-bold ' >Major</h1>
                    <select className='flex-1 p-2 border border-gray-300 rounded-lg' value={createAccount.major} onChange={(e) => dispatch(setMajor(e.target.value))} name="" id="">
                        <option value="">-- Chọn major --</option>
                        {major.map((e) =>
                            <option value={e._id}>{e.majorName}</option>)}

                    </select>
                </div>
                <div className='flex gap-5 pt-5'>
                    <h1 className='text-[24px] font-bold ' >Class Major</h1>
                    <select className='flex-1 p-2 border border-gray-300 rounded-lg' value={createAccount.classMajor} onChange={(e) => dispatch(setClassMajor(e.target.value))} name="" id="">
                        <option value="">-- Chọn Lớp --</option>
                        {allMajor.map((e) =>
                            <option value={e._id}>{e.className}</option>)}

                    </select>
                </div>
                <div className='flex justify-around mt-3'>
                    <button className='hover:cursor-pointer flex justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' type='submit'>Confirm</button>
                    <button className='hover:cursor-pointer flex justify-end mt-3 text-[20px] bg-[#4D44B5] text-white pt-3 pb-3 pl-15 pr-15 rounded-full' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default NewAccountPage