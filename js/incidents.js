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
      updateDaysSince(data);

    })
    .catch(error => {
      console.error("Failed to load incidents:", error);
    });
});
function updateDaysSince(incidents) {
  if (!incidents.length) return;

  const latestDate = new Date(incidents[0].date); // Already sorted
  const today = new Date();

  const timeDiff = today - latestDate;
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  const el = document.getElementById("days-since");
  el.textContent = `🚧 ${days} day${days !== 1 ? "s" : ""} since the last reported pedestrian collision in Calgary`;
}
