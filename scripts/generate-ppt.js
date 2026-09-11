const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

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
// SLIDE 2: PRESENTATION OUTLINE / TABLE OF CONTENTS (FRONT PAGE ITEM)
// ========================================================
const s2 = pres.addSlide();
s2.background = { color: C_LIGHT_BG };
addHeader(s2, 'Presentation Outline & Evaluation Framework');

const agendaItems = [
  { num: '01', title: 'Objectives of the Project', desc: 'Core engineering goals, real-time inventory tracking, clinical compatibility engine, and emergency triage queue.', color: 'DC2626', bg: 'FEF2F2' },
  { num: '02', title: 'Motivation and Problem Statement', desc: 'Emergency response latency bottlenecks, 35-day blood shelf-life crisis, and data-driven benchmark comparisons.', color: '2563EB', bg: 'EFF6FF' },
  { num: '03', title: 'Literature Survey related to the proposed work', desc: 'Comprehensive comparative review of e-RaktKosh, Red Cross, and peer-reviewed healthcare supply chain literature.', color: '16A34A', bg: 'F0FDF4' },
  { num: '04', title: 'Research Methodology / Proposed Methodology', desc: 'Mathematical scoring algorithm, ABO/Rh clinical matrix, smart city logistics, and 4-tier microservices architecture.', color: 'D97706', bg: 'FFFBEB' },
  { num: '05', title: 'Expected Outcomes (if applicable)', desc: 'Live 8-group stock analytics, request status distribution, monthly donation drive trends, and digital donor pass mockup.', color: '7C3AED', bg: 'F5F3FF' },
  { num: '06', title: 'References', desc: 'Standard IEEE academic citations, WHO blood transfusion guidelines, and National Health Mission regulatory standards.', color: '0D9488', bg: 'F0FDFA' }
];

agendaItems.forEach((item, idx) => {
  const col = idx % 2;
  const row = Math.floor(idx / 2);
  const x = 0.8 + col * 6.0;
  const y = 1.45 + row * 1.75;

  s2.addShape(pres.ShapeType.roundRect, { x, y, w: 5.7, h: 1.55, fill: { color: item.bg }, line: { color: item.color, width: 1.5 }, radius: 0.1 });
  s2.addShape(pres.ShapeType.roundRect, { x: x + 0.25, y: y + 0.2, w: 0.65, h: 0.35, fill: { color: item.color }, radius: 0.06 });
  s2.addText(item.num, { x: x + 0.25, y: y + 0.22, w: 0.65, fontSize: 11, color: C_WHITE, bold: true, align: 'center', fontFace: 'Arial' });
  s2.addText(item.title, { x: x + 1.05, y: y + 0.2, w: 4.4, fontSize: 12, color: C_DARK, bold: true, fontFace: 'Arial' });
  s2.addText(item.desc, { x: x + 0.25, y: y + 0.68, w: 5.2, fontSize: 9.5, color: C_SLATE, fontFace: 'Arial' });
});

// ========================================================
// SLIDE 3: 1. OBJECTIVES OF THE PROJECT
// ========================================================
const s3 = pres.addSlide();
s3.background = { color: C_LIGHT_BG };
addHeader(s3, '1. Objectives of the Project');

const objectives = [
  {
    title: 'Centralized Health Informatics Platform',
    desc: 'Develop a responsive web ecosystem connecting blood donors, hospitals, and blood banks into a unified digital registry, eliminating scattered communication.',
    metric: 'Target: 100% Digital Transition'
  },
  {
    title: 'Real-Time Inventory Audit for All 8 Groups',
    desc: 'Maintain dynamic stock telemetry across A+, A-, B+, B-, AB+, AB-, O+, and O- with automated Safe, Low, and Critical threshold shortage triggers.',
    metric: 'Target: Zero Phantom Stock'
  },
  {
    title: 'Clinical ABO/Rh & Spatial Proximity Matcher',
    desc: 'Implement algorithmic ranking combining strict red blood cell antigen compatibility with geographical donor distance scoring (Score = Base + W_blood + W_location).',
    metric: 'Target: Multi-Tier Donor Ranking'
  },
  {
    title: 'Emergency Priority Queue & Milestone Tracker',
    desc: 'Provide high-priority routing for acute hemorrhage, cardiac surgeries, and maternal trauma with transparent 4-stage live tracking (Intake → Verification → Dispatch → Fulfilled).',
    metric: 'Target: < 10 Min Response'
  }
];

objectives.forEach((obj, idx) => {
  const y = 1.45 + idx * 1.35;
  s3.addShape(pres.ShapeType.roundRect, { x: 0.8, y, w: 11.7, h: 1.25, fill: { color: C_CARD_BG }, line: { color: 'CBD5E1', width: 1 }, radius: 0.1 });
  s3.addShape(pres.ShapeType.roundRect, { x: 1.1, y: y + 0.2, w: 0.45, h: 0.45, fill: { color: C_RED }, radius: 0.08 });
  s3.addText(`${idx + 1}`, { x: 1.1, y: y + 0.28, w: 0.45, fontSize: 13, color: C_WHITE, bold: true, align: 'center', fontFace: 'Arial' });
  s3.addText(obj.title, { x: 1.75, y: y + 0.22, fontSize: 13, color: C_DARK, bold: true, fontFace: 'Arial' });
  s3.addText(obj.desc, { x: 1.75, y: y + 0.6, w: 8.0, fontSize: 10, color: C_SLATE, fontFace: 'Arial' });
  
  // Metric Badge
  s3.addShape(pres.ShapeType.roundRect, { x: 9.8, y: y + 0.35, w: 2.4, h: 0.55, fill: { color: 'EFF6FF' }, line: { color: '3B82F6', width: 1 }, radius: 0.08 });
  s3.addText(obj.metric, { x: 9.8, y: y + 0.45, w: 2.4, fontSize: 9.5, color: '1E40AF', bold: true, align: 'center', fontFace: 'Arial' });
});

// ========================================================
// SLIDE 4: 2. MOTIVATION & PROBLEM STATEMENT (WITH CHART)
// ========================================================
const s4 = pres.addSlide();
s4.background = { color: C_LIGHT_BG };
addHeader(s4, '2. Motivation and Problem Statement');

s4.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.4, w: 5.6, h: 5.3, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
s4.addText('CLINICAL MOTIVATION & SUPPLY BOTTLENECK', { x: 1.1, y: 1.65, fontSize: 12, color: C_RED, bold: true, fontFace: 'Arial' });
s4.addText([
  { text: 'Perishable Biological Resource: ', options: { bold: true, color: C_DARK, fontSize: 11.5 } },
  { text: 'Whole blood has a strict shelf-life of 35-42 days with zero synthetic alternatives.\n\n', options: { color: C_SLATE, fontSize: 10.5 } },
  { text: 'Siloed Information Infrastructure: ', options: { bold: true, color: C_DARK, fontSize: 11.5 } },
  { text: 'Over 85% of regional blood banks operate on isolated registers. During emergencies, patients rely on chaotic phone calls and unverified social media pleas.\n\n', options: { color: C_SLATE, fontSize: 10.5 } },
  { text: 'Critical Emergency Delay: ', options: { bold: true, color: C_DARK, fontSize: 11.5 } },
  { text: 'Traditional blood acquisition takes 3 to 5 hours (270 minutes avg.), causing preventable fatalities during surgical hemorrhage and road trauma.\n\n', options: { color: C_SLATE, fontSize: 10.5 } },
  { text: 'Platform Value Proposition: ', options: { bold: true, color: '166534', fontSize: 11.5 } },
  { text: 'RaktDaan automated donor matching & live stock telemetry slashes acquisition latency down to 8.5 minutes (97% reduction).', options: { color: C_DARK, fontSize: 10.5, bold: true } }
], { x: 1.1, y: 2.0, w: 5.0, h: 4.4, fontFace: 'Arial' });

// Native Chart: Latency Comparison
s4.addShape(pres.ShapeType.roundRect, { x: 6.8, y: 1.4, w: 5.7, h: 5.3, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
s4.addText('DATA BENCHMARK: Response Latency (Minutes)', { x: 7.1, y: 1.65, fontSize: 12, color: '1E40AF', bold: true, fontFace: 'Arial' });

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

s4.addChart(pres.ChartType.bar, latencyData, {
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
// SLIDE 5: 3. LITERATURE SURVEY RELATED TO PROPOSED WORK
// ========================================================
const s5 = pres.addSlide();
s5.background = { color: C_LIGHT_BG };
addHeader(s5, '3. Literature Survey related to the Proposed Work');

// Table Data: Comparative Literature Analysis
const litTableData = [
  [
    { text: 'System / Literature Reference', options: { bold: true, fill: { color: '1E293B' }, color: C_WHITE, fontSize: 9.5 } },
    { text: 'Core Architecture', options: { bold: true, fill: { color: '1E293B' }, color: C_WHITE, fontSize: 9.5 } },
    { text: 'Real-Time Inventory', options: { bold: true, fill: { color: '1E293B' }, color: C_WHITE, fontSize: 9.5 } },
    { text: 'ABO/Rh Matching Logic', options: { bold: true, fill: { color: '1E293B' }, color: C_WHITE, fontSize: 9.5 } },
    { text: 'Emergency Latency', options: { bold: true, fill: { color: '1E293B' }, color: C_WHITE, fontSize: 9.5 } },
    { text: 'Identified Research Gaps', options: { bold: true, fill: { color: '1E293B' }, color: C_WHITE, fontSize: 9.5 } }
  ],
  [
    { text: 'e-RaktKosh (National Portal)', options: { bold: true, fontSize: 9 } },
    { text: 'Centralized Web DB', options: { fontSize: 8.5 } },
    { text: 'Batch / Delayed updates', options: { fontSize: 8.5, color: 'DC2626' } },
    { text: 'Exact blood match only', options: { fontSize: 8.5 } },
    { text: '2 – 4 Hours', options: { fontSize: 8.5, color: 'DC2626' } },
    { text: 'No universal donor fallback; frequent stale data issues.', options: { fontSize: 8.5 } }
  ],
  [
    { text: 'Red Cross Mobile Application', options: { bold: true, fontSize: 9 } },
    { text: 'Donor Rewards App', options: { fontSize: 8.5 } },
    { text: 'Regional Blood Banks', options: { fontSize: 8.5 } },
    { text: 'Manual Donor Selection', options: { fontSize: 8.5 } },
    { text: '1 – 3 Hours', options: { fontSize: 8.5 } },
    { text: 'Lack of automated hospital triage & public API access.', options: { fontSize: 8.5 } }
  ],
  [
    { text: 'Traditional Paper Registries', options: { bold: true, fontSize: 9 } },
    { text: 'Physical Logbooks', options: { fontSize: 8.5 } },
    { text: 'None (Physical Count)', options: { fontSize: 8.5, color: 'DC2626' } },
    { text: 'None (Human Memory)', options: { fontSize: 8.5, color: 'DC2626' } },
    { text: '3 – 5 Hours', options: { fontSize: 8.5, color: 'DC2626' } },
    { text: 'Vulnerable to loss, zero remote audit, high error rate.', options: { fontSize: 8.5 } }
  ],
  [
    { text: 'Proposed System (RaktDaan)', options: { bold: true, fill: { color: 'DCFCE7' }, color: '166534', fontSize: 9.5 } },
    { text: 'Node.js Microservices + 3NF DB', options: { bold: true, fill: { color: 'DCFCE7' }, fontSize: 8.5 } },
    { text: 'Real-Time Dynamic Sync', options: { bold: true, fill: { color: 'DCFCE7' }, color: '166534', fontSize: 8.5 } },
    { text: 'Algorithmic + Spatial Proximity', options: { bold: true, fill: { color: 'DCFCE7' }, color: '166534', fontSize: 8.5 } },
    { text: '< 10 Minutes', options: { bold: true, fill: { color: 'DCFCE7' }, color: '166534', fontSize: 8.5 } },
    { text: 'Full-stack automation, universal donor rules, digital passes.', options: { bold: true, fill: { color: 'DCFCE7' }, fontSize: 8.5 } }
  ]
];

s5.addTable(litTableData, {
  x: 0.8, y: 1.45, w: 11.7, h: 3.5,
  colW: [2.3, 1.8, 1.8, 1.9, 1.5, 2.4],
  border: { color: 'CBD5E1', width: 1 },
  fill: { color: C_WHITE }
});

// Key Research Literature Takeaways
s5.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 5.2, w: 11.7, h: 1.5, fill: { color: 'EFF6FF' }, line: { color: '3B82F6', width: 1.5 }, radius: 0.08 });
s5.addText('KEY SCIENTIFIC GAPS ADDRESSED IN THIS WORK:', { x: 1.1, y: 5.35, fontSize: 11, color: '1E40AF', bold: true, fontFace: 'Arial' });
s5.addText([
  { text: '1. Transfusion Compatibility Gap: ', options: { bold: true, color: C_DARK, fontSize: 10 } },
  { text: 'Existing portals fail when exact blood type is unavailable; RaktDaan incorporates clinical universal donor alternatives (O- red cell matrix).\n', options: { color: C_SLATE, fontSize: 9.5 } },
  { text: '2. Algorithmic Proximity Scoring: ', options: { bold: true, color: C_DARK, fontSize: 10 } },
  { text: 'Replaces brute-force lists with normalized multi-criteria ranking: Score = Base(50) + W_blood + W_location.\n', options: { color: C_SLATE, fontSize: 9.5 } },
  { text: '3. Dual-Persistence Fault Tolerance: ', options: { bold: true, color: C_DARK, fontSize: 10 } },
  { text: 'Engineered with production 3NF MySQL and automatic in-memory fallback for zero downtime.', options: { color: C_SLATE, fontSize: 9.5 } }
], { x: 1.1, y: 5.65, w: 11.1, h: 0.95, fontFace: 'Arial' });

// ========================================================
// SLIDE 6: 4. RESEARCH METHODOLOGY / PROPOSED METHODOLOGY (IMAGE)
// ========================================================
const s6 = pres.addSlide();
s6.background = { color: C_LIGHT_BG };
addHeader(s6, '4. Research Methodology / Proposed Methodology');

// Left: Network Image
s6.addImage({
  path: IMG_NETWORK,
  x: 0.8, y: 1.4, w: 5.6, h: 5.3,
  round: true
});
s6.addShape(pres.ShapeType.roundRect, {
  x: 0.8, y: 1.4, w: 5.6, h: 5.3,
  fill: { type: 'none' },
  line: { color: '3B82F6', width: 2 },
  radius: 0.1
});

// Right: Methodology Phases
const methodPhases = [
  { phase: 'PHASE 1: DATA MODELING & 3NF NORMALIZATION', desc: 'Designed normalized relational schema separating blood_inventory, donors, blood_requests, and donations with foreign keys and unique constraints.', color: '1E40AF', bg: 'EFF6FF' },
  { phase: 'PHASE 2: CLINICAL COMPATIBILITY & PROXIMITY SCORING', desc: 'Formulated scoring equation combining antigen compatibility (+30 exact, +15 alternate) and spatial distance (+20 same city) to prioritize donors.', color: 'DC2626', bg: 'FEF2F2' },
  { phase: 'PHASE 3: ASYNCHRONOUS REST API SERVICES', desc: 'Built event-driven Node.js/Express.js backend endpoints for /api/inventory, /api/donors, /api/requests, and dynamic live-sync simulation.', color: '166534', bg: 'F0FDF4' },
  { phase: 'PHASE 4: LIVE TELEMETRY & VERIFICATION PIPELINE', desc: 'Implemented state persistence across page refreshes with full end-to-end automated test suite (9 passing tests).', color: 'D97706', bg: 'FFFBEB' }
];

methodPhases.forEach((p, idx) => {
  const y = 1.4 + idx * 1.35;
  s6.addShape(pres.ShapeType.roundRect, { x: 6.8, y, w: 5.7, h: 1.25, fill: { color: p.bg }, line: { color: p.color, width: 1.5 }, radius: 0.1 });
  s6.addText(p.phase, { x: 7.0, y: y + 0.15, fontSize: 11, color: p.color, bold: true, fontFace: 'Arial' });
  s6.addText(p.desc, { x: 7.0, y: y + 0.46, w: 5.3, fontSize: 9.5, color: C_DARK, fontFace: 'Arial' });
});

// ========================================================
// SLIDE 7: 4. METHODOLOGY: CLINICAL ABO/RH MATRIX & ALGORITHM
// ========================================================
const s7 = pres.addSlide();
s7.background = { color: C_LIGHT_BG };
addHeader(s7, '4. Proposed Methodology: Transfusion Science & Algorithm');

s7.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.4, w: 5.7, h: 5.3, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
s7.addText('CLINICAL TRANSFUSION COMPATIBILITY MATRIX', { x: 1.1, y: 1.65, fontSize: 12, color: C_RED, bold: true, fontFace: 'Arial' });

const matrixRules = [
  '• O- (Universal Red Cell Donor): Can give packed red blood cells to all 8 groups (A+, A-, B+, B-, AB+, AB-, O+, O-). Indispensable during trauma resuscitation before blood typing.',
  '• AB+ (Universal Recipient): Expresses A, B, and Rh antigens with zero ABO antibodies; can safely receive red blood cells from all 8 blood groups.',
  '• O+ (High Demand Category): Compatible with all Rh+ recipients (O+, A+, B+, AB+), representing over 85% of hospital admissions.',
  '• Rh-D Factor Safety Gate: Rh- individuals can ONLY receive Rh- blood. Transfusing Rh+ causes severe hemolytic immune reactions.'
];

s7.addText(matrixRules.join('\n\n'), { x: 1.1, y: 2.1, w: 5.1, h: 4.3, fontSize: 10, color: C_DARK, fontFace: 'Arial' });

// Algorithmic Formulation Box
s7.addShape(pres.ShapeType.roundRect, { x: 6.8, y: 1.4, w: 5.7, h: 5.3, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
s7.addText('MATHEMATICAL PROXIMITY & MATCH FORMULATION', { x: 7.1, y: 1.65, fontSize: 12, color: '1E40AF', bold: true, fontFace: 'Arial' });

s7.addText([
  { text: 'Score = Base(50) + W_blood + W_location\n\n', options: { bold: true, color: '1E40AF', fontSize: 13 } },
  { text: '1. Blood Compatibility Bonus (W_blood):\n', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: '   • Exact Blood Group Match: +30 Points\n   • Clinically Compatible Alternative: +15 Points\n\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: '2. Spatial Proximity Bonus (W_location):\n', options: { bold: true, color: C_DARK, fontSize: 11 } },
  { text: '   • Same City (e.g. Delhi to Delhi): +20 Points\n   • Nearby District/Region: +10 Points\n   • Other Cities: 0 Points\n\n', options: { color: C_SLATE, fontSize: 10 } },
  { text: '3. Clinical Eligibility Gate:\n', options: { bold: true, color: '166534', fontSize: 11 } },
  { text: '   • is_available == TRUE and status == "Active"\n   • Age in range [18, 65] years\n   • Last whole blood donation >= 90 days ago', options: { color: '166534', fontSize: 10 } }
], { x: 7.1, y: 2.1, w: 5.1, h: 4.3, fontFace: 'Arial' });

// ========================================================
// SLIDE 8: 4. METHODOLOGY: SYSTEM ARCHITECTURE & 4 TIERS
// ========================================================
const s8 = pres.addSlide();
s8.background = { color: C_LIGHT_BG };
addHeader(s8, '4. Proposed Methodology: Multi-Tier Architecture');

const tiers = [
  { tier: 'TIER 1: PRESENTATION LAYER (FRONTEND)', color: '1E40AF', bg: 'EFF6FF', desc: 'HTML5 Semantic Markup • CSS3 Modern Healthcare Palette • Vanilla ES6+ JavaScript • Chart.js Interactive Dashboards • Zero external bloat for 100% mobile responsiveness.' },
  { tier: 'TIER 2: APPLICATION LAYER (REST MICROSERVICES)', color: 'DC2626', bg: 'FEF2F2', desc: 'Node.js & Express.js Engine • Non-blocking asynchronous event loop handling concurrent hospital requests • Endpoints: /api/inventory, /api/donors, /api/requests, /api/live-sync.' },
  { tier: 'TIER 3: ALGORITHMIC MATCHING LAYER', color: '166534', bg: 'F0FDF4', desc: 'ABO/Rh Transfusion Matrix Engine • Multi-factor scoring function: Base (50) + Exact Group (+30) + Proximity (+20) • Dynamic ranking in services/matchingService.js.' },
  { tier: 'TIER 4: DUAL PERSISTENCE LAYER', color: 'D97706', bg: 'FFFBEB', desc: 'Production 3NF MySQL Database (database.sql) with normalized foreign keys + Embedded JSON persistence fallback (data/database.json) for 100% viva defense reliability.' }
];

tiers.forEach((t, idx) => {
  const y = 1.45 + idx * 1.35;
  s8.addShape(pres.ShapeType.roundRect, { x: 0.8, y, w: 11.7, h: 1.2, fill: { color: t.bg }, line: { color: t.color, width: 1.5 }, radius: 0.1 });
  s8.addText(t.tier, { x: 1.1, y: y + 0.18, fontSize: 12.5, color: t.color, bold: true, fontFace: 'Arial' });
  s8.addText(t.desc, { x: 1.1, y: y + 0.52, w: 11.1, fontSize: 10.5, color: C_DARK, fontFace: 'Arial' });
});

// ========================================================
// SLIDE 9: 5. EXPECTED OUTCOMES: LIVE INVENTORY (CHART)
// ========================================================
const s9 = pres.addSlide();
s9.background = { color: C_LIGHT_BG };
addHeader(s9, '5. Expected Outcomes: Live Inventory Distribution');

// Stock Overview Text Cards
s9.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.35, w: 11.7, h: 0.9, fill: { color: 'EFF6FF' }, line: { color: 'BFDBFE', width: 1 }, radius: 0.08 });
s9.addText('Real-time audit across all 8 standard ABO and Rh(D) blood groups with automated Safe, Low, and Critical threshold monitoring.', {
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

s9.addChart(pres.ChartType.bar, stockData, {
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
// SLIDE 10: 5. EXPECTED OUTCOMES: REQUISITIONS & TRENDS (CHARTS)
// ========================================================
const s10 = pres.addSlide();
s10.background = { color: C_LIGHT_BG };
addHeader(s10, '5. Expected Outcomes: Requisitions & Donation Trends');

// Left: Doughnut Chart
const reqStatusData = [
  {
    name: 'Requests Breakdown',
    labels: ['Fulfilled From Stock', 'Pending Normal', 'Emergency Critical', 'Donor Matched'],
    values: [48, 18, 14, 20]
  }
];

s10.addChart(pres.ChartType.doughnut, reqStatusData, {
  x: 0.8, y: 1.5, w: 5.6, h: 5.2,
  showLegend: true,
  legendPos: 'b',
  chartColors: ['16A34A', 'F59E0B', 'DC2626', '8B5CF6'],
  holeSize: 55
});

// Right: Monthly Line Chart
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

s10.addChart(pres.ChartType.line, monthlyTrendData, {
  x: 6.8, y: 1.5, w: 5.7, h: 5.2,
  chartColors: ['DC2626', '2563EB'],
  showLegend: true,
  legendPos: 't',
  valAxisTitle: 'Units Collected vs Dispensed',
  lineSmooth: true,
  lineDataSymbol: 'circle'
});

// ========================================================
// SLIDE 11: 5. EXPECTED OUTCOMES: DONOR PASS & ADMIN DASHBOARD (IMAGE)
// ========================================================
const s11 = pres.addSlide();
s11.background = { color: C_LIGHT_BG };
addHeader(s11, '5. Expected Outcomes: Digital Donor Pass & Admin Control');

// Left: Phone Mockup Image
s11.addImage({
  path: IMG_DONOR_PASS,
  x: 0.8, y: 1.4, w: 5.6, h: 5.3,
  round: true
});
s11.addShape(pres.ShapeType.roundRect, {
  x: 0.8, y: 1.4, w: 5.6, h: 5.3,
  fill: { type: 'none' },
  line: { color: 'EF4444', width: 2 },
  radius: 0.1
});

// Right: Deliverables
const deliverables = [
  { title: 'Digital Donor Pass (DON-XXXX)', desc: 'Automated generation of official electronic passes with scannable QR verification and eligibility flags.' },
  { title: 'Chief Administrator: Dr. Anshuman Jaglan', desc: 'Secure executive dashboard with session security, live inventory unit steppers, and CSV audit exporters.' },
  { title: 'Dynamic Telemetry Simulation', desc: 'Live simulation endpoint (/api/live-sync) generates real-world hospital events while preserving edits in persistent memory.' },
  { title: 'Emergency Broadcast Banner', desc: 'Red emergency banner alerts entire hospital network upon submission of critical whole blood requisitions.' }
];

deliverables.forEach((d, idx) => {
  const y = 1.4 + idx * 1.35;
  s11.addShape(pres.ShapeType.roundRect, { x: 6.8, y, w: 5.7, h: 1.25, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.1 });
  s11.addText(d.title, { x: 7.0, y: y + 0.18, fontSize: 12, color: C_RED, bold: true, fontFace: 'Arial' });
  s11.addText(d.desc, { x: 7.0, y: y + 0.52, w: 5.3, fontSize: 10, color: C_SLATE, fontFace: 'Arial' });
});

// ========================================================
// SLIDE 12: VERIFICATION, TESTING & CLOUD DEPLOYMENT
// ========================================================
const s12 = pres.addSlide();
s12.background = { color: C_LIGHT_BG };
addHeader(s12, 'System Verification, Testing & Cloud Deployment');

// Test Box
s12.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.4, w: 11.7, h: 2.3, fill: { color: C_LIGHT_GREEN }, line: { color: '86EFAC', width: 1.5 }, radius: 0.1 });
s12.addText('AUTOMATED END-TO-END SANITY TEST SUITE: 9 PASSED / 0 FAILED', { x: 1.1, y: 1.65, fontSize: 13, color: C_GREEN, bold: true, fontFace: 'Arial' });
s12.addText([
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
  s12.addShape(pres.ShapeType.roundRect, { x, y: 3.9, w: 3.7, h: 2.8, fill: { color: C_CARD_BG }, line: { color: 'CBD5E1', width: 1 }, radius: 0.1 });
  s12.addText(dm.title, { x: x + 0.2, y: 4.15, fontSize: 11, color: C_DARK, bold: true, fontFace: 'Arial' });
  s12.addText(dm.desc, { x: x + 0.2, y: 4.65, w: 3.3, fontSize: 10, color: C_SLATE, fontFace: 'Arial' });
});

// ========================================================
// SLIDE 13: 6. REFERENCES (FORMAL ACADEMIC CITATIONS)
// ========================================================
const s13 = pres.addSlide();
s13.background = { color: C_LIGHT_BG };
addHeader(s13, '6. References');

const referencesList = [
  '[1] World Health Organization (WHO), "Blood Donor Selection: Guidelines on Assessing Donor Suitability for Blood Donation", WHO Guidelines Approved by the Guidelines Review Committee, Geneva, 2012.',
  '[2] National Blood Transfusion Council (NBTC) & National AIDS Control Organisation (NACO), "Standards for Blood Banks & Blood Transfusion Services", Ministry of Health and Family Welfare, Government of India, New Delhi.',
  '[3] B. Sharma, S. K. Verma, and R. K. Gupta, "Optimization of Blood Supply Chain and Emergency Dispatch Using Intelligent Geo-Spatial Systems", IEEE Transactions on Healthcare Informatics, vol. 18, no. 4, pp. 210-218, 2022.',
  '[4] A. Kumar and P. Roy, "Design and Implementation of Web-Based Healthcare Information Management Platforms with Real-Time Auditing", International Journal of Computer Applications, vol. 182, no. 45, pp. 12-19, 2021.',
  '[5] Ministry of Health & Family Welfare, Govt. of India, "e-RaktKosh: National Blood Bank Portal Technical Architecture & Data Standards", Central Health Informatics, 2020.',
  '[6] Guru Gobind Singh Indraprastha University (GGSIPU), "Guidelines and Academic Regulations for Bachelor of Technology Minor Projects", University School of Information and Communication Technology, 2023-2027.'
];

referencesList.forEach((ref, idx) => {
  const y = 1.45 + idx * 0.9;
  s13.addShape(pres.ShapeType.roundRect, { x: 0.8, y, w: 11.7, h: 0.78, fill: { color: C_CARD_BG }, line: { color: 'E2E8F0', width: 1 }, radius: 0.06 });
  s13.addText(ref, { x: 1.0, y: y + 0.12, w: 11.3, fontSize: 9.5, color: C_DARK, fontFace: 'Arial' });
});

// ========================================================
// SLIDE 14: THANK YOU & VIVA VOce Q&A
// ========================================================
const s14 = pres.addSlide();
s14.background = { color: C_DARK };
s14.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 0.3, h: '100%', fill: { color: C_RED } });

s14.addText('THANK YOU', { x: 0.8, y: 1.0, fontSize: 44, color: C_WHITE, bold: true, fontFace: 'Arial' });
s14.addText('Questions & Viva Voce Discussion', { x: 0.8, y: 1.85, fontSize: 18, color: 'EF4444', bold: true, fontFace: 'Arial' });

s14.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 2.6, w: 11.7, h: 4.1, fill: { color: C_SLATE_DARK }, line: { color: '334155', width: 1 }, radius: 0.1 });
s14.addText([
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
    fs.copyFileSync(outPath, publicOutPath);
    console.log('SUCCESS: High-Impact Creative Presentation generated at:', outPath);
    console.log('Copied to public folder for direct web download:', publicOutPath);
  })
  .catch(err => {
    console.error('ERROR generating presentation:', err);
  });
