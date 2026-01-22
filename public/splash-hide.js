// Hide splash screen by adding CSS class (no DOM removal)
(function () {
  var splash = document.getElementById("splash-screen");
  if (splash) {
    // Wait for page to be fully loaded
    if (document.readyState === "complete") {
      setTimeout(function () {
        splash.classList.add("hidden");
      }, 100);
    } else {
      window.addEventListener("load", function () {
        setTimeout(function () {
          splash.classList.add("hidden");
        }, 100);
      });
    }
  }
})();
