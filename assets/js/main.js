(function () {
  "use strict";

  /* ---------- language toggle ----------
     The initial language (saved choice, else browser-language guess) is
     already applied by the inline script in <head> before this file
     even loads — see the comment there. This block only has to handle
     switching languages after a click. */
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

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-lang") || "zh";
      applyLang(current === "zh" ? "en" : "zh");
    });
  }

  /* ---------- email button: copy-to-clipboard fallback ----------
     A bare mailto: link does nothing visible on a machine with no
     default mail client configured (common on Windows without Outlook).
     We still let that navigation attempt happen, but also copy the
     address to the clipboard and show it in the button as feedback,
     so the click is never a silent no-op. */
  var emailButtons = document.querySelectorAll(".btn-email");

  emailButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var mail = (btn.getAttribute("href") || "").replace(/^mailto:/, "").split("?")[0];
      if (!mail) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail).catch(function () {
          /* clipboard blocked (e.g. insecure/local context) — the
             visible text swap below still shows the address */
        });
      }

      var lang = root.getAttribute("data-lang") || "zh";
      var original = btn.innerHTML;
      btn.innerHTML = (lang === "en" ? "Copied — " : "已複製信箱 — ") + mail;
      btn.dataset.copied = "1";

      setTimeout(function () {
        if (btn.dataset.copied === "1") {
          btn.innerHTML = original;
          delete btn.dataset.copied;
        }
      }, 2200);
    });
  });

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
