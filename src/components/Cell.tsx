import * as React from "react";

type Props = {
  x: number;
  y: number;
  id: number;
  width: number;
  height: number;
};

class Cell extends React.Component<Props>
{
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
    return <g fill={`#${even ? '8E8660' : '968E69'}`} stroke="#7E7961" stroke-width="0.1" className="cell">{poly}</g>;
  }
}

export default Cell;