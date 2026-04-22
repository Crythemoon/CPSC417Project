const express = require("express");
const pool = require("../db");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

// GET /api/employee/loans — all loans with customer name
router.get("/", requireAuth, requireRole("employee", "manager"), async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT
         l.Loan_No,
         l.Amount,
         l.Status,
         u.Name AS CustomerName,
         b.Name AS BranchName
       FROM Loan l
       JOIN Obtains o   ON l.Loan_No = o.Loan_No
       JOIN Customer c  ON o.Customer_UserID = c.UserID
       JOIN \`User\` u  ON c.UserID = u.UserID
       LEFT JOIN Branch b ON l.BranchID = b.BranchID
       ORDER BY l.Loan_No DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch loans" });
  }
});

// PATCH /api/employee/loans/:id — update loan status
router.patch("/:id", requireAuth, requireRole("manager"), async (req, res) => {
  try {
    const loanNo = Number(req.params.id);
    const { status } = req.body;
    const allowed = ["Pending", "Approved", "Rejected", "Under Review"];
    if (!status || !allowed.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${allowed.join(", ")}` });
    }
    const [result] = await pool.execute(
      "UPDATE Loan SET Status = ? WHERE Loan_No = ?",
      [status, loanNo]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Loan not found" });
    }
    res.json({ message: "Loan updated", loanNo, status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update loan" });
  }
});

module.exports = router;
