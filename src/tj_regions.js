// Shahrom, [06.10.2024 15:50]
// Initialize the map and disable zooming and panning
var map = L.map('map', {
  center: [38.861, 71.2761],
  zoom: 7,
  zoomControl: false,   // Disable zoom control
  dragging: false,      // Disable dragging/panning
  scrollWheelZoom: false,  // Disable scroll wheel zoom
  doubleClickZoom: false,  // Disable double-click zoom
  boxZoom: false,        // Disable box zoom
  keyboard: false        // Disable keyboard navigation
});



var tajikistanBounds = [[36.7, 67.3], [41.4, 75.2]];
map.setMaxBounds(tajikistanBounds);
map.setView([38.861, 71.2761], 7);

// Fetch GeoJSON for Tajikistan's regions (use your own GeoJSON URL or file)
var geojsonUrl = 'tj.json';  // Update this to point to the actual file
var selectedRegion = null;



// Define a function to style each region
function style(feature) {
  switch (feature.properties.name) {
    case 'Sughd': return { color: "#ff0000", fillOpacity: 1 };
    case 'Khatlon': return { color: "#0dff59", fillOpacity: 1 };
    case 'Gorno-Badakhshan': return { color: "#4dc4f7", fillOpacity: 1 };
    case 'Dushanbe': return { color: "#000000", fillOpacity: 1 };
    case 'Republican Subordination': return { color: "#f5f107", fillOpacity: 1 };
  }
}



// Filter out Dushanbe region
function filter(feature) {
  return feature.properties.name !== 'Dushanbe';  // Exclude Dushanbe
}

// Apply filter to GeoJSON layer
fetch(geojsonUrl)
  .then(response => response.json())
  .then(geojsonData => {
    L.geoJSON(geojsonData, {
      filter: filter,  // Apply the filter to exclude Dushanbe
      style: style  // Apply the region styling function
    }).addTo(map);
  });



// Function to highlight the region (darken the color on hover)
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    fillColor: darkenColor(layer.options.color), // Darken the original color
    fillOpacity: 0.8
  });
}

// Function to reset the color when mouse leaves the region
function resetHighlight(e) {
  geojson.resetStyle(e.target);  // Reset to the original style
}

// Function to assign region-specific URLs and redirect directly on click
var regionName;
function regionClick(feature, layer) {
  regionName = feature.properties.name;
  if (feature.properties && feature.properties.name) {

    // Define the printRegionLabel function to handle the label printing
    function printRegionLabel(label) {
      document.getElementById('regionLabel').textContent = "Region: " + label;

      let theAbitch = document.getElementById("region1");
      let theBbitch = document.getElementById("region2");
      let theCbitch = document.getElementById("region3");
      theAbitch.style.display = "none";
      theBbitch.style.display = "none";
      theCbitch.style.display = "none";

      let selectedRegionDiv = document.getElementById(regionName);

      if (label == "Sughd") {
        theAbitch.style.display = "block";
      }
      if (label == "Khatlon") {
        theBbitch.style.display = "block";
      }
      if (label == "Republican Subordination") {
        theAbitch.style.display = "block";
      }
      if (label == "Gorno-Badakhshan") {
        theCbitch.style.display = "block";
      }

      // Alternatively, you could update a part of the HTML page with the label
      // document.getElementById('regionLabel').textContent = "Region: " + label;
    }

    // Set custom URLs for each region (modify this part with the correct URLs)
    var regionLinks = {
      'Sughd': 'page2.html',
      'Khatlon': 'page3.html',
      'Republican Subordination': 'page4.html',
      'Gorno-Badakhshan': 'page1.html'
    };
    var link = regionLinks[regionName] || regionLinks['other'];  // Fallback for regions with no specific link

    // Redirect to the URL when a region is clicked
    layer.on('click', function () {
      window.location.href = link;
    });
  }

  // Add hover effect to change color on hover
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
  });
}

// Shahrom, [06.10.2024 15:50]
// Darken the color function
function darkenColor(hex) {
  // Convert hex color to RGB
  var bigint = parseInt(hex.replace("#", ""), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  // Darken each color channel by 20%
  r = Math.max(0, r - 50);
  g = Math.max(0, g - 50);
  b = Math.max(0, b - 50);

  // Return the darkened color in hex format
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Load and display GeoJSON with customizations
var geojson;
fetch('tj.json')
  .then(response => response.json())
  .then(geojsonData => {
    geojson = L.geoJSON(geojsonData, {
      filter: filter,  // Exclude Dushanbe
      style: style,    // Apply color styles
      onEachFeature: regionClick  // Apply popup links and hover effects
    }).addTo(map);
  });