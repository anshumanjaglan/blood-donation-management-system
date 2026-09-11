const express = require('express');
const router = express.Router();
const { db } = require('../config/db');
const { getCompatibleDonorsFor, getCompatibleRecipientsFor, findMatches } = require('../services/matchingService');

// ==========================================
// 1. INVENTORY ENDPOINTS
// ==========================================

// Get current blood stock with status calculation
router.get('/inventory', async (req, res) => {
  try {
    const inventory = await db.getInventory();
    const formatted = inventory.map(item => {
      let status = 'Safe';
      if (item.units_available <= item.critical_threshold) {
        status = 'Critical';
      } else if (item.units_available <= item.safe_threshold) {
        status = 'Low';
      }
      return {
        ...item,
        status
      };
    });
    return res.json({ success: true, data: formatted });
  } catch (err) {
    console.error('Inventory fetch error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch inventory' });
  }
});

// Update blood stock (Add or Deduct units, or set direct amount)
router.put('/inventory/:bloodGroup', async (req, res) => {
  try {
    const bloodGroup = decodeURIComponent(req.params.bloodGroup);
    const { unitsChange, setUnits } = req.body;

    let updated;
    if (setUnits !== undefined) {
      updated = await db.setInventoryUnits(bloodGroup, parseInt(setUnits));
    } else if (unitsChange !== undefined) {
      updated = await db.updateInventory(bloodGroup, parseInt(unitsChange));
    } else {
      return res.status(400).json({ success: false, message: 'Please provide unitsChange or setUnits' });
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Blood group not found' });
    }

    return res.json({ success: true, message: `Inventory for ${bloodGroup} updated`, data: updated });
  } catch (err) {
    console.error('Inventory update error:', err);
    return res.status(500).json({ success: false, message: 'Failed to update inventory' });
  }
});

// ==========================================
// 2. DONORS ENDPOINTS
// ==========================================

// Search & List Donors
router.get('/donors', async (req, res) => {
  try {
    const { blood_group, city, is_available, status } = req.query;
    const donors = await db.getDonors({ blood_group, city, is_available, status });
    return res.json({ success: true, count: donors.length, data: donors });
  } catch (err) {
    console.error('Donors fetch error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch donors' });
  }
});

// Get Donor by ID
router.get('/donors/:id', async (req, res) => {
  try {
    const donor = await db.getDonorById(req.params.id);
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }
    return res.json({ success: true, data: donor });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving donor' });
  }
});

// Register New Donor
router.post('/donors', async (req, res) => {
  try {
    const { full_name, blood_group, gender, age, phone, email, city, district, address, pincode, last_donation_date, is_available } = req.body;

    // Validation
    if (!full_name || !blood_group || !gender || !age || !phone || !city) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all mandatory fields (Name, Blood Group, Gender, Age, Phone, City)'
      });
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 65) {
      return res.status(400).json({
        success: false,
        message: 'Donor age must be between 18 and 65 years to donate blood safely.'
      });
    }

    const newDonor = await db.addDonor({
      full_name,
      blood_group,
      gender,
      age: ageNum,
      phone,
      email: email || '',
      city,
      district: district || '',
      address: address || '',
      pincode: pincode || '',
      last_donation_date: last_donation_date || null,
      is_available: is_available !== undefined ? is_available : true,
      status: 'Active'
    });

    return res.status(201).json({
      success: true,
      message: 'Donor registered successfully. Thank you for saving lives!',
      data: newDonor
    });
  } catch (err) {
    console.error('Donor registration error:', err);
    return res.status(500).json({ success: false, message: 'Failed to register donor' });
  }
});

// Update Donor
router.put('/donors/:id', async (req, res) => {
  try {
    const updated = await db.updateDonor(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }
    return res.json({ success: true, message: 'Donor details updated successfully', data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update donor' });
  }
});

// Delete Donor
router.delete('/donors/:id', async (req, res) => {
  try {
    const deleted = await db.deleteDonor(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }
    return res.json({ success: true, message: 'Donor record deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete donor' });
  }
});

// ==========================================
// 3. BLOOD REQUESTS & TRACKING ENDPOINTS
// ==========================================

// List Requests (Admin or Hospital)
router.get('/requests', async (req, res) => {
  try {
    const { status, blood_group, is_emergency } = req.query;
    const requests = await db.getRequests({ status, blood_group, is_emergency });
    return res.json({ success: true, count: requests.length, data: requests });
  } catch (err) {
    console.error('Requests fetch error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch blood requests' });
  }
});

// Track Request by Code or Contact Phone
router.get('/requests/track/:query', async (req, res) => {
  try {
    const query = decodeURIComponent(req.params.query).trim();
    const matches = await db.getRequestByCode(query);
    if (!matches || matches.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No request found for tracking identifier: "${query}". Please check your Request ID or Phone Number.`
      });
    }
    return res.json({ success: true, data: matches });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to track request' });
  }
});

// Submit New Request (Normal or Emergency)
router.post('/requests', async (req, res) => {
  try {
    const {
      patient_name,
      blood_group,
      units_needed,
      hospital_name,
      city,
      contact_person,
      contact_phone,
      contact_email,
      urgency,
      is_emergency,
      required_by_date,
      reason
    } = req.body;

    if (!patient_name || !blood_group || !hospital_name || !city || !contact_person || !contact_phone || !required_by_date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (Patient, Blood Group, Hospital, City, Contact Person, Phone, Date)'
      });
    }

    const created = await db.addRequest({
      patient_name,
      blood_group,
      units_needed: parseInt(units_needed) || 1,
      hospital_name,
      city,
      contact_person,
      contact_phone,
      contact_email: contact_email || '',
      urgency: urgency || (is_emergency ? 'Critical' : 'Normal'),
      is_emergency: !!is_emergency,
      required_by_date,
      reason: reason || ''
    });

    return res.status(201).json({
      success: true,
      message: 'Blood request submitted successfully!',
      requestCode: created.request_code,
      data: created
    });
  } catch (err) {
    console.error('Request creation error:', err);
    return res.status(500).json({ success: false, message: 'Failed to submit blood request' });
  }
});

// Update Request Status (Approve, Reject, Match)
router.put('/requests/:id/status', async (req, res) => {
  try {
    const { status, fulfillment_source, rejection_reason } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updates = { status };
    if (fulfillment_source) updates.fulfillment_source = fulfillment_source;
    if (rejection_reason) updates.notes = rejection_reason;

    const updated = await db.updateRequest(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    return res.json({ success: true, message: `Request status updated to ${status}`, data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update request' });
  }
});

// Fulfill Request directly from Inventory
router.put('/requests/:id/fulfill-from-inventory', async (req, res) => {
  try {
    const requestId = req.params.id;
    const requests = await db.getRequests();
    const target = requests.find(r => r.id == requestId);

    if (!target) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    const inventory = await db.getInventory();
    const stock = inventory.find(i => i.blood_group === target.blood_group);

    if (!stock || stock.units_available < target.units_needed) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for ${target.blood_group}. Available: ${stock ? stock.units_available : 0}, Needed: ${target.units_needed}. Consider matching registered voluntary donors.`
      });
    }

    // Deduct stock
    await db.updateInventory(target.blood_group, -target.units_needed);

    // Update request
    const updated = await db.updateRequest(requestId, {
      status: 'Fulfilled',
      fulfillment_source: `Dispatched from Blood Bank Inventory (${target.units_needed} units of ${target.blood_group})`
    });

    return res.json({
      success: true,
      message: `Successfully fulfilled request ${target.request_code} from inventory. ${target.units_needed} unit(s) of ${target.blood_group} deducted.`,
      data: updated
    });
  } catch (err) {
    console.error('Inventory fulfillment error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fulfill from inventory' });
  }
});

// ==========================================
// 4. SMART MATCHING & COMPATIBILITY ENDPOINT
// ==========================================
router.get('/matching', async (req, res) => {
  try {
    const { blood_group, city } = req.query;
    if (!blood_group) {
      return res.status(400).json({ success: false, message: 'Please specify blood_group to find matching donors' });
    }

    const allDonors = await db.getDonors();
    const result = findMatches(allDonors, { bloodGroup: blood_group, city });

    return res.json({ success: true, data: result });
  } catch (err) {
    console.error('Matching error:', err);
    return res.status(500).json({ success: false, message: 'Failed to execute matching algorithm' });
  }
});

// Full compatibility matrix lookup
router.get('/compatibility-matrix', (req, res) => {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const matrix = bloodGroups.map(bg => ({
    bloodGroup: bg,
    canReceiveFrom: getCompatibleDonorsFor(bg),
    canDonateTo: getCompatibleRecipientsFor(bg)
  }));
  return res.json({ success: true, data: matrix });
});

// ==========================================
// 5. DASHBOARD STATS ENDPOINT
// ==========================================
router.get('/stats', async (req, res) => {
  try {
    const stats = await db.getStats();
    return res.json({ success: true, data: stats });
  } catch (err) {
    console.error('Stats fetch error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch dashboard statistics' });
  }
});

// ==========================================
// 6. DONATIONS LOGGING
// ==========================================
router.get('/donations', async (req, res) => {
  try {
    const donations = await db.getDonations();
    return res.json({ success: true, count: donations.length, data: donations });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch donation records' });
  }
});

router.post('/donations', async (req, res) => {
  try {
    const { donor_id, donor_name, blood_group, units_donated, camp_or_hospital, hemoglobin_level } = req.body;
    if (!donor_name || !blood_group) {
      return res.status(400).json({ success: false, message: 'Donor name and blood group are required' });
    }

    const units = parseInt(units_donated) || 1;
    const donation = await db.addDonation({
      donor_id: donor_id || null,
      donor_name,
      blood_group,
      units_donated: units,
      camp_or_hospital: camp_or_hospital || 'Central Blood Bank',
      hemoglobin_level: parseFloat(hemoglobin_level) || 13.5
    });

    // Auto increment blood inventory for tested safe blood
    await db.updateInventory(blood_group, units);

    // Update donor last donation date if donor_id provided
    if (donor_id) {
      await db.updateDonor(donor_id, {
        last_donation_date: new Date().toISOString().split('T')[0]
      });
    }

    return res.status(201).json({
      success: true,
      message: `Donation recorded. Added ${units} unit(s) of ${blood_group} to inventory.`,
      data: donation
    });
  } catch (err) {
    console.error('Donation record error:', err);
    return res.status(500).json({ success: false, message: 'Failed to record donation' });
  }
});

// ==========================================
// 7. HOSPITALS ENDPOINTS
// ==========================================
router.get('/hospitals', async (req, res) => {
  try {
    const hospitals = await db.getHospitals();
    return res.json({ success: true, count: hospitals.length, data: hospitals });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch hospitals' });
  }
});

router.post('/hospitals', async (req, res) => {
  try {
    const { name, license_number, city, address, contact_person, phone, email } = req.body;
    if (!name || !license_number || !city || !phone || !email) {
      return res.status(400).json({ success: false, message: 'All hospital details are required' });
    }
    const created = await db.addHospital({ name, license_number, city, address, contact_person, phone, email });
    return res.status(201).json({ success: true, message: 'Hospital registered successfully', data: created });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to register hospital' });
  }
});

module.exports = router;
