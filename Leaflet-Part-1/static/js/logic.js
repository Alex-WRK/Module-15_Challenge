// Function to toggle the legend's visibility
function toggleLegend() {
    const legend = document.getElementById('legend');
    if (legend.style.display === 'block' || legend.style.display === '') {
        legend.style.display = 'none';
    } else {
        legend.style.display = 'block';
    }
}

// Create the map and add a default tile layer (Street Map)
const map = L.map('map', {
    center: [37.7749, -122.4194],
    zoom: 5,
});

// Create different base map layers
const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Create an overlay for earthquakes
const earthquakeDataUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
const earthquakes = L.layerGroup().addTo(map);

// Function to determine the color based on depth
function getColor(depth) {
    if (depth <= 10) {
        return 'green';
    } else if (depth <= 30) {
        return 'lime'; // Fluorescent green
    } else if (depth <= 50) {
        return 'orange';
    } else if (depth <= 70) {
        return 'darkorange'; // Darker Orange
    } else if (depth <= 90) {
        return 'orangered'; // Darkest Orange
    } else {
        return 'red';
    }
}

// Fetch earthquake data and create markers
d3.json(earthquakeDataUrl)
    .then(data => {
        data.features.forEach(feature => {
            const { geometry, properties } = feature;
            const { mag } = properties;
            const lat = geometry.coordinates[1];
            const lon = geometry.coordinates[0];
            const depth = geometry.coordinates[2];

            const markerOptions = {
                radius: mag * 3,
                fillColor: getColor(depth),
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.7,
            };

            const marker = L.circleMarker([lat, lon], markerOptions)
                .bindPopup(`Magnitude: ${mag}<br>Depth: ${depth} km`);

            marker.addTo(earthquakes);
        });

        // Call the updateLegend function to populate the legend
        updateLegend();
    });

// Create an overlay for tectonic plates
const tectonicPlatesUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';
const tectonicPlates = L.layerGroup();

// Load the tectonic plates GeoJSON data
fetch(tectonicPlatesUrl)
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: 'orange', // You can choose the color you prefer
                weight: 2, // Adjust the line weight as needed
            },
        }).addTo(tectonicPlates);
    });

// Add base maps and overlays to the layer control
const baseMaps = {
    'Street Map': streetMap,
    'Satellite Map': satelliteMap,
};

const overlayMaps = {
    'Earthquakes': earthquakes,
    'Tectonic Plates': tectonicPlates,
};

// Set default layers (Street Map, Earthquakes, Tectonic Plates)
map.addLayer(streetMap);
earthquakes.addTo(map);
tectonicPlates.addTo(map);

// Create layer control with default layers
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// Function to create and update the legend using D3.js
function updateLegend() {
    const legend = d3.select('#legend');

    const depthRanges = ['10 - 30 km', '30 - 50 km', '50 - 70 km', '70 - 90 km', '90+ km'];
    const colors = ['lime', 'orange', 'darkorange', 'orangered', 'red'];

    // Remove any existing legend content
    legend.selectAll('*').remove();

    // Create a legend title
    legend.append('h4').text('Depth Legend');

    // Create legend items
    const legendItems = legend.selectAll('div')
        .data(depthRanges)
        .enter()
        .append('div')
        .attr('class', 'legend-item');

    // Create color squares
    legendItems.append('div')
        .style('background-color', (d, i) => colors[i])
        .attr('class', 'legend-color-square');

    // Add depth range labels with values
    legendItems.append('div')
        .html((d, i) => `<strong>${d}:</strong>`)
        .attr('class', 'legend-label');
}

