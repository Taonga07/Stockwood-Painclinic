(function () {
  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Allow tap-to-open submenus on mobile
    nav.querySelectorAll(".has-children > a").forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (window.innerWidth <= 720) {
          e.preventDefault();
          a.parentElement.classList.toggle("is-open");
        }
      });
    });
  }

  // Hero carousel
  var hero = document.getElementById("hero");
  if (!hero) return;
  var slides = hero.querySelectorAll(".hero-slide");
  var dots = hero.querySelectorAll(".hero-dot");
  if (slides.length < 2) return;
  var current = 0;
  var timer;

  function show(i) {
    slides[current].classList.remove("is-active");
    dots[current] && dots[current].classList.remove("is-active");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("is-active");
    dots[current] && dots[current].classList.add("is-active");
  }

  function next() { show(current + 1); }

  function startTimer() {
    timer = setInterval(next, 6000);
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      clearInterval(timer);
      show(i);
      startTimer();
    });
  });

  startTimer();
})();
