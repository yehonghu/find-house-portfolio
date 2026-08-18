(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const residencePage = document.body.classList.contains("residence-page");
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".city-progress");

  const updateScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
    if (!progress || reduceMotion) return;
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
    progress.style.transform = residencePage ? `scaleY(${ratio})` : `scaleX(${ratio})`;
  };
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const revealItems = document.querySelectorAll(".city-reveal, .fade-in-up");
  if ("IntersectionObserver" in window && revealItems.length && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
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
        const startedAt = performance.now();
        const duration = 1200;
        const render = (time) => {
          const progressValue = Math.min(1, (time - startedAt) / duration);
          const eased = 1 - Math.pow(1 - progressValue, 3);
          element.textContent = Math.round(target * eased).toLocaleString();
          if (progressValue < 1) requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
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

  if (residencePage && !reduceMotion) {
    const heroMedia = document.querySelector(".residence-hero-media");
    const hero = document.querySelector(".residence-hero");
    if (heroMedia && hero) {
      hero.addEventListener("pointermove", (event) => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        heroMedia.style.setProperty("--hero-x", `${x * 10}px`);
        heroMedia.style.setProperty("--hero-y", `${y * 8}px`);
      });
      hero.addEventListener("pointerleave", () => {
        heroMedia.style.setProperty("--hero-x", "0px");
        heroMedia.style.setProperty("--hero-y", "0px");
      });
    }

    document.querySelectorAll(".case-tilt").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--case-rx", `${-y * 2.6}deg`);
        card.style.setProperty("--case-ry", `${x * 2.8}deg`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--case-rx", "0deg");
        card.style.setProperty("--case-ry", "0deg");
      });
    });
  }
})();
