import forbiddenCity from "./forbiddenCity";
import summerPalace from "./summerPalace";
import templeOfHeaven from "./templeOfHeaven";
import fayuanTemple from "./fayuanTemple";
import mingTombs from "./mingTombs";
import dashilar from "./dashilar";
import beihaiPark from "./beihaiPark";
import greatWall from "./greatWall";

const landmarkRoutes = [
  ...forbiddenCity,
  ...summerPalace,
  ...templeOfHeaven,
  ...fayuanTemple,
  ...mingTombs,
  ...dashilar,
  ...beihaiPark,
  ...greatWall
];

export default landmarkRoutes.map(route => ({
  ...route,
  path: `/landmarks${route.path}`,
  meta: {
    ...route.meta,
    category: 'landmark'
  }
}));