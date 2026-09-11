const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_JSON_PATH = path.join(DATA_DIR, 'database.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default seed data for JSON store fallback
const initialData = {
  admins: [
    { id: 1, username: 'admin', password: 'password123', name: 'Dr. Anshuman Jaglan', email: 'jaglananshuman@gmail.com', role: 'Chief Medical Administrator' },
    { id: 2, staff: 'staff', password: 'password123', name: 'Staff Member', email: 'staff@bloodbank.org', role: 'Staff' }
  ],
  blood_inventory: [
    { id: 1, blood_group: 'A+', units_available: 24, safe_threshold: 10, critical_threshold: 4, last_updated: new Date().toISOString() },
    { id: 2, blood_group: 'A-', units_available: 8, safe_threshold: 8, critical_threshold: 3, last_updated: new Date().toISOString() },
    { id: 3, blood_group: 'B+', units_available: 32, safe_threshold: 12, critical_threshold: 5, last_updated: new Date().toISOString() },
    { id: 4, blood_group: 'B-', units_available: 6, safe_threshold: 8, critical_threshold: 3, last_updated: new Date().toISOString() },
    { id: 5, blood_group: 'AB+', units_available: 15, safe_threshold: 8, critical_threshold: 3, last_updated: new Date().toISOString() },
    { id: 6, blood_group: 'AB-', units_available: 4, safe_threshold: 6, critical_threshold: 2, last_updated: new Date().toISOString() },
    { id: 7, blood_group: 'O+', units_available: 42, safe_threshold: 15, critical_threshold: 6, last_updated: new Date().toISOString() },
    { id: 8, blood_group: 'O-', units_available: 5, safe_threshold: 10, critical_threshold: 3, last_updated: new Date().toISOString() }
  ],
  donors: [
    {
      id: 1,
      full_name: 'Rahul Sharma',
      blood_group: 'O+',
      gender: 'Male',
      age: 27,
      phone: '+91 9876543210',
      email: 'rahul.sharma@example.com',
      city: 'Delhi',
      district: 'Central Delhi',
      address: 'Connaught Place, Block B',
      pincode: '110001',
      last_donation_date: '2026-06-15',
      is_available: true,
      status: 'Active',
      total_donations: 3,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      full_name: 'Priya Patel',
      blood_group: 'A+',
      gender: 'Female',
      age: 24,
      phone: '+91 9823456789',
      email: 'priya.patel@example.com',
      city: 'Delhi',
      district: 'South Delhi',
      address: 'Saket District Centre',
      pincode: '110017',
      last_donation_date: '2026-05-10',
      is_available: true,
      status: 'Active',
      total_donations: 2,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      full_name: 'Amit Kumar',
      blood_group: 'B+',
      gender: 'Male',
      age: 31,
      phone: '+91 9811223344',
      email: 'amit.k@example.com',
      city: 'Noida',
      district: 'Gautam Buddha Nagar',
      address: 'Sector 62, Green Valley',
      pincode: '201301',
      last_donation_date: '2026-04-20',
      is_available: true,
      status: 'Active',
      total_donations: 4,
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      full_name: 'Sneha Reddy',
      blood_group: 'AB+',
      gender: 'Female',
      age: 22,
      phone: '+91 9845112233',
      email: 'sneha.reddy@example.com',
      city: 'Gurugram',
      district: 'Gurugram',
      address: 'DLF Phase 3, Cyber City',
      pincode: '122002',
      last_donation_date: '2026-07-02',
      is_available: true,
      status: 'Active',
      total_donations: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      full_name: 'Vikram Singh',
      blood_group: 'O-',
      gender: 'Male',
      age: 35,
      phone: '+91 9871199882',
      email: 'vikram.singh@example.com',
      city: 'Delhi',
      district: 'West Delhi',
      address: 'Rajouri Garden, Main Market',
      pincode: '110027',
      last_donation_date: '2026-03-12',
      is_available: true,
      status: 'Active',
      total_donations: 6,
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      full_name: 'Ananya Gupta',
      blood_group: 'A-',
      gender: 'Female',
      age: 26,
      phone: '+91 9910022334',
      email: 'ananya.g@example.com',
      city: 'Noida',
      district: 'Gautam Buddha Nagar',
      address: 'Sector 18, Commercial Belt',
      pincode: '201301',
      last_donation_date: '2026-02-18',
      is_available: true,
      status: 'Active',
      total_donations: 2,
      created_at: new Date().toISOString()
    },
    {
      id: 7,
      full_name: 'Mohammed Faizan',
      blood_group: 'B-',
      gender: 'Male',
      age: 29,
      phone: '+91 9899112233',
      email: 'faizan.m@example.com',
      city: 'Delhi',
      district: 'North Delhi',
      address: 'Civil Lines, Rajpur Road',
      pincode: '110054',
      last_donation_date: '2026-05-30',
      is_available: true,
      status: 'Active',
      total_donations: 3,
      created_at: new Date().toISOString()
    },
    {
      id: 8,
      full_name: 'Neha Verma',
      blood_group: 'AB-',
      gender: 'Female',
      age: 28,
      phone: '+91 9711883322',
      email: 'neha.v@example.com',
      city: 'Faridabad',
      district: 'Faridabad',
      address: 'Sector 15, Near Metro',
      pincode: '121007',
      last_donation_date: '2026-01-25',
      is_available: true,
      status: 'Active',
      total_donations: 1,
      created_at: new Date().toISOString()
    }
  ],
  blood_requests: [
    {
      id: 1,
      request_code: 'REQ-2026-001',
      patient_name: 'Sunil Kapoor',
      blood_group: 'O+',
      units_needed: 2,
      hospital_name: 'AIIMS Hospital',
      city: 'Delhi',
      contact_person: 'Dr. Alok Verma',
      contact_phone: '+91 9811224466',
      contact_email: 'alok.v@aiims.edu',
      urgency: 'Critical',
      is_emergency: true,
      required_by_date: '2026-09-12',
      reason: 'Emergency trauma surgery',
      status: 'Fulfilled',
      fulfillment_source: 'Central Blood Bank Inventory (2 Units)',
      created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
    },
    {
      id: 2,
      request_code: 'REQ-2026-002',
      patient_name: 'Meera Mehra',
      blood_group: 'B+',
      units_needed: 1,
      hospital_name: 'Max Super Speciality Hospital',
      city: 'Noida',
      contact_person: 'Suresh Mehra',
      contact_phone: '+91 9873344556',
      contact_email: 'suresh.m@example.com',
      urgency: 'Urgent',
      is_emergency: true,
      required_by_date: '2026-09-13',
      reason: 'Cardiac bypass surgery requirement',
      status: 'Approved',
      fulfillment_source: null,
      created_at: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
    },
    {
      id: 3,
      request_code: 'REQ-2026-003',
      patient_name: 'Karan Sachdeva',
      blood_group: 'O-',
      units_needed: 1,
      hospital_name: 'Fortis Memorial Research Institute',
      city: 'Gurugram',
      contact_person: 'Anita Sachdeva',
      contact_phone: '+91 9810099887',
      contact_email: 'anita.s@example.com',
      urgency: 'Critical',
      is_emergency: true,
      required_by_date: '2026-09-12',
      reason: 'Severe acute internal hemorrhage',
      status: 'Pending',
      fulfillment_source: null,
      created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
    },
    {
      id: 4,
      request_code: 'REQ-2026-004',
      patient_name: 'Tanvi Saxena',
      blood_group: 'A+',
      units_needed: 2,
      hospital_name: 'Apollo Hospital',
      city: 'Delhi',
      contact_person: 'Rajesh Saxena',
      contact_phone: '+91 9899887766',
      contact_email: 'rajesh.s@example.com',
      urgency: 'Normal',
      is_emergency: false,
      required_by_date: '2026-09-15',
      reason: 'Scheduled hip replacement procedure',
      status: 'Pending',
      fulfillment_source: null,
      created_at: new Date(Date.now() - 8 * 3600 * 1000).toISOString()
    }
  ],
  donations: [
    { id: 1, donor_id: 1, donor_name: 'Rahul Sharma', blood_group: 'O+', units_donated: 1, donation_date: '2026-06-15', camp_or_hospital: 'Red Cross Mobile Camp', hemoglobin_level: 14.2, status: 'Tested_Safe' },
    { id: 2, donor_id: 2, donor_name: 'Priya Patel', blood_group: 'A+', units_donated: 1, donation_date: '2026-05-10', camp_or_hospital: 'AIIMS Blood Bank Drive', hemoglobin_level: 13.0, status: 'Tested_Safe' },
    { id: 3, donor_id: 3, donor_name: 'Amit Kumar', blood_group: 'B+', units_donated: 1, donation_date: '2026-04-20', camp_or_hospital: 'Rotary Blood Bank Noida', hemoglobin_level: 14.8, status: 'Tested_Safe' },
    { id: 4, donor_id: 5, donor_name: 'Vikram Singh', blood_group: 'O-', units_donated: 1, donation_date: '2026-03-12', camp_or_hospital: 'Max Healthcare Voluntary Camp', hemoglobin_level: 15.1, status: 'Tested_Safe' }
  ],
  hospitals: [
    { id: 1, name: 'AIIMS Central Hospital', license_number: 'HOSP-DEL-001', city: 'Delhi', address: 'Ansari Nagar, New Delhi', contact_person: 'Dr. Manisha Sharma', phone: '+91 11 26588500', email: 'bloodbank@aiims.edu', status: 'Verified' },
    { id: 2, name: 'Max Super Speciality Hospital', license_number: 'HOSP-NOI-004', city: 'Noida', address: 'Sector 19, Noida', contact_person: 'Dr. Naveen Goel', phone: '+91 120 6629999', email: 'info@maxhealthcare.com', status: 'Verified' },
    { id: 3, name: 'Fortis Memorial Research Institute', license_number: 'HOSP-GUR-008', city: 'Gurugram', address: 'Sector 44, Gurugram', contact_person: 'Dr. Rashmi Roy', phone: '+91 124 4962200', email: 'emergency@fortishealthcare.com', status: 'Verified' }
  ]
};

// JSON Database Helper (Embedded Mode)
class JsonDb {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = null;
    this.load();
  }

  load() {
    if (!fs.existsSync(this.filePath)) {
      this.data = JSON.parse(JSON.stringify(initialData));
      this.save();
    } else {
      try {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        this.data = JSON.parse(raw);
      } catch (err) {
        console.error('Error reading JSON DB, resetting to defaults:', err);
        this.data = JSON.parse(JSON.stringify(initialData));
        this.save();
      }
    }
  }

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
  }

  get(collection) {
    return this.data[collection] || [];
  }

  insert(collection, item) {
    if (!this.data[collection]) this.data[collection] = [];
    const maxId = this.data[collection].reduce((max, obj) => (obj.id > max ? obj.id : max), 0);
    const newItem = { id: maxId + 1, created_at: new Date().toISOString(), ...item };
    this.data[collection].push(newItem);
    this.save();
    return newItem;
  }

  update(collection, id, updates) {
    if (!this.data[collection]) return null;
    const index = this.data[collection].findIndex(item => item.id == id);
    if (index !== -1) {
      this.data[collection][index] = { ...this.data[collection][index], ...updates };
      this.save();
      return this.data[collection][index];
    }
    return null;
  }

  delete(collection, id) {
    if (!this.data[collection]) return false;
    const initialLen = this.data[collection].length;
    this.data[collection] = this.data[collection].filter(item => item.id != id);
    const changed = this.data[collection].length < initialLen;
    if (changed) this.save();
    return changed;
  }
}

const localDb = new JsonDb(DB_JSON_PATH);

let pool = null;
let useMySQL = false;

async function initDatabase() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'blood_donation_db';
  const port = process.env.DB_PORT || 3306;

  try {
    const tempConnection = await mysql.createConnection({ host, user, password, port });
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await tempConnection.end();

    pool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    const connection = await pool.getConnection();
    console.log(`[DB] Connected successfully to MySQL (${host}:${port}/${database})`);
    connection.release();
    useMySQL = true;
  } catch (err) {
    console.log(`[DB INFO] MySQL is not reachable (${err.code || err.message}).`);
    console.log(`[DB INFO] Active Mode: Embedded Zero-Config Database (Auto-fallback enabled). All data is safely stored in /data/database.json`);
    useMySQL = false;
  }
}

// Unified Database Access Layer
const db = {
  isMySQL() {
    return useMySQL;
  },

  // Inventory
  async getInventory() {
    if (useMySQL) {
      const [rows] = await pool.query('SELECT * FROM blood_inventory ORDER BY id ASC');
      return rows;
    }
    return localDb.get('blood_inventory');
  },

  async updateInventory(bloodGroup, unitsChange) {
    if (useMySQL) {
      await pool.query(
        'UPDATE blood_inventory SET units_available = GREATEST(0, units_available + ?), last_updated = CURRENT_TIMESTAMP WHERE blood_group = ?',
        [unitsChange, bloodGroup]
      );
      const [rows] = await pool.query('SELECT * FROM blood_inventory WHERE blood_group = ?', [bloodGroup]);
      return rows[0];
    }
    const inv = localDb.get('blood_inventory');
    const item = inv.find(i => i.blood_group === bloodGroup);
    if (item) {
      item.units_available = Math.max(0, item.units_available + unitsChange);
      item.last_updated = new Date().toISOString();
      localDb.save();
      return item;
    }
    return null;
  },

  async setInventoryUnits(bloodGroup, units) {
    if (useMySQL) {
      await pool.query(
        'UPDATE blood_inventory SET units_available = ?, last_updated = CURRENT_TIMESTAMP WHERE blood_group = ?',
        [units, bloodGroup]
      );
      const [rows] = await pool.query('SELECT * FROM blood_inventory WHERE blood_group = ?', [bloodGroup]);
      return rows[0];
    }
    const inv = localDb.get('blood_inventory');
    const item = inv.find(i => i.blood_group === bloodGroup);
    if (item) {
      item.units_available = Math.max(0, parseInt(units) || 0);
      item.last_updated = new Date().toISOString();
      localDb.save();
      return item;
    }
    return null;
  },

  // Donors
  async getDonors(filters = {}) {
    if (useMySQL) {
      let sql = 'SELECT * FROM donors WHERE 1=1';
      const params = [];
      if (filters.blood_group) {
        sql += ' AND blood_group = ?';
        params.push(filters.blood_group);
      }
      if (filters.city) {
        sql += ' AND LOWER(city) LIKE LOWER(?)';
        params.push(`%${filters.city}%`);
      }
      if (filters.is_available !== undefined && filters.is_available !== '') {
        sql += ' AND is_available = ?';
        params.push(filters.is_available === 'true' || filters.is_available === true ? 1 : 0);
      }
      if (filters.status) {
        sql += ' AND status = ?';
        params.push(filters.status);
      }
      sql += ' ORDER BY id DESC';
      const [rows] = await pool.query(sql, params);
      return rows;
    }

    let list = localDb.get('donors');
    if (filters.blood_group) {
      list = list.filter(d => d.blood_group === filters.blood_group);
    }
    if (filters.city) {
      list = list.filter(d => d.city && d.city.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.is_available !== undefined && filters.is_available !== '') {
      const boolVal = filters.is_available === 'true' || filters.is_available === true;
      list = list.filter(d => !!d.is_available === boolVal);
    }
    if (filters.status) {
      list = list.filter(d => d.status === filters.status);
    }
    return [...list].reverse();
  },

  async getDonorById(id) {
    if (useMySQL) {
      const [rows] = await pool.query('SELECT * FROM donors WHERE id = ?', [id]);
      return rows[0] || null;
    }
    const list = localDb.get('donors');
    return list.find(d => d.id == id) || null;
  },

  async addDonor(donor) {
    if (useMySQL) {
      const [result] = await pool.query(
        `INSERT INTO donors (full_name, blood_group, gender, age, phone, email, city, district, address, pincode, last_donation_date, is_available, status, total_donations)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          donor.full_name,
          donor.blood_group,
          donor.gender,
          donor.age,
          donor.phone,
          donor.email || null,
          donor.city,
          donor.district || null,
          donor.address || null,
          donor.pincode || null,
          donor.last_donation_date || null,
          donor.is_available !== undefined ? donor.is_available : 1,
          donor.status || 'Active',
          donor.total_donations || 1
        ]
      );
      return { id: result.insertId, ...donor };
    }
    return localDb.insert('donors', {
      ...donor,
      is_available: donor.is_available !== undefined ? !!donor.is_available : true,
      status: donor.status || 'Active',
      total_donations: donor.total_donations || 1
    });
  },

  async updateDonor(id, updates) {
    if (useMySQL) {
      const keys = Object.keys(updates);
      if (keys.length === 0) return null;
      const setClause = keys.map(k => `\`${k}\` = ?`).join(', ');
      const values = [...Object.values(updates), id];
      await pool.query(`UPDATE donors SET ${setClause} WHERE id = ?`, values);
      return this.getDonorById(id);
    }
    return localDb.update('donors', id, updates);
  },

  async deleteDonor(id) {
    if (useMySQL) {
      const [result] = await pool.query('DELETE FROM donors WHERE id = ?', [id]);
      return result.affectedRows > 0;
    }
    return localDb.delete('donors', id);
  },

  // Requests
  async getRequests(filters = {}) {
    if (useMySQL) {
      let sql = 'SELECT * FROM blood_requests WHERE 1=1';
      const params = [];
      if (filters.status) {
        sql += ' AND status = ?';
        params.push(filters.status);
      }
      if (filters.blood_group) {
        sql += ' AND blood_group = ?';
        params.push(filters.blood_group);
      }
      if (filters.is_emergency !== undefined && filters.is_emergency !== '') {
        sql += ' AND is_emergency = ?';
        params.push(filters.is_emergency === 'true' || filters.is_emergency === true ? 1 : 0);
      }
      sql += ' ORDER BY id DESC';
      const [rows] = await pool.query(sql, params);
      return rows;
    }

    let list = localDb.get('blood_requests');
    if (filters.status) {
      list = list.filter(r => r.status === filters.status);
    }
    if (filters.blood_group) {
      list = list.filter(r => r.blood_group === filters.blood_group);
    }
    if (filters.is_emergency !== undefined && filters.is_emergency !== '') {
      const boolVal = filters.is_emergency === 'true' || filters.is_emergency === true;
      list = list.filter(r => !!r.is_emergency === boolVal);
    }
    return [...list].reverse();
  },

  async getRequestByCode(code) {
    if (useMySQL) {
      const [rows] = await pool.query('SELECT * FROM blood_requests WHERE request_code = ? OR contact_phone = ?', [code, code]);
      return rows;
    }
    const list = localDb.get('blood_requests');
    return list.filter(r => r.request_code.toUpperCase() === code.toUpperCase() || r.contact_phone === code);
  },

  async addRequest(req) {
    const timestamp = Date.now().toString().slice(-4);
    const requestCode = req.request_code || `REQ-${new Date().getFullYear()}-${timestamp}`;

    if (useMySQL) {
      const [result] = await pool.query(
        `INSERT INTO blood_requests (request_code, patient_name, blood_group, units_needed, hospital_name, city, contact_person, contact_phone, contact_email, urgency, is_emergency, required_by_date, reason, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          requestCode,
          req.patient_name,
          req.blood_group,
          req.units_needed || 1,
          req.hospital_name,
          req.city,
          req.contact_person,
          req.contact_phone,
          req.contact_email || null,
          req.urgency || 'Normal',
          req.is_emergency ? 1 : 0,
          req.required_by_date,
          req.reason || null,
          'Pending'
        ]
      );
      return { id: result.insertId, request_code: requestCode, ...req, status: 'Pending' };
    }

    return localDb.insert('blood_requests', {
      request_code: requestCode,
      patient_name: req.patient_name,
      blood_group: req.blood_group,
      units_needed: parseInt(req.units_needed) || 1,
      hospital_name: req.hospital_name,
      city: req.city,
      contact_person: req.contact_person,
      contact_phone: req.contact_phone,
      contact_email: req.contact_email || null,
      urgency: req.urgency || 'Normal',
      is_emergency: !!req.is_emergency,
      required_by_date: req.required_by_date,
      reason: req.reason || '',
      status: 'Pending',
      fulfillment_source: null
    });
  },

  async updateRequest(id, updates) {
    if (useMySQL) {
      const keys = Object.keys(updates);
      if (keys.length === 0) return null;
      const setClause = keys.map(k => `\`${k}\` = ?`).join(', ');
      const values = [...Object.values(updates), id];
      await pool.query(`UPDATE blood_requests SET ${setClause} WHERE id = ?`, values);
      const [rows] = await pool.query('SELECT * FROM blood_requests WHERE id = ?', [id]);
      return rows[0];
    }
    return localDb.update('blood_requests', id, updates);
  },

  // Donations History
  async getDonations() {
    if (useMySQL) {
      const [rows] = await pool.query('SELECT * FROM donations ORDER BY id DESC');
      return rows;
    }
    return [...localDb.get('donations')].reverse();
  },

  async addDonation(record) {
    if (useMySQL) {
      const [result] = await pool.query(
        `INSERT INTO donations (donor_id, donor_name, blood_group, units_donated, donation_date, camp_or_hospital, hemoglobin_level, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          record.donor_id || null,
          record.donor_name,
          record.blood_group,
          record.units_donated || 1,
          record.donation_date || new Date().toISOString().split('T')[0],
          record.camp_or_hospital || 'Central Blood Bank',
          record.hemoglobin_level || 13.5,
          record.status || 'Tested_Safe'
        ]
      );
      return { id: result.insertId, ...record };
    }
    return localDb.insert('donations', {
      donor_id: record.donor_id || null,
      donor_name: record.donor_name,
      blood_group: record.blood_group,
      units_donated: parseInt(record.units_donated) || 1,
      donation_date: record.donation_date || new Date().toISOString().split('T')[0],
      camp_or_hospital: record.camp_or_hospital || 'Central Blood Bank',
      hemoglobin_level: parseFloat(record.hemoglobin_level) || 13.5,
      status: record.status || 'Tested_Safe'
    });
  },

  // Hospitals
  async getHospitals() {
    if (useMySQL) {
      const [rows] = await pool.query('SELECT * FROM hospitals ORDER BY id ASC');
      return rows;
    }
    return localDb.get('hospitals');
  },

  async addHospital(hospital) {
    if (useMySQL) {
      const [result] = await pool.query(
        `INSERT INTO hospitals (name, license_number, city, address, contact_person, phone, email, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [hospital.name, hospital.license_number, hospital.city, hospital.address || '', hospital.contact_person, hospital.phone, hospital.email, 'Verified']
      );
      return { id: result.insertId, ...hospital, status: 'Verified' };
    }
    return localDb.insert('hospitals', { ...hospital, status: 'Verified' });
  },

  // Admin Auth
  async findAdmin(username, password) {
    if (useMySQL) {
      const [rows] = await pool.query('SELECT id, username, name, email, role FROM admins WHERE username = ? AND password = ?', [username, password]);
      return rows[0] || null;
    }
    const admins = localDb.get('admins');
    const user = admins.find(a => a.username === username && a.password === password);
    if (user) {
      const { password, ...safeUser } = user;
      return safeUser;
    }
    return null;
  },

  // Overall Statistics for Dashboard
  async getStats() {
    const inventory = await this.getInventory();
    const donors = await this.getDonors();
    const requests = await this.getRequests();
    const donations = await this.getDonations();

    const totalUnitsAvailable = inventory.reduce((sum, item) => sum + (item.units_available || 0), 0);
    const activeDonors = donors.filter(d => d.is_available && d.status === 'Active').length;
    const pendingRequests = requests.filter(r => r.status === 'Pending').length;
    const emergencyRequests = requests.filter(r => r.is_emergency && r.status !== 'Fulfilled' && r.status !== 'Rejected').length;
    const fulfilledRequests = requests.filter(r => r.status === 'Fulfilled').length;

    return {
      totalDonors: donors.length,
      activeDonors,
      totalUnitsAvailable,
      pendingRequests,
      emergencyRequests,
      fulfilledRequests,
      totalDonationsCount: donations.length,
      inventory
    };
  }
};

module.exports = { initDatabase, db };
