try { require('process').loadEnvFile(); } catch {}

const express = require('express');
const pool = require('./db');

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(express.json());

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({ ok: true, db: rows[0].ok === 1 });
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Auth
app.use('/api/auth', require('./routes/auth'));

// Customer routes
app.use('/api/customer/accounts', require('./routes/customer_account'));
app.use('/api/customer/loans',    require('./routes/customer_loans'));
app.use('/api/customer/deposit',  require('./routes/customer_deposit'));
app.use('/api/customer/transfer', require('./routes/customer_transfer'));
app.use('/api/customer/profile',  require('./routes/customer_profile'));
app.use('/api/customer/payees',   require('./routes/customer_payees'));

// Employee routes
app.use('/api/employee/transactions', require('./routes/employee_transactions'));
app.use('/api/employee/accounts',     require('./routes/employee_accounts'));
app.use('/api/employee/loans',        require('./routes/employee_loans'));

// Manager routes (loans with full list — reuse employee_loans)
app.use('/api/manager/loans', require('./routes/employee_loans'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
