import Cell from "@classes/Cell";
import Entity from "@classes/Entity";
import Game from "@classes/Game";
import * as React from "react";
import CellComponent from "@components/CellComponent";
import EntityComponent from "@components/EntityComponent";
import { Coordinates } from "@src/enums";

type Props = {
  entities: Array<Entity | Cell>;
  startPoint: Coordinates;
};

class EntityLayerComponent extends React.Component<Props>
{
  render() {
    let entities: Array<JSX.Element> = [];
    let cellWidth: number = 100 / (Game.width + 0.5);
    let cellHeight: number = cellWidth / 2;

    for (let i: number = 0; i < this.props.entities.length; i++) {
      const entity = this.props.entities[i];
      if (entity instanceof Cell) {
        entities.push(<CellComponent
          x={entity.pos.x}
          y={entity.pos.y}
          id={entity.pos.y * Game.width + entity.pos.x}
          width={cellWidth}
          height={cellHeight}
          key={entity.uuid}
        />);
      } else {
        entities.push(<EntityComponent
          entity={entity}
          ref={(component) => {entity.component = component}}
          key={entity.uuid}
        />);
      }
    }

    if (this.props.startPoint) {
      const root: Coordinates = {
        x: (this.props.startPoint.x) * cellWidth + ((this.props.startPoint.y) % 2 === 0 ? 0 : cellWidth / 2),
        y: (this.props.startPoint.y) * cellHeight / 2
      };

      entities.push(<image
        className="entity-image"
        href="./assets/img/entities/Target.svg"
        x={root.x + cellWidth * 0.15}
        y={root.y + cellHeight * 0.15}
        width={cellWidth * 0.7}
        height={cellHeight * 0.7}
      />);
    }

    return entities;
  }
}

export default EntityLayerComponent;
