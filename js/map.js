document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([51.0447, -114.0719], 11); // Center on Calgary

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  fetch("data/incidents.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((incident) => {
        if (incident.lat && incident.lng) {
          const marker = L.marker([incident.lat, incident.lng]).addTo(map);
          marker.bindPopup(`
            <strong>${incident.date}</strong><br />
            <a href="${incident.link}" target="_blank">${incident.title}</a><br />
            <em>${incident.location}</em>
          `);
        }
      });
    })
    .catch((err) => {
      console.error("Failed to load map incidents:", err);
    });
});
