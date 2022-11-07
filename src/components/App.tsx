import * as React from "react";
import "./../assets/scss/App.scss";
import GameMap from "./GameMap";
import Stats from "./Stats";
import History from "./History";
import Spells from "./Spells";

const App = () => (
  <div className="app">
    <Stats />
    <GameMap cellNum={14} rowNum={40} />
    <History />
    <Spells />
  </div>
);

export default App;
