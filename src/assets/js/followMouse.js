window.onmousemove = function(e) {
  const sourceEl = document.getElementsByClassName("mouse-icon")[0];
  if (!sourceEl) return;

  sourceEl.style.left = e.pageX + 'px';
  sourceEl.style.top = e.pageY + 'px';
};