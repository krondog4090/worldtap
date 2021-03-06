import * as firebase from 'firebase';
export const getRef = () => firebase.database().ref();
import * as data from '../secrets.json';

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId
} = data.firebaseConfig;

const config = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId
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
