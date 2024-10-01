// Initialize the map and set its view to a default location
var map = L.map('farm-map').setView([0, 0], 2);  // Centered on the world view

// Add OpenStreetMap tiles (or any custom tile layer)
L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=en', {
  minZoom: 2,
  maxZoom: 20,
  attribution: '© Google'
}).addTo(map);

// Custom marker icon (replace 'path/to/your-icon.png' with the actual path)
var farmIcon = L.icon({
  iconUrl: 'src/assets/pitchfork.png',  // URL to the   custom icon image
  iconSize: [30, 30],                // Size of the icon
  iconAnchor: [11, 35],              // Anchor of the icon (center-bottom)
  popupAnchor: [0, -30]              // Popup should open relative to the icon
});

// Placeholder for the farmland marker
var farmlandMarker = null;

// Hide zoom controls
map.removeControl(map.zoomControl);

// Click event to add a custom marker on the map
map.on('click', function (e) {
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  // If a marker already exists, remove it before adding a new one
  if (farmlandMarker) {
    map.removeLayer(farmlandMarker);
  }

  // Add new marker at clicked location
  farmlandMarker = L.marker([lat, lng], { icon: farmIcon }).addTo(map)
    .bindPopup("Your farmland location: " + lat.toFixed(5) + ", " + lng.toFixed(5))
    .openPopup();

  // Event listener to remove the marker when clicked
  farmlandMarker.on('click', function() {
    map.removeLayer(farmlandMarker);
  });
});

farmlandMarker.bindPopup(popupContent).openPopup();
