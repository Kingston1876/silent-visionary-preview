(function () {
  "use strict";
  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    window.location.href = "dashboard.html";
  });
  var mfaInputs = document.querySelectorAll(".mfa-boxes input");
  mfaInputs.forEach(function (input, i) {
    input.addEventListener("input", function () {
      if (input.value && mfaInputs[i + 1]) mfaInputs[i + 1].focus();
    });
  });

  var roleOpts = document.querySelectorAll(".role-opt");
  function selectRole(opt) {
    roleOpts.forEach(function (o) {
      o.classList.remove("active");
      o.setAttribute("aria-pressed", "false");
    });
    opt.classList.add("active");
    opt.setAttribute("aria-pressed", "true");
    try {
      window.localStorage.setItem("sv_demo_role", opt.textContent.trim());
    } catch (e) {}
  }
  roleOpts.forEach(function (opt) {
    opt.addEventListener("click", function () { selectRole(opt); });
    opt.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectRole(opt);
      }
    });
  });
})();
