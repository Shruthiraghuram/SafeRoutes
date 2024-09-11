const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

// Safe route calculation endpoint
app.post('/safe-route', async (req, res) => {
  const { origin, destination } = req.body;

  // Fetch route from Google Maps API
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${GOOGLE_MAPS_API_KEY}`);
    
    let route = response.data.routes[0].overview_polyline.points; // Google Maps route
    
    // Simulated safety filtering based on crime, crowd, lighting
    // You would replace this with actual safety data integration
    let safeRoute = filterUnsafeAreas(route);

    res.json({ route: safeRoute });
  } catch (error) {
    console.error('Error calculating safe route:', error);
    res.status(500).send('Error calculating safe route');
  }
});

// Filter out unsafe areas (dummy function, replace with actual logic)
function filterUnsafeAreas(route) {
  // Example logic: filter based on crime, crowd density, and lighting data
  // Return modified safe route
  return route; // In real code, return a filtered, safer route
}

// Emergency alert endpoint
app.post('/emergency-alert', (req, res) => {
  const { location } = req.body;
  
  // Simulate sending alert to emergency services (real implementation will vary)
  console.log('Emergency alert at location:', location);
  
  res.status(200).send('Emergency alert received');
});

app.listen(3000, () => {
  console.log('Backend server running on port 3000');
});
