const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Employee = require('../models/employee');

// Add an employee (POST)
router.post('/add', upload.single('profile_pic'), (req, res) => {
  // Extract data from the request
  const {
    first_name,
    last_name,
    designation,
    rate_type,
    email,
    address_line1,
    address_line2,
    city,
    phone_number,
    salary,
    blood_group,
    country,
    zipcode,
  } = req.body;

  // Get the uploaded profile picture filename
  const profile_pic = req.file ? req.file.filename : null;

  // Create an employee object
  const employee = {
    first_name,
    last_name,
    designation,
    rate_type,
    email,
    address_line1,
    address_line2,
    profile_pic,
    city,
    phone_number,
    salary,
    blood_group,
    country,
    zipcode,
  };

  // Add the employee to the database
  Employee.create(employee, (err, employeeId) => {
    if (err) {
      res.status(500).json({ error: 'Unable to add employee.' });
      return;
    }
    res.status(201).json({ message: 'Employee added successfully', id: employeeId });
  });
});

// Get all employees (GET)
router.get('/list', (req, res) => {
  // Fetch all employee details
  Employee.getAll((err, employees) => {
    if (err) {
      console.error(err); // Log the error
      res.status(500).json({ error: 'Internal server error. Unable to add employee.' });
      return;
    }
    
    res.status(200).json(employees);
  });
});

module.exports=router
