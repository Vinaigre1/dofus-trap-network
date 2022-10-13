class Clickable {
  constructor(x, y, w, h, callback) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.callback = callback;
  }

  click(x, y) {
    if (this.x <= x && x < this.x + this.w
     && this.y <= y && y < this.y + this.h)
    {
      this.callback();
      return true;
    }
    return false;
  }
}