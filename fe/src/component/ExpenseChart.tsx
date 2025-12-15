import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface AmountItem {
    totalAmount: number;
    month: number;
    year: number;
}

interface ExpenseTeacherChartProps {
    totalAmountExpense: AmountItem[];
    totalAmountTeacher: AmountItem[];
}

const ExpenseTeacherChart: React.FC<ExpenseTeacherChartProps> = ({
    totalAmountExpense,
    totalAmountTeacher
}) => {

    const expensePoints = totalAmountExpense.map(item => ({
        label: `${item.month}/${item.year}`,
        y: item.totalAmount
    }));

    const teacherPoints = totalAmountTeacher.map(item => ({
        label: `${item.month}/${item.year}`,
        y: item.totalAmount
    }));

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: "Monthly Expense vs Teacher Salary"
        },
        axisY: {
            title: "Amount (VND)",
            includeZero: true,
            labelFormatter: (e: any) => `${e.value / 1_000_000}M`
        },
        toolTip: {
            shared: true,
            contentFormatter: (e: any) => {
                let content = `<strong>${e.entries[0].dataPoint.label}</strong><br/>`;
                e.entries.forEach((item: any) => {
                    content += `${item.dataSeries.name}: ${item.dataPoint.y.toLocaleString()} VND<br/>`;
                });
                return content;
            }
        },
        legend: {
            cursor: "pointer",
            itemclick: (e: any) => {
                e.dataSeries.visible =
                    typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible
                        ? false
                        : true;
                e.chart.render();
            }
        },
        data: [
            {
                type: "column",
                name: "Expense",
                showInLegend: true,
                color: "#EF476F",
                dataPoints: expensePoints
            },
            {
                type: "column",
                name: "Teacher Salary",
                showInLegend: true,
                color: "#118AB2",
                dataPoints: teacherPoints
            }
        ]
    };

    return <CanvasJSChart options={options} />;
};

export default ExpenseTeacherChart;
