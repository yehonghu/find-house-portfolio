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

  const spatial = document.querySelector("[data-spatial-scroll]");
  if (!spatial) return;

  const stage = spatial.querySelector(".spatial-stage");
  const track = spatial.querySelector("[data-spatial-track]");
  const cards = [...spatial.querySelectorAll(".spatial-residence-card")];
  const counter = spatial.querySelector("[data-spatial-count]");
  const previous = spatial.querySelector("[data-spatial-previous]");
  const next = spatial.querySelector("[data-spatial-next]");
  let activeResidence = 0;

  const syncResidenceRail = () => {
    if (!track || !cards.length) return;
    const step = cards[0].getBoundingClientRect().width + 16;
    track.style.transform = `translate3d(${-activeResidence * step}px, 0, 0)`;
    if (counter) counter.textContent = `${String(activeResidence + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
  };

  previous?.addEventListener("click", () => {
    activeResidence = (activeResidence - 1 + cards.length) % cards.length;
    syncResidenceRail();
  });

  next?.addEventListener("click", () => {
    activeResidence = (activeResidence + 1) % cards.length;
    syncResidenceRail();
  });

  window.addEventListener("resize", syncResidenceRail, { passive: true });
  syncResidenceRail();

  const jumpToResidences = () => {
    const revealPosition = spatial.offsetTop + Math.max(0, spatial.offsetHeight - window.innerHeight) * 0.36;
    window.scrollTo({ top: revealPosition, behavior: reduceMotion ? "auto" : "smooth" });
  };

  document.querySelectorAll('a[href="#residences"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (window.location.hash !== "#residences") history.pushState(null, "", "#residences");
      jumpToResidences();
    });
  });

  const resolveResidenceHash = () => {
    if (window.location.hash !== "#residences") return;
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    window.setTimeout(() => {
      jumpToResidences();
      history.replaceState(null, "", "#residences");
    }, 120);
  };

  window.addEventListener("hashchange", resolveResidenceHash);
  resolveResidenceHash();

  if (reduceMotion || !stage) return;

  let scheduled = false;
  const clamp = (value) => Math.max(0, Math.min(1, value));
  const range = (value, start, end) => clamp((value - start) / (end - start));

  const updateSpatialScene = () => {
    scheduled = false;
    const bounds = spatial.getBoundingClientRect();
    const scrollDistance = Math.max(1, spatial.offsetHeight - window.innerHeight);
    const sceneProgress = clamp(-bounds.top / scrollDistance);
    const introExit = range(sceneProgress, 0.12, 0.33);
    const cardsIn = range(sceneProgress, 0.25, 0.48);
    const cardsOut = range(sceneProgress, 0.73, 0.88);
    const panelIn = range(sceneProgress, 0.7, 0.92);

    spatial.style.setProperty("--fh-progress", sceneProgress.toFixed(4));
    spatial.style.setProperty("--fh-intro-opacity", (1 - introExit).toFixed(4));
    spatial.style.setProperty("--fh-intro-y", `${-(sceneProgress * 230)}px`);
    spatial.style.setProperty("--fh-cards-opacity", (cardsIn * (1 - cardsOut)).toFixed(4));
    spatial.style.setProperty("--fh-cards-y", `${(1 - cardsIn) * 78}px`);
    spatial.style.setProperty("--fh-panel-opacity", panelIn.toFixed(4));
    spatial.style.setProperty("--fh-panel-y", `${(1 - panelIn) * 70}px`);
  };

  const scheduleSpatialScene = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateSpatialScene);
  };

  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();
    spatial.style.setProperty("--fh-pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    spatial.style.setProperty("--fh-pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  });

  stage.addEventListener("pointerleave", () => {
    spatial.style.setProperty("--fh-pointer-x", "50%");
    spatial.style.setProperty("--fh-pointer-y", "50%");
  });

  window.addEventListener("scroll", scheduleSpatialScene, { passive: true });
  window.addEventListener("resize", scheduleSpatialScene, { passive: true });
  updateSpatialScene();
})();
