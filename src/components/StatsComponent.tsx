import * as React from "react";
import "@assets/scss/Stats.scss";
import Game from "@classes/Game";
import { Trans } from "react-i18next";
import Reorder from 'react-reorder';
import MapData from "@json/Maps";
import SpellData from "@json/Spells";
import Entity from "@classes/Entity";
import Trap from "@classes/Trap";
import ConfigComponent from "./ConfigComponent";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
};

type State = {
  shareText: string;
  configObj: Entity | Trap;
  order: boolean;
};


class StatsComponent extends React.Component<Props, State>
{
  constructor(props: Props | Readonly<Props>) {
    super(props);

    this.state = {
      shareText: "",
      configObj: undefined,
      order: Game.options.order,
    };
  }

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

  onExport() {
    this.setState((state) => {
      return {
        ...state,
        shareText: Game.serialize()
      };
    });
  }

  onImport() {
    const str = prompt("Importer un réseau :");
    if (str !== null) {
      if (!Game.unserialize(str)) {
        alert("L'importation a échoué");
      }
    }
  }

  onClickMainChara() {
    this.openConfig(Game.mainCharacter);
  }

  selectContents(el: Node) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  openConfig(obj: Entity | Trap) {
    this.setState((state) => ({
      ...state,
      configObj: obj
    }));
  }

  closeConfig() {
    this.setState((state) => ({ ...state, configObj: undefined }));
    Game.setMovingEntity(null);
  }

  onOrderClick() {
    this.setState((state) => ({ ...state, order: !state.order }));
    Game.toggleOrder();
  }

  render() {
    if (this.state.configObj !== undefined) {
      return <div className="stats config">
        <button
          className="close"
          onClick={() => { this.closeConfig(); }}
        ></button>
        <ConfigComponent key={this.state.configObj.uuid} configObj={this.state.configObj}></ConfigComponent>
      </div>;
    }

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
      <div className="share">
        <button className="shareBtn" onClick={() => { this.onImport(); }}><Trans>Import</Trans></button>
        <button className="shareBtn" onClick={() => { this.onExport(); }}><Trans>Export</Trans></button>
        {this.state.shareText
          ? <div className="shareText" onClick={(e) => { this.selectContents(e.target as Node); }}>{this.state.shareText ?? ""}</div>
          : undefined
        }
      </div>
      <hr />
      {/* <ul className="entity-list">
        <li>one</li>
        <li>two</li>
        <li>three</li>
      </ul> */}
      <div className="main-character" onClick={() => { this.onClickMainChara(); }}><Trans>My character</Trans></div>
      <hr />
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
                <span><Trans>{trap.name}</Trans></span>
              </div>
            </li>
          );
        })}
      </Reorder>
      <div className={`btn-order ${this.state.order ? 'active' : ''}`} onClick={() => { this.onOrderClick(); }}><Trans>Ordre de pose</Trans></div>
      {help}
    </div>;
  }
}

export default StatsComponent;
