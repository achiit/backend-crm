const express = require('express');
const router = express.Router();
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const Employee = require('../models/employee');
const path=require('path');


const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
})

const upload = multer(
  { storage: storage }
)
// Add an employee (POST)
router.use('/uploads', express.static('uploads'));
router.post('/add', upload.single('profile_pic'), (req, res) => {
  console.log(req.file);
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
  // const profile_pic = req.file ? req.file.filename : null;
  const profile_pic = `http://localhost:5000/uploads/${req.file.filename}`;
  console.log(profile_pic);
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
    res.status(201).json({ message: 'Employee added successfully', id: employeeId,profile_pic:profile_pic });
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
// Delete an employee by ID (DELETE)
router.delete('/:id', (req, res) => {
  const employeeId = req.params.id;

  // Call a method to delete the employee by ID
  Employee.deleteEmployeeById(employeeId, (err) => {
    if (err) {
      res.status(500).json({ error: 'Unable to delete employee.' });
      return;
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  });
});
router.put('/:id', (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployeeData = req.body; // Updated employee data in the request body

  // Call a method to update the employee by ID
  Employee.updateEmployeeById(employeeId, updatedEmployeeData, (err) => {
    if (err) {
      res.status(500).json({ error: 'Unable to update employee.' });
      return;
    }
    res.status(200).json({ message: 'Employee updated successfully' });
  });
});
// Get an employee by ID (GET)
router.get('/:id', (req, res) => {
  const employeeId = req.params.id;

  // Call a method to fetch the employee by ID
  Employee.getEmployeeById(employeeId, (err, employee) => {
    if (err) {
      res.status(500).json({ error: 'Unable to fetch employee.' });
      return;
    }
    res.status(200).json(employee);
  });
});



module.exports = router
