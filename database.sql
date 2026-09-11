-- ========================================================
-- Blood Donation Management System - Minor Project
-- Complete Relational Database Schema & Seed Data (MySQL)
-- Compatible with MySQL 5.7, 8.0+, MariaDB, and phpMyAdmin
-- ========================================================

CREATE DATABASE IF NOT EXISTS `blood_donation_db`;
USE `blood_donation_db`;

-- Drop tables in reverse order of foreign keys if re-running
DROP TABLE IF EXISTS `donations`;
DROP TABLE IF EXISTS `blood_requests`;
DROP TABLE IF EXISTS `donors`;
DROP TABLE IF EXISTS `blood_inventory`;
DROP TABLE IF EXISTS `hospitals`;
DROP TABLE IF EXISTS `admins`;

-- --------------------------------------------------------
-- Table: admins
-- Purpose: System administrators for inventory and request management
-- --------------------------------------------------------
CREATE TABLE `admins` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `role` VARCHAR(30) DEFAULT 'Administrator',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Admin Account (Password: admin123)
INSERT INTO `admins` (`id`, `username`, `password`, `name`, `email`, `role`) VALUES
(1, 'admin', 'admin123', 'Medical Administrator', 'admin@bloodbank.org', 'Super Administrator'),
(2, 'staff', 'staff123', 'Blood Bank Staff Officer', 'staff@bloodbank.org', 'Staff');

-- --------------------------------------------------------
-- Table: blood_inventory
-- Purpose: Real-time stock of blood units by ABO/Rh group
-- --------------------------------------------------------
CREATE TABLE `blood_inventory` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `blood_group` VARCHAR(5) NOT NULL UNIQUE,
    `units_available` INT NOT NULL DEFAULT 0,
    `safe_threshold` INT NOT NULL DEFAULT 10,
    `critical_threshold` INT NOT NULL DEFAULT 4,
    `last_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed initial inventory levels
INSERT INTO `blood_inventory` (`blood_group`, `units_available`, `safe_threshold`, `critical_threshold`) VALUES
('A+', 24, 10, 4),
('A-', 8, 8, 3),
('B+', 32, 12, 5),
('B-', 6, 8, 3),
('AB+', 15, 8, 3),
('AB-', 4, 6, 2),
('O+', 42, 15, 6),
('O-', 5, 10, 3);

-- --------------------------------------------------------
-- Table: donors
-- Purpose: Registered voluntary blood donors with availability & location
-- --------------------------------------------------------
CREATE TABLE `donors` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(100) NOT NULL,
    `blood_group` VARCHAR(5) NOT NULL,
    `gender` VARCHAR(10) NOT NULL,
    `age` INT NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100),
    `city` VARCHAR(50) NOT NULL,
    `district` VARCHAR(50),
    `address` VARCHAR(255),
    `pincode` VARCHAR(10),
    `last_donation_date` DATE,
    `is_available` BOOLEAN NOT NULL DEFAULT TRUE,
    `status` ENUM('Active', 'Inactive', 'Temporarily_Deferred') DEFAULT 'Active',
    `total_donations` INT DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Donors (Realistic diversified data)
INSERT INTO `donors` (`full_name`, `blood_group`, `gender`, `age`, `phone`, `email`, `city`, `district`, `address`, `pincode`, `last_donation_date`, `is_available`, `status`, `total_donations`) VALUES
('Rahul Sharma', 'O+', 'Male', 27, '+91 9876543210', 'rahul.sharma@example.com', 'Delhi', 'Central Delhi', 'Connaught Place, Block B', '110001', '2026-06-15', TRUE, 'Active', 3),
('Priya Patel', 'A+', 'Female', 24, '+91 9823456789', 'priya.patel@example.com', 'Delhi', 'South Delhi', 'Saket District Centre', '110017', '2026-05-10', TRUE, 'Active', 2),
('Amit Kumar', 'B+', 'Male', 31, '+91 9811223344', 'amit.k@example.com', 'Noida', 'Gautam Buddha Nagar', 'Sector 62, Green Valley', '201301', '2026-04-20', TRUE, 'Active', 4),
('Sneha Reddy', 'AB+', 'Female', 22, '+91 9845112233', 'sneha.reddy@example.com', 'Gurugram', 'Gurugram', 'DLF Phase 3, Cyber City', '122002', '2026-07-02', TRUE, 'Active', 1),
('Vikram Singh', 'O-', 'Male', 35, '+91 9871199882', 'vikram.singh@example.com', 'Delhi', 'West Delhi', 'Rajouri Garden, Main Market', '110027', '2026-03-12', TRUE, 'Active', 6),
('Ananya Gupta', 'A-', 'Female', 26, '+91 9910022334', 'ananya.g@example.com', 'Noida', 'Gautam Buddha Nagar', 'Sector 18, Commercial Belt', '201301', '2026-02-18', TRUE, 'Active', 2),
('Mohammed Faizan', 'B-', 'Male', 29, '+91 9899112233', 'faizan.m@example.com', 'Delhi', 'North Delhi', 'Civil Lines, Rajpur Road', '110054', '2026-05-30', TRUE, 'Active', 3),
('Neha Verma', 'AB-', 'Female', 28, '+91 9711883322', 'neha.v@example.com', 'Faridabad', 'Faridabad', 'Sector 15, Near Metro', '121007', '2026-01-25', TRUE, 'Active', 1),
('Rohan Malhotra', 'O+', 'Male', 23, '+91 9818844332', 'rohan.m@example.com', 'Delhi', 'East Delhi', 'Preet Vihar, Vikas Marg', '110092', '2026-07-20', TRUE, 'Active', 2),
('Kavita Joshi', 'B+', 'Female', 30, '+91 9958822110', 'kavita.j@example.com', 'Gurugram', 'Gurugram', 'Sector 45, Sushant Lok', '122003', '2026-06-05', FALSE, 'Active', 5);

-- --------------------------------------------------------
-- Table: blood_requests
-- Purpose: Patient, hospital, and emergency blood requests
-- --------------------------------------------------------
CREATE TABLE `blood_requests` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `request_code` VARCHAR(20) NOT NULL UNIQUE,
    `patient_name` VARCHAR(100) NOT NULL,
    `blood_group` VARCHAR(5) NOT NULL,
    `units_needed` INT NOT NULL DEFAULT 1,
    `hospital_name` VARCHAR(150) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `contact_person` VARCHAR(100) NOT NULL,
    `contact_phone` VARCHAR(20) NOT NULL,
    `contact_email` VARCHAR(100),
    `urgency` ENUM('Normal', 'Urgent', 'Critical') DEFAULT 'Normal',
    `is_emergency` BOOLEAN NOT NULL DEFAULT FALSE,
    `required_by_date` DATE NOT NULL,
    `reason` TEXT,
    `status` ENUM('Pending', 'Approved', 'Donor_Matched', 'Fulfilled', 'Rejected') DEFAULT 'Pending',
    `fulfillment_source` VARCHAR(100) DEFAULT NULL,
    `notes` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Requests
INSERT INTO `blood_requests` (`request_code`, `patient_name`, `blood_group`, `units_needed`, `hospital_name`, `city`, `contact_person`, `contact_phone`, `urgency`, `is_emergency`, `required_by_date`, `reason`, `status`, `fulfillment_source`) VALUES
('REQ-2026-001', 'Sunil Kapoor', 'O+', 2, 'AIIMS Hospital', 'Delhi', 'Dr. Alok Verma', '+91 9811224466', 'Critical', TRUE, '2026-09-12', 'Emergency surgical trauma transfusion', 'Fulfilled', 'Central Blood Bank Inventory (2 Units)'),
('REQ-2026-002', 'Meera Mehra', 'B+', 1, 'Max Super Speciality Hospital', 'Noida', 'Suresh Mehra', '+91 9873344556', 'Urgent', TRUE, '2026-09-13', 'Undergoing cardiac bypass surgery', 'Approved', NULL),
('REQ-2026-003', 'Karan Sachdeva', 'O-', 1, 'Fortis Memorial Research Institute', 'Gurugram', 'Anita Sachdeva', '+91 9810099887', 'Critical', TRUE, '2026-09-12', 'Severe anemia due to internal bleeding', 'Pending', NULL),
('REQ-2026-004', 'Tanvi Saxena', 'A+', 2, 'Apollo Hospital', 'Delhi', 'Rajesh Saxena', '+91 9899887766', 'Normal', FALSE, '2026-09-15', 'Scheduled orthopedic replacement', 'Pending', NULL),
('REQ-2026-005', 'Harish Chandra', 'AB-', 1, 'Safdarjung Hospital', 'Delhi', 'Vimla Devi', '+91 9711002288', 'Urgent', TRUE, '2026-09-14', 'Dialysis patient with acute blood loss', 'Donor_Matched', 'Assigned Registered Donor (Neha Verma)');

-- --------------------------------------------------------
-- Table: donations
-- Purpose: Historical records of donations completed
-- --------------------------------------------------------
CREATE TABLE `donations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `donor_id` INT DEFAULT NULL,
    `donor_name` VARCHAR(100) NOT NULL,
    `blood_group` VARCHAR(5) NOT NULL,
    `units_donated` INT NOT NULL DEFAULT 1,
    `donation_date` DATE NOT NULL,
    `camp_or_hospital` VARCHAR(150) DEFAULT 'Central Blood Donation Center',
    `hemoglobin_level` DECIMAL(3,1) DEFAULT 13.5,
    `status` ENUM('Tested_Safe', 'Completed', 'Discarded') DEFAULT 'Tested_Safe',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_donation_donor` FOREIGN KEY (`donor_id`) REFERENCES `donors`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Donation History
INSERT INTO `donations` (`donor_id`, `donor_name`, `blood_group`, `units_donated`, `donation_date`, `camp_or_hospital`, `hemoglobin_level`, `status`) VALUES
(1, 'Rahul Sharma', 'O+', 1, '2026-06-15', 'Red Cross Mobile Donation Camp', 14.2, 'Tested_Safe'),
(2, 'Priya Patel', 'A+', 1, '2026-05-10', 'AIIMS Blood Bank Drive', 13.0, 'Tested_Safe'),
(3, 'Amit Kumar', 'B+', 1, '2026-04-20', 'Rotary Blood Bank Noida', 14.8, 'Tested_Safe'),
(5, 'Vikram Singh', 'O-', 1, '2026-03-12', 'Max Healthcare Voluntary Camp', 15.1, 'Tested_Safe');

-- --------------------------------------------------------
-- Table: hospitals
-- Purpose: Registered medical centers that can submit blood requirements
-- --------------------------------------------------------
CREATE TABLE `hospitals` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `license_number` VARCHAR(50) NOT NULL UNIQUE,
    `city` VARCHAR(50) NOT NULL,
    `address` VARCHAR(255),
    `contact_person` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `status` ENUM('Verified', 'Pending') DEFAULT 'Verified',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `hospitals` (`name`, `license_number`, `city`, `address`, `contact_person`, `phone`, `email`, `status`) VALUES
('AIIMS Central Hospital', 'HOSP-DEL-001', 'Delhi', 'Ansari Nagar, New Delhi', 'Dr. Manisha Sharma', '+91 11 26588500', 'bloodbank@aiims.edu', 'Verified'),
('Max Super Speciality Hospital', 'HOSP-NOI-004', 'Noida', 'Sector 19, Noida', 'Dr. Naveen Goel', '+91 120 6629999', 'info@maxhealthcare.com', 'Verified'),
('Fortis Memorial Research Institute', 'HOSP-GUR-008', 'Gurugram', 'Sector 44, Gurugram', 'Dr. Rashmi Roy', '+91 124 4962200', 'emergency@fortishealthcare.com', 'Verified');

-- ========================================================
-- Useful Views & Aggregations
-- ========================================================
CREATE OR REPLACE VIEW `view_blood_stock_summary` AS
SELECT 
    b.blood_group,
    b.units_available,
    CASE 
        WHEN b.units_available <= b.critical_threshold THEN 'Critical'
        WHEN b.units_available <= b.safe_threshold THEN 'Low'
        ELSE 'Safe'
    END AS `stock_status`,
    COUNT(d.id) AS `registered_donors_count`
FROM `blood_inventory` b
LEFT JOIN `donors` d ON b.blood_group = d.blood_group AND d.is_available = TRUE AND d.status = 'Active'
GROUP BY b.blood_group, b.units_available, b.critical_threshold, b.safe_threshold;
