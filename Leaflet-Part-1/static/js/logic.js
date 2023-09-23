
const map = L.map('map').setView([37.7749, -122.4194], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const earthquakeDataUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

function getColor(depth) {
    if (depth < 70) {
        return '#00FF00'; // Shallow
    } else if (depth < 300) {
        return '#FFA500'; // Intermediate
    } else {
        return '#FF0000'; // Deep
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
                radius: mag * 5,
                fillColor: getColor(depth),
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.7
            };

            const marker = L.circleMarker([lat, lon], markerOptions)
                .bindPopup(`Magnitude: ${mag}<br>Depth: ${depth} km`)
                .addTo(map);
        });

        // Call the updateLegend function to populate the legend
        updateLegend();
    })

/// Function to create and update the legend using D3.js
function updateLegend() {
    const legend = d3.select('#legend');

    const depthRanges = ['Shallow', 'Intermediate', 'Deep'];
    const depthValues = ['0 - 70 km', '70 - 300 km', '300+ km'];
    const colors = ['#00FF00', '#FFA500', '#FF0000'];

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
        .html((d, i) => `<strong>${d}:</strong> ${depthValues[i]}`)
        .attr('class', 'legend-label');
}



