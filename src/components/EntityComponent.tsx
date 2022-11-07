import * as React from "react";

type Props = {
  x: number;
  y: number;
  id: number;
  width: number;
  height: number;
};

class EntityComponent extends React.Component<Props>
{
  render() {
    return <div></div>;
  }
}

export default EntityComponent;