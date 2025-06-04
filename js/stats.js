document.addEventListener("DOMContentLoaded", () => {
  fetch("data/stats.json")
    .then(response => response.json())
    .then(stats => {
      const ctx = document.getElementById("collisionChart").getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: stats.years,
          datasets: [
            {
              label: "Emergency Department Visits",
              data: stats.emergency_visits,
              backgroundColor: "rgba(255, 99, 132, 0.6)"
            },
            {
              label: "Hospital Admissions",
              data: stats.hospital_admissions,
              backgroundColor: "rgba(54, 162, 235, 0.6)"
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Injuries from Pedestrian-Vehicle Collisions"
            }
          }
        }
      });
    })
    .catch(err => console.error("Failed to load stats:", err));
});
