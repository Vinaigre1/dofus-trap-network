import * as React from "react";
import "@assets/scss/Spells.scss";
import SpellComponent from "@components/SpellComponent";
import SpellData from "@json/Spells";
import { Spell } from "@src/@types/SpellDataType";
import { SpellCategory } from "@src/enums";
import Game from "@classes/Game";


// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
};

type States = {
  selectedSpell: Spell;
  play: boolean;
  leukide: boolean;
};

class SpellsComponent extends React.Component<Props, States>
{
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedSpell: undefined,
      play: false,
      leukide: false
    };
  }

  onClick(spell: Spell) {
    if (this.state.selectedSpell === spell) {
      spell = undefined;
    }
    Game.selectSpell(spell);
    this.setState((state) => ({ ...state, selectedSpell: spell }));
  }

  onPlay() {
    this.setPlay(true);
    Game.run();
  }

  onPause() {
    this.setPlay(false);
    Game.pause();
  }

  onStep() {
    this.setPlay(false);
    Game.runOne();
  }

  onStop() {
    this.setPlay(false);
    Game.resetAll();
  }

  onLeukide() {
    if (Game.isRunning) return;

    const active = Game.toggleLeukide();
    this.setState((state) => ({ ...state, leukide: active }));
  }

  setPlay(play: boolean) {
    this.setState((state) => ({ ...state, play }));
  }

  render() {
    const spellCategories: Array<JSX.Element> = [];

    const categoryOrder: Array<SpellCategory> = [
      SpellCategory.AirTrap,
      SpellCategory.FireTrap,
      SpellCategory.EarthTrap,
      SpellCategory.WaterTrap,
      SpellCategory.MalusTrap,
      SpellCategory.Entity,
      SpellCategory.Other,
      SpellCategory.Action
    ];

    for (const cat of categoryOrder) {
      const spells: Array<JSX.Element> = [];
      for (const type in SpellData) {
        if (SpellData[type].category !== cat) continue;

        spells.push(<SpellComponent
          key={`spell-${type}`}
          spell={SpellData[type]}
          onClick={(spell: Spell) => { this.onClick(spell); }}
          selected={this.state.selectedSpell?.name === SpellData[type].name}
        />);
      }
      spellCategories.push(
        <div className="spell-category">
          {spells}
        </div>
      );
    }

    return <div className="spells">
      <div className="spells-options">
        <div className={`btn btn-leukide ${this.state.leukide ? 'active' : ''}`} onClick={() => { this.onLeukide(); }}>
          <img className="img-leukide" src="./assets/img/other/leukide.png" alt="leukide" />
        </div>
      </div>
      {spellCategories}
      <div className="controls">
        <button className={this.state.play ? "pause" : "play"} onClick={() => { this.state.play ? this.onPause() : this.onPlay(); }}>
          <img className="img-play" src="./assets/img/other/play.png" alt="play" draggable="false" />
          <img className="img-pause" src="./assets/img/other/pause.png" alt="pause" draggable="false" />
        </button>
        <button className="step" onClick={() => { this.onStep(); }}>
          <img className="img-step" src="./assets/img/other/step.png" alt="step" draggable="false" />
        </button>
        <button className="stop" onClick={() => { this.onStop(); }}>
          <img className="img-stop" src="./assets/img/other/stop.png"  alt="stop" draggable="false" />
        </button>
      </div>
    </div>;
  }
}

export default SpellsComponent;
