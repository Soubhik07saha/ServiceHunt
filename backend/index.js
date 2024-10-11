const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const EmployeeModel = require('./models/Employee');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection string
mongoose.connect("mongodb+srv://soubhiksahaetce222711:x53D-r6E%40Wz8mB8@cluster0.nw2jtsc.mongodb.net/Employee?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// POST route for registering an employee
app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => {
            res.json({
                message: "Employee registered successfully",
                employee
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error registering employee",
                error: err.message
            });
        });
});

// GET route to fetch distinct occupations
app.get('/api/occupations', async (req, res) => {
    try {
        const occupations = await EmployeeModel.distinct('occupation');
        res.json(occupations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching occupations', error: error.message });
    }
});

// GET route to fetch distinct cities from the database
app.get('/api/cities', async (req, res) => {
    try {
        const cities = await EmployeeModel.distinct('location');
        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cities', error: error.message });
    }
});

app.get('/api/details/:city/:service', async (req, res) => {
    const { city, service } = req.params;
    try {
      const details = await EmployeeModel.find({ location: city, occupation: service });
      res.json(details);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching details', error: error.message });
    }
  });
  


// Start the server
app.listen(3001, () => {
    console.log("Server is Running on port 3001");
});
