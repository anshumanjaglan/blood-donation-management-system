/**
 * Main Client-side Script
 * Core UI interactions, stock grid population, emergency notifications
 */

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Load live stock grid if present on page
  const stockGrid = document.getElementById('stock-grid');
  if (stockGrid) {
    loadInventoryStock();
  }

  // Check for active emergencies to show in banner
  checkActiveEmergencies();
});

// Toast Notification Engine
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button style="background:none;border:none;cursor:pointer;font-size:1.1rem;margin-left:12px;" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// Fetch & Render Live Blood Bank Inventory
async function loadInventoryStock() {
  const grid = document.getElementById('stock-grid');
  if (!grid) return;

  try {
    const res = await fetch('/api/inventory');
    const json = await res.json();
    if (json.success && json.data) {
      grid.innerHTML = json.data.map(item => `
        <div class="stock-card">
          <div class="stock-blood-group">${item.blood_group}</div>
          <div class="stock-units">${item.units_available} Units</div>
          <div class="stock-label">Available</div>
          <span class="stock-status status-${item.status}">${item.status} Stock</span>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load inventory stock:', err);
    grid.innerHTML = `<p style="color:var(--text-muted);text-align:center;grid-column:1/-1;">Inventory temporarily unavailable.</p>`;
  }
}

// Check for pending emergency blood requests and update ticker
async function checkActiveEmergencies() {
  const tickerText = document.getElementById('emergency-ticker-text');
  if (!tickerText) return;

  try {
    const res = await fetch('/api/requests?is_emergency=true&status=Pending');
    const json = await res.json();
    if (json.success && json.data && json.data.length > 0) {
      const topReq = json.data[0];
      tickerText.innerHTML = `
        <strong>CRITICAL NEED:</strong> ${topReq.blood_group} blood urgently needed at ${topReq.hospital_name} (${topReq.city}). 
        <a href="request-blood.html" class="ticker-link">Help or Respond &rarr;</a>
      `;
    } else {
      tickerText.innerHTML = `
        24x7 Emergency Blood Assistance Line active. In urgent need? <a href="request-blood.html" class="ticker-link">Submit Emergency Request &rarr;</a>
      `;
    }
  } catch (err) {
    // Non-blocking
  }
}
