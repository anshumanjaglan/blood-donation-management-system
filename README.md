# 🩸 Blood Donation Management System (Minor Project)

A full-stack, centralized web application designed for managing blood donors, live blood bank inventory, clinical blood requests, emergency requisitions, and administrative analytics.

Built to fulfill academic requirements for **Engineering Minor Project / Capstone Evaluation**, directly mapped to **SDG 3 & 9**, standard engineering **POs (PO1–PO12)**, and **PSOs (PSO1–PSO3)**.

---

## 👥 Project Development Team & Academic Credits

| Role | Name | Details / Contact |
| :--- | :--- | :--- |
| **Team Lead & Full Stack Architecture** | **Anshuman Jaglan** | Roll No: `1614813123`<br>📞 `+91 9466291852`<br>✉️ `jaglananshuman@gmail.com` |
| **Backend & Database Engineering** | **Harsh Solanki** | Roll No: `1514813123` |
| **Frontend UI & Compatibility Logic** | **Umesh Kumar** | Roll No: `1314813123` |

### 🏛️ Academic Institution & Faculty Supervision
- **College / Institute**: **Maharaja Agrasen Institute of Technology (MAIT)**
- **Department**: **Department of Information Technology & Engineering (ITE)**
- **Project Guide**: **Ms. Sapna Gupta**
- **Mentor Teacher**: **Mr. Pawan Sharma**
- **Head of Department (HOD)**: **Dr. Bhoomi Gupta**

---

## 🌟 Key Features

1. **Live Blood Bank Stock Counter**: Real-time units available for all 8 groups ($A^+, A^-, B^+, B^-, AB^+, AB^-, O^+, O^-$) with *Safe*, *Low*, and *Critical* status indicators.
2. **Smart Compatibility Matching Engine**: Clinical ABO/Rh algorithm identifying exact and universal donors ($O^-$ universal donor, $AB^+$ universal recipient) with location proximity scoring.
3. **Emergency Blood Requisition System**: High-priority alert banner, urgent notifications, and direct voluntary donor assignment.
4. **Donor Onboarding & Digital Pass**: Online registration with medical pre-screening criteria (age 18–65, weight $\ge 50$kg, donation interval $\ge 90$ days) and printable Donor Pass.
5. **Live Request Progress Tracker**: Real-time 4-step milestone timeline (Submitted &rarr; Verified &rarr; Matched/Dispatched &rarr; Fulfilled) searchable by Request ID or phone.
6. **Executive Admin Dashboard**:
   - 4 Live KPI metric cards.
   - Interactive Chart.js data visualizations (Stock distribution & request breakdown).
   - Real-time inventory unit stepper controls.
   - Request fulfillment (direct inventory deduction or donor dispatch).
   - Searchable donor directory with availability toggles.
   - CSV export tools for academic presentations and inventory audits.
7. **Zero-Config Resilience (Dual-Database Architecture)**:
   - Full MySQL production relational schema script (`database.sql`).
   - Built-in zero-config persistent storage fallback so the application runs immediately on any computer with `npm start` even before MySQL is configured!

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or newer)
- *(Optional)* MySQL / XAMPP / MariaDB if you wish to run with MySQL.

### 1. Launch the Application Locally
In the project folder:
```powershell
npm install
npm start
```
Or simply double-click **`run-server.bat`**!

The server will start on: **`http://localhost:3000`**

---

## 🔑 Default Credentials & Access Portals

| Portal | URL | Demo Credentials |
| :--- | :--- | :--- |
| **Public Portal & Stock Ticker** | `http://localhost:3000/` | *Public Access* |
| **Donor Directory & Smart Matcher** | `http://localhost:3000/donors.html` | *Public Access* |
| **Donor Registration** | `http://localhost:3000/register-donor.html` | *Public Access* |
| **Blood Request Form** | `http://localhost:3000/request-blood.html` | *Public Access* |
| **Live Request Tracker** | `http://localhost:3000/track-request.html` | *Public Access* |
| **Hospital Partner Portal** | `http://localhost:3000/hospital.html` | *Public Access* |
| **Administrator Login** | `http://localhost:3000/admin-login.html` | **Username**: `admin`<br>**Password**: `password123` |
| **Admin Analytics Dashboard** | `http://localhost:3000/admin-dashboard.html` | *Requires Admin Login* |

---

## 📂 Project Structure

```
Blood Donation Management System - Minor Project/
├── Dockerfile                     # Docker container build definition
├── render.yaml                    # Cloud deployment blueprint
├── package.json                   # Dependencies & scripts
├── server.js                      # Express server entrypoint
├── database.sql                   # Full relational MySQL schema & seed data
├── config/
│   └── db.js                      # Dual database adapter (MySQL + fallback)
├── services/
│   └── matchingService.js         # Clinical ABO/Rh compatibility & proximity scoring
├── routes/
│   ├── api.js                     # REST API endpoints
│   └── auth.js                    # Admin authentication
├── public/                        # Frontend web application
│   ├── index.html                 # Home page with live stock & Team Credits
│   ├── donors.html                # Donor directory & matching engine
│   ├── register-donor.html        # Donor registration & digital ID pass
│   ├── request-blood.html         # Blood request form (Normal / Emergency)
│   ├── track-request.html         # Real-time request tracker
│   ├── hospital.html              # Hospital network portal
│   ├── admin-login.html           # Administrator login
│   ├── admin-dashboard.html       # Analytics & management dashboard
│   ├── css/
│   │   ├── style.css              # Main healthcare styling
│   │   └── admin.css              # Admin layout styles
│   └── js/
│       ├── main.js                # Core frontend interactions
│       └── admin.js               # Dashboard controller & Chart.js
├── PROJECT_REPORT.md              # University Minor Project Report & Viva Guide
└── README.md                      # This documentation
```

---

## 🎓 Academic Viva Tips
- Refer to [`PROJECT_REPORT.md`](file:///c:/Users/jagla/OneDrive/Documents/Blood%20Donation%20Management%20System%20-%20Minor%20Project/PROJECT_REPORT.md) for full diagrams (Architecture, ERD, DFD Level 0 & 1), PO/PSO/SDG mappings, and prepared viva questions with answers.