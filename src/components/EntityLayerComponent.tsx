import Cell from "@classes/Cell";
import Entity from "@classes/Entity";
import Game from "@classes/Game";
import * as React from "react";
import CellComponent from "@components/CellComponent";
import EntityComponent from "@components/EntityComponent";

type Props = {
  entities: Array<Entity | Cell>;
};

class EntityLayerComponent extends React.Component<Props>
{
  render() {
    let entities: Array<JSX.Element> = [];
    let cellWidth: number = 100 / (Game.width + 0.5);
    let cellHeight: number = cellWidth / 2;

    if (Game.mapLoaded) {
      for (let i: number = 0; i < this.props.entities.length; i++) {
        const entity = this.props.entities[i];
        if (entity instanceof Cell) {
          entities.push(<CellComponent
            x={entity.pos.x}
            y={entity.pos.y}
            id={entity.pos.y * Game.width + entity.pos.x}
            width={cellWidth}
            height={cellHeight}
          />);
        } else {
          entities.push(<EntityComponent
            x={entity.animPos?.x ?? entity.pos.x}
            y={entity.animPos?.y ?? entity.pos.y}
            data={entity.data}
            team={entity.team}
            ref={(component) => {entity.component = component}} 
          />);
        }
      }
    }
    return entities;
  }
}

export default EntityLayerComponent;
