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
