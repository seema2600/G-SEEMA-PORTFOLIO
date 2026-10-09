
document.addEventListener("DOMContentLoaded", function () {
  // Update the footer year automatically.
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation.
  const menuButton = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
      const open = navLinks.classList.toggle("show");

      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );

      menuButton.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("show");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Filter projects by technology.
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;

      filterButtons.forEach(function (item) {
        item.classList.toggle("active", item === button);
      });

      projectCards.forEach(function (card) {
        const category = card.dataset.category;
        card.hidden = filter !== "all" && category !== filter;
      });
    });
  });

  // Add your real email address here.
  const portfolioEmail = "YOUR_EMAIL@example.com";
  const emailLink = document.getElementById("email-link");

  if (emailLink && portfolioEmail !== "YOUR_EMAIL@example.com") {
    emailLink.textContent = portfolioEmail;
    emailLink.href = "mailto:" + portfolioEmail;
  }

  // Handle missing profile photo gracefully.
  const profileImage = document.querySelector(".photo-frame img");

  if (profileImage) {
    profileImage.addEventListener("error", function () {
      profileImage.alt =
        "Profile photo not uploaded yet. Upload assets/profile.jpg to GitHub.";
      profileImage.style.display = "none";

      const frame = profileImage.parentElement;
      frame.style.display = "grid";
      frame.style.placeItems = "center";
      frame.style.color = "#c084fc";
      frame.style.fontSize = "1rem";
      frame.textContent = "Upload your profile photo";
    });
  }
});
