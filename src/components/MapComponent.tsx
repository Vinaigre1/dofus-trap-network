import * as React from "react";
import "./../assets/scss/Map.scss";
import RowComponent from "./RowComponent";

type Props = {
  cellNum: number;
  rowNum: number;
};

class MapComponent extends React.Component<Props>
{
  loadMap() {

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
