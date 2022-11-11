import Game from "@classes/Game";
import { CellType } from "@src/enums";
import * as React from "react";

type Props = {
  x: number;
  y: number;
  id: number;
  width: number;
  height: number;
};

class CellComponent extends React.Component<Props>
{
  constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  render() {
    let type: CellType = Game.getCell(this.props)?.type;
    const even: boolean = this.props.y % 2 === 0;
    let root = {
      x: this.props.x * this.props.width + (even ? 0 : this.props.width / 2),
      y: this.props.y * (this.props.height / 2)
    };
    let typeNames = {
      [CellType.Ground]: "ground",
      [CellType.Empty]: "empty",
      [CellType.Wall]: "wall"
    };

    let poly: Array<JSX.Element> = [];
    if (type === CellType.Wall) {
      poly.push(
        <polygon points={`
          ${root.x + this.props.width / 2},${root.y - this.props.height / 2}
          ${root.x + this.props.width},${root.y}
          ${root.x + this.props.width / 2},${root.y + this.props.height / 2}
          ${root.x},${root.y}
        `}></polygon>,
        <polygon points={`
          ${root.x},${root.y}
          ${root.x},${root.y + this.props.height / 2}
          ${root.x + this.props.width / 2},${root.y + this.props.height}
          ${root.x + this.props.width / 2},${root.y + this.props.height / 2}
        `}></polygon>,
        <polygon points={`
          ${root.x + this.props.width / 2},${root.y + this.props.height / 2}
          ${root.x + this.props.width / 2},${root.y + this.props.height}
          ${root.x + this.props.width},${root.y + this.props.height / 2}
          ${root.x + this.props.width},${root.y}
        `}></polygon>
      );
    } else {
      poly.push(<polygon points={`
        ${root.x + this.props.width / 2},${root.y}
        ${root.x + this.props.width},${root.y + this.props.height / 2}
        ${root.x + this.props.width / 2},${root.y + this.props.height}
        ${root.x},${root.y + this.props.height / 2}
      `}></polygon>);
    }

    poly.push(<text
      x={root.x + this.props.width / 2 - 0.5}
      y={root.y + this.props.height / 2 + 0.5}
      fontSize={1}
      stroke="black"
    >{this.props.x},{this.props.y}</text>);

    return <g className={`cell ${even ? 'even' : 'odd'} ${typeNames[type]}`}>{poly}</g>;
  }
}

export default CellComponent;