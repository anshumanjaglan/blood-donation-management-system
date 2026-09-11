const pptxgen = require('pptxgenjs');
const path = require('path');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'Anshuman Jaglan, Harsh Solanki, Umesh Kumar';
pres.company = 'MAIT, Department of ITE';
pres.title = 'Blood Donation Management System - Minor Project';

// Color Palette
const C_DARK = '0F172A';
const C_RED = 'C62828';
const C_LIGHT_RED = 'FFE5E5';
const C_WHITE = 'FFFFFF';
const C_SLATE = '475569';
const C_LIGHT_BG = 'F8FAFC';
const C_BLUE = '1E40AF';
const C_GREEN = '166534';
const C_CARD_BG = 'FFFFFF';

// Helper for slides
function addHeader(slide, title, category = 'MINOR PROJECT PRESENTATION 2026') {
  // Top bar
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 1.1, fill: { color: C_DARK } });
  slide.addText(category, { x: 0.8, y: 0.2, fontSize: 10, color: 'EF4444', bold: true, fontFace: 'Arial' });
  slide.addText(title, { x: 0.8, y: 0.45, fontSize: 22, color: C_WHITE, bold: true, fontFace: 'Arial' });
  
  // Bottom footer
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 7.0, w: '100%', h: 0.5, fill: { color: 'F1F5F9' } });
  slide.addText('Maharaja Agrasen Institute of Technology (MAIT) | Department of ITE | Batch 2023-2027', {
    x: 0.8, y: 7.1, fontSize: 10, color: C_SLATE, fontFace: 'Arial'
  });
}

// ==========================================
// SLIDE 1: TITLE & FRONT PAGE
// ==========================================
const s1 = pres.addSlide();
s1.background = { color: C_DARK };

// Accent shapes
s1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 0.3, h: '100%', fill: { color: C_RED } });
s1.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 0.6, w: 4.8, h: 0.4, fill: { color: '991B1B' }, radius: 0.1 });
s1.addText('ACADEMIC MINOR PROJECT (BATCH 2023 - 2027)', {
  x: 0.8, y: 0.65, w: 4.8, fontSize: 11, color: C_WHITE, bold: true, align: 'center', fontFace: 'Arial'
});

s1.addText('BLOOD DONATION\nMANAGEMENT SYSTEM', {
  x: 0.8, y: 1.2, fontSize: 36, color: C_WHITE, bold: true, fontFace: 'Arial', lineSpacing: 40
});

s1.addText('Centralized Healthcare Requisition, Smart Compatibility Matching & Real-Time Inventory Tracking', {
  x: 0.8, y: 2.5, fontSize: 14, color: '94A3B8', fontFace: 'Arial'
});

// Institutional Details Card
s1.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 3.1, w: 11.7, h: 0.8, fill: { color: '1E293B' }, radius: 0.1 });
s1.addText('MAHARAJA AGRASEN INSTITUTE OF TECHNOLOGY (MAIT)\nDepartment of Information Technology & Engineering (ITE)', {
  x: 1.0, y: 3.25, fontSize: 13, color: 'F8FAFC', bold: true, fontFace: 'Arial'
});

// Team Members Box
s1.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 4.1, w: 5.7, h: 2.8, fill: { color: '1E293B' }, radius: 0.1 });
s1.addText('PROJECT DEVELOPERS & TEAM', { x: 1.0, y: 4.3, fontSize: 12, color: 'EF4444', bold: true, fontFace: 'Arial' });
s1.addText([
  { text: '1. Anshuman Jaglan ', options: { bold: true, color: C_WHITE, fontSize: 13 } },
  { text: '(Roll No: 01614813123)\n', options: { color: '94A3B8', fontSize: 12 } },
  { text: '   Role: Team Lead & Full Stack Architecture\n\n', options: { color: 'CBD5E1', fontSize: 10 } },
  { text: '2. Harsh Solanki ', options: { bold: true, color: C_WHITE, fontSize: 13 } },
  { text: '(Roll No: 01514813123)\n', options: { color: '94A3B8', fontSize: 12 } },
  { text: '   Role: Backend & Database Management\n\n', options: { color: 'CBD5E1', fontSize: 10 } },
  { text: '3. Umesh Kumar ', options: { bold: true, color: C_WHITE, fontSize: 13 } },
  { text: '(Roll No: 01314813123)\n', options: { color: '94A3B8', fontSize: 12 } },
  { text: '   Role: Frontend UI & Compatibility Engine', options: { color: 'CBD5E1', fontSize: 10 } }
], { x: 1.0, y: 4.6, w: 5.3, h: 2.1, fontFace: 'Arial' });

// Faculty Guidance Box
s1.addShape(pres.ShapeType.roundRect, { x: 6.8, y: 4.1, w: 5.7, h: 2.8, fill: { color: '1E293B' }, radius: 0.1 });
s1.addText('ACADEMIC SUPERVISION & GUIDANCE', { x: 7.0, y: 4.3, fontSize: 12, color: '38BDF8', bold: true, fontFace: 'Arial' });
s1.addText([
  { text: 'Project Guide:\n', options: { color: '94A3B8', fontSize: 11 } },
  { text: 'Ms. Sapna Gupta\n\n', options: { bold: true, color: C_WHITE, fontSize: 14 } },
  { text: 'Mentor Teacher:\n', options: { color: '94A3B8', fontSize: 11 } },
  { text: 'Mr. Pawan Sharma\n\n', options: { bold: true, color: C_WHITE, fontSize: 14 } },
  { text: 'Head of Department (HOD):\n', options: { color: '94A3B8', fontSize: 11 } },
  { text: 'Dr. Bhoomi Gupta', options: { bold: true, color: C_WHITE, fontSize: 14 } }
], { x: 7.0, y: 4.6, w: 5.3, h: 2.1, fontFace: 'Arial' });

// ==========================================
// SLIDE 2: PROBLEM STATEMENT
// ==========================================
const s2 = pres.addSlide();
s2.background = { color: C_LIGHT_BG };
addHeader(s2, 'Problem Statement & Clinical Motivation');

s2.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.5, w: 11.7, h: 1.2, fill: { color: C_LIGHT_RED }, radius: 0.1 });
s2.addText('CRITICAL CHALLENGE: Blood is a perishable, non-substitutable resource with zero synthetic alternatives. In emergencies, minutes decide between life and death.', {
  x: 1.1, y: 1.8, w: 11.1, fontSize: 14, color: '991B1B', bold: true, fontFace: 'Arial'
});

const pCards = [
  { title: 'Information Fragmentation', desc: 'Blood stocks are isolated in disparate hospitals and private blood banks with zero real-time sync.' },
  { title: 'Emergency Bottlenecks', desc: 'Patients relatives must make frantic phone calls and unverified social media posts during critical trauma.' },
  { title: 'Donor Inaccessibility', desc: 'No smart algorithmic mechanism to match compatible ABO/Rh donors located in geographic proximity.' },
  { title: 'Manual Record Inefficiencies', desc: 'Paper and Excel registers cause errors in expiry tracking, deferral status, and inventory audits.' }
];

pCards.forEach((c, idx) => {
  const x = 0.8 + (idx % 2) * 6.0;
  const y = 3.0 + Math.floor(idx / 2) * 1.8;
  s2.addShape(pres.ShapeType.roundRect, { x, y, w: 5.7, h: 1.6, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
  s2.addText(`0${idx + 1}. ${c.title}`, { x: x + 0.3, y: y + 0.25, fontSize: 13, color: C_RED, bold: true, fontFace: 'Arial' });
  s2.addText(c.desc, { x: x + 0.3, y: y + 0.65, w: 5.1, fontSize: 11, color: C_SLATE, fontFace: 'Arial' });
});

// ==========================================
// SLIDE 3: OBJECTIVES & SCOPE
// ==========================================
const s3 = pres.addSlide();
s3.background = { color: C_LIGHT_BG };
addHeader(s3, 'Project Objectives & Target Capabilities');

const objList = [
  { icon: '01', title: 'Centralized Web-Based Registry', desc: 'Unified digital management of blood donors, hospital requisitions, and central inventory.' },
  { icon: '02', title: 'Real-Time Inventory Ticker', desc: 'Automated monitoring of 8 blood groups (A+, A-, B+, B-, AB+, AB-, O+, O-) with Safe/Low/Critical threshold alerts.' },
  { icon: '03', title: 'Smart Compatibility Engine', desc: 'Algorithmic matching matching universal donors (O-) and exact matches with spatial city proximity scoring.' },
  { icon: '04', title: '24x7 Emergency Priority Queue', desc: 'Priority requisition facility with instant alerts, broadcast notifications, and live milestone tracking.' },
  { icon: '05', title: 'Executive Admin Dashboard', desc: 'Interactive Chart.js visualizations, stock increment/decrement steppers, and CSV audit reports.' }
];

objList.forEach((o, idx) => {
  const y = 1.4 + idx * 1.05;
  s3.addShape(pres.ShapeType.roundRect, { x: 0.8, y, w: 11.7, h: 0.95, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.08 });
  s3.addShape(pres.ShapeType.roundRect, { x: 1.0, y: y + 0.15, w: 0.65, h: 0.65, fill: { color: C_RED }, radius: 0.08 });
  s3.addText(o.icon, { x: 1.0, y: y + 0.3, w: 0.65, fontSize: 13, color: C_WHITE, bold: true, align: 'center', fontFace: 'Arial' });
  s3.addText(o.title, { x: 1.8, y: y + 0.2, fontSize: 13, color: C_DARK, bold: true, fontFace: 'Arial' });
  s3.addText(o.desc, { x: 1.8, y: y + 0.5, fontSize: 11, color: C_SLATE, fontFace: 'Arial' });
});

// ==========================================
// SLIDE 4: MAPPING WITH SDGS & POS/PSOS
// ==========================================
const s4 = pres.addSlide();
s4.background = { color: C_LIGHT_BG };
addHeader(s4, 'Mapping with SDGs & Program Outcomes (POs / PSOs)');

// SDG Box
s4.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.5, w: 5.7, h: 5.1, fill: { color: C_CARD_BG }, line: { color: 'CBD5E1', width: 1 }, radius: 0.1 });
s4.addText('SUSTAINABLE DEVELOPMENT GOALS', { x: 1.1, y: 1.8, fontSize: 13, color: C_RED, bold: true, fontFace: 'Arial' });
s4.addText([
  { text: 'SDG 3: Good Health and Well-Being\n', options: { bold: true, color: '166534', fontSize: 13 } },
  { text: 'Directly supports target 3.8 and 3.6 by reducing delays in locating compatible blood units and saving lives during surgical trauma and childbirth emergencies.\n\n', options: { color: C_SLATE, fontSize: 11 } },
  { text: 'SDG 9: Industry, Innovation & Infrastructure\n', options: { bold: true, color: '1E40AF', fontSize: 13 } },
  { text: 'Leverages modern cloud software engineering to build resilient, decentralized healthcare digital infrastructure accessible to all citizens.', options: { color: C_SLATE, fontSize: 11 } }
], { x: 1.1, y: 2.2, w: 5.1, h: 4.1, fontFace: 'Arial' });

// PO/PSO Box
s4.addShape(pres.ShapeType.roundRect, { x: 6.8, y: 1.5, w: 5.7, h: 5.1, fill: { color: C_CARD_BG }, line: { color: 'CBD5E1', width: 1 }, radius: 0.1 });
s4.addText('ENGINEERING PROGRAM OUTCOMES (POs & PSOs)', { x: 7.1, y: 1.8, fontSize: 13, color: '1E40AF', bold: true, fontFace: 'Arial' });
s4.addText([
  { text: 'PO1 (Engineering Knowledge): ', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: 'Full-stack web architecture & relational database normalization.\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: 'PO2 (Problem Analysis): ', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: 'Formulated algorithmic solution for emergency blood search latency.\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: 'PO3 (Design/Development): ', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: 'Engineered safe stock thresholds and medical donor screening.\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: 'PO5 (Modern Tool Usage): ', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: 'Node.js, Express, Chart.js, Git, Docker, and REST APIs.\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: 'PO6 & PO8 (Society & Ethics): ', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: 'Direct social welfare impact with strict donor confidentiality.\n\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: 'PSO1: ', options: { bold: true, color: C_RED, fontSize: 11 } },
  { text: 'Healthcare information system engineering.\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: 'PSO2 & PSO3: ', options: { bold: true, color: C_RED, fontSize: 11 } },
  { text: 'Data-driven web application utilizing modern computing tools.', options: { color: C_SLATE, fontSize: 10 } }
], { x: 7.1, y: 2.2, w: 5.1, h: 4.1, fontFace: 'Arial' });

// ==========================================
// SLIDE 5: SYSTEM ARCHITECTURE
// ==========================================
const s5 = pres.addSlide();
s5.background = { color: C_LIGHT_BG };
addHeader(s5, 'System Architecture & Tech Stack Justification');

const archTiers = [
  { tier: 'Tier 1: Client Layer', color: '1E40AF', items: 'HTML5, CSS3 Healthcare Theme, Vanilla ES6+ JavaScript, Chart.js Visualizations. Zero client-side framework overhead for maximum mobile responsiveness.' },
  { tier: 'Tier 2: Application Layer', color: 'C62828', items: 'Node.js & Express.js RESTful Micro-Routing. Asynchronous non-blocking event-driven loop handles concurrent emergency requisitions with near-zero latency.' },
  { tier: 'Tier 3: Algorithm Engine', color: '166534', items: 'Clinical ABO/Rh Transfusion Engine & Proximity Scoring (services/matchingService.js). Automatic compatibility ranking and distance evaluation.' },
  { tier: 'Tier 4: Persistence Layer', color: 'B45309', items: 'Dual-Database Architecture: MySQL relational schema (database.sql) with ACID compliance + Auto-fallback zero-config embedded storage for viva reliability.' }
];

archTiers.forEach((a, idx) => {
  const y = 1.5 + idx * 1.35;
  s5.addShape(pres.ShapeType.roundRect, { x: 0.8, y, w: 11.7, h: 1.2, fill: { color: C_CARD_BG }, line: { color: 'CBD5E1', width: 1 }, radius: 0.1 });
  s5.addText(a.tier, { x: 1.1, y: y + 0.2, fontSize: 13, color: a.color, bold: true, fontFace: 'Arial' });
  s5.addText(a.items, { x: 1.1, y: y + 0.55, w: 11.1, fontSize: 11, color: C_SLATE, fontFace: 'Arial' });
});

// ==========================================
// SLIDE 6: DATABASE DESIGN
// ==========================================
const s6 = pres.addSlide();
s6.background = { color: C_LIGHT_BG };
addHeader(s6, 'Database Schema & Relational Modeling (3NF)');

const tables = [
  { name: 'blood_inventory', keys: 'PK: id | UK: blood_group', cols: 'units_available, safe_threshold, critical_threshold, last_updated' },
  { name: 'donors', keys: 'PK: id', cols: 'full_name, blood_group, age, phone, city, is_available, status, last_donation_date' },
  { name: 'blood_requests', keys: 'PK: id | UK: request_code', cols: 'patient_name, blood_group, units_needed, hospital_name, is_emergency, status, fulfillment_source' },
  { name: 'donations', keys: 'PK: id | FK: donor_id', cols: 'donor_name, blood_group, units_donated, donation_date, camp_or_hospital, hemoglobin_level' },
  { name: 'hospitals', keys: 'PK: id | UK: license_number', cols: 'name, license_number, city, address, contact_person, phone, email, status' },
  { name: 'admins', keys: 'PK: id | UK: username', cols: 'username, password (hashed), name, email, role, created_at' }
];

tables.forEach((t, idx) => {
  const x = 0.8 + (idx % 2) * 6.0;
  const y = 1.5 + Math.floor(idx / 2) * 1.75;
  s6.addShape(pres.ShapeType.roundRect, { x, y, w: 5.7, h: 1.55, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
  s6.addText(`TABLE: ${t.name}`, { x: x + 0.25, y: y + 0.2, fontSize: 12, color: C_DARK, bold: true, fontFace: 'Arial' });
  s6.addText(t.keys, { x: x + 0.25, y: y + 0.55, fontSize: 10, color: C_RED, bold: true, fontFace: 'Arial' });
  s6.addText(`Columns: ${t.cols}`, { x: x + 0.25, y: y + 0.85, w: 5.2, fontSize: 10, color: C_SLATE, fontFace: 'Arial' });
});

// ==========================================
// SLIDE 7: SMART COMPATIBILITY ENGINE
// ==========================================
const s7 = pres.addSlide();
s7.background = { color: C_LIGHT_BG };
addHeader(s7, 'Clinical ABO/Rh Compatibility & Matching Logic');

s7.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.5, w: 5.7, h: 5.1, fill: { color: C_CARD_BG }, line: { color: 'CBD5E1', width: 1 }, radius: 0.1 });
s7.addText('TRANSFUSION COMPATIBILITY MATRIX', { x: 1.1, y: 1.8, fontSize: 12, color: C_RED, bold: true, fontFace: 'Arial' });
s7.addText([
  { text: '• O- (Universal Donor): ', options: { bold: true, color: 'DC2626', fontSize: 11 } },
  { text: 'Can donate red cells to all 8 blood groups (A+, A-, B+, B-, AB+, AB-, O+, O-).\n\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: '• AB+ (Universal Recipient): ', options: { bold: true, color: '166534', fontSize: 11 } },
  { text: 'Can safely receive red cells from any donor blood group.\n\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: '• Rh-D Antigen Rule: ', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: 'Rh-negative individuals can only receive Rh-negative blood; Rh-positive can receive either positive or negative blood.', options: { color: C_SLATE, fontSize: 10 } }
], { x: 1.1, y: 2.2, w: 5.1, h: 4.1, fontFace: 'Arial' });

s7.addShape(pres.ShapeType.roundRect, { x: 6.8, y: 1.5, w: 5.7, h: 5.1, fill: { color: C_CARD_BG }, line: { color: 'CBD5E1', width: 1 }, radius: 0.1 });
s7.addText('MATHEMATICAL MATCHING SCORING', { x: 7.1, y: 1.8, fontSize: 12, color: '1E40AF', bold: true, fontFace: 'Arial' });
s7.addText([
  { text: 'Score = Base(50) + BloodBonus + ProximityBonus\n\n', options: { bold: true, color: C_DARK, fontSize: 12 } },
  { text: '1. Blood Compatibility Weight:\n', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: '   • Exact Blood Group Match: +30 Points\n   • Clinically Compatible Alternative: +15 Points\n\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: '2. Spatial Proximity Weight:\n', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: '   • Exact City Match: +20 Points\n   • Nearby District/Region: +10 Points\n\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: '3. Availability Filter:\n', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: '   • Requires is_available = TRUE and status = Active', options: { color: '166534', fontSize: 10 } }
], { x: 7.1, y: 2.2, w: 5.1, h: 4.1, fontFace: 'Arial' });

// ==========================================
// SLIDE 8: CORE MODULES & FEATURES
// ==========================================
const s8 = pres.addSlide();
s8.background = { color: C_LIGHT_BG };
addHeader(s8, 'Key System Modules & User Experience');

const modules = [
  { name: '1. Live Stock Counter', desc: 'Real-time interactive cards for all 8 blood groups with Safe, Low, and Critical threshold alerts.' },
  { name: '2. Smart Donor Matcher', desc: 'Instant compatibility calculation and one-click contact via Phone, WhatsApp, and Email.' },
  { name: '3. Donor Onboarding & Pass', desc: 'Medical pre-screening criteria (age 18-65, weight >= 50kg, 90-day gap) and digital printable Donor Card.' },
  { name: '4. Emergency Requisition Queue', desc: 'Urgent priority flag triggering critical red banner notifications across the hospital network.' },
  { name: '5. Live Request Tracker', desc: '4-step visual milestone progress tracking (Submitted -> Verified -> Dispatched -> Fulfilled).' },
  { name: '6. Hospital Network Portal', desc: 'Institutional portal for verified clinics and bulk emergency surgical requisitions.' }
];

modules.forEach((m, idx) => {
  const x = 0.8 + (idx % 3) * 4.0;
  const y = 1.6 + Math.floor(idx / 3) * 2.5;
  s8.addShape(pres.ShapeType.roundRect, { x, y, w: 3.7, h: 2.2, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
  s8.addText(m.name, { x: x + 0.2, y: y + 0.25, fontSize: 12, color: C_RED, bold: true, fontFace: 'Arial' });
  s8.addText(m.desc, { x: x + 0.2, y: y + 0.7, w: 3.3, fontSize: 10, color: C_SLATE, fontFace: 'Arial' });
});

// ==========================================
// SLIDE 9: ADMIN DASHBOARD
// ==========================================
const s9 = pres.addSlide();
s9.background = { color: C_LIGHT_BG };
addHeader(s9, 'Executive Administrator Dashboard & Live Telemetry');

const adminPoints = [
  { title: 'Chief Medical Administrator: Dr. Anshuman Jaglan', text: 'Secured credential authentication (admin / password123) with role-based session control.' },
  { title: 'Real-Time Dynamic Telemetry & Memory', text: 'Live sync simulation creates realistic hospital intakes, donor registrations, and persistent memory saves.' },
  { title: 'Interactive Chart.js Visualizations', text: 'Live blood stock distribution bar chart + request fulfillment doughnut chart.' },
  { title: 'Inventory Unit Steppers & Camp Logging', text: 'One-click +/- steppers for stock adjustments and walk-in donation camp collection records.' },
  { title: '1-Click Fulfillment & Donor Assignment', text: 'Dispense directly from blood bank stock (auto-deducts units) or match registered voluntary donors.' },
  { title: 'Data Export for Viva Defense', text: 'Instant CSV export for donor rosters, inventory audit sheets, and print-ready layout.' }
];

adminPoints.forEach((ap, idx) => {
  const x = 0.8 + (idx % 2) * 6.0;
  const y = 1.5 + Math.floor(idx / 2) * 1.75;
  s9.addShape(pres.ShapeType.roundRect, { x, y, w: 5.7, h: 1.55, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
  s9.addText(ap.title, { x: x + 0.25, y: y + 0.2, fontSize: 12, color: C_DARK, bold: true, fontFace: 'Arial' });
  s9.addText(ap.text, { x: x + 0.25, y: y + 0.65, w: 5.2, fontSize: 10, color: C_SLATE, fontFace: 'Arial' });
});

// ==========================================
// SLIDE 10: TESTING & DEPLOYMENT
// ==========================================
const s10 = pres.addSlide();
s10.background = { color: C_LIGHT_BG };
addHeader(s10, 'Verification, Automated Tests & Live Deployment');

s10.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.5, w: 11.7, h: 2.2, fill: { color: 'ECFDF5' }, line: { color: 'A7F3D0', width: 1 }, radius: 0.1 });
s10.addText('AUTOMATED SANITY TEST SUITE RESULTS: 9 PASSED / 0 FAILED', { x: 1.1, y: 1.7, fontSize: 13, color: '065F46', bold: true, fontFace: 'Arial' });
s10.addText([
  { text: '✓ Server Health Check (/health)\n✓ Inventory Retrieval (8 Blood Groups)\n✓ Donor Registration & Age Validation\n', options: { color: '047857', fontSize: 10 } },
  { text: '✓ ABO/Rh Compatibility Logic (O- Universal)\n✓ Blood Request Submission (REQ-Code)\n✓ Live Milestone Request Tracking\n', options: { color: '047857', fontSize: 10 } },
  { text: '✓ Stock Deduction & Fulfillment Workflow\n✓ Administrator Auth & Token Validation\n✓ Dynamic Telemetry & KPI Calculations', options: { color: '047857', fontSize: 10 } }
], { x: 1.1, y: 2.1, w: 11.1, h: 1.4, fontFace: 'Arial' });

// Deployment Box
s10.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 4.0, w: 11.7, h: 2.6, fill: { color: C_CARD_BG }, line: { color: 'CBD5E1', width: 1 }, radius: 0.1 });
s10.addText('DEPLOYMENT ARCHITECTURE & ACCESSIBILITY', { x: 1.1, y: 4.25, fontSize: 13, color: C_RED, bold: true, fontFace: 'Arial' });
s10.addText([
  { text: '1. Production Cloud Hosting (Render.com):\n', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: '   Containerized with Docker (Node 20-Alpine) with automated GitHub CI/CD integration.\n\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: '2. Live Public Internet Tunnel (Localtunnel):\n', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: '   Instant public HTTPS accessibility across mobile devices and examiners anywhere worldwide.\n\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: '3. Offline Lab Viva Deployment:\n', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: '   Zero-config 1-click execution via run-server.bat and share-online.bat scripts.', options: { color: C_SLATE, fontSize: 10 } }
], { x: 1.1, y: 4.6, w: 11.1, h: 1.8, fontFace: 'Arial' });

// ==========================================
// SLIDE 11: CONCLUSION & FUTURE WORK
// ==========================================
const s11 = pres.addSlide();
s11.background = { color: C_LIGHT_BG };
addHeader(s11, 'Conclusion & Future Enhancements');

const futureItems = [
  { title: 'Project Impact Achieved', text: 'Centralized blood search, slashed emergency response time from hours to seconds, and enabled seamless coordination between donors, banks, and hospitals.' },
  { title: 'Automated SMS / WhatsApp Gateway', text: 'Direct integration with Twilio or WhatsApp Cloud API for automated geolocation broadcasts to nearby eligible donors.' },
  { title: 'IoT Cold-Chain Storage Monitoring', text: 'Integration with smart IoT temperature sensors to automatically monitor blood bag refrigeration and discard expired units.' },
  { title: 'Federated City-Wide Blood Network', text: 'Expanding the platform across all regional government and private hospitals under National Health Mission standards.' }
];

futureItems.forEach((f, idx) => {
  const x = 0.8 + (idx % 2) * 6.0;
  const y = 1.6 + Math.floor(idx / 2) * 2.5;
  s11.addShape(pres.ShapeType.roundRect, { x, y, w: 5.7, h: 2.2, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
  s11.addText(f.title, { x: x + 0.3, y: y + 0.3, fontSize: 13, color: idx === 0 ? '166534' : '1E40AF', bold: true, fontFace: 'Arial' });
  s11.addText(f.text, { x: x + 0.3, y: y + 0.8, w: 5.1, fontSize: 11, color: C_SLATE, fontFace: 'Arial' });
});

// ==========================================
// SLIDE 12: THANK YOU & Q&A
// ==========================================
const s12 = pres.addSlide();
s12.background = { color: C_DARK };
s12.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 0.3, h: '100%', fill: { color: C_RED } });

s12.addText('THANK YOU', { x: 0.8, y: 1.2, fontSize: 40, color: C_WHITE, bold: true, fontFace: 'Arial' });
s12.addText('Questions & Viva Voce Discussion', { x: 0.8, y: 2.1, fontSize: 18, color: 'EF4444', bold: true, fontFace: 'Arial' });

s12.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 2.8, w: 11.7, h: 3.8, fill: { color: '1E293B' }, radius: 0.1 });
s12.addText([
  { text: 'Blood Donation Management System — Minor Project Evaluation\n\n', options: { bold: true, color: C_WHITE, fontSize: 15 } },
  { text: 'Submitted By:\n', options: { color: '94A3B8', fontSize: 12 } },
  { text: '• Anshuman Jaglan (Roll No: 01614813123) — Phone: +91 9466291852 | jaglananshuman@gmail.com\n• Harsh Solanki (Roll No: 01514813123)\n• Umesh Kumar (Roll No: 01314813123)\n\n', options: { color: C_WHITE, fontSize: 12 } },
  { text: 'Department & College:\n', options: { color: '94A3B8', fontSize: 12 } },
  { text: 'Department of Information Technology & Engineering (ITE)\nMaharaja Agrasen Institute of Technology (MAIT) | Batch 2023 - 2027\n\n', options: { color: '38BDF8', fontSize: 12 } },
  { text: 'Special Thanks & Gratitude:\n', options: { color: '94A3B8', fontSize: 12 } },
  { text: 'Ms. Sapna Gupta (Project Guide) • Mr. Pawan Sharma (Mentor) • Dr. Bhoomi Gupta (HOD)', options: { bold: true, color: '4ADE80', fontSize: 13 } }
], { x: 1.1, y: 3.1, w: 11.1, h: 3.2, fontFace: 'Arial' });

// Output Path
const outPath = path.join(__dirname, '..', 'Blood_Donation_Management_System_Presentation.pptx');

pres.writeFile({ fileName: outPath })
  .then(() => {
    console.log('SUCCESS: Presentation generated at:', outPath);
  })
  .catch(err => {
    console.error('ERROR generating presentation:', err);
  });
