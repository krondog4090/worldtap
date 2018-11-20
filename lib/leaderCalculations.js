// import teamData from '../lib/teamData';
// import { getRef } from '../lib/refs';

// const continents = Object.keys(teamData);

// const gotScoresPromises = [];

// const countryTotalScores = continents
//   .map((continentName) => {
//     return teamData[continentName].countries.map((team) => {
//       return new Promise((resolve) => {
//         getRef()
//           .child(
//             `World_Teams/${continentName}/${continentName}Teams/${team.countryName
//               .split(' ')
//               .join('')}/Score`
//           )
//           .on('value', (snap) => {
//             const score = snap.val();
//             resolve({ countryName: team.countryName, score: score });
//           });
//       });
//     });
//   })
//   .flat();

// Promise.all(countryTotalScores).then((arrayValues) => {
//   let highestScore = -1;
//   let highestScoringCountry = null;
//   const highScore = arrayValues.reduce((a, b) => {
//     if (b.score > a.score) return b;
//     else return a;
//   });
//   console.log(highScore);
// });
