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

    // ==========================================
    // 5. PROJECT DETAILS & MODAL MANAGEMENT (WITH CHART.JS)
    // ==========================================
    const modalTriggers = document.querySelectorAll('.view-project-btn');
    const modals = document.querySelectorAll('.modal');
    const closeModalButtons = document.querySelectorAll('.close-modal-btn');
    let activeCharts = {};

    // Chart Options & Palette Configurations
    const chartDefaults = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#e2e8f0',
                    font: { family: 'Orbitron', size: 10 }
                }
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#a0aec0', font: { family: 'Inter', size: 10 } }
            },
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#a0aec0', font: { family: 'Inter', size: 10 } }
            }
        }
    };

    function createAirlineChart() {
        const ctx = document.getElementById('airlineChart').getContext('2d');
        
        // Creating Cyan Gradient
        const cyanGrad = ctx.createLinearGradient(0, 0, 0, 300);
        cyanGrad.addColorStop(0, 'rgba(0, 242, 254, 0.7)');
        cyanGrad.addColorStop(1, 'rgba(0, 114, 255, 0.1)');

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
                datasets: [
                    {
                        label: 'Flights Scheduled (Count)',
                        data: [120, 150, 185, 140, 160, 210, 195, 110],
                        backgroundColor: cyanGrad,
                        borderColor: '#00f2fe',
                        borderWidth: 1.5,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Delay Frequency Rate (%)',
                        data: [5.2, 7.8, 12.4, 8.1, 9.4, 28.5, 22.1, 6.4],
                        type: 'line',
                        borderColor: '#bd00ff',
                        backgroundColor: 'rgba(189, 0, 255, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#bd00ff',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 6,
                        yAxisID: 'y1',
                        tension: 0.4
                    }
                ]
            },
            options: {
                ...chartDefaults,
                scales: {
                    x: chartDefaults.scales.x,
                    y: {
                        position: 'left',
                        grid: chartDefaults.scales.y.grid,
                        ticks: chartDefaults.scales.y.ticks,
                        title: { display: true, text: 'Flight Volume', color: '#a0aec0' }
                    },
                    y1: {
                        position: 'right',
                        grid: { drawOnChartArea: false }, // avoid grid overlap
                        ticks: chartDefaults.scales.y.ticks,
                        title: { display: true, text: 'Delay Rate (%)', color: '#a0aec0' }
                    }
                }
            }
        });
    }

    function createElectionChart() {
        const ctx = document.getElementById('electionChart').getContext('2d');
        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['National Coalition', 'United Front', 'Democratic Alliance', 'Regional & Others'],
                datasets: [{
                    data: [38.2, 29.5, 18.3, 14.0],
                    backgroundColor: [
                        'rgba(0, 242, 254, 0.85)',
                        'rgba(189, 0, 255, 0.85)',
                        'rgba(255, 0, 127, 0.85)',
                        'rgba(160, 174, 192, 0.6)'
                    ],
                    borderColor: '#05021a',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#e2e8f0',
                            font: { family: 'Orbitron', size: 10 }
                        }
                    }
                }
            }
        });
    }

    function createHrChart() {
        const ctx = document.getElementById('hrChart').getContext('2d');
        
        // Creating Orange-Pink Gradient
        const orangeGrad = ctx.createLinearGradient(0, 0, 300, 0);
        orangeGrad.addColorStop(0, 'rgba(255, 159, 0, 0.1)');
        orangeGrad.addColorStop(1, 'rgba(255, 0, 127, 0.7)');

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Sales/BD', 'Engineering', 'Operations', 'R&D Lab', 'Human Resources', 'Finance'],
                datasets: [{
                    label: 'Attrition Probability Rate (%)',
                    data: [18.4, 24.2, 11.5, 9.8, 15.2, 7.3],
                    backgroundColor: orangeGrad,
                    borderColor: '#ff007f',
                    borderWidth: 1.5,
                    borderRadius: 4
                }]
            },
            options: {
                ...chartDefaults,
                indexAxis: 'y', // Make bars horizontal
                scales: {
                    y: chartDefaults.scales.y,
                    x: {
                        ...chartDefaults.scales.x,
                        title: { display: true, text: 'Attrition %', color: '#a0aec0' }
                    }
                }
            }
        });
    }

    // Modal click handling
    modalTriggers.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // prevent bg scroll
                
                // Initialize respective project chart based on target modal
                setTimeout(() => {
                    if (modalId === 'airline-modal' && !activeCharts['airline']) {
                        activeCharts['airline'] = createAirlineChart();
                    } else if (modalId === 'election-modal' && !activeCharts['election']) {
                        activeCharts['election'] = createElectionChart();
                    } else if (modalId === 'hr-modal' && !activeCharts['hr']) {
                        activeCharts['hr'] = createHrChart();
                    }
                }, 150); // Small timeout to ensure display transitions have run
            }
        });
    });

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Find which chart was inside the closed modal and destroy it to release layout resources
        const canvas = modal.querySelector('canvas');
        if (canvas) {
            const chartId = canvas.id;
            if (activeCharts[chartId]) {
                activeCharts[chartId].destroy();
                delete activeCharts[chartId];
            }
        }
    }

    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });

    // Close on click outside content window
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close on Escape keypress
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
});
