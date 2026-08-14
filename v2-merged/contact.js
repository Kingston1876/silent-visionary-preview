(function () {
  "use strict";
  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("c-name").value;
    var org = document.getElementById("c-org").value;
    var interest = document.getElementById("c-interest").value;
    var message = document.getElementById("c-message").value;
    var subject = encodeURIComponent("Silent Visionary Inquiry — " + (interest || "General"));
    var body = encodeURIComponent(
      "Name: " + name + "\nOrganization: " + org + "\nInterested in: " + interest + "\n\n" + message
    );
    window.location.href = "mailto:info@silentvisionary.com?subject=" + subject + "&body=" + body;
  });
})();
