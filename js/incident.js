document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const container = document.getElementById("incident-details");

  if (!id) {
    container.innerHTML = "<p>❌ No incident ID provided.</p>";
    return;
  }

  fetch("data/incidents.json")
    .then(res => res.json())
    .then(data => {
      const incident = data.find(item => item.id === id);

      if (!incident) {
        container.innerHTML = "<p>❌ Incident not found.</p>";
        return;
      }

      container.innerHTML = `
        <h2>${incident.title}</h2>
        <p><strong>Date:</strong> ${incident.date}</p>
        <p><strong>Location:</strong> ${incident.location}</p>
        ${incident.fatal ? "<p><strong>Fatal:</strong> Yes</p>" : ""}
        ${incident.tags?.length ? `<p><strong>Tags:</strong> ${incident.tags.join(", ")}</p>` : ""}
        ${incident.link ? `<p><a href="${incident.link}" target="_blank">📰 News article</a></p>` : ""}
      `;
    })
    .catch(err => {
      container.innerHTML = "<p>⚠️ Failed to load incident data.</p>";
      console.error(err);
    });
});
