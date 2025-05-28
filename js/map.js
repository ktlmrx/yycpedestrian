// centered roughly on Calgary
const map = L.map('map').setView([51.0447, -114.0719], 12);

// load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// sample marker
L.marker([51.0486, -114.0708])
  .addTo(map)
  .bindPopup('sample collision location');

