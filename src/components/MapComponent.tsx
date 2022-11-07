import Game from "@classes/Game";
import * as React from "react";
import "./../assets/scss/Map.scss";
import RowComponent from "./RowComponent";

type Props = {
  cellNum: number;
  rowNum: number;
};

type States = {
  game: Game;
}

class MapComponent extends React.Component<Props>
{
  constructor(props: Props | Readonly<Props>) {
    super(props);

    this.state = {
      game: new Game("empty")
    };
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.props.rowNum; i++) {
      rows.push(<RowComponent y={i} cellNum={this.props.cellNum} />);
    }
    let w = this.props.cellNum * 2 + (this.props.rowNum > 1 ? 1 : 0);
    let h = (this.props.rowNum + 1) / 2;
    let height = h / w * 100;
    return <svg className="map" viewBox={`0 0 100 ${height}`}>{rows}</svg>;
  }
}

export default MapComponent;
