/* ============================================================
   Portfolio interactions: theme, nav, reveal, counters, progress
   ============================================================ */
(function () {
  "use strict";

  const doc = document.documentElement;

  /* ---------- Theme toggle (persisted) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initial = stored || (prefersLight ? "light" : "dark");
  doc.setAttribute("data-theme", initial);

  themeToggle.addEventListener("click", function () {
    const next = doc.getAttribute("data-theme") === "dark" ? "light" : "dark";
    doc.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");
  burger.addEventListener("click", function () {
    burger.classList.toggle("open");
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      burger.classList.remove("open");
      links.classList.remove("open");
    });
  });

  /* ---------- Nav border + scroll progress ---------- */
  const nav = document.getElementById("nav");
  const progress = document.getElementById("scrollProgress");
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 20);
    const h = doc.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    ".section__head, .about__body, .about__awards, .tl, .skill-card, .project, .stat, .contact__inner > *"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealTargets.forEach(function (el) { io.observe(el); });

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll(".stat__num[data-count]");
  const counterIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute("data-count"), 10);
      const duration = 1100;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(function (el) { counterIO.observe(el); });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
