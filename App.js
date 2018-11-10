import { createStackNavigator } from 'react-navigation';

import PreMainMenu from './PreMainMenu';
import MainMenu from './MainMenu';
import WorldPreMenu from './screens/WorldPreMenu';

// Country
import CountryPreMenu from './screens/Country/CountryPreMenu';
import CountryMainGame from './screens/Country/CountryMainGame';

// TRUMPS WALL
import TrumpsWallPreMenu from './screens/TrumpsWall/TrumpsWallPreMenu';
import TrumpsWallMainGameAdd from './screens/TrumpsWall/TrumpsWallMainGameAdd';
import TrumpsWallMainGameSub from './screens/TrumpsWall/TrumpsWallMainGameSub';

// SOLO MODE
import SoloPreMenu from './screens/soloMode/SoloPreMenu';

export default createStackNavigator({
    PreMainMenu: {
        screen: PreMainMenu
    },
    MainMenu: {
        screen: MainMenu
    },
    WorldPreMenu : {
        screen: WorldPreMenu
    },
    // Country
    CountryPreMenu : {
        screen: CountryPreMenu
    },
    CountryMainGame: {
        screen: CountryMainGame
    },
    // TRUMPS WALL
    TrumpsWallPreMenu: {
        screen: TrumpsWallPreMenu
    },
    TrumpsWallMainGameAdd: {
        screen: TrumpsWallMainGameAdd
    },
    TrumpsWallMainGameSub: {
        screen: TrumpsWallMainGameSub
    },
    // SOLO MODE
    SoloPreMenu: {
        screen: SoloPreMenu
    }
});

