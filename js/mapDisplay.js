function loadMap(graphics = window, mapID)
{
  mapData = loadJSON(`./assets/maps/${mapID}.json`, () => {
    map.initMap(mapData.Data[0].Cells);
    for (let i = 0; i < MAP_HEIGHT; i++) {
      for (let j = 0; j < MAP_WIDTH; j++) {
        switch (map.getCell(j, i).type) {
          case CELL.WALKABLE:
            drawCell(j, i, (i % 2 === 0 ? color('#8E8660') : color('#968E69')), color('#7E7961'), ''/*i * MAP_WIDTH + j*/, graphics);
            break;
          case CELL.LOS_WALL:
            // drawCell(j, i, color(0, 0, 0, 0), color(0, 0, 0, 0), '', graphics);
            break;
          case CELL.WALL:
            drawWall(j, i, color('#58533C'), color('#B8B6B2'), '', graphics);
            break;
          default:
            break;
        }
      }
    }
  });
  canvas.addClickable(map);
}

function loadSidebar(graphics, spells)
{
  let sidebar = new Sidebar(SIDEBAR_X, 0, CANVAS_W - SIDEBAR_X, CANVAS_H, () => {});
  let height = Math.ceil(spells.length / SIDEBAR_WIDTH);
  for (let i = 0; i < spells.length; i++) {
    let x = Math.floor(i / height) * img[14].asset.width + 3;
    let y = (i % height) * img[14].asset.height + 3;
    let w = img[14].asset.width - 6;
    let h = img[14].asset.height - 6;
    graphics.image(spells[i].icon.asset, x, y, w, h);
    sidebar.addSpell(new Spell(x, y, w, h, () => {
      canvas.selectSpell(spells[i]);
    }));
  }
  canvas.addClickable(sidebar);
}

function drawTraps()
{
  for (let i = 0; i < MAP_WIDTH; i++) {
    for (let j = 0; j < MAP_HEIGHT; j++) {
      if (map.getCell(i, j).type !== CELL.WALKABLE) continue;

      map.traps.slice().reverse().forEach(trap => {
        if (trap.isInTrap(i, j)) {
          let borders = trap.getBorders(i, j);
          strokeWeight(2.5);
          drawCell(i, j, trap.trap.color.cell, trap.trap.color.stroke, '', undefined, borders, (i === trap.cell.x && j === trap.cell.y) ? trap.trap.image.asset : null);
          strokeWeight(1);
        }
      });
    }
  }
}

function drawSelectedSpell()
{
  if (canvas.selectedSpell) {
    let x = mouseX;
    let y = mouseY;
    let w = (img[14].asset.width - 6) / 2;
    let h = (img[14].asset.height - 6) / 2;
    image(canvas.selectedSpell.icon.asset, x, y, w, h);
  }
}

function drawQuad(x, y, w, h, cellColor, strokeColor, graphics = window, borders)
{
  graphics.stroke(strokeColor);
  if (borders !== undefined) {
    if (borders & CELL_BORDER.NORTH) graphics.line(x + w,   y + h/2, x + w/2, y);
    if (borders & CELL_BORDER.EAST)  graphics.line(x + w/2, y + h,   x + w,   y + h/2);
    if (borders & CELL_BORDER.SOUTH) graphics.line(x,       y + h/2, x + w/2, y + h);
    if (borders & CELL_BORDER.WEST)  graphics.line(x + w/2, y,       x,       y + h/2);
    graphics.noStroke();
  }
  graphics.fill(cellColor);
  graphics.quad(x + w/2, y,
  x,       y + h/2,
  x + w/2, y + h,
  x + w,   y + h/2);
}

function drawCell(x, y, cellColor, strokeColor, str, graphics = window, borders)
{
  let { x: posX, y: posY } = Map.getCellPos(x, y);

  drawQuad(posX, posY, CELL_W, CELL_H, cellColor, strokeColor, graphics, borders);

  if (str !== undefined) {
    graphics.fill(0);
    graphics.textAlign('center', 'center');
    graphics.noStroke();
    graphics.text(str, posX + CELL_W/2, posY + CELL_H/2);
    graphics.stroke(0);
  }
}

function drawWall(x, y, cellColor, strokeColor, str, graphics = window)
{
  let { x: posX, y: posY } = Map.getCellPos(x, y);

  posY -= CELL_H / 2;

  drawQuad(posX, posY, CELL_W, CELL_H, cellColor, strokeColor, graphics);

  graphics.quad(posX, posY + CELL_H/2, posX, posY + CELL_H, posX + CELL_W/2, posY + CELL_H*1.5, posX + CELL_W/2, posY + CELL_H);
  graphics.quad(posX + CELL_W/2, posY + CELL_H, posX + CELL_W/2, posY + CELL_H*1.5, posX + CELL_W, posY + CELL_H, posX + CELL_W, posY + CELL_H/2);
}

function getEntityPos(x, y)
{
  let { x: posX, y: posY } = Map.getCellPos(x, y);

  return { x: posX + CELL_W/2, y: posY + CELL_H/2 };
}

function loadEntity(entity)
{
  let width = CELL_W * entity.image.scale;
  let height = width * (entity.image.asset.height / entity.image.asset.width);

  let gr = createGraphics(width, height + CELL_H/2);
  let pos = getEntityPos(entity.cell.x, entity.cell.y);

  let nextPos;
  if (entity.nextCell) {
    nextPos = getEntityPos(entity.nextCell.x, entity.nextCell.y);
    pos.x = pos.x * (1 - map.animCompletion) + nextPos.x * map.animCompletion;
    pos.y = pos.y * (1 - map.animCompletion) + nextPos.y * map.animCompletion;
    map.animCompletion += map.animSpeed / FRAMERATE;
  }

  gr.strokeWeight(2.5);
  gr.stroke(entity.team.color.stroke);
  gr.fill(entity.team.color.cell);
  gr.ellipse(width / 2 - entity.image.offsetX, height - entity.image.offsetY, CELL_W * 0.55, CELL_H * 0.55);
  gr.strokeWeight(1);

  gr.image(
    entity.image.asset,
    0,
    0,
    width,
    height
  );
  return canvas.addElement(gr, entity.cell.y, SUBLAYERS.ENTITY, pos.x + entity.image.offsetX - width/2, pos.y + entity.image.offsetY - height, width, height + CELL_H/2);
}

function loadTrap(trap, trapHeight)
{
  let elements = [];
  for (let i = 0; i < MAP_HEIGHT; i++) {
    let gr = createGraphics(CANVAS_W * 0.75, CELL_H);
    let inTrap = false;
    for (let j = 0; j < MAP_WIDTH; j++) {
      if (map.getCell(j, i).type !== CELL.WALKABLE) continue;

      if (trap.isInTrap(j, i)) {
        inTrap = true;
        let borders = trap.getBorders(j, i);
        gr.strokeWeight(2.5);
        drawCell(j, 0, trap.trap.color.cell, trap.trap.color.stroke, '', gr, borders, (j === trap.cell.x && i === trap.cell.y) ? trap.trap.image.asset : null);
        gr.strokeWeight(1);
        if (j === trap.cell.x && i === trap.cell.y) {
          let cellPos = Map.getCellPos(j, i);
          elements.push(canvas.addElement(trap.trap.image.asset, i, SUBLAYERS.TRAP_ICON, cellPos.x + CELL_W * 0.15, cellPos.y + CELL_H * 0.15, CELL_W * 0.7, CELL_H * 0.7));
        }
      }
    }
    if (inTrap) {
      elements.push(canvas.addElement(gr, i, SUBLAYERS.TRAP, (i % 2) * CELL_W/2, i * CELL_H/2, CANVAS_W * 0.75, CELL_H, trapHeight));
    }
  }
  return elements;
}

function animateEntities()
{
  let deltaTime = map.animSpeed / FRAMERATE;
  map.animCompletion += deltaTime;
  map.entities.forEach(entity => {
    if (entity.nextCell) {
      let pos = getEntityPos(entity.cell.x, entity.cell.y);
      let nextPos = getEntityPos(entity.nextCell.x, entity.nextCell.y);
      let width = CELL_W * entity.image.scale;
      let height = width * (entity.image.asset.height / entity.image.asset.width);

      pos.x = pos.x * (1 - map.animCompletion) + nextPos.x * map.animCompletion;
      pos.y = pos.y * (1 - map.animCompletion) + nextPos.y * map.animCompletion;

      deltaX = pos.x * (1 - deltaTime) + nextPos.x * deltaTime - pos.x;
      deltaY = pos.y * (1 - deltaTime) + nextPos.y * deltaTime - pos.y;

      entity.canvasElement.x = pos.x + entity.image.offsetX - width/2;
      entity.canvasElement.y = pos.y + entity.image.offsetY - height;
      entity.canvasElement.layer = Math.max(entity.nextCell.y, entity.cell.y);
      if (map.animCompletion >= 1) {
        entity.canvasElement.x = nextPos.x + entity.image.offsetX - width/2;
        entity.canvasElement.y = nextPos.y + entity.image.offsetY - height;
        entity.canvasElement.layer = entity.nextCell.y;
      }
    }
  });
}

function drawSpellShadow()
{
  if (!canvas.selectedSpell) return;

  let cell = map.getCellAtPos(mouseX, mouseY);
  if (cell) {
    drawCell(cell.x, cell.y, color('rgb(255, 0, 0)'), color('rgba(0, 0, 0, 0)'));
  }
}