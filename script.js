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

  function initCertModal() {
    var modal = document.getElementById("cert-modal");
    if (!modal) return;

    var imgEl = modal.querySelector(".cert-modal__img");
    var lastFocus = null;

    function openFromCard(card) {
      if (!card || !imgEl) return;
      var src = card.getAttribute("data-cert-src");
      if (!src) return;

      lastFocus = document.activeElement;
      var thumbImg = card.querySelector(".certificate-thumb img");
      var alt = thumbImg ? thumbImg.getAttribute("alt") || "" : "";

      imgEl.hidden = false;
      imgEl.src = src;
      imgEl.alt = alt;

      modal.removeAttribute("hidden");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("cert-modal-open");

      var closeBtn = modal.querySelector(".cert-modal__close");
      if (closeBtn) {
        window.setTimeout(function () {
          closeBtn.focus();
        }, 0);
      }
    }

    function closeModal() {
      if (modal.hasAttribute("hidden")) return;

      imgEl.removeAttribute("src");
      imgEl.removeAttribute("alt");
      imgEl.hidden = true;

      modal.setAttribute("hidden", "");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("cert-modal-open");

      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
      lastFocus = null;
    }

    var grid = document.querySelector(".certificate-grid");
    if (grid) {
      grid.addEventListener("click", function (e) {
        var trigger = e.target.closest(".certificate-thumb, .certificate-link");
        if (!trigger || !grid.contains(trigger)) return;
        var card = trigger.closest(".certificate-card");
        if (!card) return;
        e.preventDefault();
        openFromCard(card);
      });
    }

    modal.querySelectorAll("[data-cert-modal-close]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        closeModal();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (modal.hasAttribute("hidden")) return;
      closeModal();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    initLang();
    initNav();
    initCertModal();
  });
})();
