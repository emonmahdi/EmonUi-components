document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const links = document.querySelectorAll(".menu-link");

  function clearActive() {
    links.forEach((link) => link.classList.remove("active", "fw-bold"));
  }

  links.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();

      clearActive();
      link.classList.add("active", "fw-bold");

      const filePath = link.getAttribute("data-file");

      try {
        const res = await fetch(filePath);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const html = await res.text();
        content.innerHTML = html;

        // If your loaded components need JavaScript initialization, do it here
        // For example, Bootstrap toggler will work automatically since bootstrap.bundle.min.js is loaded
      } catch (error) {
        content.innerHTML = `<p class="text-danger">Component failed to load. Please try again later.</p>`;
        console.error("Error loading component:", error);
      }
    });
  });
});
