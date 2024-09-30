// Initialize the map and set its view to a starting location and zoom level
var map = L.map('farm-map').setView([0, 0], 2); // Starting view set to world

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Placeholder for the farmland marker
var farmlandMarker = null;

// Add click event to allow the user to place a marker for their farmland
map.on('click', function (e) {
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  // If there's already a marker, remove it first
  if (farmlandMarker) {
    map.removeLayer(farmlandMarker);
  }

  // Place a new marker at the clicked location
  farmlandMarker = L.marker([lat, lng]).addTo(map)
    .bindPopup("Your farmland location: " + lat.toFixed(5) + ", " + lng.toFixed(5))
    .openPopup();

  // Save the coordinates in a way that's comfortable for further use (e.g., localStorage)
  saveFarmlandLocation(lat, lng);
});

// Function to save the farmland location in localStorage
function saveFarmlandLocation(lat, lng) {
  var farmlandData = {
    latitude: lat,
    longitude: lng
  };
  // Store the data in localStorage (or send it to a server/database if available)
  localStorage.setItem('farmlandLocation', JSON.stringify(farmlandData));
}

// Function to load the farmland location if already saved
function loadFarmlandLocation() {
  var savedLocation = localStorage.getItem('farmlandLocation');
  if (savedLocation) {
    var location = JSON.parse(savedLocation);
    farmlandMarker = L.marker([location.latitude, location.longitude]).addTo(map)
      .bindPopup("Your saved farmland location: " + location.latitude.toFixed(5) + ", " + location.longitude.toFixed(5))
      .openPopup();
    
    // Set the map view to the saved location
    map.setView([location.latitude, location.longitude], 10);
  }
}

// Load the saved farmland location when the page loads
window.onload = loadFarmlandLocation;
