require('process').loadEnvFile();

const express = require('express');
const pool = require('./db');

const app = express();
const PORT = Number(process.env.PORT || 5000);

const authRoutes = require('./routes/auth');
const customerAccountsRoutes = require('./routes/customer_account');
const employeeAccountsRoutes = require('./routes/employee_account');

app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({ ok: true, db: rows[0].ok === 1 });
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/customer/accounts', customerAccountsRoutes);
app.use('/api/employee/accounts', employeeAccountsRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});