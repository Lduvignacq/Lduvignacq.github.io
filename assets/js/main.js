(function () {
  "use strict";

  /* --- floating nav: on narrow screens, scroll the current tab into view -- */
  var nav = document.querySelector(".pill-nav");
  var current = nav && nav.querySelector("a.on");
  if (current && nav.scrollWidth > nav.clientWidth) {
    nav.scrollLeft = current.offsetLeft - (nav.clientWidth - current.offsetWidth) / 2;
  }

  /* --- figures open full size ------------------------------------------- */
  var box = document.getElementById("lightbox");
  if (box && typeof box.showModal === "function") {
    var big = box.querySelector("img");
    document.querySelectorAll(".zoom").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        box.showModal();
      });
    });
    box.querySelector(".lb-close").addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box || e.target === big) box.close(); });
  }
})();
