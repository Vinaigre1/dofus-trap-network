import * as React from "react";
import "@assets/scss/Stats.scss";
import Game from "@classes/Game";
import { Trans } from "react-i18next";

import _MapData from "@json/Maps.json";
import { MapDataType } from "@src/@types/MapDataType";
const MapData: MapDataType = _MapData as unknown as MapDataType;

class StatsComponent extends React.Component
{
  onSelectMap(value: string) {
    if (confirm("Attention, changer la map réinitialisera tous les pièges et entités !")) {
      Game.loadMap(value);
    }
  }

  render() {
    const options: Array<JSX.Element> = [];

    for (const id in MapData) {
      options.push(<option value={id}>
        {MapData[id].name_fr}
      </option>);
    }

    options.sort((a, b) => {
      // Puts the empty map on top
      if (a.props.value === "0") return -1;
      if (b.props.value === "0") return 1;

      return MapData[a.props.value].name_fr.localeCompare(MapData[b.props.value].name_fr);
    });

    return <div className="relative-height stats">
      <h3><Trans>Selected map</Trans>&nbsp;:</h3>
      <select onChange={(e) => { this.onSelectMap(e.target.value); }}>
        {options}
      </select>
      <hr />
      <h3>Important</h3>
        <p>Pour démarrer un réseau de pièges:</p>
        <p>1- Utiliser le sort &quot;Cibler&quot; sur la case où le réseau commence.</p>
        <p>2- Appuyer sur le bouton &quot;play&quot; ou &quot;step&quot;.</p>
        <p>3- Avant de poser de nouveaux pièges, appuyer sur &quot;stop&quot;.</p>
        <hr />
        <p>Cet outil est en plein développement et risque de contenir beaucoup de bugs, mais il sera mis à jour très régulièrement. (Je ne suis pas responsable si un ordinateur prend feu :eyes:)</p>
        <p>Je suis ouvert à toutes propositions pour l&apos;outil mais j&apos;ai déjà beaucoup d&apos;idées qui attendent d&apos;être implémentées.</p>
        <p>Fait par Vinaigre (Discord: Vinaigre#4083)</p>
        <p><a style={{ color: "yellow" }} href="https://github.com/Vinaigre1/dofus-trap-network">Le code est open-source !</a></p>
    </div>;
  }
}

export default StatsComponent;
