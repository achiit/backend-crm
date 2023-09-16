const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    // res.header('Access-Control-Allow-Origin', 'https://management-frontend-murex.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// Routes
const employeeRoutes = require('./routes/employees');
app.use('/api/employees', employeeRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
