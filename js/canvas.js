class Canvas {
  constructor() {
    this.clickables = [];
    this.selectedSpell = null;
    this.elements = [];
  }

  addClickable(clickable) {
    this.clickables.push(clickable);
  }

  click(x, y) {
    this.clickables.forEach(clickable => {
      clickable.click(x, y);
    });
  }

  addElement(image, layer, subLayer, x, y, w, h, subSubLayer = 0) {
    this.elements.push({
      image,
      layer,
      subLayer,
      subSubLayer,
      x,
      y,
      w,
      h
    });
    return this.elements[this.elements.length - 1];
  }

  removeElements(elements) {
    this.elements = this.elements.filter(element => !elements.includes(element));
  }

  drawElements() {
    this.elements.sort((a, b) => {
      let diff = a.layer - b.layer
      if (diff === 0) diff = a.subLayer - b.subLayer;
      if (diff === 0) diff = a.subSubLayer - b.subSubLayer;
      return diff;
    });
    this.elements.forEach((element) => {
      image(element.image, element.x, element.y, element.w, element.h);
    });
  }

  selectSpell(spell) {
    this.selectedSpell = spell;
  }

  unselectSpell() {
    this.selectedSpell = null;
  }
}