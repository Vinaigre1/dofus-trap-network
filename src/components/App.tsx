import * as React from "react";
import "@assets/scss/App.scss";
import "@assets/js/script.js";
import MapComponent from "@components/MapComponent";
import StatsComponent from "@components/StatsComponent";
import HistoryComponent from "@components/HistoryComponent";
import SpellsComponent from "@components/SpellsComponent";
import Consts from "@json/Consts.json";
import Game from "@classes/Game";

declare global { // Debug
  interface Window { Game: typeof Game; }
}

const App = () => (
  <div className="app">
    <StatsComponent />
    <MapComponent ref={(component) => { Game.mapComponent = component; window.Game = Game; }} cellNum={Consts.mapWidth} rowNum={Consts.mapHeight} />
    <HistoryComponent ref={(component) => { Game.historyComponent = component; }} />
    <SpellsComponent ref={(component) => { Game.spellsComponent = component; }} />
  </div>
);

export default App;
