document.querySelectorAll('.brand-logo').forEach((logo) => {
  const showImage = () => {
    logo.classList.add('is-loaded');
    const fallback = logo.nextElementSibling;
    if (fallback) fallback.hidden = true;
  };

  const showFallback = () => {
    logo.hidden = true;
  };

  logo.addEventListener('load', showImage);
  logo.addEventListener('error', showFallback);

  if (logo.complete) {
    if (logo.naturalWidth > 0) {
      showImage();
    } else {
      showFallback();
    }
  }
});
