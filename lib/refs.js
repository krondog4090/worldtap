import * as firebase from 'firebase';
export const getRef = () => firebase.database().ref();

const config = {
  apiKey: 'AIzaSyDqrxgtlKHSfBrcJtg-5ZCyQIB_aUC2U4M',
  authDomain: 'worldtapfinal.firebaseapp.com',
  databaseURL: 'https://worldtapfinal.firebaseio.com',
  projectId: 'worldtapfinal',
  storageBucket: '',
  messagingSenderId: '545372152981'
};
firebase.initializeApp(config);

export const getTeamRefs = (team, continentName) => {
  return {
    teamRefTrophy: getRef().child(
      `World_Teams/${continentName}/${continentName}Teams/${team}/TrophyCount`
    ),
    teamRef: getRef().child(`World_Teams/${continentName}/${continentName}Teams/${team}/Score`)
  };
};

export const getContinentRefs = (continentName) => {
  return {
    continentRef: getRef().child(`World_Teams/${continentName}/${continentName}Total/Score`),
    continentRefTrophy: getRef().child(
      `World_Teams/${continentName}/${continentName}Total/TrophyCount`
    )
  };
};

export const getContinentRef = (continentName) =>
  getRef().child(`World_Teams/${continentName}/${continentName}Total/Score`);

export const worldRef = getRef().child('World_Teams/World/WorldTotal');
export const urlMessageRef = getRef().child('World_Teams/ShareMessage/UrlMessage');
export const admobRewardAdRef = getRef().child('World_Teams/Admob/AdRewardID');
export const TrumpsWallTotalRef = getRef().child('World_Teams/TrumpsWall/TrumpsWallTotal');
