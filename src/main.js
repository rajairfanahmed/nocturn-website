import Lenis from 'lenis'

// Initialize Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// --- Custom Cursor Logic ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
const triggers = document.querySelectorAll('.hover-trigger');

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursor) {
        cursor.style.transform = `translate3d(${mouseX - 8}px, ${mouseY - 8}px, 0)`;
    }

    // Magnetic Buttons Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const strength = 20; // range of movement

        // Check if mouse is near button (using a simplified distance check)
        // Actually, let's just do it on hover of the button itself
        const isHovering =
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom;

        if (isHovering) {
            const x = (mouseX - (rect.left + rect.width / 2)) / rect.width * strength;
            const y = (mouseY - (rect.top + rect.height / 2)) / rect.height * strength;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        } else {
            btn.style.transform = `translate(0px, 0px)`;
        }
    });
});

// Follower loop
function loop() {
    if (follower) {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        follower.style.transform = `translate3d(${posX - 24}px, ${posY - 24}px, 0)`;
    }

    // Parallax logic inside rAF for performance
    const scrollY = window.scrollY; // Or use lenis.scroll if accessible

    // Basic Parallax for Hero Background
    const heroBg = document.querySelector('.hero-parallax');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }

    requestAnimationFrame(loop);
}
loop();

// Hover Effects
triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
        cursor.classList.add('scale-[0.5]');
        follower.classList.add('scale-[2.5]', 'bg-white/10', 'border-transparent', 'backdrop-blur-sm');
    });
    trigger.addEventListener('mouseleave', () => {
        cursor.classList.remove('scale-[0.5]');
        follower.classList.remove('scale-[2.5]', 'bg-white/10', 'border-transparent', 'backdrop-blur-sm');
    });
});

// --- Scroll Reveal Observer ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal-up');
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach((el) => {
    el.style.opacity = '0'; // Ensure hidden initially
    observer.observe(el);
});

console.log("Nocturn Initialized");
