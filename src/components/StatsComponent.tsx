import * as React from "react";
import "@assets/scss/Stats.scss";
import Game from "@classes/Game";
import { Trans } from "react-i18next";
import Reorder from 'react-reorder';
import MapData from "@json/Maps";
import SpellData from "@json/Spells";

class StatsComponent extends React.Component
{
  onSelectMap(value: string) {
    if (confirm("Attention, changer la map réinitialisera tous les pièges et entités !")) {
      Game.loadMap(value);
    }
  }

  onReorderTraps(oldPos: number, newPos: number) {
    const oldIdx: number = Game.traps.length - oldPos - 1;
    const newIdx: number = Game.traps.length - newPos - 1;
    Game.reorderTraps(oldIdx, newIdx, true);
  }

  render() {
    const help: JSX.Element = <div><hr /><h3>Important</h3><p>Pour démarrer un réseau de pièges:</p><p>1- Utiliser le sort &quot;Cibler&quot; sur la case où le réseau commence.</p><p>2- Appuyer sur le bouton &quot;play&quot; ou &quot;step&quot;.</p><p>3- Avant de poser de nouveaux pièges, appuyer sur &quot;stop&quot;.</p><hr /><p>Cet outil est en plein développement et risque de contenir beaucoup de bugs, mais il sera mis à jour très régulièrement. (Je ne suis pas responsable si un ordinateur prend feu :eyes:)</p><p>Je suis ouvert à toutes propositions pour l&apos;outil mais j&apos;ai déjà beaucoup d&apos;idées qui attendent d&apos;être implémentées.</p><p>Fait par Vinaigre (Discord: Vinaigre#4083)</p><p><a style={{ color: "yellow" }} href="https://github.com/Vinaigre1/dofus-trap-network">Le code est open-source !</a></p></div>;
    const mapOptions: Array<JSX.Element> = [];

    for (const id in MapData) {
      mapOptions.push(<option value={id} key={id}>
        {MapData[id].name_fr}
      </option>);
    }

    mapOptions.sort((a, b) => {
      // Puts the empty map on top
      if (a.props.value === "0") return -1;
      if (b.props.value === "0") return 1;

      return MapData[a.props.value].name_fr.localeCompare(MapData[b.props.value].name_fr);
    });

    const traps = [];
    for (let i: number = Game.traps.length - 1; i >= 0; i--) {
      traps.push({
        img: Game.traps[i].getSpellIcon(),
        name: SpellData[Game.traps[i].spellId].name
      });
    }

    return <div className="relative-height stats">
      <h3><Trans>Selected map</Trans>&nbsp;:</h3>
      <select onChange={(e) => { this.onSelectMap(e.target.value); }}>
        {mapOptions}
      </select>
      <button className="share">Share</button>
      <ul className="entity-list">
        <li>one</li>
        <li>two</li>
        <li>three</li>
      </ul>
      <div className="main-character">main character</div>
      <Reorder
        className="trap-list"
        reorderId="trap-list"
        component="ul"
        lock="horizontal"
        touchHoldTime={500}
        onReorder={(_e: unknown, startIdx: number, endIdx: number) => { this.onReorderTraps(startIdx, endIdx); }}
        autoScroll={true}
      >
        {traps.map((trap, idx) => {
          return (
            <li key={idx}>
              <div className="trap-order">
                <span>{idx + 1}</span>
              </div>
              <div className="img-container">
                <img draggable={false} src={trap.img} alt="" />
              </div>
              <div className="trap-name">
                <span>{trap.name}</span>
              </div>
            </li>
          );
        })}
      </Reorder>
      <span>requires 12 turns to place</span>
      {help}
    </div>;
  }
}

export default StatsComponent;
