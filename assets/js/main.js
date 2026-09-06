(function () {
  "use strict";

  /* ---------- language toggle ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById("langToggle");
  var STORAGE_KEY = "mch-lang";

  function applyLang(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "en" ? "en" : "zh-Hant");
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable (private mode, etc.) — fail silently */
    }
  }

  var saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    saved = null;
  }
  if (saved === "en" || saved === "zh") {
    applyLang(saved);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-lang") || "zh";
      applyLang(current === "zh" ? "en" : "zh");
    });
  }

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && reveals.length) {
    // Only now opt into the hidden-until-scrolled-into-view behavior —
    // see the ".js .reveal" rule in style.css. If this script never runs
    // (blocked, fails, etc.) sections simply stay visible by default.
    root.classList.add("js");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
