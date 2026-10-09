
document.addEventListener("DOMContentLoaded", function () {
  // 1. Copyright year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 2. Mobile navigation
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("show");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // 3. Filter all eight projects by category
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(
    ".projects-grid .project-card"
  );

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      projectCards.forEach(function (card) {
        const category = card.dataset.category;

        card.hidden =
          selectedCategory !== "all" &&
          selectedCategory !== category;
      });
    });
  });

  // 4. Reveal sections when they enter the screen
  const sections = document.querySelectorAll("main section");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    sections.forEach(function (section) {
      section.classList.add("reveal");
      observer.observe(section);
    });
  } else {
    sections.forEach(function (section) {
      section.classList.add("visible");
    });
  }

  // 5. Contact details
  // Replace this placeholder with your real email address.
  const portfolioEmail = "YOUR_EMAIL@example.com";

  const contactCard = document.querySelector(".contact-card");

  if (contactCard) {
    const emailText = contactCard.querySelector("p");

    if (emailText && portfolioEmail !== "YOUR_EMAIL@example.com") {
      emailText.innerHTML =
        '<i class="fa-solid fa-envelope"></i> ' +
        '<a href="mailto:' + portfolioEmail + '">' +
        portfolioEmail +
        "</a>";
    }
  }
});
