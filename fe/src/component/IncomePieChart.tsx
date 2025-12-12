import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface IncomePieChartProps {
    totalAmountInvestment: number;
    totalAmountPayment: number;
}

export const IncomePieChart: React.FC<IncomePieChartProps> = ({
    totalAmountInvestment,
    totalAmountPayment,
}) => {
    const total = totalAmountInvestment + totalAmountPayment;
    const investmentPercent = total ? ((totalAmountInvestment / total) * 100).toFixed(2) : 0;
    const paymentPercent = total ? ((totalAmountPayment / total) * 100).toFixed(2) : 0;

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "Income",
        },
        data: [
            {
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: true,
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: investmentPercent, label: "Investment", color: "#4CAF50" },
                    { y: paymentPercent, label: "Student Payment", color: "#F44336" },
                ],
            },
        ],
    };

    return <CanvasJSChart options={options} />;
};
