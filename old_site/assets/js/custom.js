window.addEventListener("load", function () {
  if (isRunningStandalone()) {
    this.document.getElementById("standalone").removeAttribute("hidden");
  }

  function isRunningStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches;
  }
});
