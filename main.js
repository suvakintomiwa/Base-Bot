// Create animated particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animate stats on scroll
function animateStats() {
  const stats = document.querySelectorAll(".stat-number");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        target.textContent = "0";

        // Simple counter animation
        let current = 0;
        const increment = 1;
        const timer = setInterval(() => {
          current += increment;
          if (finalValue.includes("K")) {
            target.textContent = Math.min(current, 50) + "K+";
            if (current >= 50) clearInterval(timer);
          } else if (finalValue.includes("B")) {
            target.textContent = "1B";
            clearInterval(timer);
          } else if (finalValue.includes("$")) {
            target.textContent = "$" + Math.min(current, 2) + "M+";
            if (current >= 2) clearInterval(timer);
          } else {
            target.textContent = "24/7";
            clearInterval(timer);
          }
        }, 50);

        observer.unobserve(target);
      }
    });
  });

  stats.forEach((stat) => observer.observe(stat));
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  createParticles();
  animateStats();
});

// Add some interactive hover effects
document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});
