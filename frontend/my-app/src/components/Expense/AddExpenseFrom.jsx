// frontend/components/Expense/AddExpenseForm.jsx

import React, { useState } from 'react';
import Input from '../../components/Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense }) => {
    // FIX: Renamed state variable to 'expense' for clarity
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

    const handleFormSubmit = () => {
        onAddExpense(expense);
        setExpense({ category: "", amount: "", date: "", icon: "" });
    };

    return (
        <div>
            {/* FIX: Corrected onSelect parameter and handleChange key */}
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            {/* FIX: Corrected value binding and handleChange key */}
            <Input
                value={expense.category}
                onChange={({ target }) => handleChange('category', target.value)}
                label="Category"
                placeholder="Rent, Groceries, etc"
                type="text"
            />
            
            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                label="Amount"
                placeholder="1000"
                type="number"
            />

            {/* FIX: Corrected handleChange key */}
            <Input
                value={expense.date}
                onChange={({ target }) => handleChange('date', target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='but-primary' // FIX: Changed class to match others for consistency
                    onClick={handleFormSubmit}
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;