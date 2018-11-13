import React from 'react';
import { Audio } from 'expo';

class SoundEffects extends React.Component {}

export const levelUpSound = async () => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require('../../assets/audio/levelup.wav'));
    await soundObject.setPositionAsync(0);
    await soundObject.playAsync();
  } catch (error) {}
};

export const gameOverSound = async () => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require('../../assets/audio/gameover.mp3'));
    await soundObject.setPositionAsync(0);
    await soundObject.playAsync();
  } catch (error) {}
};

export const buttonClick = async () => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require('../../assets/audio/buttonclick.wav'));
    await soundObject.setPositionAsync(0);
    await soundObject.playAsync();
  } catch (error) {}
};

export const buttonClickTwo = async () => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require('../../assets/audio/buttonclicktwo.mp3'));
    await soundObject.setPositionAsync(0);
    await soundObject.playAsync();
  } catch (error) {}
};

export const adRewardSound = async () => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require('../../assets/audio/adreward.wav'));
    await soundObject.setPositionAsync(0);
    await soundObject.playAsync();
  } catch (error) {}
};

export const mainLoop = async () => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require('../../assets/audio/mainloop.wav'));
    await soundObject.setPositionAsync(0);
    await soundObject.playAsync();
    await soundObject.setIsLoopingAsync(true);
  } catch (error) {}
};

export const mainMenuLoop = async () => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require('../../assets/audio/mainmenuloop.wav'));
    await soundObject.setPositionAsync(0);
    await soundObject.playAsync();
    await soundObject.setIsLoopingAsync(true);
  } catch (error) {}
};

export default SoundEffects;
