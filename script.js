// ============================================================================
// Portfolio Script
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Current year in footer ----------
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- Theme toggle (dark mode) ----------
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle?.querySelector(".theme-icon");
  const STORAGE_KEY = "portfolio-theme";

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      if (themeIcon) themeIcon.textContent = "☀️";
      localStorage.setItem(STORAGE_KEY, "dark");
    } else {
      document.body.classList.remove("dark");
      if (themeIcon) themeIcon.textContent = "🌙";
      localStorage.setItem(STORAGE_KEY, "light");
    }
  };

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      applyTheme(isDark ? "light" : "dark");
    });
  }

  // ---------- Navbar scroll effect ----------
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ---------- Mobile menu toggle ----------
  const navToggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  if (navToggle && links) {
    navToggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking a link
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
