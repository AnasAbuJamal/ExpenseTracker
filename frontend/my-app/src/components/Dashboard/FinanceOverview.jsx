import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';
import { addThousandsSeparator } from '../../utils/helper';
import CustomTooltip from '../Charts/CustomTooltip';

const COLORS = ["#875CF5", "#FA2C37"];

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const balanceData = [
        { name: "Total Income", amount: totalIncome || 0},
        { name: "Total Expense", amount: totalExpense || 0},
    ];

    return (
        <div className='card'>
           <div className='flex items-center justify-between'>
               <h5 className='text-lg'>Financial Overview</h5>
            </div> 
            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`$${addThousandsSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
                TooltipComponent={CustomTooltip}
            />
        </div>
    )
}

export default FinanceOverview