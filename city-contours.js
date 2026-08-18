(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".city-progress");
  const updateScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
    if (!progress || reduceMotion) return;
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = available > 0 ? window.scrollY / available : 0;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
  };
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
  }

  const board = document.querySelector(".city-board");
  if (board && !reduceMotion) {
    board.addEventListener("pointermove", (event) => {
      const rect = board.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      board.style.setProperty("--tilt-x", `${-y * 7}deg`);
      board.style.setProperty("--tilt-y", `${x * 8}deg`);
    });
    board.addEventListener("pointerleave", () => {
      board.style.setProperty("--tilt-x", "0deg");
      board.style.setProperty("--tilt-y", "0deg");
    });
  }

  const revealItems = document.querySelectorAll(".city-reveal, .fade-in-up");
  if ("IntersectionObserver" in window && revealItems.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  document.querySelectorAll(".stat-number[data-target]").forEach((element) => {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      element.textContent = Number(element.dataset.target || 0).toLocaleString();
      return;
    }
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = Number(element.dataset.target || 0);
        const start = performance.now();
        const duration = 1200;
        const draw = (time) => {
          const progressValue = Math.min(1, (time - start) / duration);
          const eased = 1 - Math.pow(1 - progressValue, 3);
          element.textContent = Math.round(target * eased).toLocaleString();
          if (progressValue < 1) requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
        counterObserver.unobserve(element);
      });
    }, { threshold: 0.55 });
    counterObserver.observe(element);
  });

  document.querySelectorAll(".property-fav").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      button.classList.toggle("active");
      button.setAttribute("aria-pressed", String(button.classList.contains("active")));
      button.textContent = button.classList.contains("active") ? "♥" : "♡";
    });
  });
})();
