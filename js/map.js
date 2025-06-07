let map;
let markersLayer;
let incidentsData = [];

document.addEventListener("DOMContentLoaded", () => {
  // Initialize map
  map = L.map("map").setView([51.0447, -114.0719], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Create a layer group to manage markers
  markersLayer = L.layerGroup().addTo(map);

  // Fetch incident data once
  fetch("data/incidents.json")
    .then(response => response.json())
    .then(data => {
      incidentsData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      renderIncidents(incidentsData);
      renderMarkers(incidentsData);
    })
    .catch(err => console.error("Error loading map data:", err));

  // Set up filter event listeners here (after DOM is loaded)
  document.getElementById("filter-fatal").addEventListener("change", onFilterChange);
  document.getElementById("filter-tag").addEventListener("change", onFilterChange);
});

function onFilterChange() {
  const filtered = filterIncidents(incidentsData);
  renderIncidents(filtered);
  renderMarkers(filtered);
}

function filterIncidents(data) {
  const fatalOnly = document.getElementById("filter-fatal").checked;
  const tagFilter = document.getElementById("filter-tag").value;

  return data.filter(incident => {
    if (fatalOnly && !incident.fatal) return false;
    if (tagFilter && (!incident.tags || !incident.tags.includes(tagFilter))) return false;
    return true;
  });
}

function renderMarkers(data) {
  // Clear existing markers
  markersLayer.clearLayers();

  data.forEach(incident => {
    if (incident.lat && incident.lng) {
      const marker = L.circleMarker([incident.lat, incident.lng], {
        radius: 8,
        color: incident.fatal ? "#830a0a" : "#dfd646",
        fillOpacity: 0.7,
        weight: 1
      });

      const popupContent = `
        <strong>${incident.date}</strong><br />
        <a href="${incident.link}" target="_blank">${incident.title}</a><br />
        <em>${incident.location}</em><br />
        <a href="incident.html?id=${incident.id}">🔎 View details</a>
      `;

      marker.bindPopup(popupContent);
      marker.addTo(markersLayer);
    }
  });
}

function renderIncidents(data) {
  const feed = document.getElementById("incident-feed");
  if (!feed) return; // If no feed container on page, skip

  feed.innerHTML = "";

  data.forEach(incident => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${incident.date}</strong> – 
      <a href="incident.html?id=${incident.id}">${incident.title}</a> 
      <em>(${incident.location})</em>
    `;

    feed.appendChild(li);
  });

  // You can call updateDaysSince(data) here if you have it defined
}
