import { CellBorders, Coordinates, TrapClasses, TrapType } from "@src/enums";
import * as React from "react";

type Props = {
  x: number;
  y: number;
  id: number;
  center: boolean;
  width: number;
  height: number;
  type: TrapType;
  borders: CellBorders;
  setHighlight: Function;
};

class TrapCellComponent extends React.Component<Props>
{
  constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  onMouseEnter() {
    this.props.setHighlight(true);
  }

  onMouseLeave() {
    this.props.setHighlight(false);
  }

  render() {
    const root: Coordinates = {
      x: this.props.x * this.props.width + (this.props.y % 2 === 0 ? 0 : this.props.width / 2),
      y: this.props.y * (this.props.height / 2)
    };

    let components: Array<JSX.Element> = [];
    components.push(<polygon key='polygon' points={`
      ${root.x + this.props.width / 2},${root.y}
      ${root.x + this.props.width},${root.y + this.props.height / 2}
      ${root.x + this.props.width / 2},${root.y + this.props.height}
      ${root.x},${root.y + this.props.height / 2}`}
      onMouseEnter={this.props.center ? () => { this.onMouseEnter(); } : undefined}
      onMouseLeave={this.props.center ? () => { this.onMouseLeave(); } : undefined}
    ></polygon>);

    let path: string = "";
    if (this.props.borders & CellBorders.North) path += ` M ${root.x + this.props.width / 2},${root.y} L ${root.x + this.props.width},${root.y + this.props.height / 2} `;
    if (this.props.borders & CellBorders.East)  path += ` M ${root.x + this.props.width},${root.y + this.props.height / 2} L ${root.x + this.props.width / 2},${root.y + this.props.height} `;
    if (this.props.borders & CellBorders.South) path += ` M ${root.x + this.props.width / 2},${root.y + this.props.height} L ${root.x},${root.y + this.props.height / 2} `;
    if (this.props.borders & CellBorders.West)  path += ` M ${root.x},${root.y + this.props.height / 2} L ${root.x + this.props.width / 2},${root.y} `;

    components.push(<path key='path' d={path} />);

    return <g className={`trap-cell ${this.props.center ? 'trap-center' : ''} ${TrapClasses[this.props.type]}`}>{components}</g>;
  }
}

export default TrapCellComponent;