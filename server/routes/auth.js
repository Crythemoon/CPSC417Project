const express = require("express");
const crypto = require("crypto");
const pool = require("../db");

const router = express.Router();


function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required",
      });
    }

    const [rows] = await pool.execute(
      `
      SELECT UserID, Name, Email, Password_hash
      FROM User
      WHERE Email = ?
      `,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const user = rows[0];
    const hashed = hashPassword(password);

    if (hashed !== user.PasswordHash) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const [customerCheck] = await pool.execute(
      `
      SELECT UserID FROM Customer WHERE UserID = ?
      `,
      [user.UserID]
    );

    if (customerCheck.length === 0) {
      return res.status(403).json({
        error: "Not a customer account",
      });
    }

    res.json({
      message: "Login successful",
      user: {
        userId: user.UserID,
        name: user.Name,
        email: user.Email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
    const connection = await pool.getConnection();

    try {
        const{name,phone,email,password,ssn,account_type} = req.body;

        if (!name || !email || !password || !ssn || !account_type) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const validTypes = ["Chequing Account", "Savings Account"];
        if (!validTypes.includes(account_type)) {
            connection.release();
            return res.status(400).json({ error: "Invalid account type" });
        }

        const [existing] = await connection.execute(
            "SELECT UserID FROM User WHERE Email = ?",
            [email]
        );

        if (existing.length > 0) {
            connection.release();
            return res.status(409).json({ error: "Email already in use" });
        }

        await connection.beginTransaction();

        const passwordHash = hashPassword(password);

        //Insert into User table
        const [UserResult] = await connection.execute(
            `
            INSERT INTO User (Name, Phone, Email, Password_hash)
            VALUES (?, ?, ?, ?)
            `,
            [name, phone, email, passwordHash]
        );

        const userId = UserResult.insertId;

        //Insert into Customer table
        await connection.execute(
            `
            INSERT INTO Customer (UserID, SSN)
            VALUES (, ?)
            `,
            [userId, ssn]
        );

        //Create Account
        const [AccountResult] = await connection.execute(
            `
            INSERT INTO Account (Status,Balance,OpenDate)
            VALUES ('Open',0.00,CURDATE())
            `,
        );

        await connection.commit();
        connection.release();

        res.status(201).json({
            message: "Signup successful",
            user: {
                userId,
                name,
                email,
            },
            account: {
                accountID: AccountResult.insertId,
                account_type,
                balance: 0.00,
            },
        });
    } catch (error) {
        await connection.rollback();
        connection.release();
        console.error("Signup failed:", error.message);
        res.status(500).json({
            error: "Internal server error", 
            });

    }
});

module.exports = router;