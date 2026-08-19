(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".scroll-progress");

  const updateScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
    if (!progress || reduceMotion) return;
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
    progress.style.transform = `scaleY(${ratio})`;
  };
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  }

  if (!reduceMotion) {
    const hero = document.querySelector(".hero-photograph");
    const media = document.querySelector(".hero-photograph-media");
    if (hero && media) {
      hero.addEventListener("pointermove", (event) => {
        const rect = hero.getBoundingClientRect();
        media.style.setProperty("--x", `${((event.clientX - rect.left) / rect.width - .5) * 10}px`);
        media.style.setProperty("--y", `${((event.clientY - rect.top) / rect.height - .5) * 8}px`);
      });
      hero.addEventListener("pointerleave", () => {
        media.style.setProperty("--x", "0px");
        media.style.setProperty("--y", "0px");
      });
    }

    document.querySelectorAll(".case-tilt").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.setProperty("--rx", `${-y * 2.4}deg`);
        card.style.setProperty("--ry", `${x * 2.6}deg`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }
})();
