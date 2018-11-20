import teamData from '../lib/teamData';
import { getRef } from '../lib/refs';

// console.log(JSON.stringify(teamData));

// const continents = Object.keys(teamData);

// const countryScores = [];

// countryTotalTrophies = continents.forEach((data) => {
//   teamData[data].countries.forEach((team) => {
//     getRef()
//       .child(`World_Teams/${data}/${data}Teams/${team.countryName.split(' ').join('')}/Score`)
//       .on('value', (snap) => {
//         const score = snap.val();
//         countryScores.push(score);

//         const highScore = Math.max(...countryScores);
//         console.log('highscore', highScore);
//       });
//   });
// });

// const continents = Object.keys(teamData);

// let max = null;

// countryTotalScore = continents.forEach((data) => {
//   teamData[data].countries.forEach((team) => {
//     getRef()
//       .child(`World_Teams/${data}/${data}Teams/${team.countryName.split(' ').join('')}/Score`)
//       .on('value', (snap) => {
//         const score = snap.val();
//         if (!max || max.score < score) {
//           max = { score, data };
//         }
//       });
//   });
// });

// console.log({ max });
