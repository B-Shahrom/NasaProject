var map = L.map('map').setView([38.861, 71.2761], 7);  // Center on Tajikistan

    // Add OpenStreetMap tiles
    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=en', {
  minZoom: 7,
  maxZoom: 20,
  attribution: '© Google'
}).addTo(map);

    // Fetch GeoJSON for Tajikistan's regions (use your own GeoJSON URL or file)
    var geojsonUrl = 'tj.json';  // Update this to point to the actual file

    var selectedRegion = null;

    // Load GeoJSON
    fetch(geojsonUrl)
      .then(response => response.json())
      .then(geojsonData => {
        L.geoJSON(geojsonData, {
          style: function(feature) {
            return {
              fillColor: "#3388ff",
              fillOpacity: 0.3,
              weight: 2,
              opacity: 1,
              color: "#3388ff",
            };
          },
          onEachFeature: function (feature, layer) {
            // When a region is clicked, change its style
            layer.on('click', function () {
              if (selectedRegion) {
                // Reset the previous region style
                selectedRegion.setStyle({
                  fillColor: "#3388ff",
                  fillOpacity: 0.3,
                  color: "#3388ff"
                });
              }
              
              // Highlight the clicked region
              layer.setStyle({
                fillColor: "#ff0000",
                fillOpacity: 0.5,
                color: "#ff0000"
              });

              selectedRegion = layer;

              // Display region name or trigger some action
              alert("You selected: " + feature.properties.name);
            });

            layer.on('mouseover', function () {
              layer.setStyle({
                fillColor: "#00ff00",
                fillOpacity: 0.5
              });
            });

            layer.on('mouseout', function () {
              if (layer !== selectedRegion) {
                layer.setStyle({
                  fillColor: "#3388ff",
                  fillOpacity: 0.3
                });
              }
            });
          }
        }).addTo(map);
      });
