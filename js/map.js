document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([51.0447, -114.0719], 11); // Centered on Calgary

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  fetch("data/incidents.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(incident => {
        if (incident.lat && incident.lng) {
          L.marker([incident.lat, incident.lng])
            .addTo(map)
            .bindPopup(
              `<strong>${incident.date}</strong><br/>
               <a href="${incident.link}" target="_blank">${incident.title}</a><br/>
               <em>${incident.location}</em>`
            );
        }
      });
    })
    .catch(error => {
      console.error("Error loading incident map data:", error);
    });
});
