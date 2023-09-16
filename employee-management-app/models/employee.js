const db = require('../config/db');

// Define the Employee model
const Employee = {
  create: (employee, callback) => {
    db.query(
      'INSERT INTO employees (first_name, last_name, designation, rate_type, email, address_line1, address_line2, profile_pic, city, phone_number, salary, blood_group, country, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        employee.first_name,
        employee.last_name,
        employee.designation,
        employee.rate_type,
        employee.email,
        employee.address_line1,
        employee.address_line2,
        employee.profile_pic,
        employee.city,
        employee.phone_number,
        employee.salary,
        employee.blood_group,
        employee.country,
        employee.zipcode,
      ],
      (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results.insertId);
      }
    );
  },
  getAll: (callback) => {
    db.query(
      'SELECT id, first_name, last_name, designation, email, phone_number, profile_pic FROM employees',
      (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results);
      }
    );
  },
  deleteEmployeeById: (id, callback) => {
    db.query('DELETE FROM employees WHERE id = ?', [id], (err, results) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  },
  updateEmployeeById: (id, updatedEmployeeData, callback) => {
    db.query(
      'UPDATE employees SET ? WHERE id = ?',
      [updatedEmployeeData, id],
      (err, results) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null);
      }
    );
  },
  getEmployeeById: (id, callback) => {
    db.query('SELECT * FROM employees WHERE id = ?', [id], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (results.length === 0) {
        callback({ message: 'Employee not found' }, null);
        return;
      }
      callback(null, results[0]);
    });
  },
};

module.exports = Employee;
