import * as React from "react";
import "./../assets/scss/GameMap.scss";
import Row from "./Row";

type Props = {
  cellNum: number;
  rowNum: number;
};

class GameMap extends React.Component<Props>
{
  render() {
    let rows = [];
    for (let i = 0; i < this.props.rowNum; i++) {
      rows.push(<Row y={i} cellNum={this.props.cellNum} />);
    }
    return <svg className="map" viewBox={`0 0 100 ${2900 / 41}`}>{rows}</svg>; // TODO make "2900 / 41" dynamic
  }
}

export default GameMap;
