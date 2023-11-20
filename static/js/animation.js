document.addEventListener("DOMContentLoaded", function () {
    var fadeElems = document.querySelectorAll(".sa-up");
  
    var options = {
      threshold: 0.5,
    };
  
    var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          observer.unobserve(entry.target);
        }
      });
    }, options);
  
    fadeElems.forEach(function (fadeElem) {
      observer.observe(fadeElem);
    });
  });