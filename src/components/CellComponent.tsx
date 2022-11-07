import { CellType } from "@src/enums";
import * as React from "react";

type Props = {
  x: number;
  y: number;
  id: number;
  width: number;
  height: number;
};

type States = {
  type: CellType;
};

class CellComponent extends React.Component<Props, States>
{
  constructor(props: Props | Readonly<Props>) {
    super(props);

    this.state = {
      type: CellType.Ground
    };
  }

  render() {
    const even = this.props.y % 2 === 0;
    let root = {
      x: this.props.x * this.props.width + (even ? 0 : this.props.width / 2),
      y: this.props.y * (this.props.height / 2)
    };
    let poly = [
      <polygon points={`
        ${root.x + this.props.width / 2},${root.y}
        ${root.x + this.props.width},${root.y + this.props.height / 2}
        ${root.x + this.props.width / 2},${root.y + this.props.height}
        ${root.x},${root.y + this.props.height / 2}
      `}></polygon>
    ];
    let types = {
      [CellType.Ground]: "ground",
      [CellType.Empty]: "empty",
      [CellType.Wall]: "wall"
    };
    return <g className={`cell ${even ? 'even' : 'odd'} ${types[this.state.type]}`}>{poly}</g>;
  }
}

export default CellComponent;