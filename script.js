(function () {
  "use strict";

  var DATA = window.TT_CONTENT;
  var ICONS = {
    chevron: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowRight: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowFlat: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8H14M14 8L9.5 3.5M14 8L9.5 12.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5L6.2 11.5L13 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    access: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 11V7.5C8 5 9.8 4 12 4C13.6 4 15 4.7 15.6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    format: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M10.5 9L14.5 12L10.5 15V9Z" fill="currentColor"/></svg>',
    practice: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.7"/></svg>',
    support: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12C4 7.6 7.8 4.5 12 4.5C16.2 4.5 20 7.6 20 12C20 16 16.5 19 12.3 19C11.4 19 10.6 18.9 9.9 18.7L5.5 20L6.6 16.6C5 15.3 4 13.8 4 12Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  };

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function esc(str) {
    var d = document.createElement("div");
    d.textContent = str == null ? "" : String(str);
    return d.innerHTML;
  }

  /* ---------- render sections from config ---------- */

  function renderNav() {
    var nav = document.getElementById("mainNav");
    var mobileNav = document.getElementById("mobileNav");
    if (nav) {
      nav.innerHTML = DATA.nav.map(function (l) {
        return '<a class="nav-link" href="' + l.href + '">' + esc(l.label) + "</a>";
      }).join("");
    }
    if (mobileNav) {
      mobileNav.innerHTML = DATA.nav.map(function (l) {
        return '<a href="' + l.href + '">' + esc(l.label) + "</a>";
      }).join("") + '<a href="#pricing" class="mobile-nav-cta">Записаться на курс</a>';
    }
  }

  function renderHeroPath() {
    var wrap = document.getElementById("heroPath");
    if (!wrap) return;
    wrap.innerHTML = DATA.heroPath.map(function (step, i) {
      var arrow = i > 0 ? '<span class="hero-path-arrow">' + ICONS.arrowFlat + "</span>" : "";
      return arrow + '<span class="hero-path-step">' + esc(step) + "</span>";
    }).join("");
  }

  function renderPainPoints() {
    var wrap = document.getElementById("painGrid");
    if (!wrap) return;
    wrap.innerHTML = DATA.painPoints.map(function (text) {
      return '<div class="pain-card reveal"><span class="pain-quote-mark">"</span><p>' + esc(text) + "</p></div>";
    }).join("");
  }

  function renderSystem() {
    var wrap = document.getElementById("systemChain");
    if (!wrap) return;
    wrap.innerHTML = DATA.systemSteps.map(function (s) {
      return (
        '<div class="chain-step reveal">' +
        '<div class="chain-num">' + esc(s.n) + "</div>" +
        '<div class="chain-body"><h3>' + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></div>" +
        "</div>"
      );
    }).join("");
  }

  function renderOutcomes() {
    var wrap = document.getElementById("outcomesGrid");
    if (!wrap) return;
    wrap.innerHTML = DATA.outcomes.map(function (o) {
      return (
        '<div class="outcome-card reveal">' +
        '<div class="outcome-num">[ ' + esc(o.n) + " ]</div>" +
        "<h3>" + esc(o.title) + "</h3>" +
        "<p>" + esc(o.text) + "</p>" +
        "</div>"
      );
    }).join("");
  }

  function renderAudience() {
    var wrap = document.getElementById("audienceGrid");
    if (!wrap) return;
    wrap.innerHTML = DATA.audience.map(function (a) {
      return (
        '<div class="audience-card reveal">' +
        "<h3>" + esc(a.role) + "</h3>" +
        "<p>" + esc(a.text) + "</p>" +
        '<div class="audience-shift">' +
        '<div class="audience-shift-col now"><div class="audience-shift-label">Сейчас</div><p>' + esc(a.now) + "</p></div>" +
        '<div class="audience-shift-arrow">' + ICONS.arrowFlat + "</div>" +
        '<div class="audience-shift-col after"><div class="audience-shift-label">После курса</div><p>' + esc(a.after) + "</p></div>" +
        "</div>" +
        "</div>"
      );
    }).join("");
  }

  function renderProgram() {
    var wrap = document.getElementById("programList");
    if (!wrap) return;
    wrap.innerHTML = DATA.program.map(function (m, idx) {
      var lessons = m.lessons.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("");
      return (
        '<div class="program-module' + (m.featured ? " is-featured" : "") + '" data-module="' + idx + '">' +
        '<button type="button" class="program-module-head" aria-expanded="false">' +
        '<span class="program-module-title"><span class="program-badge">' + esc(m.badge) + '</span><h3>' + esc(m.title) + "</h3></span>" +
        '<span class="program-count">' + m.lessons.length + ' ' + lessonWord(m.lessons.length) + '</span>' +
        '<span class="program-chevron">' + ICONS.chevron + "</span>" +
        "</button>" +
        '<div class="program-module-body"><div class="program-module-body-inner">' +
        '<ul class="program-lessons">' + lessons + "</ul>" +
        '<div class="program-result"><strong>Результат модуля.</strong> ' + esc(m.result) + "</div>" +
        "</div></div>" +
        "</div>"
      );
    }).join("");

    wrap.querySelectorAll(".program-module-head").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var module = btn.closest(".program-module");
        var wasOpen = module.classList.contains("is-open");
        module.classList.toggle("is-open", !wasOpen);
        btn.setAttribute("aria-expanded", String(!wasOpen));
      });
    });
  }

  function lessonWord(n) {
    var mod10 = n % 10, mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return "урок";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "урока";
    return "уроков";
  }

  function renderEcosystem() {
    var wrap = document.getElementById("ecoGrid");
    if (!wrap) return;
    wrap.innerHTML = DATA.ecosystem.map(function (e) {
      return '<div class="eco-card reveal"><h3>' + esc(e.title) + "</h3><p>" + esc(e.text) + "</p></div>";
    }).join("");
  }

  function renderAdsFunnel() {
    var wrap = document.getElementById("adsFunnel");
    if (!wrap) return;
    wrap.innerHTML = DATA.adsFunnel.map(function (step, i) {
      var arrow = i > 0 ? '<span class="ads-funnel-arrow">' + ICONS.arrowFlat + "</span>" : "";
      return arrow + '<span class="ads-funnel-step">' + esc(step) + "</span>";
    }).join("");
  }

  function renderAuthor() {
    var a = DATA.author;
    var nameEl = document.getElementById("authorName");
    var roleEl = document.getElementById("authorRole");
    var bioEl = document.getElementById("authorBio");
    var statsEl = document.getElementById("authorStats");
    var channelEl = document.getElementById("authorChannel");
    if (nameEl) nameEl.textContent = a.name;
    if (roleEl) roleEl.textContent = a.role;
    if (bioEl) bioEl.textContent = a.bio;
    if (statsEl) {
      statsEl.innerHTML = a.stats.map(function (s) {
        return '<div class="author-stat"><div class="author-stat-value">' + esc(s.value) + '</div><div class="author-stat-label">' + esc(s.label) + "</div></div>";
      }).join("");
    }
    if (channelEl) {
      channelEl.textContent = a.channelLabel;
      channelEl.href = a.channelHref;
    }
  }

  function renderCases() {
    var wrap = document.getElementById("casesGrid");
    if (!wrap) return;
    wrap.innerHTML = DATA.cases.map(function (c) {
      return (
        '<div class="case-card reveal">' +
        '<span class="case-placeholder-tag">PLACEHOLDER</span>' +
        '<div class="case-person"><div class="case-avatar"></div><div><h4>' + esc(c.name) + '</h4><span>' + esc(c.role) + "</span></div></div>" +
        "<blockquote>" + esc(c.quote) + "</blockquote>" +
        '<p class="case-result">' + esc(c.result) + "</p>" +
        "</div>"
      );
    }).join("");
  }

  function renderFormat() {
    var wrap = document.getElementById("formatGrid");
    if (!wrap) return;
    wrap.innerHTML = DATA.learningFormat.map(function (f) {
      return (
        '<div class="format-item">' +
        '<div class="format-icon">' + (ICONS[f.icon] || "") + "</div>" +
        '<div class="format-label">' + esc(f.label) + '</div><div class="format-value">' + esc(f.value) + "</div></div>"
      );
    }).join("");
  }

  function renderPricing() {
    var wrap = document.getElementById("pricingGrid");
    var note = document.getElementById("pricingNote");
    if (note) {
      note.textContent = DATA.pricingNote;
      note.style.display = DATA.pricingNote ? "" : "none";
    }
    if (!wrap) return;
    wrap.innerHTML = DATA.pricing.map(function (p) {
      var features = p.features.map(function (f) {
        return "<li>" + ICONS.check + "<span>" + esc(f) + "</span></li>";
      }).join("");
      var priceLine = p.oldPrice
        ? '<span class="price-amount">' + esc(p.price) + '</span><span class="price-old">' + esc(p.oldPrice) + "</span>"
        : '<span class="price-amount">' + esc(p.price) + "</span>";
      return (
        '<div class="price-card' + (p.featured ? " is-featured" : "") + '">' +
        (p.featured ? '<span class="price-popular-tag">Популярный</span>' : "") +
        '<h3 class="price-name">' + esc(p.name) + "</h3>" +
        '<div class="price-value">' + priceLine + "</div>" +
        (p.installment ? '<p class="price-installment">' + esc(p.installment) + "</p>" : "") +
        '<ul class="price-features">' + features + "</ul>" +
        '<a href="https://t.me/totaltg_bot" target="_blank" rel="noopener" class="btn ' + (p.featured ? "btn-primary" : "btn-ghost") + '">' + esc(p.cta) + "</a>" +
        "</div>"
      );
    }).join("");
  }

  function renderFaq() {
    var wrap = document.getElementById("faqList");
    if (!wrap) return;
    wrap.innerHTML = DATA.faq.map(function (item) {
      return (
        '<div class="faq-item">' +
        '<button type="button" class="faq-question" aria-expanded="false">' +
        "<span>" + esc(item.q) + "</span>" +
        '<span class="faq-chevron">' + ICONS.chevron + "</span>" +
        "</button>" +
        '<div class="faq-answer"><div class="faq-answer-inner"><p>' + esc(item.a) + "</p></div></div>" +
        "</div>"
      );
    }).join("");

    wrap.querySelectorAll(".faq-question").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".faq-item");
        var wasOpen = item.classList.contains("is-open");
        item.classList.toggle("is-open", !wasOpen);
        btn.setAttribute("aria-expanded", String(!wasOpen));
      });
    });
  }

  /* ---------- behaviour ---------- */

  function setupHeader() {
    var header = document.getElementById("siteHeader");
    var toggle = document.getElementById("navToggle");
    var mobileNav = document.getElementById("mobileNav");
    if (header) {
      var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    if (toggle && mobileNav) {
      toggle.addEventListener("click", function () {
        var open = mobileNav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      mobileNav.addEventListener("click", function (e) {
        if (e.target.closest("a")) mobileNav.classList.remove("is-open");
      });
    }
  }

  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !items.length) {
      items.forEach(function (i) { i.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (i) { observer.observe(i); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderNav();
    renderHeroPath();
    renderPainPoints();
    renderSystem();
    renderOutcomes();
    renderAudience();
    renderProgram();
    renderEcosystem();
    renderAdsFunnel();
    renderAuthor();
    renderCases();
    renderFormat();
    renderPricing();
    renderFaq();
    setupHeader();
    setupReveal();

    var yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
