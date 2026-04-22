const express = require('express');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/manager/assignments — all employee assignments with details
router.get('/assignments', requireAuth, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [employees] = await connection.execute(
            `
            SELECT
                e.UserID As EmployeeID,
                u.Name AS EmployeeName,
                e.Role,
                d.DepartmentID,
                d.Name AS DepartmentName,
                a.AssignmentID,
                a.Name AS AssignmentName,
                a.Description AS AssignmentDescription,
                a.Status AS AssignmentStatus,
                a.Start_Date AS StartDate
            FROM Employee e
            LEFT JOIN \`User\` u ON e.UserID = u.UserID
            LEFT JOIN Assignment a ON e.UserID = a.Employee_UserID
            LEFT JOIN Department d ON a.DepartmentID = d.DepartmentID
            ORDER BY a.Start_Date DESC, e.UserID ASC
            `
        );

        const[unassignedAssignments] = await connection.execute(
            `
            SELECT
                a.AssignmentID,
                a.Name AS AssignmentName,
                a.Description AS AssignmentDescription,
                a.Status AS AssignmentStatus,
                a.Start_Date AS StartDate,
                d.DepartmentID,
                d.Name AS DepartmentName
            FROM Assignment a
            LEFT JOIN Department d ON a.DepartmentID = d.DepartmentID
            WHERE a.Employee_UserID IS NULL
            ORDER BY a.Start_Date DESC
            `
        );

        res.json({ employees, unassignedAssignments });
    } catch (error) {
        console.error("Failed to load manager assignments data:", err);
        res.status(500).json({ error: 'Failed to load manager assignments data' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});