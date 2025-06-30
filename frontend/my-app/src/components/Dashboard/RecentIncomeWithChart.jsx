import React, { useState, useEffect } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import CustomTooltip from '../Charts/CustomTooltip';

const COLORS = ["#875CF5", "#A2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
    const [chartData, setChartData] = useState([]);

    const prepareChartData = (data) => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData(data);
        return () => { };
    }, [data]);

    return (
        <div className='card'>
            <div className='flex item-center justify-between'>
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>
            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={COLORS}
                TooltipComponent={CustomTooltip}
            />
        </div>
    )
}

export default RecentIncomeWithChart;