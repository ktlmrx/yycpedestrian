document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("data/stats.json").then(res => res.json()),
    fetch("data/incidents.json").then(res => res.json())
  ])
    .then(([historical, incidents]) => {
      // === COLLISIONS CHART FROM STATS.JSON ===
      const collisionCtx = document.getElementById("collisionChart").getContext("2d");

      new Chart(collisionCtx, {
        type: "bar",
        data: {
          labels: historical.years,
          datasets: [
            {
              label: "Emergency Department Visits",
              data: historical.emergency_visits,
              backgroundColor: "rgba(255, 99, 132, 0.6)"
            },
            {
              label: "Hospital Admissions",
              data: historical.hospital_admissions,
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
              text: "Injuries from Pedestrian-Vehicle Collisions (Historical)"
            }
          }
        }
      });

      // === % FATAL CHART FROM INCIDENTS.JSON (PRE-2025 ONLY) ===
      const pastIncidents = incidents.filter(incident => {
        const year = new Date(incident.date).getFullYear();
        return year < 2025;
      });

      const yearlySummary = {};

      pastIncidents.forEach(incident => {
        const year = new Date(incident.date).getFullYear();
        if (!yearlySummary[year]) {
          yearlySummary[year] = { total: 0, fatal: 0 };
        }
        yearlySummary[year].total++;
        if (incident.fatal) yearlySummary[year].fatal++;
      });

      const fatalCtx = document.getElementById("fatalChart").getContext("2d");
      const sortedYears = Object.keys(yearlySummary).sort();

      new Chart(fatalCtx, {
        type: "line",
        data: {
          labels: sortedYears,
          datasets: [
            {
              label: "% Fatal Incidents",
              data: sortedYears.map(y => {
                const { fatal, total } = yearlySummary[y];
                return ((fatal / total) * 100).toFixed(2);
              }),
              borderColor: "#830a0a",
              backgroundColor: "rgba(131,10,10,0.3)",
              fill: true,
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              title: { display: true, text: "% of Fatal Incidents" },
              beginAtZero: true
            },
            x: {
              title: { display: true, text: "Year" }
            }
          },
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Fatality Rate from Past Incidents (before 2025)"
            }
          }
        }
      });
    })
    .catch(console.error);
});
