const xlsx = require('xlsx');
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category , amount, date } = req.body;
 
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date,
    });

    await newExpense.save();

    return res.status(201).json({ message: "Expense added successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllExpenses = async (req, res) => { 
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



exports.deleteExpense = async (req, res) => {
  const userId = req.user.id;
  const expenseId = req.params.id; 

  try {
    const expense = await Expense.findOneAndDelete({ _id: expenseId, userId: userId });

    if (!expense) {
        return res.status(404).json({ message: "Expense not found or user not authorized" });
    }
    
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expenses = await Expense.find({ userId }).lean().sort({ date: -1 });

    if (expenses.length === 0) {
      return res.status(404).json({ message: "No expense data to download." });
    }

    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split('T')[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Expenses");
    const filePath = "expense_details.xlsx";
    xlsx.writeFile(wb, filePath);
    res.download(filePath, (err) => {
        if (err) {
            console.error("Error downloading file:", err);
        }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};