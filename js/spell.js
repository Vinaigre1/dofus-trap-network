class Spell extends Clickable {
  constructor(x, y, w, h, callback) {
    super(x, y, w, h, callback);
  }

  click(x, y) {
    if (super.click(x, y)) {
      
      return true;
    }
    return false;
  }
}