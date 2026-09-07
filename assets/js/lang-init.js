/* Set the initial language before first paint, so there's no flash of
   the wrong language. Priority: a language the visitor already chose on
   this site (localStorage) > the browser/OS language preference. We
   deliberately don't use IP-based geolocation here — this is a static
   site with no backend to look up a visitor's IP against, and IP only
   tells you what country a request came from, not what language a
   person reads (a bad proxy for anyone on a VPN, traveling, or simply
   not a native speaker of their country's majority language). Browser
   language is what the visitor's own OS/browser is already configured
   to prefer, needs no external service call, and costs nothing.

   This lives in its own file (rather than inline in <head>) so the
   site's Content-Security-Policy can use a plain `script-src 'self'`
   with no 'unsafe-inline' — see the CSP <meta> tag in index.html. */
(function () {
  "use strict";
  try {
    var lang = localStorage.getItem("mch-lang");
    if (lang !== "zh" && lang !== "en") {
      var prefs = (navigator.languages && navigator.languages.length)
        ? navigator.languages
        : [navigator.language || navigator.userLanguage || ""];
      lang = prefs.some(function (l) { return /^zh/i.test(l); }) ? "zh" : "en";
    }
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "zh-Hant");
  } catch (e) {
    /* localStorage/navigator unavailable — HTML already defaults to zh */
  }
})();
