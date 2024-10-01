// Initialize the map and set its view to a default location
var map = L.map('farm-map').setView([0, 0], 2);  // Centered on the world view

// Add OpenStreetMap tiles (or any custom tile layer)
L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=en', {
  maxZoom: 20,
  attribution: '© Google'
}).addTo(map);

// Custom marker icon (replace 'path/to/your-icon.png' with the actual path)
var farmIcon = L.icon({
  iconUrl: 'src/assets/pitchfork.png',  // URL to the   custom icon image
  iconSize: [32, 32],                // Size of the icon
  iconAnchor: [13, 38],              // Anchor of the icon (center-bottom)
  popupAnchor: [0, -30]              // Popup should open relative to the icon
});

// Placeholder f  or the farmland marker
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
});

// Enable Leaflet Draw controls for drawing polygons (no circles, markers, or lines)
var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,  // Disable polyline
    circle: false,    // Disable circle
    rectangle: true,  // Allow rectangles
    polygon: true,    // Allow polygons
    marker: false     // Disable normal markers (we add custom ones)
  },
  edit: {
    featureGroup: new L.FeatureGroup().addTo(map),  // Add a feature group for editable layers
    remove: true
  }
});

var popupContent = `
  <div style="text-align:center;">
    <h3>Farm Information</h3>
    <img src="path/to/farm-image.jpg" width="150px"/>
    <p>Your farmland location is: <strong>${lat.toFixed(5)}, ${lng.toFixed(5)}</strong></p>
  </div>
`;

farmlandMarker.bindPopup(popupContent).openPopup();
