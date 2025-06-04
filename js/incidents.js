document.addEventListener("DOMContentLoaded", () => {
  fetch("data/incidents.json")
    .then(response => response.json())
    .then(data => {
      const feed = document.getElementById("incident-feed");

      data
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // most recent first
        .forEach(incident => {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong>${incident.date}</strong> – 
            <a href="${incident.link}" target="_blank">${incident.title}</a> 
            <em>(${incident.location})</em>
          `;
          feed.appendChild(li);
        });
    })
    .catch(error => {
      console.error("Failed to load incidents:", error);
    });
});
