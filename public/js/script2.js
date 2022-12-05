// the map

var map = L.map("map").setView([30.4937, -6.283], 6);

// Google Earth Hybrid basemap
// L.tileLayer("http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// OpenStreetMap basemap
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// add Positron basemap
const urlPositron = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
function addBM() {
  L.tileLayer(urlPositron, {
    attribution:
      'Powered by <a class="attribution" href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a class="attribution" href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a class="attribution" href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
    maxZoom: 20,
    id: "osm-bright",
  }).addTo(map);
  map.setView([30.4937, -6.283], 6);
}

// first init
addBM();
