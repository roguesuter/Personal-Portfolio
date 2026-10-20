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

  // ---------- Resume PDF download and printing ----------
  const downloadResume = document.getElementById("download-resume");
  const printResume = document.getElementById("print-resume");

  if (downloadResume) {
    downloadResume.addEventListener("click", () => {
      const resumeContent = document.querySelector(".resume-content");
      const jsPDF = window.jspdf?.jsPDF;
      if (!resumeContent || !jsPDF) {
        console.error("Resume PDF download is unavailable.");
        window.alert("PDF download is unavailable right now. Please try again or use Print.");
        return;
      }

      const pdf = new jsPDF({ unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 18;
      const contentWidth = pageWidth - margin * 2;
      const accent = [14, 165, 233];
      let y = 22;

      const cleanText = (text) => text
        .replace(/[—–]/g, "-")
        .replace(/·/g, "|")
        .replace(/\s+/g, " ")
        .trim();

      const ensureSpace = (height) => {
        if (y + height > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
      };

      const writeLines = (text, { size = 10, font = "normal", color = [51, 65, 85], indent = 0 } = {}) => {
        pdf.setFont("helvetica", font);
        pdf.setFontSize(size);
        pdf.setTextColor(...color);
        const lineHeight = size * 0.48;
        const lines = pdf.splitTextToSize(text, contentWidth - indent);
        lines.forEach((line) => {
          ensureSpace(lineHeight);
          pdf.text(line, margin + indent, y);
          y += lineHeight;
        });
      };

      const name = resumeContent.querySelector("h1")?.innerText.trim() || "Resume";
      const role = resumeContent.querySelector("h1 + p")?.innerText.trim() || "";
      const contacts = [...resumeContent.querySelector(".resume-contact-row").children]
        .map((item) => item.innerText.trim())
        .filter(Boolean)
        .join(" | ");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(24);
      pdf.setTextColor(15, 23, 42);
      pdf.text(name, pageWidth / 2, y, { align: "center" });
      y += 7;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(...accent);
      pdf.text(cleanText(role), pageWidth / 2, y, { align: "center" });
      y += 6;

      pdf.setTextColor(100, 116, 139);
      pdf.setFontSize(9);
      pdf.splitTextToSize(cleanText(contacts), contentWidth).forEach((line) => {
        pdf.text(line, pageWidth / 2, y, { align: "center" });
        y += 4.5;
      });
      y += 2;
      pdf.setDrawColor(...accent);
      pdf.setLineWidth(0.6);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 8;

      resumeContent.querySelectorAll(":scope > h3").forEach((heading) => {
        ensureSpace(12);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.setTextColor(...accent);
        pdf.text(heading.innerText.trim().toUpperCase(), margin, y);
        y += 2;
        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.3);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 5;

        const list = heading.nextElementSibling;
        if (list?.tagName !== "UL") return;

        list.querySelectorAll(":scope > li").forEach((item) => {
          const lines = item.innerText.split(/\n+/).map(cleanText).filter(Boolean);
          if (!lines.length) return;
          ensureSpace(5);
          pdf.setFillColor(...accent);
          pdf.circle(margin + 1, y - 1, 0.7, "F");
          const isSkills = heading.innerText.trim().toLowerCase() === "skills";
          writeLines(lines[0], { size: 9.5, font: isSkills ? "normal" : "bold", indent: 5 });
          lines.slice(1).forEach((line) => writeLines(line, { size: 9, color: [100, 116, 139], indent: 5 }));
          y += 2;
        });

        y += 2;
      });

      pdf.save("Adrian-Suter-CV.pdf");
    });
  }

  if (printResume) {
    printResume.addEventListener("click", () => window.print());
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
