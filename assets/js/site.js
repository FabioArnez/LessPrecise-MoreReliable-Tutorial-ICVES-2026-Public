// Theme toggle (light or dark, remembered per browser) and the BibTeX copy button.
(function () {
  "use strict";

  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function stored() {
    try {
      var t = window.localStorage.getItem("theme");
      return t === "dark" || t === "light" ? t : null;
    } catch (e) {
      return null;
    }
  }

  function effective() {
    var t = root.getAttribute("data-theme");
    if (t === "dark" || t === "light") {
      return t;
    }
    return media && media.matches ? "dark" : "light";
  }

  var toggle = document.getElementById("theme-toggle");

  function label() {
    if (!toggle) {
      return;
    }
    var dark = effective() === "dark";
    toggle.setAttribute("aria-pressed", dark ? "true" : "false");
    toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    toggle.setAttribute("title", dark ? "Light theme" : "Dark theme");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = effective() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        window.localStorage.setItem("theme", next);
      } catch (e) {
        /* private mode or blocked storage: the choice lasts for this page only */
      }
      label();
    });
  }

  // Follow the system setting while the visitor has not chosen a theme.
  if (media) {
    var onChange = function () {
      if (!stored()) {
        root.removeAttribute("data-theme");
        label();
      }
    };
    if (media.addEventListener) {
      media.addEventListener("change", onChange);
    } else if (media.addListener) {
      media.addListener(onChange);
    }
  }
  label();

  // Copy the BibTeX entry.
  var copy = document.getElementById("copy-bibtex");
  var bib = document.getElementById("bibtex-text");
  if (copy && bib) {
    copy.addEventListener("click", function () {
      var text = bib.textContent;
      var done = function () {
        copy.textContent = "Copied";
        window.setTimeout(function () {
          copy.textContent = "Copy";
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {
          copy.textContent = "Select and copy";
        });
      } else {
        var range = document.createRange();
        range.selectNodeContents(bib);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        copy.textContent = "Press Ctrl+C";
      }
    });
  }
})();
