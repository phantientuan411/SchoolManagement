import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux&hook/hook'
import { getClassStudy, getClassStudyDetail, resetClassStudyDetail } from '../../redux&hook/slice/classstudy'
import ExcelJS from "exceljs";
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

    const [updateScore, setUpdateScore] = useState<any[]>([])

    const [exportClass, setExportClass] = useState("")

    const getStudent = async (e: any) => {
        if (!e) {
            setUpdateScore([])
            return
        }
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

            const total = regular !== "" && final !== ""
                ? (Number(regular) * 0.3 + Number(final) * 0.7).toFixed(2)
                : ""

            const status = regular !== "" && final !== ""
                ? (Number(total) >= 4 ? "Pass" : "Fail")
                : "Studying"

            newData[index] = {
                ...newData[index],
                status,
                mark: {
                    ...newData[index].mark,
                    [field]: value,
                    total: String(total)
                }
            };

            return newData;
        });
    };

    const exportTemplate = async (students: any[], teachClass: string) => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Template");

        // ===== TITLE =====
        sheet.mergeCells("A1:D1");
        const titleCell = sheet.getCell("A1");
        titleCell.value = "MẪU NHẬP ĐIỂM";
        titleCell.font = { bold: true, size: 18 };
        titleCell.alignment = { horizontal: "center", vertical: "middle" };

        // ===== HEADER =====
        sheet.addRow([
            "Student Name",
            "Student Code",
            "Regular",
            "Final",
        ]);

        const headerRow = sheet.getRow(2);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true, size: 14 };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        });

        // ===== DATA =====
        students.forEach((st) => {
            const row = sheet.addRow([
                st.studentId?.name ?? "",
                st.studentId?._id ?? "",
                st.mark?.regular ?? "",
                st.mark?.final ?? "",
            ]);

            row.eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            });
        });

        // ===== COLUMN WIDTH =====
        sheet.columns = [
            { width: 30 },
            { width: 20 },
            { width: 18 },
            { width: 18 },
        ];

        // ===== EXPORT =====
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, `mau-nhap-diem-${teachClass}.xlsx`);
    };

    const handleImportExcel = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const workbook = new ExcelJS.Workbook();

        // đọc file
        const buffer = await file.arrayBuffer();
        await workbook.xlsx.load(buffer);

        const worksheet = workbook.worksheets[0];
        if (!worksheet) return;

        /**
         * Bỏ:
         * - dòng 1: tiêu đề bảng
         * - dòng 2: header
         */
        const rows: any[] = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber <= 2) return;

            rows.push({
                StudentName: row.getCell(1).value,
                StudentCode: row.getCell(2).value,
                Regular: row.getCell(3).value,
                Final: row.getCell(4).value,
            });
        });

        setUpdateScore((prev) => {
            const newData = [...prev];

            rows.forEach((row) => {
                const index = newData.findIndex(
                    (s) => s.studentId?._id === String(row.StudentCode)
                );

                if (index !== -1) {
                    const regular =
                        row.Regular !== null && row.Regular !== undefined
                            ? Number(row.Regular)
                            : "";

                    const final =
                        row.Final !== null && row.Final !== undefined
                            ? Number(row.Final)
                            : "";

                    const total =
                        regular !== "" && final !== ""
                            ? (regular * 0.3 + final * 0.7).toFixed(2)
                            : "";

                    const status = regular !== "" && final !== ""
                        ? (Number(total) >= 4 ? "Pass" : "Fail")
                        : "Studying"

                    newData[index] = {
                        ...newData[index],
                        status,
                        mark: {
                            ...newData[index].mark,
                            regular: String(regular),
                            final: String(final),
                            total,
                        },
                    };
                }
            });

            return newData;
        });
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

    useEffect(() => {
        return () => {
            dispatch(resetClassStudyDetail())
        };
    }, []);

    return (
        <div className='min-h-screen flex flex-col gap-5 pt-[50px] pl-[200px] pr-[200px] bg-[#F3F4FF]'>
            <h1 className='text-[32px] font-bold pb-3 text-[#303972]'>Teacher Class</h1>
            <h2 className='text-[22px] font-bold pb-3 text-gray-400'>Teacher: {teacher?.acountInform.name} </h2>
            <div className='flex justify-between items-center'>
                <div className='flex gap-5'>
                    <select className='bg-white rounded-xl p-3' name="" id="" onChange={(e) => {
                        const selectdClass = e.target.value
                        getStudent(e.target.value)
                        setExportClass(selectdClass ? e.target.options[e.target.selectedIndex].text : "")
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