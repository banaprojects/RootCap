const sections = document.querySelectorAll("section");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => {
  observer.observe(section);
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

const teamMembers = document.querySelectorAll("#team .team-member");

teamMembers.forEach((member) => {
  member.addEventListener("mousemove", (e) => {
    const rect = member.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    member.style.transform = `perspective(1000px) rotateX(${(y - rect.height / 2) / 20}deg) rotateY(${(x - rect.width / 2) / 20}deg) translateY(-5px) rotate(0deg)`;
    member.style.marginTop = "0";
    member.style.marginLeft = "0";
    member.style.marginRight = "0";
  });

  member.addEventListener("mouseleave", () => {
    const index = Array.from(member.parentNode.children).indexOf(member);
    switch (index) {
      case 0:
        member.style.transform = "translateY(0) rotate(2deg)";
        member.style.marginTop = "-20px";
        member.style.marginLeft = "10px";
        member.style.marginRight = "0";
        break;
      case 1:
        member.style.transform = "translateY(0) rotate(-3deg)";
        member.style.marginTop = "20px";
        member.style.marginLeft = "0";
        member.style.marginRight = "15px";
        break;
      case 2:
        member.style.transform = "translateY(0) rotate(1deg)";
        member.style.marginTop = "-10px";
        member.style.marginLeft = "-10px";
        member.style.marginRight = "0";
        break;
      case 3:
        member.style.transform = "translateY(0) rotate(-2deg)";
        member.style.marginTop = "30px";
        member.style.marginLeft = "0";
        member.style.marginRight = "-20px";
        break;
      case 4:
        member.style.transform = "translateY(0) rotate(3deg)";
        member.style.marginTop = "0";
        member.style.marginLeft = "20px";
        member.style.marginRight = "0";
        break;
      default:
        member.style.transform = "translateY(0)";
        member.style.marginTop = "0";
        member.style.marginLeft = "0";
        member.style.marginRight = "0";
    }
  });
});

const timelineCards = document.querySelectorAll("#challenges .timeline-card");

timelineCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.transform = `perspective(1000px) rotateX(${(y - rect.height / 2) / 60}deg) rotateY(${(x - rect.width / 2) / 60}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

const footer = document.querySelector('footer');

const footerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

footerObserver.observe(footer);

const typewriterElement = document.querySelector('.typewriter');
const text = typewriterElement.textContent;
const speed = 100;

typewriterElement.textContent = '';
let i = 0;

function typeWriter() {
  if (i < text.length) {
    typewriterElement.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    typewriterElement.style.borderRight = '4px solid #fff';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeWriter, 500);
});