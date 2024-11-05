class Background {
    constructor() {
        this.container = document.querySelector('#bg-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.container,
            antialias: true,
            alpha: true
        });

        this.init();
        this.setupGeometry();
        this.animate();

        // Store reference for theme toggle
        this.container.__background = this;

        // Add event listeners
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('scroll', () => this.onScroll());
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 30;

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00a6ff, 2);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);
    }

    setupGeometry() {
        // Create complex geometry
        const geometry = new THREE.IcosahedronGeometry(10, 1);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00a6ff,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        // Add particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00fff2
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.mesh.rotation.x += 0.001;
        this.mesh.rotation.y += 0.002;

        this.particles.rotation.x -= 0.0002;
        this.particles.rotation.y -= 0.0001;

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onScroll() {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        this.mesh.rotation.y = scrollPercent * Math.PI * 2;
    }

    updateColors(isDark) {
        const color = isDark ? 0x00a6ff : 0x6b4dff;
        this.mesh.material.color.setHex(color);
        this.particles.material.color.setHex(color);
    }
}

// Initialize background
new Background();