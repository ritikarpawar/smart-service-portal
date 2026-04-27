const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory data storage (temporarily stored during runtime)
let serviceRequests = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/request', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'request.html'));
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

// API for submitting service requests
app.post('/api/submit-request', (req, res) => {
    const { fullName, email, phone, serviceType, preferredDate, address, notes } = req.body;
    
    // Create request object
    const newRequest = {
        id: Date.now(),
        fullName,
        email,
        phone,
        serviceType,
        preferredDate,
        address,
        notes,
        timestamp: new Date().toLocaleString()
    };
    
    // Store in memory
    serviceRequests.push(newRequest);
    
    console.log('New Service Request Received:', newRequest);
    
    // Return the data so the frontend can display it on the success page
    // In a real app we'd redirect with a query param or use a session
    // For this simple demo, we'll store the latest request in a "global" that the success page can fetch
    app.locals.latestRequest = newRequest;
    
    res.redirect('/success');
});

// Endpoint to fetch the latest request data for the success page
app.get('/api/latest-request', (req, res) => {
    res.json(app.locals.latestRequest || {});
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n==============================================`);
    console.log(`  SMART SERVICE PORTAL RUNNING ON PORT ${PORT}`);
    console.log(`  Access at: http://localhost:${PORT}`);
    console.log(`==============================================\n`);
});
