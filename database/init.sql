DROP DATABASE IF EXISTS BankDB;
CREATE DATABASE IF NOT EXISTS BankDB;
USE BankDB;

DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS User_Address;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Branch;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Dependent;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Depart_Location;
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS Savings_acct;
DROP TABLE IF EXISTS Checking_acct;
DROP TABLE IF EXISTS Loan;
DROP TABLE IF EXISTS Payee;
DROP TABLE IF EXISTS Transaction;
DROP TABLE IF EXISTS Transfer;
DROP TABLE IF EXISTS Deposit;
DROP TABLE IF EXISTS Withdraw;
DROP TABLE IF EXISTS Owns;
DROP TABLE IF EXISTS Obtains;
DROP TABLE IF EXISTS Pays;
DROP TABLE IF EXISTS Logs;


CREATE TABLE `User` (
    UserID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Phone VARCHAR(20),
    Email VARCHAR(100),
    Password_hash VARCHAR(255) NOT NULL,
    PRIMARY KEY (UserID)
);

CREATE TABLE User_Address (
    UserID INT NOT NULL,
    City VARCHAR(100) NOT NULL,
    Street VARCHAR(100) NOT NULL,
    Province VARCHAR(100) NOT NULL,
    Postal_code VARCHAR(20) NOT NULL,
    PRIMARY KEY (UserID, Street, City, Province, Postal_code),
    FOREIGN KEY (UserID) REFERENCES `User`(UserID) ON DELETE CASCADE
);

CREATE TABLE Customer (
    UserID INT NOT NULL,
    SSN VARCHAR(20) NOT NULL,
    PRIMARY KEY (UserID),
    FOREIGN KEY (UserID) REFERENCES `User`(UserID)
);

CREATE TABLE Branch (
    BranchID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Phone VARCHAR(20),
    Street VARCHAR(100),
    City VARCHAR(100),
    Province VARCHAR(100),
    Postal_Code VARCHAR(20),
    PRIMARY KEY (BranchID)
    );

CREATE TABLE Employee (
    UserID INT NOT NULL,
    EmergencyNo VARCHAR(20),
    Role VARCHAR(50),
    BranchID INT,
    SupervisorID INT,
    PRIMARY KEY (UserID),
    FOREIGN KEY (UserID) REFERENCES `User`(UserID),
    FOREIGN KEY (BranchID) REFERENCES Branch(BranchID),
    FOREIGN KEY (SupervisorID) REFERENCES Employee(UserID)
);

CREATE TABLE Dependent (
    UserID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Relationship VARCHAR(50),
    DOB DATE NOT NULL,
    PRIMARY KEY (UserID, Name, DOB),
    FOREIGN KEY (UserID) REFERENCES Employee(UserID)
);

CREATE TABLE Department (
    DepartmentID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    BranchID INT,
    UserID INT,
    Start_Date DATE,
    PRIMARY KEY (DepartmentID),
    FOREIGN KEY (BranchID) REFERENCES Branch(BranchID),
    FOREIGN KEY (UserID) REFERENCES Employee(UserID)
);

CREATE TABLE Depart_Location (
    DepartmentID INT NOT NULL,
    Location VARCHAR(100) NOT NULL,
    PRIMARY KEY (DepartmentID, Location),
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

CREATE TABLE Account (
    AccountID INT NOT NULL AUTO_INCREMENT,
    Status VARCHAR(50),
    Balance DECIMAL(15,2) DEFAULT 0.00,
    OpenDate DATE,
    PRIMARY KEY (AccountID)
);

CREATE TABLE Savings_acct (
    AccountID INT NOT NULL,
    Interest_rate DECIMAL(5,2),
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);

CREATE TABLE Checking_acct (
    AccountID INT NOT NULL,
    Overdraft_limit DECIMAL(15,2),
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);

CREATE TABLE Loan (
    Loan_No INT NOT NULL,
    Amount DECIMAL(15,2) NOT NULL,
    BranchID INT,
    PRIMARY KEY (Loan_No),
    FOREIGN KEY (BranchID) REFERENCES Branch(BranchID)
);

CREATE TABLE Payee (
    Payee_id INT NOT NULL,
    Company_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (Payee_id)
);


CREATE TABLE Transaction (
    TransactionID INT NOT NULL,
    `Timestamp` DATETIME NOT NULL,
    Amount DECIMAL(15,2) NOT NULL,
    UserID INT,
    PRIMARY KEY (TransactionID),
    FOREIGN KEY (UserID) REFERENCES `User`(UserID)
);

CREATE TABLE Transfer (
    TransactionID INT NOT NULL,
    PRIMARY KEY (TransactionID),
    FOREIGN KEY (TransactionID) REFERENCES Transaction(TransactionID)
);

CREATE TABLE Deposit (
TransactionID INT NOT NULL,
PRIMARY KEY (TransactionID),
FOREIGN KEY (TransactionID) REFERENCES Transaction(TransactionID)
);
CREATE TABLE Withdraw (
TransactionID INT NOT NULL,
PRIMARY KEY (TransactionID),
FOREIGN KEY (TransactionID) REFERENCES Transaction(TransactionID)
);

CREATE TABLE Owns (
    UserID INT NOT NULL,
    AccountID INT NOT NULL,
    PRIMARY KEY (UserID, AccountID),
    FOREIGN KEY (UserID) REFERENCES Customer(UserID),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);

CREATE TABLE Obtains (
    Customer_UserID INT NOT NULL,
    Loan_No INT NOT NULL,
    PRIMARY KEY (Customer_UserID, Loan_No),
    FOREIGN KEY (Customer_UserID) REFERENCES Customer(UserID),
    FOREIGN KEY (Loan_No) REFERENCES Loan(Loan_No)
);

CREATE TABLE Pays (
    UserID INT NOT NULL,
    Payee_id INT NOT NULL,
    PRIMARY KEY (UserID, Payee_id),
    FOREIGN KEY (UserID) REFERENCES Customer(UserID),
    FOREIGN KEY (Payee_id) REFERENCES Payee(Payee_id)
);

CREATE TABLE Logs (
    TransactionID INT NOT NULL,
    AccountID INT NOT NULL,
    PRIMARY KEY (TransactionID, AccountID),
    FOREIGN KEY (TransactionID) REFERENCES Transaction(TransactionID),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);

INSERT INTO `User` (UserID, Name, Phone, Email, Password_hash)
VALUES (101, 'Farhan Sheikh', '555-0100', 'farhan@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'),
(102, 'Nabeel Furqan', '555-0101', 'nabeel@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4');
INSERT INTO Branch (BranchID, Name, Phone, Street, City, Province, Postal_Code)
VALUES (1, 'Downtown Branch', '555-9999', '123 Main St', 'Calgary', 'AB', 'T2N 2V1');
INSERT INTO Customer (UserID, SSN)
VALUES (101, '123-456-7890');
INSERT INTO Employee (UserID, EmergencyNo, Role, BranchID, SupervisorID)
VALUES (102, '555-0999', 'Teller', 1, NULL);
INSERT INTO Account (AccountID, Status, Balance, OpenDate)
VALUES (5001, 'Active', 2500.00, '2026-03-15');
INSERT INTO Owns (UserID, AccountID)
VALUES (101, 5001);
SELECT u.Name, a.AccountID, a.Balance
FROM `User` u
JOIN Customer c ON u.UserID = c.UserID
JOIN Owns o ON c.UserID = o.UserID
JOIN Account a ON o.AccountID = a.AccountID
WHERE u.UserID = 101;
UPDATE Account
SET Balance = Balance + 500.00
WHERE AccountID = 5001;
DELETE FROM Owns
WHERE AccountID = 5001;
DELETE FROM Account
WHERE AccountID = 5001;
