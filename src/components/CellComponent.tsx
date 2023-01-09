import Game from "@classes/Game";
import { CellType, Coordinates } from "@src/enums";
import * as React from "react";

type Props = {
  x: number;
  y: number;
  id: number;
  width: number;
  height: number;
  onMouseEnter: (pos: Coordinates) => void;
  onMouseLeave: (pos: Coordinates) => void;
};

class CellComponent extends React.Component<Props>
{
  constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  onClick() {
    Game.onCellClick({ x: this.props.x, y: this.props.y });
  }

  onMouseEnter() {
    this.props.onMouseEnter({ x: this.props.x, y: this.props.y });
  }

  onMouseLeave() {
    this.props.onMouseLeave({ x: this.props.x, y: this.props.y });
  }

  render() {
    const type: CellType = Game.getCell(this.props)?.type;
    const even: boolean = this.props.y % 2 === 0;
    const root = {
      x: this.props.x * this.props.width + (even ? 0 : this.props.width / 2),
      y: this.props.y * (this.props.height / 2)
    };
    const typeClasses = {
      [CellType.Ground]: "ground",
      [CellType.Empty]: "empty",
      [CellType.Wall]: "wall"
    };

    const poly: Array<JSX.Element> = [];
    if (type === CellType.Wall) {
      poly.push(
        <polygon key='polygon-1' points={`
          ${root.x + this.props.width / 2},${root.y - this.props.height / 2}
          ${root.x + this.props.width},${root.y}
          ${root.x + this.props.width / 2},${root.y + this.props.height / 2}
          ${root.x},${root.y}
        `}></polygon>,
        <polygon key='polygon-2' points={`
          ${root.x},${root.y}
          ${root.x},${root.y + this.props.height / 2}
          ${root.x + this.props.width / 2},${root.y + this.props.height}
          ${root.x + this.props.width / 2},${root.y + this.props.height / 2}
        `}></polygon>,
        <polygon key='polygon-3' points={`
          ${root.x + this.props.width / 2},${root.y + this.props.height / 2}
          ${root.x + this.props.width / 2},${root.y + this.props.height}
          ${root.x + this.props.width},${root.y + this.props.height / 2}
          ${root.x + this.props.width},${root.y}
        `}></polygon>
      );
    } else {
      poly.push(<polygon key='polygon-4' points={`
        ${root.x + this.props.width / 2},${root.y}
        ${root.x + this.props.width},${root.y + this.props.height / 2}
        ${root.x + this.props.width / 2},${root.y + this.props.height}
        ${root.x},${root.y + this.props.height / 2}
      `}
      ></polygon>);
    }

    poly.push(<polygon className='base' key='base' points={`
      ${root.x + this.props.width / 2},${root.y}
      ${root.x + this.props.width},${root.y + this.props.height / 2}
      ${root.x + this.props.width / 2},${root.y + this.props.height}
      ${root.x},${root.y + this.props.height / 2}
    `}
      onMouseEnter={() => { this.onMouseEnter(); }}
      onMouseLeave={() => { this.onMouseLeave(); }}
      onClick={() => { this.onClick(); }}
    ></polygon>);

    // poly.push(<text key='text'
    //   x={root.x + this.props.width / 2 - 0.5}
    //   y={root.y + this.props.height / 2 + 0.5}
    //   fontSize={1}
    //   stroke="black"
    // >{this.props.x},{this.props.y}</text>);

    return <g className={`cell ${even ? 'even' : 'odd'} ${typeClasses[type]}`}>{poly}</g>;
  }
}

export default CellComponent;