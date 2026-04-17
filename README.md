# Banking App

This project is a banking application with:

- a `Next.js` frontend in the project root
- an `Express` + `MySQL` backend in `server/`
- a MySQL schema and seed file in `database/init.sql`

The frontend runs on `http://localhost:3000` and rewrites `/api/*` requests to the backend on `http://localhost:4000`.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Express, Node.js
- Database: MySQL

## Project Structure

```text
demo-app/
├── database/
│   ├── init.sql
│   └── schema.sql
├── server/
│   ├── index.js
│   ├── db.js
│   ├── routes/
│   └── .env.example
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── package.json
└── README.md
```

## Prerequisites

Make sure you have these installed:

- Node.js
- npm
- MySQL

## First-Time Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd 471-final-banking-app/demo-app
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### 4. Create the database

This project uses `BankDB`.

Import the schema and seed data with:

```bash
mysql -u root < database/init.sql
```

That script:

- creates `BankDB`
- creates the required tables
- inserts starter data

### 5. Create the backend env file

Create `server/.env` and copy in:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=BankDB
JWT_SECRET=cpsc471bankingsecret
PORT=4000
```

If your MySQL setup has a password for `root`, update `DB_PASSWORD` accordingly.

## Running the App

You need 2 terminals.

### Terminal 1: Start the backend

```bash
cd server
npm run dev
```

The backend should run on:

```text
http://localhost:4000
```

### Terminal 2: Start the frontend

```bash
npm run dev
```

The frontend should run on:

```text
http://localhost:3000
```

## How the App Connects

- The frontend sends requests to `/api/...`
- `next.config.ts` rewrites those requests to `http://localhost:4000/api/...`
- The Express backend connects to MySQL using the values in `server/.env`
- The active database for this project is `BankDB`

## Important Database Note

The live app data is not stored in GitHub.

GitHub only contains:

- the code
- the SQL setup files
- the environment example

The actual data you create while using the app lives in your local MySQL server.

Examples of local-only data:

- users created through signup
- accounts created in the UI
- deposits, transfers, loans, and logs

## Useful MySQL Commands

Open the project database:

```bash
mysql -u root BankDB
```

Show all accounts:

```sql
SELECT AccountID, Status, Balance, OpenDate
FROM Account
ORDER BY AccountID DESC;
```

Show which user owns which account:

```sql
SELECT UserID, AccountID
FROM Owns
ORDER BY AccountID DESC;
```

Show transactions:

```sql
SELECT TransactionID, Timestamp, Amount, UserID
FROM Transaction
ORDER BY TransactionID DESC;
```

Show transaction-to-account logs:

```sql
SELECT *
FROM Logs
ORDER BY TransactionID DESC;
```

Show joined account ownership info:

```sql
SELECT
  u.UserID,
  u.Name,
  a.AccountID,
  a.Status,
  a.Balance,
  a.OpenDate
FROM User u
JOIN Owns o ON o.UserID = u.UserID
JOIN Account a ON a.AccountID = o.AccountID
ORDER BY a.AccountID DESC;
```

## Sharing the Database With Teammates

If a teammate pulls from GitHub, they will only get the code and SQL files.

To give them the exact current state of your local database, export it:

```bash
mysqldump -u root BankDB > bankdb_dump.sql
```

They can then import it with:

```bash
mysql -u root < bankdb_dump.sql
```

## Common Issues

### The UI loads but actions fail

Make sure the backend is running in `server/` on port `4000`.

### Login or signup fails immediately

Check that:

- MySQL is running
- `server/.env` exists
- `DB_NAME=BankDB`
- the database was imported from `database/init.sql`

## Scripts

Frontend:

```bash
npm run dev
npm run build
npm run lint
```

Backend:

```bash
cd server
npm run dev
npm start
```
