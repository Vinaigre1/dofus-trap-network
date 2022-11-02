class Entity {
  constructor(hp, cell, team, movable, image) {
    this.hp = hp;
    this.cell = cell;
    this.team = team;
    this.movable = movable;
    this.image = image;
    this.nextCell = null;
    this.canvasElement = null;
    this.initOffensiveStats();
    this.initDefensiveStats();
  }

  initOffensiveStats() {
    this.power;
    this.strength;
    this.intelligence;
    this.chance;
    this.agility;
    this.wisdom;
    this.neutralDamage;
    this.earthDamage;
    this.fireDamage;
    this.waterDamage;
    this.airDamage;
    this.pushDamage;
    this.damage;
    this.trapDamage;
    this.trapPower;
    this.spellDamage;
    this.distanceDamage;
    this.meleeDamage;
    this.apDamage;
    this.mpDamage;
  }

  initDefensiveStats() {
    this.neutralPerRes;
    this.earthPerRes;
    this.firePerRes;
    this.waterPerRes;
    this.airPerRes;
    this.distancePerRes;
    this.spellPerRes;
    this.neutralRes;
    this.earthRes;
    this.fireRes;
    this.waterRes;
    this.airRes;
    this.pushRes;
    this.apRes;
    this.mpRes;
  }

  *applyEffect(effect, caster) {
    let newCell;
    let direction;
    let value;
    let damage;
    switch (effect.type) {
      case EFFECT.PULL:
        if (!this.movable) break;
        direction = getDirection(effect.targetCell.id, effect.originCell.id);
        value = effect.min;
        if ([DIRECTION.NORTHEAST, DIRECTION.SOUTHEAST, DIRECTION.SOUTHWEST, DIRECTION.NORTHWEST].includes(direction)) {
          value = Math.ceil(value / 2);
        }
        for (let i = 0; i < value; i++) {
          newCell = moveInDirection(this.cell.x, this.cell.y, direction, 1);
          this.nextCell = map.getCell(newCell.x, newCell.y);
          if (this.nextCell && !map.getEntity(this.nextCell.id) && this.nextCell.type === CELL.WALKABLE) {
            yield; // yield for animation
            this.cell = this.nextCell;
          }
          this.nextCell = undefined;
          if (map.triggerTraps(this.cell.id)) break;
        }
        break;

      case EFFECT.PUSH:
        if (!this.movable) break;
        direction = getDirection(effect.originCell.id, effect.targetCell.id);
        value = effect.min;
        let diagonal = false;
        let diagonalCheck = true;
        if ([DIRECTION.NORTHEAST, DIRECTION.SOUTHEAST, DIRECTION.SOUTHWEST, DIRECTION.NORTHWEST].includes(direction)) {
          diagonal = true;
          value = Math.ceil(value / 2);
        }
        for (let i = 0; i < value; i++) {
          newCell = moveInDirection(this.cell.x, this.cell.y, direction, 1);
          this.nextCell = map.getCell(newCell.x, newCell.y);
          if (diagonal && !map.checkDiagonalMovement(this.cell, direction)) {
            diagonalCheck = false;
          }
          if (this.nextCell && !map.getEntity(this.nextCell.id) && this.nextCell.type === CELL.WALKABLE && diagonalCheck) {
            yield; // yield for animation
            this.cell = this.nextCell;
          } else if (this.nextCell) {
            map.addToActionStack(new Action(caster, this, new Effect(EFFECT.DAMAGE.PUSH, this.cell, this.nextCell, value - i)));
            i = value;
          } else {
            map.addToActionStack(new Action(caster, this, new Effect(EFFECT.DAMAGE.PUSH, null, null, value - i)));
            i = value;
          }
          this.nextCell = undefined;
          if (map.triggerTraps(this.cell.id)) break;
        }
        break;

      case EFFECT.DAMAGE.WATER:
        value = effect.max !== undefined ? randomInt(effect.min, effect.max) : effect.min;
        console.log('Apply water damage', value);
        break;

      case EFFECT.DAMAGE.FIRE:
        value = effect.max !== undefined ? randomInt(effect.min, effect.max) : effect.min;
        console.log('Apply fire damage', value);
        break;

      case EFFECT.DAMAGE.EARTH:
        value = effect.max !== undefined ? randomInt(effect.min, effect.max) : effect.min;
        console.log('Apply earth damage', value);
        break;

      case EFFECT.DAMAGE.AIR:
        value = effect.max !== undefined ? randomInt(effect.min, effect.max) : effect.min;
        console.log('Apply air damage', value);
        break;

      case EFFECT.DAMAGE.PUSH:
        value = effect.min;
        damage = value; // calculate dopou
        // Apply indirect push damage if there is an entity
        if (value > 0 && map.getEntity(effect.targetCell?.id)) {
          direction = getDirection(this.cell, effect.targetCell);
          newCell = moveInDirection(effect.targetCell.x, effect.targetCell.y, direction);
          map.addToActionStack(new Action(caster, map.getEntity(effect.targetCell.id), new Effect(EFFECT.DAMAGE.INDIRECT_PUSH, this.cell, map.getCell(newCell.x, newCell.y), value - 1, Math.floor(damage / 2))));
        }
        console.log('Apply push damage', value);
        break;

      case EFFECT.DAMAGE.INDIRECT_PUSH:
        value = effect.min;
        damage = effect.max;
        // Apply indirect push damage if there is an entity
        if (value > 0 && map.getEntity(effect.targetCell?.id)) {
          direction = getDirection(effect.originCell.id, effect.targetCell.id);
          newCell = moveInDirection(effect.targetCell.x, effect.targetCell.y, direction);
          map.addToActionStack(new Action(caster, map.getEntity(effect.targetCell.id), new Effect(EFFECT.DAMAGE.INDIRECT_PUSH, this.cell, map.getCell(newCell.x, newCell.y), value - 1, Math.floor(damage / 2))));
        }
        console.log('Apply indirect push damage', effect);
        break;

      case EFFECT.MP:
        value = effect.max !== undefined ? randomInt(effect.min, effect.max) : effect.min;
        console.log('Apply PM damage', value);
        break;

      case EFFECT.INSIDIOUS_GLYPH:
        console.log('Apply insidious glyph');
        break;

      case EFFECT.MIRY_HEAL:
        value = effect.max !== undefined ? randomInt(effect.min, effect.max) : effect.min;
        console.log('Apply heal from miry trap', value);
        break;

      case EFFECT.MALEVOLENT_BOOST:
        value = effect.max !== undefined ? randomInt(effect.min, effect.max) : effect.min;
        console.log('Apply boost to malevolent', value);
        break;

      default:
        break;
    }
  }
}