// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Implementation
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        const body = document.body;

        function setTheme(isDark) {
            if (isDark) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }

            // Update three.js background
            const canvas = document.querySelector('#bg-canvas');
            if (canvas && canvas.__background) {
                canvas.__background.updateColors(isDark);
            }
        }

        // Check initial theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.getItem('theme');
        
        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            setTheme(true);
        }

        // Toggle theme on click
        themeToggle.addEventListener('click', () => {
            const isDark = !body.classList.contains('dark-mode');
            setTheme(isDark);
            
            // Add animation
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 100);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches);
            }
        });
    }

    initThemeToggle();

    // Loading Screen Animation
    const loadingScreen = document.querySelector('.loading-screen');
    const counter = document.querySelector('.loading-counter');
    let count = 0;
    
    const interval = setInterval(() => {
        if(count === 100) {
            clearInterval(interval);
            // Hide loading screen
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Initialize animations after loading
                initAnimations();
            }, 500);
        } else {
            count++;
            counter.textContent = count + '%';
        }
    }, 20);

    // Initialize all animations
    function initAnimations() {
        // Initialize Locomotive Scroll
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            multiplier: 1,
            smartphone: {
                smooth: true
            },
            tablet: {
                smooth: true
            }
        });

        // Hero Section Animation
        gsap.from('.hero-content h1', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out'
        });

        gsap.from('.hero-content h2', {
            y: 50,
            opacity: 0,
            duration: 1.5,
            delay: 0.2,
            ease: 'power4.out'
        });

        // Initialize custom cursor
        const cursor = document.createElement('div');
        const cursorDot = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);

        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        });
    }

    // Add this to your main.js file

    async function handleSubmit(event) {
        event.preventDefault();
        
        const form = document.getElementById('contact-form');
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const formStatus = document.getElementById('form-status');
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            // Show loading state
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            submitBtn.disabled = true;

            // You can replace this with your actual form submission endpoint
            const response = await fetch('YOUR_FORM_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Success message
                formStatus.textContent = 'Message sent successfully!';
                formStatus.className = 'form-status success';
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            // Error message
            formStatus.textContent = 'Failed to send message. Please try again.';
            formStatus.className = 'form-status error';
        } finally {
            // Reset button state
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            submitBtn.disabled = false;

            // Clear status message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        }
    }
});