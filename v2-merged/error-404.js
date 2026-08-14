(function () {
  "use strict";

  function typeLine(el, text, speed, done) {
    var i = 0;
    (function step() {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(step, speed);
      } else if (done) {
        done();
      }
    })();
  }

  function run() {
    var console_ = document.getElementById("trace-console");
    if (!console_) return;

    var ids = ["trace-1", "trace-2", "trace-3", "trace-status"];
    var lines = ids.map(function (id) {
      var el = document.getElementById(id);
      // i18n.js also targets [data-i18n] nodes; strip the attribute so it
      // can't re-stomp text this script is about to animate.
      if (el) el.removeAttribute("data-i18n");
      return { el: el, text: el ? el.textContent : "" };
    });

    if (lines[0].el) lines[0].text += " " + window.location.pathname;

    var reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      lines.forEach(function (line) {
        if (line.el) line.el.textContent = line.text;
      });
      console_.classList.add("is-visible");
      return;
    }

    lines.forEach(function (line) {
      if (line.el) line.el.textContent = "";
    });
    console_.classList.add("is-visible");

    var idx = 0;
    function next() {
      if (idx >= lines.length) return;
      var line = lines[idx];
      idx++;
      if (!line.el) return next();
      typeLine(line.el, line.text, 16, function () {
        setTimeout(next, 240);
      });
    }
    next();
  }

  // This script is loaded with `defer`, so DOMContentLoaded has not fired
  // yet. Registering here (rather than calling run() immediately) ensures
  // it runs after i18n.js's own DOMContentLoaded listener, which is
  // registered first and applies translations to [data-i18n] nodes.
  document.addEventListener("DOMContentLoaded", run);
})();
