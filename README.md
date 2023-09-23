# Data Analysis Project: leaflet-challenge Visualizing Earthquake Data
### Introduction
In this data analysis project, I aimed to create an interactive web map to visualize earthquake data from the United States Geological Survey (USGS) and tectonic plate boundaries. To accomplish this, I utilized several web technologies, including Leaflet, D3.js, and GeoJSON, to create an informative and visually appealing map.

### Tools and Technologies
Before diving into the project details, let's briefly review the tools and technologies I used:

##### Leaflet: This JavaScript library is perfect for interactive map creation. It allowed me to build and customize the map effortlessly.

##### D3.js: D3.js is a versatile JavaScript library for data visualization. I leveraged it to manipulate the Document Object Model (DOM) and visualize data on the web.

##### GeoJSON: GeoJSON is a geospatial data format that makes it easy to represent geographical features and their properties.

### Project Steps
Here's a breakdown of the steps I took to create the interactive earthquake visualization:

#### 1. Setting Up the HTML Structure
I started the project by creating the HTML structure for the web page. This involved defining a container for the map using Leaflet and including links to the necessary CSS and JavaScript libraries.

#### 2. Styling the Map and Legend
To ensure an appealing and user-friendly design, I defined the CSS styles for both the map container and the legend. I configured the map to occupy the entire viewport, while the legend was positioned neatly in the bottom-right corner of the map. The legend was styled to clearly represent the depths of earthquakes.

#### 3. Fetching Earthquake Data
To populate the map with earthquake data, I fetched information from the USGS Earthquake API in GeoJSON format. This data provided details about earthquake locations, magnitudes, and depths.

#### 4. Creating the Map and Earthquake Markers
I used Leaflet to construct the map, and I offered users two base map options: a standard street map and a satellite map. I then parsed the earthquake data and generated circle markers on the map. The size and color of each marker were determined by the earthquake's magnitude and depth, respectively.

#### 5. Adding Tectonic Plate Boundaries
For a more comprehensive view, I fetched GeoJSON data representing tectonic plate boundaries from a public repository. These boundaries were displayed on the map as orange lines.

#### 6. Layer Control
To give users control over the map's content, I implemented layer control. This feature allowed users to switch between base maps (Street Map and Satellite Map) and overlay layers (Earthquakes and Tectonic Plates), tailoring their map-viewing experience.

#### 7. Legend
I created a legend that explained the color-coding used to represent earthquake depths.

### Project Outcomes
The result of this project is an engaging web map that presents earthquake data and tectonic plate boundaries interactively. Users can customize their map by selecting different base maps and toggling earthquake and tectonic plate data on and off. The accompanying legend provides clear information about the meaning behind the depth color codes.
