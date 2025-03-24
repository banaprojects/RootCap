// Navigation and scroll effects
const sections = document.querySelectorAll(".animate-section");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-links a");
const cards = document.querySelectorAll(".flip-3d");

// Observer for sections (e.g., footer and features section)
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        const fadeElements = entry.target.querySelectorAll(".fade-in");
        fadeElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("visible");
          }, index * 200);
        });
      }
    });
  },
  { threshold: 0.1 }
);

// Observer for individual cards
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

cards.forEach((card) => {
  cardObserver.observe(card);
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const navHeight = nav.offsetHeight;
    window.scrollTo({
      top: target.offsetTop - navHeight,
      behavior: "smooth",
    });
    navLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
  });
});

// Typewriter effect with 3D twist
const typewriterElement = document.querySelector(".typewriter");
const text = typewriterElement.textContent;
const speed = 60;

typewriterElement.textContent = "";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    typewriterElement.textContent += text.charAt(i);
    typewriterElement.style.transform = `rotateY(${i * 10}deg)`;
    i++;
    setTimeout(typeWriter, speed);
  } else {
    typewriterElement.style.borderRight = "none";
    typewriterElement.style.transform = "rotateY(0deg)";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeWriter, 200);
});

// 3D tilt for hero elements
const tiltElements = document.querySelectorAll(".tilt-3d");
tiltElements.forEach((element) => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = (y - rect.height / 2) / 15;
    const tiltY = (x - rect.width / 2) / -15;

    element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
});

// Enhanced 3D particle animation (restricted to left side)
const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
canvas.style.opacity = "0.7";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 150;

class Particle {
  constructor() {
    this.x = Math.random() * (canvas.width / 2); // Restrict to left half
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * 1000;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.speedZ = Math.random() * 2 - 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.z += this.speedZ;

    // Keep particles within the left half
    if (this.x > canvas.width / 2) this.x = 0;
    else if (this.x < 0) this.x = canvas.width / 2;
    if (this.y > canvas.height) this.y = 0;
    else if (this.y < 0) this.y = canvas.height;
    if (this.z > 1000) this.z = 0;
    else if (this.z < 0) this.z = 1000;
  }

  draw() {
    const scale = 1000 / (1000 + this.z);
    const x2d = this.x * scale; // No centering, stays on left
    const y2d = this.y * scale + canvas.height / 2;

    ctx.fillStyle = `rgba(104, 149, 84, ${scale})`;
    ctx.beginPath();
    ctx.arc(x2d, y2d, this.size * scale, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Reinitialize particles to stay on left side after resize
  particles.length = 0;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
});