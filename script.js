
/* =========================================================
   G. SEEMA | DATA ANALYST PORTFOLIO
   Complete JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* -----------------------------------------
       1. MOBILE NAVIGATION
    ----------------------------------------- */

    const navToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");

            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            const icon = navToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.setAttribute("aria-label", "Open navigation");

                const icon = navToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });

        document.addEventListener("click", (event) => {
            if (
                navMenu.classList.contains("open") &&
                !navMenu.contains(event.target) &&
                !navToggle.contains(event.target)
            ) {
                navMenu.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.setAttribute("aria-label", "Open navigation");

                const icon = navToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) {
                navMenu.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");

                const icon = navToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    /* -----------------------------------------
       2. TYPING EFFECT
    ----------------------------------------- */

    const typingElement = document.getElementById("typing-tagline");

    if (typingElement) {
        const messages = [
            "Turning data into meaningful insights.",
            "Exploring patterns through SQL and Python.",
            "Building interactive Power BI dashboards.",
            "Learning every day. Growing through projects."
        ];

        let messageIndex = 0;
        let characterIndex = messages[0].length;
        let deleting = false;

        typingElement.textContent = messages[0];

        function typeMessage() {
            const currentMessage = messages[messageIndex];

            if (deleting) {
                characterIndex--;
                typingElement.textContent =
                    currentMessage.substring(0, characterIndex);
            } else {
                characterIndex++;
                typingElement.textContent =
                    currentMessage.substring(0, characterIndex);
            }

            let delay = deleting ? 28 : 48;

            if (!deleting && characterIndex >= currentMessage.length) {
                deleting = true;
                delay = 1800;
            } else if (deleting && characterIndex <= 0) {
                deleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
                delay = 350;
            }

            window.setTimeout(typeMessage, delay);
        }

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            window.setTimeout(typeMessage, 1800);
        }
    }

    /* -----------------------------------------
       3. ANIMATED NEURAL NETWORK BACKGROUND
    ----------------------------------------- */

    const canvas = document.getElementById("neuralCanvas");
    const context = canvas ? canvas.getContext("2d") : null;

    if (canvas && context) {
        let particles = [];
        let animationFrame = null;
        let canvasWidth = 0;
        let canvasHeight = 0;
        let lastFrameTime = 0;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const mouse = {
            x: null,
            y: null
        };

        const connectionDistance = 125;
        const mouseDistance = 145;

        function createParticles() {
            const area = canvasWidth * canvasHeight;
            const count = Math.min(
                75,
                Math.max(18, Math.floor(area / 18000))
            );

            particles = [];

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvasWidth,
                    y: Math.random() * canvasHeight,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    radius: Math.random() * 1.6 + 0.7
                });
            }
        }

        function resizeCanvas() {
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;

            canvas.width = Math.floor(canvasWidth * pixelRatio);
            canvas.height = Math.floor(canvasHeight * pixelRatio);

            canvas.style.width = canvasWidth + "px";
            canvas.style.height = canvasHeight + "px";

            context.setTransform(
                pixelRatio,
                0,
                0,
                pixelRatio,
                0,
                0
            );

            createParticles();
            drawBackground();
        }

        function drawBackground() {
            context.clearRect(0, 0, canvasWidth, canvasHeight);

            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];

                if (!reducedMotion) {
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    if (particle.x < 0 || particle.x > canvasWidth) {
                        particle.vx *= -1;
                    }

                    if (particle.y < 0 || particle.y > canvasHeight) {
                        particle.vy *= -1;
                    }
                }

                particle.x = Math.max(
                    0,
                    Math.min(canvasWidth, particle.x)
                );

                particle.y = Math.max(
                    0,
                    Math.min(canvasHeight, particle.y)
                );

                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity =
                            (1 - distance / connectionDistance) * 0.19;

                        context.beginPath();
                        context.moveTo(particle.x, particle.y);
                        context.lineTo(other.x, other.y);
                        context.strokeStyle =
                            "rgba(57, 217, 255, " + opacity + ")";
                        context.lineWidth = 0.7;
                        context.stroke();
                    }
                }

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particle.x - mouse.x;
                    const dy = particle.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseDistance) {
                        context.beginPath();
                        context.moveTo(particle.x, particle.y);
                        context.lineTo(mouse.x, mouse.y);
                        context.strokeStyle =
                            "rgba(167, 139, 250, " +
                            ((1 - distance / mouseDistance) * 0.25) +
                            ")";
                        context.lineWidth = 0.8;
                        context.stroke();
                    }
                }

                context.beginPath();
                context.arc(
                    particle.x,
                    particle.y,
                    particle.radius,
                    0,
                    Math.PI * 2
                );
                context.fillStyle = "rgba(94, 221, 255, 0.65)";
                context.fill();
            }
        }

        function animateBackground(timestamp) {
            if (timestamp - lastFrameTime < 32) {
                animationFrame = window.requestAnimationFrame(
                    animateBackground
                );
                return;
            }

            lastFrameTime = timestamp;
            drawBackground();

            animationFrame = window.requestAnimationFrame(
                animateBackground
            );
        }

        window.addEventListener("mousemove", (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        });

        window.addEventListener("mouseleave", () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener("resize", resizeCanvas);

        resizeCanvas();

        if (!reducedMotion) {
            animationFrame = window.requestAnimationFrame(
                animateBackground
            );
        }
    }

    /* -----------------------------------------
       4. SCROLL REVEAL ANIMATIONS
    ----------------------------------------- */

    const revealElements = document.querySelectorAll(".scroll-reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    /* -----------------------------------------
       5. ACTIVE NAVIGATION SECTION
    ----------------------------------------- */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const activeId = entry.target.id;

                        navLinks.forEach((link) => {
                            const matches =
                                link.getAttribute("href") === "#" + activeId;

                            link.classList.toggle("active", matches);

                            if (matches) {
                                link.setAttribute("aria-current", "location");
                            } else {
                                link.removeAttribute("aria-current");
                            }
                        });
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    /* -----------------------------------------
       6. BACK-TO-TOP BUTTON
    ----------------------------------------- */

    const backToTop = document.querySelector(".back-to-top");

    function updateBackToTop() {
        if (backToTop) {
            backToTop.classList.toggle(
                "visible",
                window.scrollY > 450
            );
        }
    }

    if (backToTop) {
        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        updateBackToTop();
    }

    /* -----------------------------------------
       7. PROJECT DETAILS ACCESSIBILITY
    ----------------------------------------- */

    document.querySelectorAll(".project-insights").forEach((details) => {
        const summary = details.querySelector("summary");

        if (summary) {
            summary.setAttribute("aria-label", "Toggle project scope details");
        }
    });

    /* -----------------------------------------
       8. FOOTER YEAR
    ----------------------------------------- */

    const footerText = document.querySelector(".footer-content p");

    if (footerText) {
        footerText.textContent =
            "\u00A9 " +
            new Date().getFullYear() +
            " G. Seema | Data Analyst Portfolio";
    }

    /* -----------------------------------------
       9. EXTERNAL LINKS SAFETY
    ----------------------------------------- */

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        link.setAttribute("rel", "noopener noreferrer");
    });

});
