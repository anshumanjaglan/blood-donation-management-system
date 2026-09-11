/**
 * Automated Sanity Test Suite for Blood Donation Management System
 */

const http = require('http');

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let body = '';
      res.on('data', chunk => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('=== Running Automated System Verification ===\n');
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}: ${err.message}`);
      failed++;
    }
  }

  // 1. Health Check
  await test('Server Health Check GET /health', async () => {
    const res = await request({ host: 'localhost', port: 3000, path: '/health', method: 'GET' });
    if (res.status !== 200 || res.data.status !== 'OK') throw new Error(`Unexpected response: ${JSON.stringify(res)}`);
  });

  // 2. Inventory Check
  await test('Inventory Stock Check GET /api/inventory', async () => {
    const res = await request({ host: 'localhost', port: 3000, path: '/api/inventory', method: 'GET' });
    if (res.status !== 200 || !res.data.success || res.data.data.length !== 8) {
      throw new Error(`Expected 8 blood groups in stock, got: ${res.data.data?.length}`);
    }
  });

  // 3. Donor Registration
  let testDonorId = null;
  await test('Donor Registration POST /api/donors', async () => {
    const payload = {
      full_name: 'Test Lifesaver',
      blood_group: 'O-',
      age: 26,
      gender: 'Male',
      phone: '+91 9999988888',
      email: 'lifesaver@test.com',
      city: 'Delhi',
      district: 'Central Delhi',
      is_available: true
    };
    const res = await request(
      {
        host: 'localhost',
        port: 3000,
        path: '/api/donors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      payload
    );
    if (res.status !== 201 || !res.data.success) throw new Error(res.data.message || 'Registration failed');
    testDonorId = res.data.data.id;
  });

  // 4. ABO/Rh Compatibility Engine
  await test('Smart Matching Engine GET /api/matching (O- compatibility)', async () => {
    // A- patient can receive from A- and O-
    const res = await request({ host: 'localhost', port: 3000, path: '/api/matching?blood_group=A-&city=Delhi', method: 'GET' });
    if (res.status !== 200 || !res.data.success) throw new Error('Matching failed');
    const compGroups = res.data.data.compatibleBloodGroups;
    if (!compGroups.includes('O-') || !compGroups.includes('A-')) {
      throw new Error(`Expected A- and O- compatible for A-, got: ${compGroups.join(', ')}`);
    }
  });

  // 5. Blood Request Submission & Tracking
  let testReqCode = null;
  let testReqId = null;
  await test('Blood Request Submission POST /api/requests', async () => {
    const payload = {
      patient_name: 'Aditya Sharma',
      blood_group: 'A+',
      units_needed: 1,
      hospital_name: 'Max Healthcare',
      city: 'Delhi',
      contact_person: 'Dr. Gupta',
      contact_phone: '+91 9888877777',
      is_emergency: true,
      urgency: 'Critical',
      required_by_date: new Date().toISOString().split('T')[0]
    };
    const res = await request(
      {
        host: 'localhost',
        port: 3000,
        path: '/api/requests',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      payload
    );
    if (res.status !== 201 || !res.data.success) throw new Error(res.data.message || 'Request creation failed');
    testReqCode = res.data.requestCode;
    testReqId = res.data.data.id;
  });

  // 6. Track Request
  await test('Request Tracking GET /api/requests/track/:code', async () => {
    const res = await request({ host: 'localhost', port: 3000, path: `/api/requests/track/${encodeURIComponent(testReqCode)}`, method: 'GET' });
    if (res.status !== 200 || !res.data.success || res.data.data.length === 0) {
      throw new Error('Tracking lookup failed');
    }
  });

  // 7. Inventory Direct Fulfillment
  await test('Fulfill Request from Blood Bank Stock PUT /api/requests/:id/fulfill-from-inventory', async () => {
    const res = await request({
      host: 'localhost',
      port: 3000,
      path: `/api/requests/${testReqId}/fulfill-from-inventory`,
      method: 'PUT'
    });
    if (res.status !== 200 || !res.data.success) {
      throw new Error(res.data.message || 'Fulfillment from stock failed');
    }
  });

  // 8. Admin Authentication
  await test('Admin Authentication POST /api/auth/login', async () => {
    const res = await request(
      {
        host: 'localhost',
        port: 3000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      { username: 'admin', password: 'password123' }
    );
    if (res.status !== 200 || !res.data.success || !res.data.token) {
      throw new Error(res.data.message || 'Admin authentication failed');
    }
  });

  // 9. Dashboard Statistics
  await test('Dashboard Analytics GET /api/stats', async () => {
    const res = await request({ host: 'localhost', port: 3000, path: '/api/stats', method: 'GET' });
    if (res.status !== 200 || !res.data.success) throw new Error('Failed to retrieve stats');
    if (typeof res.data.data.totalDonors !== 'number') throw new Error('Invalid stats format');
  });

  // Cleanup test donor
  if (testDonorId) {
    await request({ host: 'localhost', port: 3000, path: `/api/donors/${testDonorId}`, method: 'DELETE' });
  }

  console.log(`\n=== Verification Complete: ${passed} Passed, ${failed} Failed ===`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
