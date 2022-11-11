import { CellBorders, Coordinates, TrapType } from "@src/enums";
import * as React from "react";

type Props = {
  x: number;
  y: number;
  id: number;
  width: number;
  height: number;
  type: TrapType;
  borders: CellBorders;
  image: string;
};

class TrapCellComponent extends React.Component<Props>
{
  constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  render() {
    const root: Coordinates = {
      x: this.props.x * this.props.width + (this.props.y % 2 === 0 ? 0 : this.props.width / 2),
      y: this.props.y * (this.props.height / 2)
    };
    let typeNames = {
      [TrapType.Tricky]: "tricky",
      [TrapType.Insidious]: "insidious",
      [TrapType.Miry]: "miry",
      [TrapType.Mass]: "mass",
      [TrapType.Drift]: "drift",
      [TrapType.Malevolent]: "malevolent",
      [TrapType.Fragmentation]: "fragmentation",
      [TrapType.Paralysing]: "paralysing",
      [TrapType.Repelling]: "repelling",
      [TrapType.Sickrat]: "sickrat",
      [TrapType.Lethal]: "lethal",
      [TrapType.Calamity]: "calamity",
      [TrapType.MassGrave]: "massgrave",
      [TrapType.Test]: "test-trap"
    };

    let components: Array<JSX.Element> = [];
    components.push(<polygon points={`
      ${root.x + this.props.width / 2},${root.y}
      ${root.x + this.props.width},${root.y + this.props.height / 2}
      ${root.x + this.props.width / 2},${root.y + this.props.height}
      ${root.x},${root.y + this.props.height / 2}
    `}></polygon>);
    if (this.props.image) {
      components.push(<image
        className="trap-image paralysing"
        href={this.props.image}
        x={root.x + this.props.width * 0.15}
        y={root.y + this.props.height * 0.15}
        width={this.props.width * 0.7}
        height={this.props.height * 0.7}
      />);
    }

    let path: string = "";
    if (this.props.borders & CellBorders.North) path += ` M ${root.x + this.props.width / 2},${root.y} L ${root.x + this.props.width},${root.y + this.props.height / 2} `;
    if (this.props.borders & CellBorders.East)  path += ` M ${root.x + this.props.width},${root.y + this.props.height / 2} L ${root.x + this.props.width / 2},${root.y + this.props.height} `;
    if (this.props.borders & CellBorders.South) path += ` M ${root.x + this.props.width / 2},${root.y + this.props.height} L ${root.x},${root.y + this.props.height / 2} `;
    if (this.props.borders & CellBorders.West)  path += ` M ${root.x},${root.y + this.props.height / 2} L ${root.x + this.props.width / 2},${root.y} `;

    components.push(<path d={path} />);

    return <g className={`trap ${typeNames[this.props.type]}`}>{components}</g>;
  }
}

export default TrapCellComponent;