document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([51.0447, -114.0719], 11); // Centered on Calgary

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  fetch("data/incidents.json")
    .then(response => response.json())
    .then(data => {
      const withCoords = data.filter(incident => incident.lat && incident.lng);

      withCoords.forEach(incident => {
        const marker = L.circleMarker([incident.lat, incident.lng], {
          radius: 8,
          color: incident.fatal ? "#830a0a" : "#dfd646", // red if fatal, yellow otherwise
          fillOpacity: 0.7,
          weight: 1
        });

        const popupContent = `
          <strong>${incident.date}</strong><br />
          <a href="${incident.link}" target="_blank">${incident.title}</a><br />
          <em>${incident.location}</em>
        `;

        marker.bindPopup(popupContent);
        marker.addTo(map);
      });
    })
    .catch(err => {
      console.error("Error loading map data:", err);
    });
});

const filterFatalCheckbox = document.getElementById("filter-fatal");
const filterTagSelect = document.getElementById("filter-tag");
const feed = document.getElementById("incident-feed");

function renderIncidents(data) {
  feed.innerHTML = ""; // Clear existing list
  const filteredData = data.filter(incident => {
    if (filterFatalCheckbox.checked && !incident.fatal) return false;
    if (filterTagSelect.value && (!incident.tags || !incident.tags.includes(filterTagSelect.value))) return false;
    return true;
  });

  filteredData.forEach(incident => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${incident.date}</strong> – 
      <a href="${incident.link}" target="_blank">${incident.title}</a> 
      <em>(${incident.location})</em>
    `;
    feed.appendChild(li);
  });

  updateDaysSince(filteredData);
}

// When filters change:
filterFatalCheckbox.addEventListener("change", () => renderIncidents(incidentsData));
filterTagSelect.addEventListener("change", () => renderIncidents(incidentsData));

// Fetch data once and store it
let incidentsData = [];

fetch("data/incidents.json")
  .then(res => res.json())
  .then(data => {
    incidentsData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderIncidents(incidentsData);
  })
  .catch(console.error);
