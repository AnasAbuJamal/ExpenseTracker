import moment from 'moment';

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = ""; 
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        if (words[i] && words[i][0]) { 
          initials += words[i][0];
        }
    }

    return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
    if (num === null || num === undefined || isNaN(num)) return "0"; 

    const [integerPart, fractionalPart] = num.toString().split(".");

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart 
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};



export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        ammount: item?.amount,
    }));
    return chartData;
};

export const prepareIncomeBarChartData = (data =[]) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }));

    return chartData
}


export const prepareExpenseLineChartData = (data =[]) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category,
    }));

    return chartData
};

