/* =========================================================
   MOONLIGHT COSMETICS — SHARED UI BEHAVIOR
   Runs on every page. Every selector is guarded so a page
   missing an element never throws.
   ========================================================= */

(function () {

  // ---------- MOBILE MENU ----------
  var menuBtn = document.getElementById("menuBtn");
  var navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("show");
      });
    });
  }

  // ---------- STICKY HEADER LIFT ON SCROLL ----------
  var header = document.querySelector("header");

  if (header) {
    var setScrolled = function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
    };
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });
  }

  // ---------- TOAST ----------
  window.showToast = function (message) {
    var toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(toast._hideTimer);
    toast._hideTimer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 2800);
  };

  // ---------- AUTOMATIC COPYRIGHT YEAR ----------
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- SCROLL REVEAL ----------
  // Uses a MutationObserver (in addition to the initial scan) so content
  // rendered dynamically *after* this script runs (e.g. product/service
  // cards injected by a page-specific inline script) still gets observed.
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    var observeReveals = function (root) {
      root.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
        revealObserver.observe(el);
      });
    };

    observeReveals(document);

    if ("MutationObserver" in window) {
      new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          m.addedNodes.forEach(function (node) {
            if (node.nodeType !== 1) return;
            if (node.matches && node.matches(".reveal:not(.is-visible)")) revealObserver.observe(node);
            if (node.querySelectorAll) observeReveals(node);
          });
        });
      }).observe(document.body, { childList: true, subtree: true });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---------- TILT-ON-HOVER (3D CARDS) ----------
  // Delegated on document (rather than bound per-card) so cards rendered
  // dynamically after this script runs are still tiltable, with no re-init needed.
  var supportsHoverTilt =
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (supportsHoverTilt) {
    var maxTilt = 8;
    var activeTiltCard = null;

    var resetTilt = function (card) {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    };

    document.addEventListener("mousemove", function (e) {
      var card = e.target.closest ? e.target.closest(".tilt-card") : null;

      if (card) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        var rotateY = (x - 0.5) * maxTilt * 2;
        var rotateX = (0.5 - y) * maxTilt * 2;

        card.style.transform =
          "perspective(900px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-6px)";
        activeTiltCard = card;
      } else if (activeTiltCard) {
        resetTilt(activeTiltCard);
        activeTiltCard = null;
      }
    });
  }

  // ---------- HERO PARALLAX ORBS ----------
  var orbs = document.querySelectorAll(".hero-orb");

  if (orbs.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ticking = false;

    var updateOrbs = function () {
      var offset = window.scrollY;
      orbs.forEach(function (orb, i) {
        var speed = i % 2 === 0 ? 0.06 : -0.09;
        orb.style.transform = "translateY(" + (offset * speed) + "px)";
      });
      ticking = false;
    };

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateOrbs);
        ticking = true;
      }
    }, { passive: true });
  }

})();
