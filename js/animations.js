// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Scroll-based animations
function initScrollAnimations() {
    // Hero Section Parallax
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        opacity: 0.5
    });

    // Projects Horizontal Scroll
    let projectsSection = gsap.timeline({
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top top',
            end: () => `+=${document.querySelector('.project-container').scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
        }
    });

    projectsSection.to('.project-container', {
        x: () => -(document.querySelector('.project-container').scrollWidth - window.innerWidth)
    });

    // Trophy Room Animation
    gsap.utils.toArray('.trophy-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'top center',
                scrub: 1
            },
            y: 100,
            opacity: 0,
            rotateY: 45,
            scale: 0.8,
            duration: 1
        });
    });

    // Skill Tags Animation
    gsap.utils.toArray('.tech-tag').forEach((tag, i) => {
        gsap.from(tag, {
            scrollTrigger: {
                trigger: tag,
                start: 'top bottom',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: i * 0.1
        });
    });

    // Section Titles Animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top bottom',
                end: 'top center',
                scrub: 1
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });

    // Contact Form Animation
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 1
    });

    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.3
    });
}

// Mouse movement parallax effect
function initMouseParallax() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        gsap.to('.hero-content', {
            duration: 1,
            x: mouseX * 50,
            y: mouseY * 50,
            ease: 'power2.out'
        });

        gsap.to('.trophy-card', {
            duration: 1,
            rotateY: mouseX * 10,
            rotateX: -mouseY * 10,
            ease: 'power2.out'
        });
    });
}

// Mouse glow effect for about section
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    aboutSection.addEventListener('mousemove', (e) => {
        const rect = aboutSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / aboutSection.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / aboutSection.clientHeight) * 100;
        
        aboutSection.style.setProperty('--mouse-x', `${x}%`);
        aboutSection.style.setProperty('--mouse-y', `${y}%`);
    });
}

// Enhanced skill tag animations
gsap.utils.toArray('.tech-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        gsap.to(tag, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out',
            boxShadow: '0 0 20px var(--accent-blue)'
        });
    });

    tag.addEventListener('mouseleave', () => {
        gsap.to(tag, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.in',
            boxShadow: 'none'
        });
    });
});

// Skill group hover effect
gsap.utils.toArray('.skill-group').forEach(group => {
    group.addEventListener('mouseenter', () => {
        gsap.to(group.querySelectorAll('.tech-tag'), {
            y: -5,
            stagger: 0.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    group.addEventListener('mouseleave', () => {
        gsap.to(group.querySelectorAll('.tech-tag'), {
            y: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: 'power2.in'
        });
    });
});

// Enhanced Hero Section Animations
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = heroContent.querySelector('h1');
    const heroSubtitle = heroContent.querySelector('h2');
    const heroDescription = heroContent.querySelector('.hero-description');

    // Initial animation
    gsap.from(heroTitle, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
    });

    gsap.from(heroSubtitle, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: 'power4.out'
    });

    gsap.from(heroDescription, {
        y: 30,
        opacity: 0,
        duration: 1.5,
        delay: 0.6,
        ease: 'power4.out'
    });

    // Mouse move parallax effect
    heroContent.addEventListener('mousemove', (e) => {
        const rect = heroContent.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        gsap.to(heroTitle, {
            rotateX: -mouseY * 10,
            rotateY: mouseX * 10,
            duration: 0.5,
            ease: 'power2.out'
        });

        gsap.to(heroSubtitle, {
            rotateX: -mouseY * 5,
            rotateY: mouseX * 5,
            duration: 0.5,
            ease: 'power2.out'
        });

        gsap.to(heroDescription, {
            rotateX: -mouseY * 2,
            rotateY: mouseX * 2,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    // Reset on mouse leave
    heroContent.addEventListener('mouseleave', () => {
        gsap.to([heroTitle, heroSubtitle, heroDescription], {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    // Add floating elements
    const floatingElements = Array.from({ length: 3 }, () => {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.background = 'var(--gradient-blue)';
        element.style.width = Math.random() * 100 + 50 + 'px';
        element.style.height = element.style.width;
        element.style.borderRadius = '50%';
        heroContent.appendChild(element);
        return element;
    });

    // Animate floating elements on mouse move
    document.addEventListener('mousemove', (e) => {
        floatingElements.forEach((element, i) => {
            const speed = (i + 1) * 0.1;
            const x = (e.clientX - window.innerWidth / 2) * speed;
            const y = (e.clientY - window.innerHeight / 2) * speed;
            
            gsap.to(element, {
                x: x,
                y: y,
                duration: 1,
                ease: 'power2.out'
            });
        });
    });
}

// Achievement Section Particles
function initAchievementParticles() {
    const particlesContainer = document.getElementById('achievement-particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'achievement-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${Math.random() > 0.5 ? 'var(--accent-blue)' : 'var(--accent-cyan)'};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: floatParticle ${Math.random() * 10 + 5}s infinite linear;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Initialize all animations
function initAnimations() {
    initScrollAnimations();
    initMouseParallax();
    initHeroAnimations();
    initAchievementParticles();
}

// Call initialization when the page is loaded
window.addEventListener('load', initAnimations);