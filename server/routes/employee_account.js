const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all accounts
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        a.AccountID,
        a.Status,
        a.Balance,
        a.OpenDate,
        u.UserID,
        u.Name,
        u.Email,
        u.Phone
      FROM Account a
      JOIN Owns o ON a.AccountID = o.AccountID
      JOIN Customer c ON o.UserID = c.UserID
      JOIN User u ON c.UserID = u.UserID
      ORDER BY a.AccountID ASC
    `);

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error("GET all accounts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch accounts"
    });
  }
});

// GET one account
router.get("/:accountId", async (req, res) => {
  try {
    const accountId = Number(req.params.accountId);

    if (Number.isNaN(accountId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account ID"
      });
    }

    const [rows] = await db.execute(
      `
      SELECT 
        a.AccountID,
        a.Status,
        a.Balance,
        a.OpenDate,
        u.UserID,
        u.Name,
        u.Email,
        u.Phone
      FROM Account a
      JOIN Owns o ON a.AccountID = o.AccountID
      JOIN Customer c ON o.UserID = c.UserID
      JOIN User u ON c.UserID = u.UserID
      WHERE a.AccountID = ?
      `,
      [accountId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error("GET account error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch account"
    });
  }
});

// FREEZE account
router.patch("/:accountId/freeze", async (req, res) => {
  try {
    const accountId = Number(req.params.accountId);

    const [existing] = await db.execute(
      `SELECT Status FROM Account WHERE AccountID = ?`,
      [accountId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    if (existing[0].Status === "Frozen") {
      return res.status(400).json({
        success: false,
        message: "Account already frozen"
      });
    }

    await db.execute(
      `UPDATE Account SET Status = 'Frozen' WHERE AccountID = ?`,
      [accountId]
    );

    res.status(200).json({
      success: true,
      message: "Account frozen successfully"
    });

  } catch (error) {
    console.error("FREEZE error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to freeze account"
    });
  }
});

// UNFREEZE account
router.patch("/:accountId/unfreeze", async (req, res) => {
  try {
    const accountId = Number(req.params.accountId);

    const [existing] = await db.execute(
      `SELECT Status FROM Account WHERE AccountID = ?`,
      [accountId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    if (existing[0].Status === "Active") {
      return res.status(400).json({
        success: false,
        message: "Account already active"
      });
    }

    await db.execute(
      `UPDATE Account SET Status = 'Active' WHERE AccountID = ?`,
      [accountId]
    );

    res.status(200).json({
      success: true,
      message: "Account unfrozen successfully"
    });

  } catch (error) {
    console.error("UNFREEZE error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to unfreeze account"
    });
  }
});

module.exports = router;