import * as React from "react";
import "@assets/scss/Spells.scss";
import SpellComponent from "@components/SpellComponent";

type Props = {
};

class SpellsComponent extends React.Component<Props>
{
  render() {
    const spells: Array<SpellComponent> = [];

    return <div className="spells">
      
    </div>;
  }
}

export default SpellsComponent;
