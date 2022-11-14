window.onload = function() {
  const sourceEl = document.getElementsByClassName("relative-height-source");
  new ResizeObserver((entries) => {
    const elements = document.getElementsByClassName("relative-height");
    for (const entry of entries) {
      for (const element of elements) {
        element.style.maxHeight = `${entry.contentRect.height}px`;
      }
      console.log(entry.contentRect.height);
    }
  }).observe(sourceEl[0]);
}