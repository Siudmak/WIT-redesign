(function () {
  const slider = document.querySelector('#witHeroCarousel');

  if (!slider || !window.bootstrap) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = Number(slider.dataset.witInterval) || 6000;
  const carousel = window.bootstrap.Carousel.getOrCreateInstance(slider, {
    interval: prefersReducedMotion.matches ? false : interval,
    ride: prefersReducedMotion.matches ? false : 'carousel',
    touch: true,
    pause: false,
    wrap: true
  });

  if (prefersReducedMotion.matches) {
    carousel.pause();
  }

  const handleMotionPreference = function (event) {
    if (event.matches) {
      carousel.pause();
      return;
    }

    carousel.cycle();
  };

  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', handleMotionPreference);
  } else if (typeof prefersReducedMotion.addListener === 'function') {
    prefersReducedMotion.addListener(handleMotionPreference);
  }
})();
