(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Header scroll shadow ---------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* ---------------- Contact form -> confirmação, depois WhatsApp sob clique do usuário ---------------- */
  var form = document.getElementById("contactForm");
  var faleFormWrap = document.getElementById("faleFormWrap");
  var faleFormSuccess = document.getElementById("faleFormSuccess");
  var faleWhatsappContinueBtn = document.getElementById("faleWhatsappContinueBtn");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nomeEl = document.getElementById("cf-nome");
      var empresaEl = document.getElementById("cf-empresa");
      var emailEl = document.getElementById("cf-email");
      var telefoneEl = document.getElementById("cf-telefone");
      var objetivoEl = document.getElementById("cf-objetivo");
      var mensagemEl = document.getElementById("cf-mensagem");
      var consentEl = document.getElementById("cf-consent");

      var nome = nomeEl ? nomeEl.value.trim() : "";
      var empresa = empresaEl ? empresaEl.value.trim() : "";
      var email = emailEl ? emailEl.value.trim() : "";
      var telefone = telefoneEl ? telefoneEl.value.trim() : "";
      var objetivo = objetivoEl ? objetivoEl.value : "";
      var mensagem = mensagemEl ? mensagemEl.value.trim() : "";

      if (!nome) {
        nomeEl.focus();
        return;
      }
      if (consentEl && !consentEl.checked) {
        consentEl.focus();
        return;
      }

      var lines = ["Olá, meu nome é " + nome + "."];
      if (empresa) lines.push("Empresa: " + empresa + ".");
      if (email) lines.push("E-mail: " + email + ".");
      if (telefone) lines.push("Telefone/WhatsApp: " + telefone + ".");
      if (objetivo) lines.push("O que busco: " + objetivo + ".");
      if (mensagem) lines.push("Mensagem: " + mensagem);
      if (!objetivo && !mensagem) lines.push("Quero saber mais sobre a consultoria em licitações.");

      var text = encodeURIComponent(lines.join(" "));
      var whatsappUrl = "https://wa.me/5511988554434?text=" + text;

      if (faleWhatsappContinueBtn) faleWhatsappContinueBtn.setAttribute("href", whatsappUrl);
      if (faleFormWrap) faleFormWrap.classList.add("is-hidden");
      if (faleFormSuccess) {
        faleFormSuccess.classList.remove("is-hidden");
        faleFormSuccess.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  /* ---------------- Serviços: "Quero um consultor" -> WhatsApp deep link ---------------- */
  var svcForm = document.getElementById("svcConsultorForm");
  if (svcForm) {
    svcForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = document.getElementById("svc-nome").value.trim();
      var telefone = document.getElementById("svc-telefone").value.trim();
      var email = document.getElementById("svc-email").value.trim();
      var frequencia = document.getElementById("svc-frequencia").value;
      var consent = document.getElementById("svc-consent").checked;

      if (!nome) { document.getElementById("svc-nome").focus(); return; }
      if (!consent) { document.getElementById("svc-consent").focus(); return; }

      var lines = ["Olá, meu nome é " + nome + " e quero falar com um consultor sobre licitações."];
      if (telefone) lines.push("Telefone: " + telefone + ".");
      if (email) lines.push("E-mail: " + email + ".");
      if (frequencia) lines.push("Frequência em licitações: " + frequencia + ".");

      var text = encodeURIComponent(lines.join(" "));
      window.open("https://wa.me/5511988554434?text=" + text, "_blank", "noopener");
    });
  }

  /* ---------------- Flip cards (Mercado Público infográfico) — toggle on click for touch ---------------- */
  var flipCards = document.querySelectorAll(".flip-card");
  flipCards.forEach(function (card) {
    card.addEventListener("click", function () {
      card.classList.toggle("is-flipped");
    });
  });

  /* ---------------- Diff cards (Diagnóstico/Análise/Estratégia) — shadow effect on tap for touch ---------------- */
  var diffCards = document.querySelectorAll(".diff-card");
  diffCards.forEach(function (card) {
    card.addEventListener("touchstart", function () {
      diffCards.forEach(function (c) { if (c !== card) c.classList.remove("is-touched"); });
      card.classList.add("is-touched");
    }, { passive: true });
  });
  document.addEventListener("touchstart", function (e) {
    diffCards.forEach(function (c) {
      if (!c.contains(e.target)) c.classList.remove("is-touched");
    });
  }, { passive: true });

  /* ---------------- Depoimentos carousel (Empresas que confiam na Salutti) ---------------- */
  var depoCarousel = document.querySelector(".depo-carousel");
  if (depoCarousel) {
    var depoTrack = depoCarousel.querySelector("[data-depo-track]");
    var depoSlides = Array.prototype.slice.call(depoCarousel.querySelectorAll("[data-depo-slide]"));
    var depoPrevBtn = depoCarousel.querySelector("[data-depo-prev]");
    var depoNextBtn = depoCarousel.querySelector("[data-depo-next]");
    var depoIndex = 0;

    function depoVisibleCount() {
      var w = window.innerWidth;
      if (w <= 760) return 1;
      if (w <= 980) return 2;
      return 3;
    }

    function depoUpdate() {
      if (!depoSlides.length || !depoTrack) return;
      var visible = depoVisibleCount();
      var maxIndex = Math.max(0, depoSlides.length - visible);
      if (depoIndex > maxIndex) depoIndex = maxIndex;

      var slideRect = depoSlides[0].getBoundingClientRect();
      var trackStyles = window.getComputedStyle(depoTrack);
      var gap = parseFloat(trackStyles.columnGap || trackStyles.gap || "0") || 0;
      var offset = depoIndex * (slideRect.width + gap);
      depoTrack.style.transform = "translateX(-" + offset + "px)";

      var hasOverflow = depoSlides.length > visible;
      if (depoPrevBtn) {
        depoPrevBtn.style.display = hasOverflow ? "" : "none";
        depoPrevBtn.disabled = false;
      }
      if (depoNextBtn) {
        depoNextBtn.style.display = hasOverflow ? "" : "none";
        depoNextBtn.disabled = false;
      }
    }

    if (depoPrevBtn) {
      depoPrevBtn.addEventListener("click", function () {
        var maxIndex = Math.max(0, depoSlides.length - depoVisibleCount());
        depoIndex = depoIndex <= 0 ? maxIndex : depoIndex - 1;
        depoUpdate();
      });
    }
    if (depoNextBtn) {
      depoNextBtn.addEventListener("click", function () {
        var maxIndex = Math.max(0, depoSlides.length - depoVisibleCount());
        depoIndex = depoIndex >= maxIndex ? 0 : depoIndex + 1;
        depoUpdate();
      });
    }

    var depoResizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(depoResizeTimer);
      depoResizeTimer = setTimeout(depoUpdate, 150);
    });

    depoUpdate();
  }

  /* ---------------- Transição suave entre páginas ---------------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest("a[href]");
    if (!link) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;

    var href = link.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;
    if (/^(https?:)?\/\//i.test(href) || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) return;
    if (!/\.html(#.*)?$/i.test(href)) return;

    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(function () {
      window.location.href = href;
    }, 200);
  });
})();
