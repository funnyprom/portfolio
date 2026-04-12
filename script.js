(function () {
  var STORAGE_KEY = "portfolio-lang";

  function getDict(lang) {
    var bundle = window.PORTFOLIO_I18N;
    if (!bundle || !bundle[lang]) return null;
    return bundle[lang];
  }

  function applyLanguage(lang) {
    var dict = getDict(lang);
    if (!dict) {
      lang = "th";
      dict = getDict("th");
    }
    if (!dict) return;

    document.documentElement.lang = lang === "en" ? "en" : "th";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key !== null && dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (key !== null && dict[key] !== undefined) {
        el.setAttribute("aria-label", dict[key]);
      }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (key !== null && dict[key] !== undefined) {
        el.setAttribute("alt", dict[key]);
      }
    });

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict["meta.description"]) {
      metaDesc.setAttribute("content", dict["meta.description"]);
    }
    if (dict["meta.title"]) {
      document.title = dict["meta.title"];
    }

    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      var isSel = btn.getAttribute("data-set-lang") === lang;
      btn.setAttribute("aria-pressed", isSel ? "true" : "false");
      btn.classList.toggle("is-active", isSel);
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          setOpen(false);
        }
      });
    });
  }

  function initLang() {
    var saved = "th";
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s === "en" || s === "th") saved = s;
    } catch (e) {}

    applyLanguage(saved);

    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var l = btn.getAttribute("data-set-lang");
        if (l === "th" || l === "en") applyLanguage(l);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    initLang();
    initNav();
  });
})();
