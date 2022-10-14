function loadMap(graphics, mapID)
{
  mapData = loadJSON(`/assets/maps/${mapID}.json`, () => {
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
          drawCell(i, j, trap.trap.color.cell, trap.trap.color.stroke, '', null, borders);
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

function drawQuad(x, y, w, h, cellColor, strokeColor, graphics, borders)
{
  if (graphics) {
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
  } else {
    stroke(strokeColor);
    if (borders !== undefined) {
      if (borders & CELL_BORDER.NORTH) line(x + w,   y + h/2, x + w/2, y);
      if (borders & CELL_BORDER.EAST)  line(x + w/2, y + h,   x + w,   y + h/2);
      if (borders & CELL_BORDER.SOUTH) line(x,       y + h/2, x + w/2, y + h);
      if (borders & CELL_BORDER.WEST)  line(x + w/2, y,       x,       y + h/2);
      noStroke();
    }
    fill(cellColor);
    quad(x + w/2, y,
         x,       y + h/2,
         x + w/2, y + h,
         x + w,   y + h/2);
  }
}

function drawCell(x, y, cellColor, strokeColor, str, graphics, borders)
{
  if (y % 2 === 0) {
    posX = x * CELL_W;
    posY = (y/2) * CELL_H;
  } else {
    posX = x * CELL_W + CELL_W/2;
    posY = (y/2) * CELL_H;
  }

  drawQuad(posX, posY, CELL_W, CELL_H, cellColor, strokeColor, graphics, borders);

  if (str !== undefined) {
    if (graphics) {
      graphics.fill(0);
      graphics.textAlign('center', 'center');
      graphics.noStroke();
      graphics.text(str, posX + CELL_W/2, posY + CELL_H/2);
      graphics.stroke(0);
    } else {
      fill(0);
      textAlign('center', 'center');
      noStroke();
      text(str, posX + CELL_W/2, posY + CELL_H/2);
      stroke(0);
    }
  }
}

function drawWall(x, y, cellColor, strokeColor, str, graphics)
{
  if (y % 2 === 0) {
    posX = x * CELL_W;
    posY = (y/2) * CELL_H - CELL_H/2;
  } else {
    posX = x * CELL_W + CELL_W/2;
    posY = (y/2) * CELL_H - CELL_H/2;
  }

  drawQuad(posX, posY, CELL_W, CELL_H, cellColor, strokeColor, graphics);

  if (graphics) {
    graphics.quad(posX, posY + CELL_H/2, posX, posY + CELL_H, posX + CELL_W/2, posY + CELL_H*1.5, posX + CELL_W/2, posY + CELL_H);
    graphics.quad(posX + CELL_W/2, posY + CELL_H, posX + CELL_W/2, posY + CELL_H*1.5, posX + CELL_W, posY + CELL_H, posX + CELL_W, posY + CELL_H/2);
  } else {
    quad(posX, posY + CELL_H/2, posX, posY + CELL_H, posX + CELL_W/2, posY + CELL_H*1.5, posX + CELL_W/2, posY + CELL_H);
    quad(posX + CELL_W/2, posY + CELL_H, posX + CELL_W/2, posY + CELL_H*1.5, posX + CELL_W, posY + CELL_H, posX + CELL_W, posY + CELL_H/2);
  }
}

function getEntityPos(x, y) {
  if (y % 2 === 0) {
    posX = x * CELL_W + CELL_W/2;
    posY = (y/2) * CELL_H + CELL_H/2;
  } else {
    posX = x * CELL_W + CELL_W;
    posY = (y/2) * CELL_H + CELL_H/2;
  }

  return { x: posX, y: posY };
}

function drawEntities()
{
  map.entities.forEach(entity => {
    let pos = getEntityPos(entity.cell.x, entity.cell.y);
    let nextPos;
    if (entity.nextCell) { // Should only have 1 entity.nextCell defined in the entire array
      nextPos = getEntityPos(entity.nextCell.x, entity.nextCell.y);
      pos.x = pos.x * (1 - map.animCompletion) + nextPos.x * map.animCompletion;
      pos.y = pos.y * (1 - map.animCompletion) + nextPos.y * map.animCompletion;
      map.animCompletion += map.animSpeed / FRAMERATE;
    }

    strokeWeight(2.5);
    stroke(entity.team.color.stroke);
    fill(entity.team.color.cell);
    ellipse(pos.x, pos.y, CELL_W * 0.55, CELL_H * 0.55);
    strokeWeight(1);

    let width = CELL_W * entity.image.scale;
    let height = width * (entity.image.asset.height / entity.image.asset.width);

    image(
      entity.image.asset,
      pos.x + entity.image.offsetX - width/2,
      pos.y + entity.image.offsetY - height,
      width,
      height
    );
  });
}