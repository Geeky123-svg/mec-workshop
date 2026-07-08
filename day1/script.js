document.addEventListener("DOMContentLoaded", () => {

  /* Loader */
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => loader.classList.add("hidden"));
    setTimeout(() => loader.classList.add("hidden"), 1500);
  }

  /* Year */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Navbar ---- */
  const navbar = document.getElementById("navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navLinkEls = document.querySelectorAll(".nav-link");

  let lastScrollY = 0;

  function updateNav() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (scrollY > lastScrollY && scrollY > 200) {
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
    }

    lastScrollY = scrollY;

    /* Active link */
    const sections = document.querySelectorAll("section[id]");
    let current = "home";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const bottom = top + sec.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        current = sec.id;
      }
    });

    navLinkEls.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  /* Mobile nav toggle */
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open);
    });

    navLinkEls.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Scroll Reveal ---- */
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---- Animated Counters ---- */
  const statNums = document.querySelectorAll(".stat-num");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach((el) => counterObserver.observe(el));

  function animateCounter(el, target) {
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 40));
    const step = () => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = current;
      requestAnimationFrame(step);
    };
    step();
  }

  /* ---- Contact Form ---- */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector(".form-btn");
      const original = btn.innerHTML;
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Sent!
      `;
      btn.style.pointerEvents = "none";
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.pointerEvents = "";
        form.reset();
      }, 3000);
    });
  }
});
