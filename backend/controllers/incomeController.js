const xlsx = require('xlsx');
const Income = require("../models/Income");

exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date,
    });

    await newIncome.save();

    return res.status(201).json({
      message: "Income added successfully",
      income: newIncome,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.findOneAndDelete({ _id: req.params.id, userId: userId });
    if (!income) {
        return res.status(404).json({ message: "Income not found or user not authorized" });
    }
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).lean().sort({ date: -1 });

    if (income.length === 0) {
      return res.status(404).json({ message: "No income data to download." });
    }

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split('T')[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    
    const filePath = "income_details.xlsx";
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