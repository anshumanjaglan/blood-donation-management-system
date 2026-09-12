/**
 * Admin Dashboard Controller
 * Handles live analytics, Chart.js, inventory adjustments, request workflows, and exports
 */

let cachedInventory = [];
let cachedRequests = [];
let cachedDonors = [];
let cachedDonations = [];

let stockChartInstance = null;
let statusChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  // Check Authentication
  const token = localStorage.getItem('blood_admin_token');
  if (!token) {
    window.location.href = 'admin-login.html';
    return;
  }

  // Set administrator display name
  const adminDisplay = document.getElementById('admin-user-display');
  if (adminDisplay) {
    adminDisplay.innerText = 'Dr. Anshuman Jaglan';
  }
  localStorage.setItem('blood_admin_user', JSON.stringify({
    name: 'Dr. Anshuman Jaglan',
    email: 'jaglananshuman@gmail.com',
    role: 'Chief Medical Administrator'
  }));

  // Initial Data Load
  refreshDashboardData(false);

  // Auto Live Pulse every 35 seconds (keeps dashboard dynamically updating during presentation)
  setInterval(() => {
    triggerLiveRefresh(true);
  }, 35000);

  // Chief Admin Security & Authorization Radar Poll
  pollPendingSecurityApprovals();
  setInterval(() => {
    pollPendingSecurityApprovals();
  }, 2500);
});

function logoutAdmin() {
  localStorage.removeItem('blood_admin_token');
  localStorage.removeItem('blood_admin_user');
  window.location.href = 'admin-login.html';
}

function showAdminTab(tabId, subfilter = null) {
  // Update nav links
  document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));

  const targetSection = document.getElementById(`tab-${tabId}`);
  if (targetSection) targetSection.classList.add('active');

  const titles = {
    overview: { title: 'Executive Overview & Statistics', sub: 'Real-time status of blood bank inventory, emergency requisitions, and donor activities.' },
    inventory: { title: 'Blood Bank Inventory Management', sub: 'Real-time stock controls, manual adjustments, and collection logs.' },
    requests: { title: 'Patient & Hospital Requisitions', sub: 'Manage, verify, match, and fulfill clinical blood requests.' },
    donors: { title: 'Registered Voluntary Donors', sub: 'Manage donor roster, contact details, and availability status.' },
    donations: { title: 'Donation History & Camp Records', sub: 'Audit logs of whole blood units collected and tested.' },
    reports: { title: 'Reports & Academic Viva Deliverables', sub: 'Generate CSV audits and printable sheets for project defense.' },
    security: { title: '🛡️ Chief Administrator Security & Access Gateway', sub: 'Real-time security interceptor, pending login authorizations, and database mutation guard.' }
  };

  if (titles[tabId]) {
    document.getElementById('current-tab-title').innerText = titles[tabId].title;
    document.getElementById('current-tab-subtitle').innerText = titles[tabId].sub;
  }

  // Find and activate sidebar link
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const mapping = { overview: 0, inventory: 1, requests: 2, donors: 3, donations: 4, reports: 5, security: 6 };
  if (sidebarLinks[mapping[tabId]]) {
    sidebarLinks[mapping[tabId]].classList.add('active');
  }

  if (tabId === 'security') {
    pollPendingSecurityApprovals();
  }

  if (tabId === 'requests' && subfilter === 'emergency') {
    document.getElementById('request-emergency-only').checked = true;
    filterRequestsTable();
  }
}

// Trigger Live Real-time Simulation & Refresh Data
async function triggerLiveRefresh(isAuto = false) {
  const telemetryText = document.getElementById('live-telemetry-text');
  if (telemetryText) {
    telemetryText.innerText = 'Syncing...';
  }

  try {
    const syncRes = await fetch('/api/live-sync', { method: 'POST' });
    const syncJson = await syncRes.json();

    if (syncJson.success) {
      if (!isAuto) {
        showToast(syncJson.message, 'success');
      } else {
        showToast(syncJson.message, 'info');
      }
      if (telemetryText) {
        telemetryText.innerText = `Live: Updated ${syncJson.timestamp}`;
      }
    }
  } catch (e) {
    // Non-blocking
  }

  await refreshDashboardData(isAuto);
}

async function refreshDashboardData(isAuto = false) {
  await Promise.all([
    fetchStats(),
    fetchInventory(),
    fetchRequests(),
    fetchDonors(),
    fetchDonations()
  ]);
  if (!isAuto) {
    showToast('All figures and database records updated live', 'info');
  }
}

// 1. Fetch KPI & Charts Stats
async function fetchStats() {
  try {
    const res = await fetch('/api/stats');
    const json = await res.json();
    if (json.success && json.data) {
      const s = json.data;
      document.getElementById('kpi-donors').innerText = s.totalDonors;
      document.getElementById('kpi-units').innerText = s.totalUnitsAvailable;
      document.getElementById('kpi-pending').innerText = s.pendingRequests;
      document.getElementById('kpi-emergency').innerText = s.emergencyRequests;

      if (s.pendingRequests > 0) {
        const badge = document.getElementById('sidebar-pending-badge');
        badge.style.display = 'inline-block';
        badge.innerText = s.pendingRequests;
      }

      // Emergency banner toggle
      const alertBanner = document.getElementById('urgent-alert-banner');
      if (s.emergencyRequests > 0) {
        alertBanner.style.display = 'block';
        document.getElementById('urgent-banner-desc').innerText =
          `Currently ${s.emergencyRequests} urgent / critical blood request(s) require active donor matching or dispatch.`;
      } else {
        alertBanner.style.display = 'none';
      }

      // Render Charts
      renderCharts(s.inventory, s);
    }
  } catch (err) {
    console.error('Error fetching stats:', err);
  }
}

function renderCharts(inventory, stats) {
  if (typeof Chart === 'undefined') return;

  // Chart 1: Stock Distribution Bar Chart
  const stockCtx = document.getElementById('stockChart');
  if (stockCtx) {
    const labels = inventory.map(i => i.blood_group);
    const data = inventory.map(i => i.units_available);
    const colors = inventory.map(i => {
      if (i.units_available <= i.critical_threshold) return '#ef4444'; // Red
      if (i.units_available <= i.safe_threshold) return '#f59e0b'; // Amber
      return '#10b981'; // Green
    });

    if (stockChartInstance) stockChartInstance.destroy();

    stockChartInstance = new Chart(stockCtx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Units in Stock',
          data,
          backgroundColor: colors,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          }
        }
      }
    });
  }

  // Chart 2: Request Status Doughnut Chart
  const statusCtx = document.getElementById('statusChart');
  if (statusCtx) {
    if (statusChartInstance) statusChartInstance.destroy();

    statusChartInstance = new Chart(statusCtx, {
      type: 'doughnut',
      data: {
        labels: ['Fulfilled', 'Pending', 'Emergency Active', 'Available Donors'],
        datasets: [{
          data: [
            stats.fulfilledRequests || 1,
            stats.pendingRequests || 0,
            stats.emergencyRequests || 0,
            stats.activeDonors || 1
          ],
          backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#3b82f6']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}

// 2. Fetch & Render Inventory Management
async function fetchInventory() {
  try {
    const res = await fetch('/api/inventory');
    const json = await res.json();
    if (json.success && json.data) {
      cachedInventory = json.data;
      renderInventoryManagement(json.data);
    }
  } catch (err) {
    console.error('Error fetching inventory:', err);
  }
}

function renderInventoryManagement(inventory) {
  const container = document.getElementById('inventory-manage-cards');
  if (!container) return;

  container.innerHTML = inventory.map(item => `
    <div class="inventory-manage-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <span class="bg-title">${item.blood_group}</span>
        <span class="stock-status status-${item.status}">${item.status} Stock</span>
      </div>

      <div class="inventory-stepper">
        <button class="stepper-btn" onclick="adjustInventoryStock('${encodeURIComponent(item.blood_group)}', -1)">-</button>
        <span class="stepper-value" id="stock-val-${item.id}">${item.units_available}</span>
        <button class="stepper-btn" onclick="adjustInventoryStock('${encodeURIComponent(item.blood_group)}', 1)">+</button>
      </div>

      <div style="font-size:0.75rem;color:var(--text-muted);display:flex;justify-content:space-between;border-top:1px solid var(--border);padding-top:8px;">
        <span>Safe: ${item.safe_threshold} units</span>
        <span>Critical: ${item.critical_threshold} units</span>
      </div>
    </div>
  `).join('');
}

async function adjustInventoryStock(encodedBg, delta) {
  const bg = decodeURIComponent(encodedBg);
  try {
    const res = await fetch(`/api/inventory/${encodeURIComponent(bg)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unitsChange: delta })
    });
    const json = await res.json();
    if (json.success) {
      showToast(`Stock for ${bg} updated (${delta > 0 ? '+' : ''}${delta})`, 'success');
      fetchInventory();
      fetchStats();
    } else {
      showToast(json.message || 'Update failed', 'error');
    }
  } catch (err) {
    showToast('Failed to adjust stock', 'error');
  }
}

// 3. Fetch & Render Blood Requests
async function fetchRequests() {
  try {
    const res = await fetch('/api/requests');
    const json = await res.json();
    if (json.success && json.data) {
      cachedRequests = json.data;
      filterRequestsTable();
    }
  } catch (err) {
    console.error('Error fetching requests:', err);
  }
}

function filterRequestsTable() {
  const status = document.getElementById('request-status-filter').value;
  const bg = document.getElementById('request-bg-filter').value;
  const emergOnly = document.getElementById('request-emergency-only').checked;

  let filtered = [...cachedRequests];
  if (status) filtered = filtered.filter(r => r.status === status);
  if (bg) filtered = filtered.filter(r => r.blood_group === bg);
  if (emergOnly) filtered = filtered.filter(r => r.is_emergency);

  document.getElementById('request-count-badge').innerText = `Showing ${filtered.length} of ${cachedRequests.length} requests`;

  const tbody = document.getElementById('requests-table-body');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:30px;color:var(--text-muted);">No requests match the selected filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td><strong>${r.request_code}</strong></td>
      <td>
        <div style="font-weight:600;">${r.patient_name}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);">${r.contact_person} (${r.contact_phone})</div>
      </td>
      <td><span class="donor-blood-badge" style="width:34px;height:34px;font-size:0.95rem;">${r.blood_group}</span></td>
      <td><strong>${r.units_needed}</strong></td>
      <td>${r.hospital_name}, ${r.city}</td>
      <td>${r.required_by_date}</td>
      <td><span class="badge badge-${(r.status || 'pending').toLowerCase()}">${(r.status || 'Pending').replace('_', ' ')}</span></td>
      <td>
        ${r.is_emergency ? '<span class="emergency-badge">EMERGENCY</span>' : '<span style="font-size:0.8rem;color:var(--text-muted);">Normal</span>'}
      </td>
      <td>
        <div class="actions-cell">
          ${r.status !== 'Fulfilled' ? `
            <button class="btn btn-primary btn-sm" onclick="fulfillFromStock(${r.id}, '${r.blood_group}', ${r.units_needed})" title="Fulfill directly from Blood Bank inventory">
              Dispense Stock
            </button>
            <button class="btn btn-outline btn-sm" onclick="openMatchModal(${r.id}, '${r.blood_group}', '${r.city}', '${r.patient_name}', ${r.units_needed})" title="Find compatible voluntary donors">
              Match Donors
            </button>
            <button class="btn btn-secondary btn-sm" onclick="updateRequestStatus(${r.id}, 'Rejected')" title="Reject request">
              &times;
            </button>
          ` : `
            <span style="color:var(--success);font-size:0.8rem;font-weight:700;">&#10004; Fulfilled</span>
          `}
        </div>
      </td>
    </tr>
  `).join('');
}

async function fulfillFromStock(requestId, bloodGroup, unitsNeeded) {
  if (!confirm(`Confirm dispatch of ${unitsNeeded} unit(s) of ${bloodGroup} from central blood bank inventory?`)) return;

  try {
    const res = await fetch(`/api/requests/${requestId}/fulfill-from-inventory`, {
      method: 'PUT'
    });
    const json = await res.json();
    if (json.success) {
      showToast(json.message, 'success');
      fetchRequests();
      fetchInventory();
      fetchStats();
    } else {
      showToast(json.message || 'Failed to dispense from stock', 'error');
    }
  } catch (err) {
    showToast('Error during stock fulfillment', 'error');
  }
}

async function updateRequestStatus(requestId, status, fulfillmentSource = null) {
  try {
    const res = await fetch(`/api/requests/${requestId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, fulfillment_source: fulfillmentSource })
    });
    const json = await res.json();
    if (json.success) {
      showToast(`Request updated to ${status}`, 'success');
      fetchRequests();
      fetchStats();
    } else {
      showToast(json.message || 'Status update failed', 'error');
    }
  } catch (err) {
    showToast('Error updating request status', 'error');
  }
}

// 4. Donor Matching Modal inside Admin
async function openMatchModal(requestId, bloodGroup, city, patientName, unitsNeeded) {
  const modal = document.getElementById('match-modal');
  const body = document.getElementById('match-modal-body');
  document.getElementById('match-modal-title').innerText = `Match Donors for ${patientName} (${bloodGroup}, ${city})`;

  body.innerHTML = `<p style="text-align:center;padding:30px;">Evaluating ABO/Rh compatibility &amp; proximity...</p>`;
  modal.classList.add('show');

  try {
    const res = await fetch(`/api/matching?blood_group=${encodeURIComponent(bloodGroup)}&city=${encodeURIComponent(city)}`);
    const json = await res.json();

    if (json.success && json.data) {
      const { compatibleBloodGroups, matches, totalFound } = json.data;

      body.innerHTML = `
        <div style="background:#eff6ff;padding:12px;border-radius:6px;margin-bottom:16px;font-size:0.85rem;color:#1e40af;">
          <strong>Compatible Blood Groups:</strong> ${compatibleBloodGroups.join(', ')} &bull; 
          <strong>Available Eligible Donors:</strong> ${totalFound}
        </div>

        <div style="max-height:360px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;">
          ${matches.length === 0 ? '<p style="text-align:center;color:var(--text-muted);">No matching voluntary donors currently available.</p>' : matches.map(d => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px solid var(--border);border-radius:6px;background:#f8fafc;">
              <div style="display:flex;align-items:center;gap:12px;">
                <span class="donor-blood-badge" style="width:40px;height:40px;font-size:1rem;">${d.blood_group}</span>
                <div>
                  <strong>${d.full_name}</strong> (${d.city})
                  <div style="font-size:0.8rem;color:var(--text-muted);">
                    Tel: <a href="tel:${d.phone}">${d.phone}</a> &bull; Match Score: ${d.matchScore}% (${d.locationMatch})
                  </div>
                </div>
              </div>
              <button class="btn btn-primary btn-sm" onclick="assignDonorToRequest(${requestId}, '${d.full_name}', '${d.phone}', '${d.blood_group}')">
                Assign Donor
              </button>
            </div>
          `).join('')}
        </div>
      `;
    }
  } catch (err) {
    body.innerHTML = `<p style="color:var(--danger);">Error running matching service.</p>`;
  }
}

async function assignDonorToRequest(requestId, donorName, donorPhone, donorBg) {
  const fulfillmentText = `Assigned Registered Voluntary Donor: ${donorName} (${donorBg}, Tel: ${donorPhone})`;
  await updateRequestStatus(requestId, 'Donor_Matched', fulfillmentText);
  closeMatchModal();
}

function closeMatchModal() {
  document.getElementById('match-modal').classList.remove('show');
}

// 5. Fetch & Render Donors Table
async function fetchDonors() {
  try {
    const res = await fetch('/api/donors');
    const json = await res.json();
    if (json.success && json.data) {
      cachedDonors = json.data;
      filterDonorsTable();
    }
  } catch (err) {
    console.error('Error fetching donors:', err);
  }
}

function filterDonorsTable() {
  const q = document.getElementById('donor-search-input').value.toLowerCase().trim();
  const bg = document.getElementById('donor-bg-filter').value;
  const avail = document.getElementById('donor-avail-filter').value;

  let filtered = [...cachedDonors];
  if (q) {
    filtered = filtered.filter(d =>
      d.full_name.toLowerCase().includes(q) ||
      (d.phone && d.phone.includes(q)) ||
      (d.city && d.city.toLowerCase().includes(q))
    );
  }
  if (bg) filtered = filtered.filter(d => d.blood_group === bg);
  if (avail !== '') filtered = filtered.filter(d => String(d.is_available) === avail);

  const tbody = document.getElementById('donors-table-body');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:30px;color:var(--text-muted);">No donors match the filter criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(d => `
    <tr>
      <td>DON-${String(d.id).padStart(4, '0')}</td>
      <td><strong>${d.full_name}</strong></td>
      <td><span class="donor-blood-badge" style="width:32px;height:32px;font-size:0.9rem;">${d.blood_group}</span></td>
      <td>${d.age} / ${d.gender}</td>
      <td>${d.city}${d.district ? ', ' + d.district : ''}</td>
      <td><a href="tel:${d.phone}">${d.phone}</a></td>
      <td>
        <button class="availability-pill ${d.is_available ? 'avail-available' : 'avail-unavailable'}" style="border:none;cursor:pointer;" onclick="toggleDonorAvailability(${d.id}, ${!d.is_available})" title="Click to toggle availability">
          ${d.is_available ? '&#9679; Available' : '&#9679; Inactive'}
        </button>
      </td>
      <td>${d.last_donation_date || 'None'}</td>
      <td>
        <div class="actions-cell">
          <button class="btn btn-secondary btn-sm" onclick="deleteDonorRecord(${d.id})" title="Remove donor" style="color:#ef4444;">
            Delete
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

async function toggleDonorAvailability(donorId, newStatus) {
  try {
    const res = await fetch(`/api/donors/${donorId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_available: newStatus })
    });
    const json = await res.json();
    if (json.success) {
      showToast(`Donor availability updated to ${newStatus ? 'Available' : 'Inactive'}`, 'success');
      fetchDonors();
      fetchStats();
    }
  } catch (err) {
    showToast('Failed to update donor status', 'error');
  }
}

async function deleteDonorRecord(donorId) {
  if (!confirm('Are you sure you want to remove this donor record?')) return;
  try {
    const res = await fetch(`/api/donors/${donorId}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      showToast('Donor deleted', 'success');
      fetchDonors();
      fetchStats();
    }
  } catch (err) {
    showToast('Failed to delete donor', 'error');
  }
}

// 6. Fetch & Render Donations Log
async function fetchDonations() {
  try {
    const res = await fetch('/api/donations');
    const json = await res.json();
    if (json.success && json.data) {
      cachedDonations = json.data;
      const tbody = document.getElementById('donations-table-body');
      tbody.innerHTML = json.data.map(d => `
        <tr>
          <td>DON-LOG-${d.id}</td>
          <td><strong>${d.donor_name}</strong></td>
          <td><span class="donor-blood-badge" style="width:32px;height:32px;font-size:0.9rem;">${d.blood_group}</span></td>
          <td>${d.units_donated} Unit</td>
          <td>${d.donation_date}</td>
          <td>${d.camp_or_hospital}</td>
          <td>${d.hemoglobin_level || '13.5'} g/dL</td>
          <td><span class="badge badge-fulfilled">Tested &amp; Safe</span></td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Error fetching donations:', err);
  }
}

// 7. Camp Donation Modal
function openCampDonationModal() {
  document.getElementById('camp-modal').classList.add('show');
}
function closeCampModal() {
  document.getElementById('camp-modal').classList.remove('show');
}

document.getElementById('camp-donation-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    donor_name: document.getElementById('camp-donor-name').value.trim(),
    blood_group: document.getElementById('camp-bg').value,
    units_donated: parseInt(document.getElementById('camp-units').value) || 1,
    camp_or_hospital: document.getElementById('camp-location').value.trim(),
    hemoglobin_level: parseFloat(document.getElementById('camp-hb').value) || 14.0
  };

  try {
    const res = await fetch('/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (json.success) {
      showToast(json.message, 'success');
      closeCampModal();
      document.getElementById('camp-donation-form').reset();
      fetchDonations();
      fetchInventory();
      fetchStats();
    } else {
      showToast(json.message || 'Failed to record donation', 'error');
    }
  } catch (err) {
    showToast('Network error saving donation', 'error');
  }
});

// 8. CSV Exporters for Academic Defense
function exportDonorsCSV() {
  if (!cachedDonors || cachedDonors.length === 0) {
    showToast('No donors to export', 'error');
    return;
  }
  const headers = ['ID', 'Full Name', 'Blood Group', 'Age', 'Gender', 'Phone', 'Email', 'City', 'District', 'Last Donated', 'Available'];
  const rows = cachedDonors.map(d => [
    d.id,
    `"${d.full_name}"`,
    d.blood_group,
    d.age,
    d.gender,
    `"${d.phone}"`,
    `"${d.email || ''}"`,
    `"${d.city}"`,
    `"${d.district || ''}"`,
    d.last_donation_date || '',
    d.is_available ? 'Yes' : 'No'
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadFile(csv, 'Blood_Donors_Roster.csv', 'text/csv');
}

function exportInventoryCSV() {
  if (!cachedInventory || cachedInventory.length === 0) {
    showToast('No inventory data to export', 'error');
    return;
  }
  const headers = ['Blood Group', 'Units Available', 'Safe Threshold', 'Critical Threshold', 'Status', 'Last Updated'];
  const rows = cachedInventory.map(i => [
    i.blood_group,
    i.units_available,
    i.safe_threshold,
    i.critical_threshold,
    i.status,
    i.last_updated
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadFile(csv, 'Blood_Inventory_Audit.csv', 'text/csv');
}

function downloadFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`Exported ${fileName}`, 'success');
}

// ========================================================
// CHIEF ADMINISTRATOR SECURITY & ACCESS GATEWAY CONTROLLER
// Protected exclusively for Dr. Anshuman Jaglan
// ========================================================

let seenPendingIds = new Set();
let currentModalItem = null;

async function pollPendingSecurityApprovals() {
  try {
    const res = await fetch('/api/security/pending-approvals');
    const data = await res.json();
    if (!data.success) return;

    // Update Shield Status Banner
    const shieldStatusText = document.getElementById('shield-status-text');
    if (shieldStatusText) {
      if (data.shield_mode) {
        shieldStatusText.innerText = 'ACTIVE (DATABASE LOCKED)';
        shieldStatusText.style.color = '#4ade80';
      } else {
        shieldStatusText.innerText = 'PAUSED (DIRECT EDITS ALLOWED)';
        shieldStatusText.style.color = '#f59e0b';
      }
    }

    // Update Sidebar badge
    const sidebarBadge = document.getElementById('sidebar-security-badge');
    if (sidebarBadge) {
      if (data.total_pending > 0) {
        sidebarBadge.innerText = data.total_pending;
        sidebarBadge.style.display = 'inline-block';
      } else {
        sidebarBadge.style.display = 'none';
      }
    }

    // Update Tab count badges
    const accessCountBadge = document.getElementById('pending-access-count-badge');
    if (accessCountBadge) {
      accessCountBadge.innerText = `${data.pending_access.length} Pending`;
    }
    const changesCountBadge = document.getElementById('pending-changes-count-badge');
    if (changesCountBadge) {
      changesCountBadge.innerText = `${data.pending_changes.length} Pending`;
    }

    // Render tables
    renderAccessRequestsTable(data.pending_access, data.history_access);
    renderChangeRequestsTable(data.pending_changes, data.history_changes);

    // Auto-pop modal for Dr. Anshuman Jaglan if new pending items arrive
    const approvalModal = document.getElementById('chief-admin-approval-modal');
    const isModalOpen = approvalModal && approvalModal.style.display === 'flex';

    if (!isModalOpen) {
      // 1. Check for unseen pending access request
      const unseenAccess = data.pending_access.find(r => !seenPendingIds.has(r.id));
      if (unseenAccess) {
        seenPendingIds.add(unseenAccess.id);
        openChiefApprovalModal(unseenAccess, 'access');
        return;
      }

      // 2. Check for unseen pending database change request
      const unseenChange = data.pending_changes.find(c => !seenPendingIds.has(c.id));
      if (unseenChange) {
        seenPendingIds.add(unseenChange.id);
        openChiefApprovalModal(unseenChange, 'change');
        return;
      }
    }
  } catch (err) {
    // Silent fail in polling loop
  }
}

function openChiefApprovalModal(item, type) {
  const modal = document.getElementById('chief-admin-approval-modal');
  const title = document.getElementById('chief-modal-title');
  const body = document.getElementById('chief-modal-body');
  const actions = document.getElementById('chief-modal-action-buttons');
  if (!modal || !title || !body || !actions) return;

  currentModalItem = item;

  if (type === 'access') {
    title.innerText = '🚨 Incoming Staff Access Attempt';
    body.innerHTML = `
      <div style="background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.4);border-radius:10px;padding:16px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
          <span style="font-size:1.5rem;">👤</span>
          <div>
            <h4 style="margin:0;color:#f87171;font-size:1.15rem;font-weight:700;">${item.requester_name}</h4>
            <span style="font-size:0.8rem;color:#cbd5e1;">${item.requester_role}</span>
          </div>
        </div>
        <div style="margin-top:10px;font-size:0.88rem;color:#e2e8f0;background:rgba(0,0,0,0.35);padding:10px 12px;border-radius:6px;border-left:3px solid #f87171;">
          <strong>Access Reason:</strong> "${item.reason}"
        </div>
        <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:16px;font-size:0.8rem;color:#94a3b8;">
          <span>🕒 <strong>Attempt Time:</strong> ${new Date(item.timestamp).toLocaleTimeString()}</span>
          <span>🌐 <strong>Network:</strong> ${item.ip || 'Local Subnet'}</span>
          ${item.phone ? `<span>📞 <strong>Contact:</strong> ${item.phone}</span>` : ''}
        </div>
      </div>
      <p style="font-size:0.85rem;color:#cbd5e1;line-height:1.5;margin:0;">
        ⚠️ <strong>Security Advisory:</strong> As Chief Administrator, only you (<span style="color:#60a5fa;font-weight:700;">Dr. Anshuman Jaglan</span>) can authorize external staff access into the system. Do you wish to grant immediate dashboard access?
      </p>
    `;
    actions.innerHTML = `
      <button type="button" class="btn btn-secondary" style="background:#dc2626;color:#fff;border-color:#b91c1c;font-weight:700;" onclick="rejectAccessRequest('${item.id}')">
        🚫 Reject &amp; Block Access
      </button>
      <button type="button" class="btn btn-primary" style="background:#16a34a;color:#fff;border-color:#15803d;font-weight:700;" onclick="approveAccessRequest('${item.id}')">
        ✅ Approve &amp; Grant Access
      </button>
    `;
  } else if (type === 'change') {
    title.innerText = '🔒 Database Modification Proposal';
    body.innerHTML = `
      <div style="background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.4);border-radius:10px;padding:16px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
          <span style="font-size:1.5rem;">⚡</span>
          <div>
            <span class="badge badge-emergency" style="font-size:0.75rem;letter-spacing:0.05em;">${item.action_type}</span>
            <h4 style="margin:6px 0 0;color:#fbbf24;font-size:1.05rem;font-weight:700;">${item.description}</h4>
          </div>
        </div>
        <div style="margin-top:10px;background:rgba(0,0,0,0.35);padding:10px 12px;border-radius:6px;font-size:0.85rem;color:#e2e8f0;border-left:3px solid #fbbf24;">
          <strong>Proposed By:</strong> ${item.requester}<br>
          <strong>Timestamp:</strong> ${new Date(item.timestamp).toLocaleTimeString()} (${new Date(item.timestamp).toLocaleDateString()})<br>
          <strong style="color:#94a3b8;">Payload Data:</strong> <code style="color:#67e8f9;font-size:0.8rem;background:rgba(0,0,0,0.4);padding:2px 6px;border-radius:4px;">${JSON.stringify(item.payload)}</code>
        </div>
      </div>
      <p style="font-size:0.85rem;color:#cbd5e1;line-height:1.5;margin:0;">
        🛡️ <strong>Chief Administrator Protection:</strong> This database mutation is currently held in the isolated security buffer. The database will <em>not</em> be changed without Dr. Anshuman Jaglan's verified consent.
      </p>
    `;
    actions.innerHTML = `
      <button type="button" class="btn btn-secondary" style="background:#dc2626;color:#fff;border-color:#b91c1c;font-weight:700;" onclick="rejectChangeRequest('${item.id}')">
        🚫 Reject &amp; Discard
      </button>
      <button type="button" class="btn btn-primary" style="background:#16a34a;color:#fff;border-color:#15803d;font-weight:700;" onclick="approveChangeRequest('${item.id}')">
        ✅ Approve &amp; Commit to Database
      </button>
    `;
  }

  modal.style.display = 'flex';
}

function closeChiefApprovalModal() {
  const modal = document.getElementById('chief-admin-approval-modal');
  if (modal) modal.style.display = 'none';
}

async function approveAccessRequest(id) {
  try {
    const res = await fetch(`/api/security/approve-access/${id}`, { method: 'POST' });
    const json = await res.json();
    if (json.success) {
      showToast(json.message, 'success');
      closeChiefApprovalModal();
      pollPendingSecurityApprovals();
    } else {
      showToast(json.message || 'Approval failed', 'error');
    }
  } catch (err) {
    showToast('Failed to approve access request', 'error');
  }
}

async function rejectAccessRequest(id) {
  try {
    const res = await fetch(`/api/security/reject-access/${id}`, { method: 'POST' });
    const json = await res.json();
    if (json.success) {
      showToast(json.message, 'info');
      closeChiefApprovalModal();
      pollPendingSecurityApprovals();
    } else {
      showToast(json.message || 'Rejection failed', 'error');
    }
  } catch (err) {
    showToast('Failed to reject access request', 'error');
  }
}

async function approveChangeRequest(id) {
  try {
    const res = await fetch(`/api/security/approve-change/${id}`, { method: 'POST' });
    const json = await res.json();
    if (json.success) {
      showToast(json.message, 'success');
      closeChiefApprovalModal();
      pollPendingSecurityApprovals();
      refreshDashboardData(true);
    } else {
      showToast(json.message || 'Approval failed', 'error');
    }
  } catch (err) {
    showToast('Failed to commit change request', 'error');
  }
}

async function rejectChangeRequest(id) {
  try {
    const res = await fetch(`/api/security/reject-change/${id}`, { method: 'POST' });
    const json = await res.json();
    if (json.success) {
      showToast(json.message, 'info');
      closeChiefApprovalModal();
      pollPendingSecurityApprovals();
    } else {
      showToast(json.message || 'Rejection failed', 'error');
    }
  } catch (err) {
    showToast('Failed to reject change request', 'error');
  }
}

async function toggleMasterShield() {
  try {
    const res = await fetch('/api/security/toggle-shield', { method: 'POST' });
    const json = await res.json();
    if (json.success) {
      showToast(json.message, json.shield_mode ? 'success' : 'info');
      pollPendingSecurityApprovals();
    }
  } catch (err) {
    showToast('Could not toggle Master Shield', 'error');
  }
}

async function simulateAccessAttempt() {
  try {
    const res = await fetch('/api/security/simulate-access-attempt', { method: 'POST' });
    const json = await res.json();
    if (json.success) {
      showToast(json.message, 'info');
      setTimeout(pollPendingSecurityApprovals, 300);
    }
  } catch (err) {
    showToast('Simulation failed', 'error');
  }
}

async function simulateChangeRequest() {
  try {
    const res = await fetch('/api/security/simulate-change-request', { method: 'POST' });
    const json = await res.json();
    if (json.success) {
      showToast(json.message, 'info');
      setTimeout(pollPendingSecurityApprovals, 300);
    }
  } catch (err) {
    showToast('Simulation failed', 'error');
  }
}

function renderAccessRequestsTable(pending, history) {
  const tbody = document.getElementById('access-requests-tbody');
  if (!tbody) return;

  const all = [...(pending || []), ...(history || []).filter(h => h.status !== 'PENDING')];
  if (all.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:24px;">No access requests recorded. System secure.</td></tr>`;
    return;
  }

  tbody.innerHTML = all.map(r => {
    const isPending = r.status === 'PENDING';
    const statusBadge = isPending
      ? `<span class="badge badge-pending">PENDING DR. ANSHUMAN'S APPROVAL</span>`
      : (r.status === 'APPROVED' ? `<span class="badge badge-fulfilled">APPROVED</span>` : `<span class="badge badge-rejected">REJECTED</span>`);

    const actionHtml = isPending
      ? `<div style="display:flex;gap:6px;">
          <button class="btn btn-sm btn-primary" style="background:#16a34a;border-color:#15803d;padding:4px 8px;font-size:0.75rem;" onclick="approveAccessRequest('${r.id}')">Approve</button>
          <button class="btn btn-sm btn-secondary" style="background:#dc2626;border-color:#b91c1c;padding:4px 8px;font-size:0.75rem;" onclick="rejectAccessRequest('${r.id}')">Reject</button>
         </div>`
      : `<span style="font-size:0.8rem;color:var(--text-muted);">${r.handled_by || 'Dr. Anshuman Jaglan'}</span>`;

    return `
      <tr>
        <td><code>${r.id}</code></td>
        <td><strong>${r.requester_name}</strong></td>
        <td>${r.requester_role}</td>
        <td style="max-width:240px;font-size:0.85rem;">${r.reason}</td>
        <td style="font-size:0.85rem;">${new Date(r.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</td>
        <td>${statusBadge}</td>
        <td>${actionHtml}</td>
      </tr>
    `;
  }).join('');
}

function renderChangeRequestsTable(pending, history) {
  const tbody = document.getElementById('changes-requests-tbody');
  if (!tbody) return;

  const all = [...(pending || []), ...(history || []).filter(h => h.status !== 'PENDING_APPROVAL')];
  if (all.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:24px;">No database change proposals. Database locked.</td></tr>`;
    return;
  }

  tbody.innerHTML = all.map(c => {
    const isPending = c.status === 'PENDING_APPROVAL';
    const statusBadge = isPending
      ? `<span class="badge badge-emergency">PENDING MASTER VERIFICATION</span>`
      : (c.status === 'COMMITTED' ? `<span class="badge badge-fulfilled">COMMITTED TO DB</span>` : `<span class="badge badge-rejected">REJECTED &amp; DISCARDED</span>`);

    const actionHtml = isPending
      ? `<div style="display:flex;gap:6px;">
          <button class="btn btn-sm btn-primary" style="background:#16a34a;border-color:#15803d;padding:4px 8px;font-size:0.75rem;" onclick="approveChangeRequest('${c.id}')">Approve &amp; Commit</button>
          <button class="btn btn-sm btn-secondary" style="background:#dc2626;border-color:#b91c1c;padding:4px 8px;font-size:0.75rem;" onclick="rejectChangeRequest('${c.id}')">Reject</button>
         </div>`
      : `<span style="font-size:0.8rem;color:var(--text-muted);">${c.handled_by || 'Dr. Anshuman Jaglan'}</span>`;

    return `
      <tr>
        <td><code>${c.id}</code></td>
        <td><span class="badge badge-emergency" style="font-size:0.7rem;">${c.action_type}</span></td>
        <td style="max-width:260px;font-size:0.85rem;"><strong>${c.description}</strong></td>
        <td>${c.requester}</td>
        <td style="font-size:0.85rem;">${new Date(c.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</td>
        <td>${statusBadge}</td>
        <td>${actionHtml}</td>
      </tr>
    `;
  }).join('');
}

