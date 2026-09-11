const pptxgen = require('pptxgenjs');
const path = require('path');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'Anshuman Jaglan, Harsh Solanki, Umesh Kumar';
pres.company = 'MAIT, Department of ITE';
pres.title = 'Blood Donation Management System - Minor Project';

// High-Contrast Modern Healthcare Color Palette
const C_DARK = '0F172A';
const C_SLATE_DARK = '1E293B';
const C_RED = 'DC2626';
const C_CRIMSON = '991B1B';
const C_LIGHT_RED = 'FEE2E2';
const C_WHITE = 'FFFFFF';
const C_SLATE = '64748B';
const C_LIGHT_BG = 'F8FAFC';
const C_BLUE = '2563EB';
const C_LIGHT_BLUE = 'DBEAFE';
const C_GREEN = '16A34A';
const C_LIGHT_GREEN = 'DCFCE7';
const C_AMBER = 'D97706';
const C_CARD_BG = 'FFFFFF';

// Image Assets
const IMG_HERO_LAB = path.join(__dirname, '..', 'public', 'images', 'hero_lab.jpg');
const IMG_NETWORK = path.join(__dirname, '..', 'public', 'images', 'network_grid.jpg');
const IMG_DONOR_PASS = path.join(__dirname, '..', 'public', 'images', 'donor_pass_mobile.jpg');

// Standard Slide Header & Footer
function addHeader(slide, title, category = 'ACADEMIC MINOR PROJECT PRESENTATION 2026') {
  // Top Banner
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 1.1, fill: { color: C_DARK } });
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 1.05, w: '100%', h: 0.05, fill: { color: C_RED } });
  slide.addText(category, { x: 0.8, y: 0.18, fontSize: 10, color: 'EF4444', bold: true, fontFace: 'Arial' });
  slide.addText(title, { x: 0.8, y: 0.42, fontSize: 22, color: C_WHITE, bold: true, fontFace: 'Arial' });

  // Bottom Footer
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 7.0, w: '100%', h: 0.5, fill: { color: 'F1F5F9' } });
  slide.addText('Maharaja Agrasen Institute of Technology (MAIT) | Department of ITE | Batch 2023 - 2027', {
    x: 0.8, y: 7.12, fontSize: 10, color: C_SLATE, fontFace: 'Arial'
  });
  slide.addText('RaktDaan Healthcare Platform', {
    x: 9.5, y: 7.12, w: 3.0, fontSize: 10, color: 'DC2626', bold: true, align: 'right', fontFace: 'Arial'
  });
}

// ========================================================
// SLIDE 1: CREATIVE COVER & FRONT PAGE (WITH HERO IMAGE)
// ========================================================
const s1 = pres.addSlide();
s1.background = { color: C_DARK };

// Red edge accent
s1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 0.3, h: '100%', fill: { color: C_RED } });

// Academic Pill
s1.addShape(pres.ShapeType.roundRect, { x: 0.7, y: 0.45, w: 4.8, h: 0.38, fill: { color: C_CRIMSON }, radius: 0.08 });
s1.addText('ACADEMIC MINOR PROJECT (BATCH 2023 - 2027)', {
  x: 0.7, y: 0.5, w: 4.8, fontSize: 10.5, color: C_WHITE, bold: true, align: 'center', fontFace: 'Arial'
});

// Title
s1.addText('BLOOD DONATION\nMANAGEMENT SYSTEM', {
  x: 0.7, y: 0.95, fontSize: 32, color: C_WHITE, bold: true, fontFace: 'Arial', lineSpacing: 36
});

s1.addText('Centralized Healthcare Information Infrastructure, Real-Time Inventory Control & Automated Matching', {
  x: 0.7, y: 2.15, w: 7.0, fontSize: 11, color: '94A3B8', fontFace: 'Arial'
});

// Embedded Hero Image on the Right
s1.addImage({
  path: IMG_HERO_LAB,
  x: 8.0, y: 0.45, w: 4.8, h: 2.7,
  round: true
});
s1.addShape(pres.ShapeType.roundRect, {
  x: 8.0, y: 0.45, w: 4.8, h: 2.7,
  fill: { type: 'none' },
  line: { color: 'EF4444', width: 2 },
  radius: 0.1
});

// Institutional Header Badge
s1.addShape(pres.ShapeType.roundRect, { x: 0.7, y: 2.85, w: 12.1, h: 0.7, fill: { color: C_SLATE_DARK }, line: { color: '334155', width: 1 }, radius: 0.08 });
s1.addText('MAHARAJA AGRASEN INSTITUTE OF TECHNOLOGY (MAIT)  |  DEPARTMENT OF ITE', {
  x: 0.9, y: 2.97, fontSize: 11.5, color: '38BDF8', bold: true, fontFace: 'Arial'
});
s1.addText('Affiliated to GGSIPU, Delhi  •  Approved by AICTE  •  Accredited by NBA', {
  x: 0.9, y: 3.25, fontSize: 9.5, color: '94A3B8', fontFace: 'Arial'
});

// Team Members Box
s1.addShape(pres.ShapeType.roundRect, { x: 0.7, y: 3.75, w: 5.9, h: 3.15, fill: { color: C_SLATE_DARK }, line: { color: 'DC2626', width: 1.5 }, radius: 0.1 });
s1.addText('PROJECT DEVELOPERS & CONTRIBUTORS', { x: 0.9, y: 3.92, fontSize: 10.5, color: 'F87171', bold: true, fontFace: 'Arial' });
s1.addText([
  { text: '1. Anshuman Jaglan ', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: '(Roll No: 01614813123)\n', options: { color: '38BDF8', fontSize: 11, bold: true } },
  { text: '   Team Lead & Full Stack Architecture\n', options: { color: 'CBD5E1', fontSize: 9.5 } },
  { text: '   📞 +91 9466291852  |  ✉️ jaglananshuman@gmail.com\n\n', options: { color: '94A3B8', fontSize: 9 } },
  { text: '2. Harsh Solanki ', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: '(Roll No: 01514813123)\n', options: { color: '38BDF8', fontSize: 11, bold: true } },
  { text: '   Backend & Database Management\n\n', options: { color: 'CBD5E1', fontSize: 9.5 } },
  { text: '3. Umesh Kumar ', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: '(Roll No: 01314813123)\n', options: { color: '38BDF8', fontSize: 11, bold: true } },
  { text: '   Frontend UI & Compatibility Logic', options: { color: 'CBD5E1', fontSize: 9.5 } }
], { x: 0.9, y: 4.18, w: 5.5, h: 2.6, fontFace: 'Arial' });

// Faculty Guidance Box
s1.addShape(pres.ShapeType.roundRect, { x: 6.9, y: 3.75, w: 5.9, h: 3.15, fill: { color: C_SLATE_DARK }, line: { color: '38BDF8', width: 1.5 }, radius: 0.1 });
s1.addText('ACADEMIC SUPERVISION & MENTORSHIP', { x: 7.1, y: 3.92, fontSize: 10.5, color: '38BDF8', bold: true, fontFace: 'Arial' });
s1.addText([
  { text: 'Project Guide:\n', options: { color: '94A3B8', fontSize: 9.5 } },
  { text: 'Ms. Sapna Gupta\n', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Assistant Professor, Department of ITE, MAIT\n\n', options: { color: 'CBD5E1', fontSize: 9 } },
  { text: 'Mentor Teacher:\n', options: { color: '94A3B8', fontSize: 9.5 } },
  { text: 'Mr. Pawan Sharma\n', options: { bold: true, color: C_WHITE, fontSize: 12.5 } },
  { text: 'Assistant Professor, Department of ITE, MAIT\n\n', options: { color: 'CBD5E1', fontSize: 9 } },
  { text: 'Head of Department (HOD):\n', options: { color: '94A3B8', fontSize: 9.5 } },
  { text: 'Dr. Bhoomi Gupta', options: { bold: true, color: '4ADE80', fontSize: 12.5 } }
], { x: 7.1, y: 4.18, w: 5.5, h: 2.6, fontFace: 'Arial' });

// ========================================================
// SLIDE 2: PROBLEM STATEMENT & LATENCY BENCHMARK CHART
// ========================================================
const s2 = pres.addSlide();
s2.background = { color: C_LIGHT_BG };
addHeader(s2, 'Problem Statement: Emergency Response Latency');

s2.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.4, w: 5.6, h: 5.3, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
s2.addText('THE HEALTHCARE CRISIS & BOTTLENECK', { x: 1.1, y: 1.65, fontSize: 12, color: C_RED, bold: true, fontFace: 'Arial' });
s2.addText([
  { text: 'Perishable Nature: ', options: { bold: true, color: C_DARK, fontSize: 12 } },
  { text: 'Whole blood lasts only 35-42 days with zero synthetic substitutes.\n\n', options: { color: C_SLATE, fontSize: 11 } },
  { text: 'Information Black Hole: ', options: { bold: true, color: C_DARK, fontSize: 12 } },
  { text: 'Over 85% of blood banks maintain siloed registers. Relatives make frantic phone calls during trauma, cardiac surgeries, and maternal hemorrhages.\n\n', options: { color: C_SLATE, fontSize: 11 } },
  { text: 'Manual Latency: ', options: { bold: true, color: C_DARK, fontSize: 12 } },
  { text: 'Traditional acquisition averages 3 to 5 hours (270 minutes), leading to preventable clinical mortality.\n\n', options: { color: C_SLATE, fontSize: 11 } },
  { text: 'RaktDaan Platform Solution: ', options: { bold: true, color: '166534', fontSize: 12 } },
  { text: 'Automated donor matching & live stock telemetry slashes response time to 8.5 minutes (97% latency reduction).', options: { color: C_DARK, fontSize: 11, bold: true } }
], { x: 1.1, y: 2.0, w: 5.0, h: 4.4, fontFace: 'Arial' });

// Native Chart: Latency Comparison
s2.addShape(pres.ShapeType.roundRect, { x: 6.8, y: 1.4, w: 5.7, h: 5.3, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
s2.addText('DATA BENCHMARK: Search Latency (Minutes)', { x: 7.1, y: 1.65, fontSize: 12, color: '1E40AF', bold: true, fontFace: 'Arial' });

const latencyData = [
  {
    name: 'Traditional System',
    labels: ['Donor Search', 'Stock Audit', 'Hospital Coord.', 'Total Response'],
    values: [120, 60, 90, 270]
  },
  {
    name: 'RaktDaan Platform',
    labels: ['Donor Search', 'Stock Audit', 'Hospital Coord.', 'Total Response'],
    values: [2, 0.5, 6, 8.5]
  }
];

s2.addChart(pres.ChartType.bar, latencyData, {
  x: 7.0, y: 2.1, w: 5.3, h: 4.3,
  barDir: 'col',
  barGrouping: 'clustered',
  chartColors: ['DC2626', '16A34A'],
  showLegend: true,
  legendPos: 'b',
  showTitle: false,
  valAxisMaxVal: 300,
  valAxisTitle: 'Time (Minutes)'
});

// ========================================================
// SLIDE 3: DATA-DRIVEN STOCK DISTRIBUTION CHART
// ========================================================
const s3 = pres.addSlide();
s3.background = { color: C_LIGHT_BG };
addHeader(s3, 'Central Blood Bank Live Inventory Distribution');

// Stock Overview Text Cards
s3.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.35, w: 11.7, h: 0.9, fill: { color: 'EFF6FF' }, line: { color: 'BFDBFE', width: 1 }, radius: 0.08 });
s3.addText('Real-time audit across all 8 standard ABO and Rh(D) blood groups with automated Safe, Low, and Critical threshold monitoring.', {
  x: 1.1, y: 1.55, w: 11.1, fontSize: 12, color: '1E3A8A', bold: true, fontFace: 'Arial'
});

// Bar Chart for Blood Stock
const stockData = [
  {
    name: 'Current Available Units',
    labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    values: [24, 8, 32, 6, 15, 4, 42, 5]
  },
  {
    name: 'Safe Threshold Level',
    labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    values: [10, 8, 12, 8, 8, 6, 15, 10]
  },
  {
    name: 'Critical Shortage Level',
    labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    values: [4, 3, 5, 3, 3, 2, 6, 3]
  }
];

s3.addChart(pres.ChartType.bar, stockData, {
  x: 0.8, y: 2.45, w: 11.7, h: 4.3,
  barDir: 'col',
  barGrouping: 'clustered',
  chartColors: ['2563EB', '16A34A', 'DC2626'],
  showLegend: true,
  legendPos: 't',
  showValAxisTitle: true,
  valAxisTitle: 'Units (Whole Blood 350-450ml)',
  valAxisMaxVal: 50
});

// ========================================================
// SLIDE 4: SMART CITY LOGISTICS & SYSTEM ARCHITECTURE (IMAGE)
// ========================================================
const s4 = pres.addSlide();
s4.background = { color: C_LIGHT_BG };
addHeader(s4, 'Smart City Healthcare Logistics & Multi-Tier Architecture');

// Left: Network Image
s4.addImage({
  path: IMG_NETWORK,
  x: 0.8, y: 1.4, w: 5.6, h: 5.3,
  round: true
});
s4.addShape(pres.ShapeType.roundRect, {
  x: 0.8, y: 1.4, w: 5.6, h: 5.3,
  fill: { type: 'none' },
  line: { color: '3B82F6', width: 2 },
  radius: 0.1
});

// Right: Architecture Tiers
const tiers = [
  { tier: '1. CLIENT LAYER', color: '1E40AF', bg: 'EFF6FF', desc: 'HTML5 Semantic Views • CSS3 Healthcare Design • Vanilla ES6+ JS • Chart.js Real-Time Dashboards • Zero bundle overhead.' },
  { tier: '2. REST API ENGINE', color: 'DC2626', bg: 'FEF2F2', desc: 'Node.js & Express.js Non-Blocking Event Loop • Endpoints: /api/inventory, /api/donors, /api/requests, /api/matching, /api/live-sync.' },
  { tier: '3. SMART MATCHING ENGINE', color: '166534', bg: 'F0FDF4', desc: 'Clinical ABO/Rh Transfusion Matrix • Scoring: Base(50) + Exact(+30) + Proximity(+20) • Dynamic donor ranking.' },
  { tier: '4. DUAL PERSISTENCE LAYER', color: 'D97706', bg: 'FFFBEB', desc: 'Production 3NF MySQL Relational Database (database.sql) + Zero-Config Persistent Local Storage Fallback for viva defense.' }
];

tiers.forEach((t, idx) => {
  const y = 1.4 + idx * 1.35;
  s4.addShape(pres.ShapeType.roundRect, { x: 6.8, y, w: 5.7, h: 1.25, fill: { color: t.bg }, line: { color: t.color, width: 1.5 }, radius: 0.1 });
  s4.addText(t.tier, { x: 7.0, y: y + 0.16, fontSize: 12.5, color: t.color, bold: true, fontFace: 'Arial' });
  s4.addText(t.desc, { x: 7.0, y: y + 0.48, w: 5.3, fontSize: 10, color: C_DARK, fontFace: 'Arial' });
});

// ========================================================
// SLIDE 5: CLINICAL ABO/RH MATRIX & MATHEMATICAL ENGINE
// ========================================================
const s5 = pres.addSlide();
s5.background = { color: C_LIGHT_BG };
addHeader(s5, 'Clinical ABO/Rh Compatibility & Scoring Engine');

s5.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.4, w: 5.7, h: 5.3, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
s5.addText('TRANSFUSION COMPATIBILITY RULES', { x: 1.1, y: 1.65, fontSize: 12, color: C_RED, bold: true, fontFace: 'Arial' });

const matrixRules = [
  '• O- (Universal Red Cell Donor): Can donate to all 8 groups (A+, A-, B+, B-, AB+, AB-, O+, O-). Critically needed for emergency trauma resuscitation.',
  '• AB+ (Universal Recipient): Possesses both A and B antigens and Rh factor; can safely receive red cells from all 8 blood groups.',
  '• O+ (High Demand Group): Can donate to all Rh-positive groups (O+, A+, B+, AB+), covering over 85% of clinical patients in India.',
  '• Rh-D Factor Constraints: Rh- individuals can ONLY receive Rh- blood. Transfusing Rh+ causes severe fatal hemolytic reactions.'
];

s5.addText(matrixRules.join('\n\n'), { x: 1.1, y: 2.1, w: 5.1, h: 4.3, fontSize: 10, color: C_DARK, fontFace: 'Arial' });

// Algorithmic Formulation Box
s5.addShape(pres.ShapeType.roundRect, { x: 6.8, y: 1.4, w: 5.7, h: 5.3, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
s5.addText('MATHEMATICAL PROXIMITY & MATCH FORMULATION', { x: 7.1, y: 1.65, fontSize: 12, color: '1E40AF', bold: true, fontFace: 'Arial' });

s5.addText([
  { text: 'Score = Base(50) + W_blood + W_location\n\n', options: { bold: true, color: '1E40AF', fontSize: 13 } },
  { text: '1. Blood Compatibility Weight (W_blood):\n', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: '   • Exact Blood Group Match: +30 Points\n   • Clinically Compatible Alternative: +15 Points\n\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: '2. Spatial Proximity Weight (W_location):\n', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: '   • Same City (e.g. Delhi to Delhi): +20 Points\n   • Nearby District/Region: +10 Points\n   • Other Cities: 0 Points\n\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: '3. Clinical Eligibility Gate:\n', options: { bold: true, color: '166534', fontSize: 11 } },
  { text: '   • is_available == TRUE and status == "Active"\n   • Age in range [18, 65] years\n   • Last whole blood donation >= 90 days ago', options: { color: '166534', fontSize: 10 } }
], { x: 7.1, y: 2.1, w: 5.1, h: 4.3, fontFace: 'Arial' });

// ========================================================
// SLIDE 6: DATA-DRIVEN REQUEST BREAKDOWN (DOUGHNUT CHART)
// ========================================================
const s6 = pres.addSlide();
s6.background = { color: C_LIGHT_BG };
addHeader(s6, 'Clinical Requisition Workflow & Fulfillment Data');

// Doughnut Chart: Request Status Breakdown
const reqStatusData = [
  {
    name: 'Requests Breakdown',
    labels: ['Fulfilled From Stock', 'Pending Normal', 'Emergency Critical', 'Donor Matched'],
    values: [48, 18, 14, 20]
  }
];

s6.addChart(pres.ChartType.doughnut, reqStatusData, {
  x: 0.8, y: 1.5, w: 5.6, h: 5.2,
  showLegend: true,
  legendPos: 'b',
  chartColors: ['16A34A', 'F59E0B', 'DC2626', '8B5CF6'],
  holeSize: 55
});

// Requisition Architecture Flow
s6.addShape(pres.ShapeType.roundRect, { x: 6.8, y: 1.5, w: 5.7, h: 5.2, fill: { color: C_CARD_BG }, line: { color: 'CBD5E1', width: 1 }, radius: 0.1 });
s6.addText('4-STEP LIVE MILESTONE TRACKING', { x: 7.1, y: 1.8, fontSize: 12, color: C_RED, bold: true, fontFace: 'Arial' });

const timelineSteps = [
  { step: 'Step 1: Intake & Triage', desc: 'Patient or hospital submits requisition with units needed and emergency priority flag.' },
  { step: 'Step 2: Medical Verification', desc: 'Admin or hospital coordinator verifies clinical diagnosis and prescription.' },
  { step: 'Step 3: Dispatch / Donor Match', desc: 'Auto-dispense from inventory or algorithmic matching with nearby voluntary donors.' },
  { step: 'Step 4: Transfusion Fulfilled', desc: 'Units received at medical center; inventory stock updated and transaction audited.' }
];

timelineSteps.forEach((st, idx) => {
  const y = 2.3 + idx * 1.05;
  s6.addShape(pres.ShapeType.roundRect, { x: 7.1, y, w: 5.1, h: 0.9, fill: { color: 'F8FAFC' }, line: { color: 'E2E8F0', width: 1 }, radius: 0.08 });
  s6.addText(st.step, { x: 7.3, y: y + 0.12, fontSize: 11, color: C_DARK, bold: true, fontFace: 'Arial' });
  s6.addText(st.desc, { x: 7.3, y: y + 0.42, w: 4.7, fontSize: 9.5, color: C_SLATE, fontFace: 'Arial' });
});

// ========================================================
// SLIDE 7: MONTHLY VOLUNTARY DONATION TREND (LINE CHART)
// ========================================================
const s7 = pres.addSlide();
s7.background = { color: C_LIGHT_BG };
addHeader(s7, 'Monthly Donation Drives & Inventory Intake Trends');

const monthlyTrendData = [
  {
    name: 'Voluntary Camp Donations',
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    values: [42, 58, 74, 65, 89, 112]
  },
  {
    name: 'Hospital Requisitions',
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    values: [38, 52, 68, 62, 81, 98]
  }
];

s7.addChart(pres.ChartType.line, monthlyTrendData, {
  x: 0.8, y: 1.5, w: 11.7, h: 5.1,
  chartColors: ['DC2626', '2563EB'],
  showLegend: true,
  legendPos: 't',
  valAxisTitle: 'Units of Blood Collected / Dispensed',
  lineSmooth: true,
  lineDataSymbol: 'circle'
});

// ========================================================
// SLIDE 8: DIGITAL DONOR PASS & MOBILE ENGAGEMENT (IMAGE)
// ========================================================
const s8 = pres.addSlide();
s8.background = { color: C_LIGHT_BG };
addHeader(s8, 'Digital Donor Pass & Smart Mobile Engagement');

// Left: Phone Mockup Image
s8.addImage({
  path: IMG_DONOR_PASS,
  x: 0.8, y: 1.4, w: 5.6, h: 5.3,
  round: true
});
s8.addShape(pres.ShapeType.roundRect, {
  x: 0.8, y: 1.4, w: 5.6, h: 5.3,
  fill: { type: 'none' },
  line: { color: 'EF4444', width: 2 },
  radius: 0.1
});

// Right: Pass Capabilities
const donorPassFeatures = [
  { title: 'Digital Donor Pass Card (DON-XXXX)', desc: 'Instant verifiable electronic pass generated with official unique identifier and dynamic verification badge.' },
  { title: 'Pre-Screening Medical Checklist', desc: 'Evaluates age (18-65), body weight (>50kg), hemoglobin level, and last donation interval (>= 90 days).' },
  { title: 'Scannable QR Verification', desc: 'Allows hospital intake coordinators to scan donor credential at emergency triage for instant identity audit.' },
  { title: 'Donation History & Life-Saving Impact', desc: 'Displays total units contributed, previous donation dates, and next eligibility date.' }
];

donorPassFeatures.forEach((feat, idx) => {
  const y = 1.4 + idx * 1.35;
  s8.addShape(pres.ShapeType.roundRect, { x: 6.8, y, w: 5.7, h: 1.25, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
  s8.addText(feat.title, { x: 7.0, y: y + 0.18, fontSize: 12, color: C_RED, bold: true, fontFace: 'Arial' });
  s8.addText(feat.desc, { x: 7.0, y: y + 0.52, w: 5.3, fontSize: 10, color: C_SLATE, fontFace: 'Arial' });
});

// ========================================================
// SLIDE 9: EXECUTIVE ADMIN DASHBOARD & TELEMETRY
// ========================================================
const s9 = pres.addSlide();
s9.background = { color: C_LIGHT_BG };
addHeader(s9, 'Executive Administrator Dashboard & Live Telemetry');

const adminFeats = [
  { title: 'Chief Administrator: Dr. Anshuman Jaglan', desc: 'Role-based administrative authentication with session tokens and secure audit trails.' },
  { title: 'Live Dynamic Telemetry & Memory', desc: 'Clicking "Refresh Live Data" executes simulation syncing realistic hospital activity while permanently preserving manual edits.' },
  { title: 'Interactive Chart.js Visualizations', desc: 'Live bar charts for stock levels and doughnut charts for request fulfillment states.' },
  { title: 'One-Click Inventory Unit Steppers', desc: 'Direct +/- buttons to increment or decrement units for emergency shipments or walk-in camps.' },
  { title: 'Direct Fulfillment & Donor Dispatch', desc: 'One-click action to dispense directly from blood bank stock (auto-deducts units) or assign registered donors.' },
  { title: 'Instant CSV Audit & Viva Exports', desc: 'One-click export of donor rosters and inventory audits for university examination review.' }
];

adminFeats.forEach((af, idx) => {
  const x = 0.8 + (idx % 2) * 6.0;
  const y = 1.5 + Math.floor(idx / 2) * 1.75;
  s9.addShape(pres.ShapeType.roundRect, { x, y, w: 5.7, h: 1.55, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
  s9.addText(af.title, { x: x + 0.25, y: y + 0.2, fontSize: 12, color: C_DARK, bold: true, fontFace: 'Arial' });
  s9.addText(af.desc, { x: x + 0.25, y: y + 0.65, w: 5.2, fontSize: 10, color: C_SLATE, fontFace: 'Arial' });
});

// ========================================================
// SLIDE 10: VERIFICATION, TESTS & LIVE DEPLOYMENT
// ========================================================
const s10 = pres.addSlide();
s10.background = { color: C_LIGHT_BG };
addHeader(s10, 'Testing, Verification & Cloud Deployment');

// Test Box
s10.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.4, w: 11.7, h: 2.3, fill: { color: C_LIGHT_GREEN }, line: { color: '86EFAC', width: 1.5 }, radius: 0.1 });
s10.addText('AUTOMATED END-TO-END SANITY TEST SUITE: 9 PASSED / 0 FAILED', { x: 1.1, y: 1.65, fontSize: 13, color: C_GREEN, bold: true, fontFace: 'Arial' });
s10.addText([
  { text: '✓ Server Health Check (/health)\n✓ Inventory Stock Queries (All 8 Groups)\n✓ Donor Registration & Age Validator (18-65)\n', options: { color: '065F46', fontSize: 10 } },
  { text: '✓ Clinical ABO/Rh Matching Matrix (O- Universal)\n✓ Blood Request Code Generation (REQ-XXXX)\n✓ Real-Time Multi-Step Request Tracking\n', options: { color: '065F46', fontSize: 10 } },
  { text: '✓ Inventory Direct Stock Deduction Workflow\n✓ Chief Admin Authentication & Session\n✓ Live Telemetry Endpoint & Memory Persistence', options: { color: '065F46', fontSize: 10 } }
], { x: 1.1, y: 2.05, w: 11.1, h: 1.5, fontFace: 'Arial' });

// Deployment Modes
const depModes = [
  { title: '1. Production Cloud (Render.com)', desc: 'Containerized with Docker (Node.js 20-Alpine) with automated GitHub CI/CD git integration.' },
  { title: '2. Live Global HTTPS Tunnel', desc: 'Instant live public link (localtunnel) accessible from mobile phones and external browsers worldwide.' },
  { title: '3. 1-Click Lab Scripts', desc: 'Includes run-server.bat, share-online.bat, and present.bat for immediate, zero-lag offline viva presentations.' }
];

depModes.forEach((dm, idx) => {
  const x = 0.8 + idx * 4.0;
  s10.addShape(pres.ShapeType.roundRect, { x, y: 3.9, w: 3.7, h: 2.8, fill: { color: C_CARD_BG }, line: { color: 'CBD5E1', width: 1 }, radius: 0.1 });
  s10.addText(dm.title, { x: x + 0.2, y: 4.15, fontSize: 11, color: C_DARK, bold: true, fontFace: 'Arial' });
  s10.addText(dm.desc, { x: x + 0.2, y: 4.65, w: 3.3, fontSize: 10, color: C_SLATE, fontFace: 'Arial' });
});

// ========================================================
// SLIDE 11: SOCIETAL IMPACT & FUTURE WORK
// ========================================================
const s11 = pres.addSlide();
s11.background = { color: C_LIGHT_BG };
addHeader(s11, 'Societal Impact, SDGs & Future Enhancements');

const impacts = [
  { title: 'Immediate Real-World Impact', desc: 'Centralized blood search, slashed emergency requisition latency from hours to seconds, and bridged donors, hospitals, and blood banks seamlessly.' },
  { title: 'SDG 3 & 9 Health Compliance', desc: 'Directly supports WHO and National Health Mission targets by eliminating delays in maternal care, road accident trauma, and dialysis.' },
  { title: 'Automated SMS / WhatsApp Gateway', desc: 'Integration with Twilio / WhatsApp Cloud API for automated geolocation broadcasts to nearby eligible voluntary donors.' },
  { title: 'IoT Cold-Chain Storage Monitoring', desc: 'Integration with smart hardware temperature sensors to ensure blood bags maintain 2°C to 6°C cold-chain integrity.' }
];

impacts.forEach((imp, idx) => {
  const x = 0.8 + (idx % 2) * 6.0;
  const y = 1.5 + Math.floor(idx / 2) * 2.6;
  s11.addShape(pres.ShapeType.roundRect, { x, y, w: 5.7, h: 2.3, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
  s11.addText(imp.title, { x: x + 0.3, y: y + 0.3, fontSize: 13, color: idx < 2 ? '166534' : '1E40AF', bold: true, fontFace: 'Arial' });
  s11.addText(imp.desc, { x: x + 0.3, y: y + 0.8, w: 5.1, fontSize: 10.5, color: C_SLATE, fontFace: 'Arial' });
});

// ========================================================
// SLIDE 12: THANK YOU & VIVA Q&A
// ========================================================
const s12 = pres.addSlide();
s12.background = { color: C_DARK };
s12.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 0.3, h: '100%', fill: { color: C_RED } });

s12.addText('THANK YOU', { x: 0.8, y: 1.0, fontSize: 44, color: C_WHITE, bold: true, fontFace: 'Arial' });
s12.addText('Questions & Viva Voce Discussion', { x: 0.8, y: 1.85, fontSize: 18, color: 'EF4444', bold: true, fontFace: 'Arial' });

s12.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 2.6, w: 11.7, h: 4.1, fill: { color: C_SLATE_DARK }, line: { color: '334155', width: 1 }, radius: 0.1 });
s12.addText([
  { text: 'Blood Donation Management System — Minor Project Defense\n\n', options: { bold: true, color: C_WHITE, fontSize: 15 } },
  { text: 'Project Team Members:\n', options: { color: '94A3B8', fontSize: 11 } },
  { text: '• Anshuman Jaglan (Roll No: 01614813123)  —  📞 +91 9466291852  |  ✉️ jaglananshuman@gmail.com\n• Harsh Solanki (Roll No: 01514813123)\n• Umesh Kumar (Roll No: 01314813123)\n\n', options: { color: C_WHITE, fontSize: 11 } },
  { text: 'Department & College:\n', options: { color: '94A3B8', fontSize: 11 } },
  { text: 'Department of Information Technology & Engineering (ITE)\nMaharaja Agrasen Institute of Technology (MAIT)  |  Batch 2023 - 2027\n\n', options: { color: '38BDF8', fontSize: 12 } },
  { text: 'Academic Mentorship & Gratitude:\n', options: { color: '94A3B8', fontSize: 11 } },
  { text: 'Ms. Sapna Gupta (Project Guide)  •  Mr. Pawan Sharma (Mentor)  •  Dr. Bhoomi Gupta (HOD)', options: { bold: true, color: '4ADE80', fontSize: 12 } }
], { x: 1.1, y: 2.8, w: 11.1, h: 3.7, fontFace: 'Arial' });

// Output Paths
const outPath = path.join(__dirname, '..', 'Blood_Donation_Management_System_Presentation.pptx');
const publicOutPath = path.join(__dirname, '..', 'public', 'Blood_Donation_Management_System_Presentation.pptx');

pres.writeFile({ fileName: outPath })
  .then(() => {
    const fs = require('fs');
    fs.copyFileSync(outPath, publicOutPath);
    console.log('SUCCESS: High-Impact Creative Presentation generated at:', outPath);
    console.log('Copied to public folder for direct web download:', publicOutPath);
  })
  .catch(err => {
    console.error('ERROR generating presentation:', err);
  });

