const express = require('express');
const router = express.Router();
const { db } = require('../config/db');

// In-memory security state with persistence
let securityConfig = {
  shield_mode: true, // When true, all database mutations require Dr. Anshuman Jaglan's approval
  chief_administrator: 'Dr. Anshuman Jaglan',
  master_phone: '9466291852',
  master_email: 'jaglananshuman@gmail.com',
  last_activity: new Date().toISOString()
};

let accessRequests = [
  {
    id: 'ACC-101',
    requester_name: 'Staff Nurse Sunita',
    requester_role: 'Hospital Coordinator (Max Hospital)',
    reason: 'Emergency audit of A- units for ICU patient transfer',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    status: 'APPROVED',
    handled_by: 'Dr. Anshuman Jaglan',
    handled_at: new Date(Date.now() - 14 * 60 * 1000).toISOString()
  }
];

let changeRequests = [
  {
    id: 'CHG-201',
    action_type: 'DISPENSE_INVENTORY',
    requester: 'AIIMS Blood Desk Coordinator',
    description: 'Dispense 2 units of O+ blood for emergency surgery (REQ-2026-001)',
    payload: { blood_group: 'O+', units: 2, request_code: 'REQ-2026-001' },
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    status: 'COMMITTED',
    handled_by: 'Dr. Anshuman Jaglan',
    handled_at: new Date(Date.now() - 28 * 60 * 1000).toISOString()
  }
];

// Helper to generate unique request ID
function generateId(prefix) {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
}

// ==========================================
// 1. ACCESS ATTEMPT APPROVAL WORKFLOW
// ==========================================

// Submit a new access attempt request (from non-master users on login page)
router.post('/access-request', (req, res) => {
  const { requester_name, requester_role, reason, phone } = req.body;
  if (!requester_name || !reason) {
    return res.status(400).json({ success: false, message: 'Requester name and access reason are mandatory' });
  }

  const newRequest = {
    id: generateId('ACC'),
    requester_name: requester_name.trim(),
    requester_role: (requester_role || 'Staff Member').trim(),
    reason: reason.trim(),
    phone: phone || '',
    ip: req.ip || req.connection.remoteAddress || '127.0.0.1',
    timestamp: new Date().toISOString(),
    status: 'PENDING',
    temp_token: null
  };

  accessRequests.unshift(newRequest);
  // Keep last 50
  if (accessRequests.length > 50) accessRequests.pop();

  return res.json({
    success: true,
    message: 'Access attempt registered. Awaiting live authorization from Chief Administrator Dr. Anshuman Jaglan.',
    request_id: newRequest.id,
    data: newRequest
  });
});

// Polling endpoint for the requester on admin-login.html
router.get('/access-status/:id', (req, res) => {
  const target = accessRequests.find(r => r.id === req.params.id);
  if (!target) {
    return res.status(404).json({ success: false, message: 'Access request not found' });
  }

  return res.json({
    success: true,
    status: target.status,
    requester_name: target.requester_name,
    temp_token: target.temp_token,
    message: target.status === 'APPROVED'
      ? 'Access authorized by Dr. Anshuman Jaglan. Redirecting to dashboard...'
      : (target.status === 'REJECTED'
        ? 'Access denied by Chief Administrator Dr. Anshuman Jaglan.'
        : 'Awaiting Chief Administrator authorization...')
  });
});

// Chief Admin Dr. Anshuman Jaglan approves access
router.post('/approve-access/:id', (req, res) => {
  const target = accessRequests.find(r => r.id === req.params.id);
  if (!target) {
    return res.status(404).json({ success: false, message: 'Request not found' });
  }

  target.status = 'APPROVED';
  target.handled_by = 'Dr. Anshuman Jaglan';
  target.handled_at = new Date().toISOString();
  target.temp_token = Buffer.from(`guest_auth:${target.id}:${Date.now()}`).toString('base64');

  return res.json({
    success: true,
    message: `Access attempt for ${target.requester_name} has been APPROVED by Dr. Anshuman Jaglan.`,
    data: target
  });
});

// Chief Admin Dr. Anshuman Jaglan rejects access
router.post('/reject-access/:id', (req, res) => {
  const target = accessRequests.find(r => r.id === req.params.id);
  if (!target) {
    return res.status(404).json({ success: false, message: 'Request not found' });
  }

  target.status = 'REJECTED';
  target.handled_by = 'Dr. Anshuman Jaglan';
  target.handled_at = new Date().toISOString();

  return res.json({
    success: true,
    message: `Access attempt for ${target.requester_name} has been REJECTED and BLOCKED.`,
    data: target
  });
});

// ==========================================
// 2. DATABASE MUTATION CHANGE APPROVAL WORKFLOW
// ==========================================

// Submit a proposal to modify the database (inventory, requests, donors)
router.post('/change-request', (req, res) => {
  const { action_type, description, payload, requester } = req.body;
  if (!action_type || !description || !payload) {
    return res.status(400).json({ success: false, message: 'Action type, description and payload are required' });
  }

  const newChange = {
    id: generateId('CHG'),
    action_type,
    description,
    payload,
    requester: requester || 'Hospital Staff / External User',
    timestamp: new Date().toISOString(),
    status: 'PENDING_APPROVAL'
  };

  changeRequests.unshift(newChange);
  if (changeRequests.length > 50) changeRequests.pop();

  return res.json({
    success: true,
    message: 'Database modification intercepted by Master Shield. Sent to Dr. Anshuman Jaglan for verification.',
    change_id: newChange.id,
    data: newChange
  });
});

// Chief Admin Dr. Anshuman Jaglan approves and commits change to database
router.post('/approve-change/:id', async (req, res) => {
  const change = changeRequests.find(c => c.id === req.params.id);
  if (!change) {
    return res.status(404).json({ success: false, message: 'Change request not found' });
  }

  if (change.status === 'COMMITTED') {
    return res.status(400).json({ success: false, message: 'Change has already been committed' });
  }

  try {
    // Execute actual database modification according to action_type
    const { action_type, payload } = change;

    if (action_type === 'UPDATE_INVENTORY') {
      if (payload.setUnits !== undefined) {
        await db.setInventoryUnits(payload.blood_group, parseInt(payload.setUnits));
      } else if (payload.unitsChange !== undefined) {
        await db.updateInventory(payload.blood_group, parseInt(payload.unitsChange));
      }
    } else if (action_type === 'DISPENSE_INVENTORY') {
      // Deduct inventory and mark request fulfilled
      if (payload.blood_group && payload.units) {
        await db.updateInventory(payload.blood_group, -parseInt(payload.units));
      }
      if (payload.request_id) {
        await db.updateRequest(payload.request_id, {
          status: 'Fulfilled',
          fulfillment_source: `Authorized & Dispatched by Dr. Anshuman Jaglan (${payload.units} units of ${payload.blood_group})`
        });
      }
    } else if (action_type === 'DELETE_DONOR') {
      if (payload.donor_id) {
        await db.deleteDonor(payload.donor_id);
      }
    } else if (action_type === 'UPDATE_REQUEST_STATUS') {
      if (payload.request_id && payload.status) {
        await db.updateRequest(payload.request_id, { status: payload.status });
      }
    }

    change.status = 'COMMITTED';
    change.handled_by = 'Dr. Anshuman Jaglan';
    change.handled_at = new Date().toISOString();

    return res.json({
      success: true,
      message: `Change ${change.id} approved and successfully committed to database by Dr. Anshuman Jaglan!`,
      data: change
    });
  } catch (err) {
    console.error('Error committing approved change:', err);
    return res.status(500).json({ success: false, message: 'Error committing change to database: ' + err.message });
  }
});

// Chief Admin Dr. Anshuman Jaglan rejects database change
router.post('/reject-change/:id', (req, res) => {
  const change = changeRequests.find(c => c.id === req.params.id);
  if (!change) {
    return res.status(404).json({ success: false, message: 'Change request not found' });
  }

  change.status = 'REJECTED';
  change.handled_by = 'Dr. Anshuman Jaglan';
  change.handled_at = new Date().toISOString();

  return res.json({
    success: true,
    message: `Database change ${change.id} has been REJECTED. No data was modified.`,
    data: change
  });
});

// ==========================================
// 3. POLLING FOR PENDING APPROVALS (FOR ADMIN DASHBOARD)
// ==========================================

router.get('/pending-approvals', (req, res) => {
  const pendingAccess = accessRequests.filter(r => r.status === 'PENDING');
  const pendingChanges = changeRequests.filter(c => c.status === 'PENDING_APPROVAL');

  return res.json({
    success: true,
    shield_mode: securityConfig.shield_mode,
    chief_administrator: securityConfig.chief_administrator,
    pending_access: pendingAccess,
    pending_changes: pendingChanges,
    total_pending: pendingAccess.length + pendingChanges.length,
    history_access: accessRequests.slice(0, 10),
    history_changes: changeRequests.slice(0, 10)
  });
});

// Toggle Master Shield Guard Mode
router.post('/toggle-shield', (req, res) => {
  securityConfig.shield_mode = !securityConfig.shield_mode;
  return res.json({
    success: true,
    shield_mode: securityConfig.shield_mode,
    message: securityConfig.shield_mode
      ? '🛡️ Master Shield ACTIVATED: All database changes strictly require Dr. Anshuman Jaglan\'s approval.'
      : '⚠️ Master Shield PAUSED: Direct edits allowed.'
  });
});

// ==========================================
// 4. VIVA DEMO SIMULATORS (FOR LIVE PRESENTATION)
// ==========================================

// Trigger simulated access attempt for live defense demo
router.post('/simulate-access-attempt', (req, res) => {
  const demoNames = [
    { name: 'Nurse Ritu Verma', role: 'ICU Senior Coordinator (AIIMS)', reason: 'Emergency search for O- units for pediatric surgery' },
    { name: 'Dr. Sameer Sen', role: 'Visiting Transfusion Officer', reason: 'Routine evening inventory reconciliation audit' },
    { name: 'MAIT External Examiner', role: 'University Project Evaluator', reason: 'Live inspection of database schema and security controls' }
  ];
  const selected = demoNames[Math.floor(Math.random() * demoNames.length)];

  const simRequest = {
    id: generateId('ACC'),
    requester_name: selected.name,
    requester_role: selected.role,
    reason: selected.reason,
    phone: '+91 98' + Math.floor(10000000 + Math.random() * 90000000),
    ip: '192.168.1.104 (Hospital Subnet)',
    timestamp: new Date().toISOString(),
    status: 'PENDING',
    temp_token: null
  };

  accessRequests.unshift(simRequest);

  return res.json({
    success: true,
    message: `Simulated incoming access attempt from ${selected.name}! Check your dashboard popup.`,
    data: simRequest
  });
});

// Trigger simulated database change request for live defense demo
router.post('/simulate-change-request', (req, res) => {
  const demoChanges = [
    {
      action_type: 'DISPENSE_INVENTORY',
      description: 'Emergency Dispense: 2 units of B+ blood for Apollo Trauma ICU (REQ-2026-002)',
      payload: { blood_group: 'B+', units: 2, request_id: 2 },
      requester: 'Apollo Emergency Trauma Coordinator'
    },
    {
      action_type: 'UPDATE_INVENTORY',
      description: 'Stock Replenishment Proposal: Add 5 units of O- from Red Cross Blood Camp',
      payload: { blood_group: 'O-', unitsChange: 5 },
      requester: 'Mobile Blood Drive In-charge'
    },
    {
      action_type: 'DELETE_DONOR',
      description: 'Donor Record Deletion Request: Remove inactive profile ID #6 due to relocation',
      payload: { donor_id: 6 },
      requester: 'Donor Outreach Desk'
    }
  ];
  const selected = demoChanges[Math.floor(Math.random() * demoChanges.length)];

  const simChange = {
    id: generateId('CHG'),
    action_type: selected.action_type,
    description: selected.description,
    payload: selected.payload,
    requester: selected.requester,
    timestamp: new Date().toISOString(),
    status: 'PENDING_APPROVAL'
  };

  changeRequests.unshift(simChange);

  return res.json({
    success: true,
    message: `Simulated incoming database change proposal: "${selected.description}". Check your dashboard popup!`,
    data: simChange
  });
});

module.exports = router;
