
document.addEventListener("DOMContentLoaded", () => {
    // Automatically update the copyright year.
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mobile navigation menu.
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("show");
            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // Project category filters.
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card[data-category]");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            projectCards.forEach((card) => {
                const category = card.dataset.category;
                const shouldShow =
                    selectedFilter === "all" ||
                    category === selectedFilter;

                card.hidden = !shouldShow;
            });
        });
    });

    // Reveal sections smoothly as they enter the screen.
    const sections = document.querySelectorAll("main section");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        sections.forEach((section) => {
            section.classList.add("reveal");
            observer.observe(section);
        });
    }

    // Contact form: opens the visitor's email application.
    // Replace this address with your real email address.
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const portfolioEmail = "YOUR_EMAIL@example.com";

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (portfolioEmail === "YOUR_EMAIL@example.com") {
                formStatus.textContent =
                    "Please update the portfolio email address in script.js before using this form.";
                return;
            }

            const formData = new FormData(contactForm);
            const name = formData.get("name");
            const email = formData.get("email");
            const message = formData.get("message");

            const subject = encodeURIComponent(
                `Portfolio enquiry from ${name}`
            );

            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            formStatus.textContent =
                "Opening your email application...";

            window.location.href =
                `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;
        });
    }

    // Add a small visual response to project-card interactions.
    projectCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("project-hover");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("project-hover");
        });
    });
});
