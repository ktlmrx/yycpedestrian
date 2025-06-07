document.addEventListener("DOMContentLoaded", () => {
  const header = document.createElement("header");
  header.innerHTML = `
    <h1>yycpedestrian</h1>
    <a href="#main-content" class="sr-only sr-only-focusable">Skip to main content</a>
    <nav>
      <a href="index.html">home</a>
      <a href="map.html">map</a>
      <a href="news.html">news</a>
      <a href="resources.html">resources</a>
      <a href="stats.html">stats</a>
    </nav>
  `;
  document.body.prepend(header);
});
