const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/customer/loans — loans for the authenticated customer
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const [rows] = await pool.execute(
      `SELECT l.Loan_No, l.Amount, l.Status, b.Name AS BranchName
       FROM Loan l
       JOIN Obtains o ON l.Loan_No = o.Loan_No
       LEFT JOIN Branch b ON l.BranchID = b.BranchID
       WHERE o.Customer_UserID = ?
       ORDER BY l.Loan_No DESC`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch loans" });
  }
});

// POST /api/customer/loans — request a new loan
router.post("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount, branchId } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Valid amount required" });
    }
    const [[{ nextLoanNo }]] = await pool.query(
      "SELECT COALESCE(MAX(Loan_No), 0) + 1 AS nextLoanNo FROM Loan"
    );
    await pool.execute(
      `INSERT INTO Loan (Loan_No, Amount, BranchID, Status) VALUES (?, ?, ?, 'Pending')`,
      [nextLoanNo, amount, branchId || 1]
    );
    const loanNo = nextLoanNo;
    await pool.execute(
      `INSERT INTO Obtains (Customer_UserID, Loan_No) VALUES (?, ?)`,
      [userId, loanNo]
    );
    res.status(201).json({ message: "Loan requested", loanNo, amount, status: "Pending" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to request loan" });
  }
});

module.exports = router;
