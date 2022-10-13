class Canvas {
  constructor() {
    this.clickables = [];
    this.selectedSpell = null;
  }

  addClickable(clickable) {
    this.clickables.push(clickable);
  }

  click(x, y) {
    this.clickables.forEach(clickable => {
      clickable.click(x, y);
    });
  }

  selectSpell(spell) {
    this.selectedSpell = spell;
  }

  unselectSpell() {
    this.selectedSpell = null;
  }
}