document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. NEURAL NETWORK CANVAS ANIMATION
    // ==========================================
    const canvas = document.getElementById('neuralCanvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let particleCount = 60;
    const connectionDistance = 120;

    // Handle screen size scaling
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (canvas.width < 768) {
            particleCount = 30; // Reduce density on mobile
        } else {
            particleCount = 75;
        }
        initParticles();
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off boundaries or wrap
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw lines connecting particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const alpha = (1 - dist / connectionDistance) * 0.15;
                    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();

    // ==========================================
    // 2. TAGLINE TYPING EFFECT
    // ==========================================
    const taglineText = "Transforming Data into Insights and Business Decisions.";
    const typingContainer = document.getElementById('typing-tagline');
    let charIndex = 0;

    function typeTagline() {
        if (charIndex < taglineText.length) {
            typingContainer.textContent += taglineText.charAt(charIndex);
            charIndex++;
            setTimeout(typeTagline, 45); // Speed of typing
        }
    }
    // Start typing after a short delay
    setTimeout(typeTagline, 1000);

    // ==========================================
    // 3. MOBILE NAVIGATION MENU
    // ==========================================
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileNavToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileNavToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Header scroll background glow transition
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 4. SCROLL REVEAL & SKILLS PROGRESS ANIMATION
    // ==========================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    // Store original widths and set inline styles to 0% for scroll-animation triggering
    const targetWidths = [];
    skillBars.forEach((bar, idx) => {
        targetWidths[idx] = bar.style.width;
        bar.style.width = '0%';
    });

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If the section revealed is the skills section, animate progress bars
                if (entry.target.id === 'skills') {
                    skillBars.forEach((bar, idx) => {
                        setTimeout(() => {
                            bar.style.width = targetWidths[idx];
                        }, idx * 100); // Stagger bar fills
                    });
                }
                
                // Keep observing or unobserve if one-time is desired.
                // We keep observing for visual responsiveness but we can unobserve to lock animations
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollRevealElements.forEach(el => sectionObserver.observe(el));

    // Active Nav Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Hero Scroll to Next Section
    const scrollInd = document.querySelector('.scroll-indicator');
    if (scrollInd) {
        scrollInd.addEventListener('click', () => {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        });
    }


});
