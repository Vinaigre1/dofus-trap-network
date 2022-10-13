class Sidebar extends Clickable {
  constructor(x, y, w, h, callback, spells = []) {
    super(x, y, w, h, callback);
    this.spells = spells;
  }

  addSpell(spell) {
    this.spells.push(spell);
  }

  click(x, y) {
    if (super.click(x, y))
    {
      this.spells.forEach(spell => {
        spell.click(x - this.x, y - this.y);
      });
      return true;
    }
    return false;
  }
}