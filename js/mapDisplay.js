function loadMap(graphics, mapID)
{
  mapData = loadJSON(`/assets/maps/${mapID}.json`, () => {
    map.initMap(mapData.Data[0].Cells);
    for (let i = 0; i < MAP_HEIGHT; i++) {
      for (let j = 0; j < MAP_WIDTH; j++) {
        switch (map.getCell(j, i).type) {
          case CELL.WALKABLE:
            drawCell(j, i, (i % 2 === 0 ? color('#8E8660') : color('#968E69')), color('#7E7961'), i * MAP_WIDTH + j, graphics);
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
  for (let i = 0; i < SIDEBAR_WIDTH; i++) {
    for (let j = 0; j < 6; j++) {
      // graphics.image(img[14].asset, i * img[14].asset.width, j * img[14].asset.height);
      let x = i * img[14].asset.width + 3;
      let y = j * img[14].asset.height + 3;
      let w = img[14].asset.width - 6;
      let h = img[14].asset.height - 6;
      graphics.image(spells[j + i * 6].icon.asset, x, y, w, h);
      sidebar.addSpell(new Spell(x, y, w, h, () => {
        canvas.selectSpell(spells[j + i * 6]);
      }));
    }
  }
  canvas.addClickable(sidebar);
}

function drawTraps()
{
  for (let i = 0; i < MAP_WIDTH; i++) {
    for (let j = 0; j < MAP_HEIGHT; j++) {
      map.traps.forEach(trap => {
        if (trap.isInTrap(i, j)) {
          strokeWeight(4);
          drawCell(i, j, trap.trap.color.cell, trap.trap.color.stroke);
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

function drawQuad(x, y, w, h, cellColor, strokeColor, graphics)
{
  if (graphics) {
    graphics.stroke(strokeColor);
    graphics.fill(cellColor);
    graphics.quad(x + w/2, y,
         x,       y + h/2,
         x + w/2, y + h,
         x + w,   y + h/2);
  } else {
    stroke(strokeColor);
    fill(cellColor);
    quad(x + w/2, y,
         x,       y + h/2,
         x + w/2, y + h,
         x + w,   y + h/2);
  }
}

function drawCell(x, y, cellColor, strokeColor, str, graphics)
{
  if (y % 2 === 0) {
    posX = x * CELL_W;
    posY = (y/2) * CELL_H;
  } else {
    posX = x * CELL_W + CELL_W/2;
    posY = (y/2) * CELL_H;
  }

  drawQuad(posX, posY, CELL_W, CELL_H, cellColor, strokeColor, graphics);

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

    strokeWeight(4);
    stroke(entity.team.color.stroke);
    fill(entity.team.color.cell);
    ellipse(pos.x, pos.y, CELL_W * 0.7, CELL_H * 0.7);
    strokeWeight(1);

    let width = CELL_W;
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