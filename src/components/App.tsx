import * as React from "react";
import "./../assets/scss/App.scss";
import MapComponent from "@components/MapComponent";
import StatsComponent from "@components/StatsComponent";
import HistoryComponent from "@components/HistoryComponent";
import SpellsComponent from "@components/SpellsComponent";
import Consts from "@json/Consts.json";

const App = () => (
  <div className="app">
    <StatsComponent />
    <MapComponent cellNum={Consts.mapWidth} rowNum={Consts.mapHeight} />
    <HistoryComponent />
    <SpellsComponent />
  </div>
);

export default App;
