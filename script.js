(function () {
  "use strict";

  const nav = document.getElementById("nav");
  const toggle = nav?.querySelector(".nav-toggle");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (nav && toggle) {
    const links = nav.querySelectorAll(".nav-links a");
    toggle.addEventListener("click", function () {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  function onScroll() {
    if (nav) {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var reveals = document.querySelectorAll(".reveal");
    if (reveals.length && "IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      reveals.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      reveals.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
