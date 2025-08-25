document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Preloader Logic ---
    // This section controls the motor animation splash screen.
// --- 1. Preloader Logic ---
// This section controls the motor animation splash screen.
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Wait for 2.5 seconds to showcase the animation before fading it out.
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 450); // 2500 milliseconds = 2.5 seconds
    }

    // --- 2. Mobile Menu Toggle ---
    // This handles the opening and closing of the navigation menu on mobile devices.
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // This closes the mobile menu when a link is clicked.
        const mobileMenuLinks = mobileMenu.getElementsByTagName('a');
        for (let link of mobileMenuLinks) {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        }
    }

    // --- 3. Reveal on Scroll Animation ---
    // This uses the Intersection Observer API to animate elements as they scroll into view.
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Triggers when 10% of the element is visible.
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // --- 4. Animated Particle Background for Hero ---
    // This creates the live, moving particle effect in the main hero section.
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        const setCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        class Particle {
            constructor(x, y, size, speedX, speedY, color) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speedX = speedX;
                this.speedY = speedY;
                this.color = color;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.1) this.size -= 0.02;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 10000;
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 2 + 1;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const speedX = (Math.random() * 0.4) - 0.2;
                const speedY = (Math.random() * 0.4) - 0.2;
                const color = 'rgba(245, 158, 11, 0.5)';
                particles.push(new Particle(x, y, size, speedX, speedY, color));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animate);
        };

        initParticles();
        animate();
        window.addEventListener('resize', initParticles);
    }

});
