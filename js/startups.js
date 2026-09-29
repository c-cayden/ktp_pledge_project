// Startups viewer on professional-development.html: one panel at a time, chosen from the tab strip,
// the arrows, arrow keys, a swipe, or a #su-<id> link. Without this script every panel shows stacked.
(function () {
  var root = document.querySelector(".sx");
  if (!root) return;
  var tabs = Array.prototype.slice.call(root.querySelectorAll(".sx-tab"));
  var panels = Array.prototype.slice.call(root.querySelectorAll(".sx-panel"));
  if (!tabs.length || tabs.length !== panels.length) return;
  var stage = root.querySelector(".sx-stage");
  var strip = root.querySelector(".sx-tabs");
  var count = root.querySelector(".sx-count b");
  var bar = root.querySelector(".sx-progress span");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = -1;
  var turnTimer = null;

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function centerTab(t, instant) {
    var left = t.offsetLeft - (strip.clientWidth - t.offsetWidth) / 2;
    if (strip.scrollTo && !instant && !reduce) strip.scrollTo({ left: left, behavior: "smooth" });
    else strip.scrollLeft = left;
  }

  // Panels start hidden, so native lazy loading never fires for them; load the active image and its neighbours directly.
  function warm(k) {
    var img = panels[(k + panels.length) % panels.length].querySelector("img");
    if (img && img.loading === "lazy") img.loading = "eager";
  }

  function show(i, focusTab, instant) {
    i = (i + panels.length) % panels.length;
    if (i === current) return;
    warm(i); warm(i + 1); warm(i - 1);
    for (var k = 0; k < panels.length; k++) {
      var on = k === i;
      panels[k].hidden = !on;
      panels[k].classList.remove("is-in");
      tabs[k].setAttribute("aria-selected", on ? "true" : "false");
      tabs[k].tabIndex = on ? 0 : -1;
    }
    void panels[i].offsetWidth; // restart the entrance animation
    panels[i].classList.add("is-in");
    current = i;
    if (count) count.textContent = pad(i + 1);
    if (bar) bar.style.transform = "scaleX(" + (i + 1) / panels.length + ")";
    stage.classList.add("is-turning");
    clearTimeout(turnTimer);
    turnTimer = setTimeout(function () { stage.classList.remove("is-turning"); }, 420);
    centerTab(tabs[i], instant);
    if (focusTab) tabs[i].focus();
  }

  function indexFromHash() {
    var id = (location.hash || "").slice(1);
    if (!id) return -1;
    if (id === "su-acre") id = "su-actor"; // Acre Robotics is now Actor; keep old links working
    for (var k = 0; k < panels.length; k++) if (panels[k].id === id) return k;
    return -1;
  }

  root.classList.add("sx-js");

  tabs.forEach(function (t, k) {
    t.addEventListener("click", function () { show(k); });
  });
  strip.addEventListener("keydown", function (e) {
    var k = null; // not -1: "one before the first" is a real target that wraps to the last
    if (e.key === "ArrowRight") k = current + 1;
    else if (e.key === "ArrowLeft") k = current - 1;
    else if (e.key === "Home") k = 0;
    else if (e.key === "End") k = panels.length - 1;
    if (k === null) return;
    e.preventDefault();
    show(k, true);
  });
  root.querySelectorAll("[data-sx]").forEach(function (b) {
    b.addEventListener("click", function () { show(current + (b.getAttribute("data-sx") === "next" ? 1 : -1)); });
  });

  var x0 = null, y0 = null;
  stage.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  function fromHash(scroll) {
    var k = indexFromHash();
    if (k === -1) return false;
    show(k, false, true);
    if (scroll) root.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    return true;
  }
  window.addEventListener("hashchange", function () { fromHash(true); });
  if (!fromHash(true)) show(0);
})();
