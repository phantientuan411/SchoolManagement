import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getClassStudy, getClassStudyDetail } from '../../redux&hook/slice/classstudy'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { patch } from '../../axios/ultil';

const TeacherClass = () => {

    const dispatch = useAppDispatch()

    const teacherString = localStorage.getItem("user") ?? ""

    const teacher = JSON.parse(teacherString)

    const id = teacher?.acountInform.accountId

    useEffect(() => {
        dispatch(getClassStudy({ id: id }))
    }, [])

    const { studentDetail, classStudy } = useAppSelector((state) => state.getClassStudy)

    const [updateScore, setUpdateScore] = useState(studentDetail)

    const [exportClass, setExportClass] = useState("")

    const getStudent = async (e: any) => {
        await dispatch(getClassStudyDetail({ id: e }))
    }

    useEffect(() => {
        setUpdateScore(studentDetail)
        console.log(updateScore)
    }, [studentDetail])

    const updateScoreField = (index: number, field: string, value: string) => {
        setUpdateScore(prev => {
            const newData = [...prev];

            const regular = field === "regular" ? value : newData[index].mark.regular

            const final = field === "final" ? value : newData[index].mark.final

            const total = regular !== "" && final !== "" ? (Number(regular) * 0.3 + Number(final) * 0.7).toFixed(2) : ""

            newData[index] = {
                ...newData[index],
                mark: {
                    ...newData[index].mark,
                    [field]: value,
                    total: String(total)
                }
            };

            return newData;
        });
    };

    const exportTemplate = (students: any, teachClass: string) => {
        // Chuẩn bị data theo dữ liệu thực tế
        const data = students.map((st: any) => ({
            StudentName: st.studentId?.name,
            StudentCode: st.studentId?._id,
            Regular: st.mark?.regular ?? "",   // Nếu có thì lấy, không thì để trống
            Final: st.mark?.final ?? "",
        }));

        // Tạo sheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

        // Xuất file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const file = new Blob([excelBuffer], { type: "application/octet-stream" });

        saveAs(file, `mau-nhap-diem-${teachClass}.xlsx`);
    }

    const handleImportExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e: any) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet);

            // rows = [{StudentName, StudentCode, Regular, Final}, ...]

            setUpdateScore(prev => {
                const newData = [...prev];

                rows.forEach((row: any) => {
                    const index = newData.findIndex(
                        (s) => s.studentId?._id === row.StudentCode
                    );
                    if (index !== -1) {
                        const regular = row.Regular ?? "";
                        const final = row.Final ?? "";

                        const total =
                            regular !== "" && final !== ""
                                ? (Number(regular) * 0.3 + Number(final) * 0.7).toFixed(2)
                                : "";

                        newData[index] = {
                            ...newData[index],
                            mark: {
                                ...newData[index].mark,
                                regular,
                                final,
                                total,
                            },
                        };
                    }
                });

                return newData;
            });
        };

        reader.readAsArrayBuffer(file);
    };


    const handleClickUpdateScore = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            console.log(updateScore)

            const res = await patch(
                "classstudent/updatemany",
                updateScore,
                {
                    baseURL: "http://localhost:3000/api",
                    token: accessToken ?? undefined
                }
            )

            if (!res.ok || !res.data) {
                alert("Cập nhật điểm thất bại")
            }
            alert("Cập nhật điểm thành công")

        } catch (error: any) {
            alert("Cập nhật điểm thất bại")
        }
    }

    return (
        <div className='min-h-screen flex flex-col gap-5 pt-[50px] pl-[200px] pr-[200px] bg-[#F3F4FF]'>
            <h1 className='text-[32px] font-bold pb-3 text-[#303972]'>Teacher Class</h1>
            <h2 className='text-[22px] font-bold pb-3 text-gray-400'>Teacher: {teacher?.acountInform.name} </h2>
            <div className='flex justify-between items-center'>
                <div className='flex gap-5'>
                    <select className='bg-white rounded-xl p-3' name="" id="" onChange={(e) => {
                        getStudent(e.target.value)
                        setExportClass(e.target.options[e.target.selectedIndex].text)
                    }}>
                        <option value="">Please choose class</option>
                        {classStudy.map((e) =>
                            <option value={e._id}>{e.classCode}</option>
                        )}
                    </select>
                    <button className='hover:cursor-pointer text-[16px] bg-[#4D44B5] text-white p-5 rounded-full' onClick={() => exportTemplate(updateScore, exportClass)}>Export File</button>
                </div>

                <div className='flex gap-5'>
                    <button onClick={handleClickUpdateScore} className='hover:cursor-pointer text-[16px] bg-[#4D44B5] text-white p-5 rounded-full'> Update Score</button>

                    <input className=" bg-white rounded-lg border border-gray-300 p-2 file:mr-4 file:rounded-md file:border-0 file:bg-[#4D44B5] file:px-4 file:py-2 file:text-white file:font-semibold hover:file:bg-[#3c3591]" onChange={handleImportExcel} accept='.xlsx, .xls' type="file" name="" id="" />

                </div>
            </div>

            <div className={`rounded-xl bg-white shadow-lg shadow-indigo-100 mb-6 p-3 `}>
                <div className='flex items-center text-[18px] text-[#303972] font-semibold border-b pl-5 pr-5 border-gray-300 border-dotted'>
                    <div className='w-[10%] pt-5 pb-5 '>No.</div>
                    <div className='w-[20%] pt-5 pb-5 '>Student Name</div>
                    <div className='w-[25%] pt-5 pb-5'>Student Code</div>
                    <div className='w-[15%] pt-5 pb-5 flex justify-center'>Regular</div>
                    <div className='w-[15%] pt-5 pb-5 flex justify-center'>Final</div>
                    <div className='w-[15%] pt-5 pb-5 flex justify-center'>Total</div>
                </div>

                {updateScore?.map((e, index) =>
                    <div className='flex items-center font-semibold border-b pl-5 pr-5 border-gray-300 hover:cursor-pointer hover:bg-gray-200'>
                        <div className='w-[10%] pt-5 pb-5 '>{index + 1}</div>
                        <div className='w-[20%] pt-5 pb-5 '>{e.studentId?.name}</div>
                        <div className='w-[25%] pt-5 pb-5'>{e.studentId?._id}</div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center '><input className='text-center w-[80%]' type="number" value={e.mark.regular} onChange={(e) => updateScoreField(index, "regular", e.target.value)} /></div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center'><input className='text-center w-[80%]' type="number" value={e.mark.final} onChange={(e) => updateScoreField(index, "final", e.target.value)} /></div>
                        <div className='w-[15%] pt-5 pb-5 flex justify-center'>{e.mark.total}</div>
                    </div>)}

            </div>


        </div>
    )
}

export default TeacherClass