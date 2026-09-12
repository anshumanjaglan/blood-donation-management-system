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

  // Stealth Administrator Gateway (Exclusive for Dr. Anshuman Jaglan)
  initStealthAdminAccess();
});

// Stealth Administrator Gateway Trigger
function initStealthAdminAccess() {
  // 1. Secret Hotkey: Ctrl + Shift + A or Alt + A
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'A' || e.key === 'a'))) {
      e.preventDefault();
      openStealthAdminModal();
    }
  });

  // 2. Secret Logo Triple-Click
  const brands = document.querySelectorAll('.brand');
  brands.forEach(brand => {
    let clickCount = 0;
    let clickTimer = null;
    brand.addEventListener('click', (e) => {
      clickCount++;
      if (clickCount === 3) {
        e.preventDefault();
        clickCount = 0;
        clearTimeout(clickTimer);
        openStealthAdminModal();
      } else {
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clickCount = 0; }, 1200);
      }
    });
  });
}

// Show discrete modal prompt for Chief Admin
function openStealthAdminModal() {
  let modal = document.getElementById('stealth-admin-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'stealth-admin-modal';
    modal.style.cssText = `
      position: fixed; inset: 0; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center; z-index: 99999; animation: fadeIn 0.2s ease;
    `;
    modal.innerHTML = `
      <div style="background: #1e293b; border: 1px solid #dc2626; border-radius: 12px; max-width: 440px; width: 90%; padding: 24px; color: #fff; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); text-align: center;">
        <div style="width: 48px; height: 48px; background: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px;">
          <svg viewBox="0 0 24 24" style="width:24px;height:24px;fill:none;stroke:#fff;stroke-width:2;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 6px;">Chief Administrator Gateway</h3>
        <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 20px;">
          Restricted access for <strong>Dr. Anshuman Jaglan</strong> only. Public access is disabled.
        </p>
        <div style="display: flex; gap: 10px; justify-content: center;">
          <button class="btn btn-outline" style="border-color:#475569; color:#cbd5e1;" onclick="document.getElementById('stealth-admin-modal').remove()">
            Cancel (Esc)
          </button>
          <a href="admin-login.html" class="btn btn-red" style="background:#dc2626; color:#fff; text-decoration:none; padding: 8px 18px; border-radius: 6px; font-weight: 700;">
            Proceed to Login &rarr;
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    window.addEventListener('keydown', function escHandler(ev) {
      if (ev.key === 'Escape' && document.getElementById('stealth-admin-modal')) {
        document.getElementById('stealth-admin-modal').remove();
        window.removeEventListener('keydown', escHandler);
      }
    });
  }
}

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
