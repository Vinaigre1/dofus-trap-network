import * as React from "react";
import "./../assets/scss/App.scss";
import MapComponent from "@components/MapComponent";
import StatsComponent from "@components/StatsComponent";
import HistoryComponent from "@components/HistoryComponent";
import SpellsComponent from "@components/SpellsComponent";
import Consts from "@json/Consts.json";

declare global { // TODO: move this in a .d.ts file
  interface Window { mapComponent: MapComponent; }
}

const App = () => (
  <div className="app">
    <StatsComponent />
    <MapComponent ref={(component) => {window.mapComponent = component}} cellNum={Consts.mapWidth} rowNum={Consts.mapHeight} />
    <HistoryComponent />
    <SpellsComponent />
  </div>
);

export default App;
