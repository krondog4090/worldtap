import React from 'react';
import { Audio } from 'expo';


class SoundEffects extends React.Component {

}

export const levelUpSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../../assets/audio/levelup.wav'));
      await soundObject.setPositionAsync(0);
      await soundObject.playAsync();
    } catch (error) {
    }
  }

  export const gameOverSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../../assets/audio/gameover.mp3'));
      await soundObject.setPositionAsync(0);
      await soundObject.playAsync();
    } catch (error) {
    }
  }

export const buttonClick = async () => {
    const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(require('../../assets/audio/buttonclick.wav'));
        await soundObject.setPositionAsync(0);
        await soundObject.playAsync();
      } catch (error) {
      } 
  }

  export const buttonClickTwo = async () => {
    const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(require('../../assets/audio/buttonclicktwo.mp3'));
        await soundObject.setPositionAsync(0);
        await soundObject.playAsync();
      } catch (error) {
      } 
  }

  export const adRewardSound = async () => {
    const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(require('../../assets/audio/adreward.wav'));
        await soundObject.setPositionAsync(0);
        await soundObject.playAsync();
      } catch (error) {
      } 
  }



export default SoundEffects;

