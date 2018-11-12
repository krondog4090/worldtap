import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, StatusBar, Image, Share, Alert } from 'react-native';
import TrumpsWallFiles from './TrumpsWallFiles';
import * as firebase from 'firebase';
import { Font, AdMobRewarded } from 'expo';
import { Group, Node, Sprite, SpriteView } from '../../GameKit';
import { withNavigation } from 'react-navigation';
import { THREE } from 'expo-three'
import "expo-asset-utils";
import "three";
import "react-native-console-time-polyfill";
import "text-encoding";
import "xmldom-qsa";
import styles from '../../src/styles/Styles';
import { numberWithCommas, secondsToHms } from '../../src/helpers/helpers';
import AdMobBannerComponent from '../components/AdMobBannerComponent';
import { buttonClick, levelUpSound, gameOverSound, adRewardSound } from '../components/SoundEffects';
import GameMenuScreen from '../components/GameMenuScreen';
import GameTopScore from '../components/GameTopScore';
import ButtonSmall from '../components/ButtonSmall';

const ncaa = require('../../assets/fonts/ncaa.otf');
const gamefont = require('../../assets/fonts/PressStart2P.ttf');

// const SPEED = 1.6;
const GRAVITY = 1100;
const FLAP = 320;
const SPAWN_RATE = 2600;
const OPENING = 120;
const GROUND_HEIGHT = 64;

class TrumpsWallGameAdd extends React.Component {
  _isMounted = false;
  scale = 1;
  pipes = new Group();
  deadPipeTops = [];
  deadPipeBottoms = [];
  gameStarted = false;
  gameOver = false;
  velocity = 0;

  constructor(props) {
    super(props);
  
    this.state = {
      fontLoaded: false,
      TrumpsWallTotalScore: [],
      worldTotalScore: [],
      teamScore: this.props.teamScore,
      countryName: this.props.countryName,
      teamImage: this.props.teamImage,
      teamRef: this.props.teamRef,
      teamData: this.props.teamData,
      teamRefTrophy: this.props.teamRefTrophy,
      teamScoreGoal: 50000000,
      cloneTeamScore: 0,
      score: 0,
      scoreClone: 0,
      shot: 1,
      shotGoal: 3,
      shotGoalClone: 3,
      shotValue: 1,
      missed: 0,
      cloneMissed: 0,
      teamTP: 0,
      speed: 1.6,
      speedClone: 1.6,
      isHidden: true,
      isNotHidden: false,
      adRewarded: false,
      adRewardAmount: 200,
      AdMobRewardAdID: '',
      timerOne: 300,
      timerOneClone: 300,
      startTimerOne: false,
      adOneDisable: false,
    };

  this.getTeamData = this.getTeamData.bind(this);
  this.getTrumpsWallData = this.getTrumpsWallData.bind(this);
  this.getWorldData = this.getWorldData.bind(this);
  this.getUrlMessageData = this.getUrlMessageData.bind(this);
  this.getAdMobRewardAdData = this.getAdMobRewardAdData.bind(this);

  this.getTrumpsWallRef = this.getRef().child('World_Teams/TrumpsWall/TrumpsWallTotal/Score');
  this.getWorldRef = this.getRef().child('World_Teams/World/WorldTotal/Score');
  this.getUrlMessageRef = this.getRef().child('World_Teams/ShareMessage/UrlMessage');
  this.getAdmobRewardAdRef = this.getRef().child('World_Teams/Admob/AdRewardID');

  this.getTeamRef = this.state.teamRef
  this.getTeamRefTrophy = this.state.teamRefTrophy
  this.getTeamRefScoreGoal = this.state.teamRefScoreGoal
  this._shareMessage = this._shareMessage.bind(this);
}


_shareMessage() {
  Share.share({
      ...Platform.select({
          ios: {
              message: `${this.state.countryName} needs more players on World Tap!`,
              url: `${this.state.urlMessage}`
          },
          android: {
              message: `${this.state.countryName} needs more players on World Tap!` + this.props.urlMessage
          }
      })
  }).then(({action}) => {
      if(action === Share.dismissedAction) console.log('Share dismissed');
      else console.log('Share successful');
      this.setState({
          sentSucess: this.state.sentSucess + 1
      })
  });
}

async componentDidMount() {
  this._isMounted = true;
  StatusBar.setHidden(true);

  if (this._isMounted) {
  const totalPoints = await AsyncStorage.getItem(this.props.keyTP);
  if (totalPoints) {
    this.setState({
      teamTP: Number(totalPoints)
    });
  } else {
    await AsyncStorage.setItem(this.props.keyTP, '0')
    this.setState({
      teamTP: Number(totalPoints)
    });
  }
    this.getTeamData(this.getTeamRef, this.getTeamRefTrophy);
    this.getTrumpsWallData(this.getTrumpsWallRef);
    this.getWorldData(this.getWorldRef);
    this.getUrlMessageData(this.getUrlMessageRef);
    this.getAdMobRewardAdData(this.getAdmobRewardAdRef);


    AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () => {
      this.adRewardAmount();
      this.setState({
        adRewarded: true,
        startTimerOne: true
      });
    });

    AdMobRewarded.addEventListener("rewardedVideoDidClose", () => {
      this.adClosed();
      this.setState({
        adRewarded: false
      });
    });

    Font.loadAsync({
      'ncaa': ncaa,
      'gamefont': gamefont
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
    });
  }
}

startTimer = () => {
  if(this._isMounted) {
  this.interval = setInterval(
    () => this.setState({
      adOneDisable: true,
      timer: -- this.state.timerOne
    }), 1000
  );
  }
}

componentDidUpdate() {
  if(this.state.timerOne === 1) {
    clearInterval(this.interval);
    this.timerOneFinished();
  }
}

componentWillMount() {
    THREE.suppressExpoWarnings(true);
}

componentWillUnmount() {
    this._isMounted = false;
    THREE.suppressExpoWarnings(false);
    // AdMobRewarded.removeAllListeners();
}

timerOneFinished() {
  this.setState({
    timerOne: this.state.timerOneClone,
    startTimerOne: false,
    adOneDisable: false
  });
}

getRef = () => {
  return firebase.database().ref();
}

getTeamData(getTeamRef, getTeamRefTrophy) {
  getTeamRef.on('value', (snap) => {
      this.setState({
          teamScore: Number(snap.val())
      });
  });
  getTeamRefTrophy.on('value', (snap) => {
      this.setState({
          trophyCount: Number(snap.val())
      });
  });
}

getTrumpsWallData(getTrumpsWallRef) {
  getTrumpsWallRef.on('value', (snap) => {
      this.setState({
          TrumpsWallTotalScore: Number(snap.val())
      });
  });
}

getWorldData(getWorldRef) {
  getWorldRef.on('value', (snap) => {
      this.setState({
          worldTotalScore: Number(snap.val())
      });
  });
}

getUrlMessageData(getUrlMessageRef) {
  getUrlMessageRef.on('value', (snap) => {
      this.setState({
          urlMessage: snap.val()
      });
  });
}

getAdMobRewardAdData(getAdmobRewardAdRef) {
  getAdmobRewardAdRef.on('value', (snap) => {
    this.setState({
      AdMobRewardAdID: snap.val()
    });
  });
}

setupPlayer = async () => {
    const size = {
      width: 28 * this.scale, // 36
      height: 28 * this.scale,
    };
    const sprite = new Sprite();
    await sprite.setup({
      image: this.state.teamImage,
      tilesHoriz: 1,
      tilesVert: 1,
      numTiles: 1,
      tileDispDuration: 75,
      size,
    });

    this.player = new Node({
      sprite,
    });
    this.scene.add(this.player);
};

setupGround = async () => {
    const { scene } = this;
    const size = {
      width: scene.size.width,
      height: scene.size.width * 0.333333333,
    };
    this.groundNode = new Group();

    const node = await this.setupStaticNode({
      image: TrumpsWallFiles.sprites.ground,
      size,
      name: 'ground',
    });

    const nodeB = await this.setupStaticNode({
      image: TrumpsWallFiles.sprites.ground,
      size,
      name: 'ground',
    });
    nodeB.x = size.width;

    this.groundNode.add(node);
    this.groundNode.add(nodeB);

    this.groundNode.position.y =
      (scene.size.height + (size.height - GROUND_HEIGHT)) * -0.5;

    this.groundNode.top = this.groundNode.position.y + size.height / 2;

    this.groundNode.position.z = 0.01;
    scene.add(this.groundNode);
};

setupBackground = async () => {
    const { scene } = this;
    const { size } = scene;
    const bg = await this.setupStaticNode({
      image: TrumpsWallFiles.sprites.bg,
      size,
      name: 'bg',
    });
    scene.add(bg);
};

setupPipe = async ({ key, y }) => {
    const size = { width: 52, height: 320 };

    const tbs = {
      top: TrumpsWallFiles.sprites.pipe_top,
      bottom: TrumpsWallFiles.sprites.pipe_bottom,
    };
    const pipe = await this.setupStaticNode({
      image: tbs[key],
      size,
      name: key,
    });
    pipe.y = y;

    return pipe;
};

setupStaticNode = async ({ image, size, name, scale }) => {
    scale = scale || this.scale;
    const sprite = new Sprite();

    await sprite.setup({
      image,
      size: {
        width: size.width * scale,
        height: size.height * scale
      },
    });

    const node = new Node({
      sprite,
    });
    node.name = name;
    return node;
};

spawnPipe = async (openPos, flipped) => {
    let pipeY;
    if (flipped) {
      pipeY = Math.floor(openPos - OPENING / 2 - 320);
    } else {
      pipeY = Math.floor(openPos + OPENING / 2);
    }
    let pipeKey = flipped ? 'bottom' : 'top';
    let pipe;

    const end = this.scene.bounds.right + 26;
    if (this.deadPipeTops.length > 0 && pipeKey === 'top') {
      pipe = this.deadPipeTops.pop().revive();
      pipe.reset(end, pipeY);
    } else if (this.deadPipeBottoms.length > 0 && pipeKey === 'bottom') {
      pipe = this.deadPipeBottoms.pop().revive();
      pipe.reset(end, pipeY);
    } else {
      pipe = await this.setupPipe({
        scene: this.scene,
        y: pipeY,
        key: pipeKey,
      });
      pipe.x = end;

      this.pipes.add(pipe);
    }
    pipe.velocity = -this.state.speed;
    return pipe;
};

spawnPipes = () => {
    this.pipes.forEachAlive(pipe => {
      if (pipe.size && pipe.x + pipe.size.width < this.scene.bounds.left) {
        if (pipe.name === 'top') {
          this.deadPipeTops.push(pipe.kill());
        }
        if (pipe.name === 'bottom') {
          this.deadPipeBottoms.push(pipe.kill());
        }
      }
    });

    const pipeY = this.scene.size.height / 2 + (Math.random() - 1) * this.scene.size.height * 0.2;
    this.spawnPipe(pipeY);
    this.spawnPipe(pipeY, true);
};

tap = () => {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.pillarInterval = setInterval(this.spawnPipes, SPAWN_RATE);
    }
    if (!this.gameOver) {
      this.velocity = FLAP;
    } else {
      this.reset();
    }
};

addScore = () => {
    if (this._isMounted) {
      this.setState({ 
         score: this.state.score += this.state.shot,
         teamScore: this.state.teamScore + 1,
         teamTP: this.state.teamTP + this.state.shotValue
        });
        this.updateTeamTP();
        this.updateTeamScores();
        this.updateShotValue();
        this.updateTrumpsWallScores();
        this.updateWorldScores();
        this.updateAfterTeamScoreGoal();
      }
};

adRewardAmount = () => {
    if (this._isMounted) {
      if (this.adRewarded = true) {
        this.updateTrumpsWallScoresAdReward();
        this.updateWorldScoresAdReward();
        this.updateTeamScoresAdReward();
        this.updateTeamTPAdReward();
        }
      }
}

adClosed = () => {
      this.setState({
        isHidden: !this.state.isHidden,
        isNotHidden: !this.state.isNotHidden 
      });
      adRewardSound();
      this.reset();
      this.startTimer();
}

updateTeamScores() {
  if (this._isMounted) {
    this.getTeamRef.once('value', (snap) => {
      this.getTeamRef.set(snap.val() + this.state.shotValue)
        });
  }
}

updateTeamScoresAdReward() {
  if (this._isMounted) {
    this.getTeamRef.once('value', (snap) => {
        this.getTeamRef.set(snap.val() + 200)
        });
  }
}

updateTrumpsWallScoresAdReward() {
  if (this._isMounted) {
    this.getTrumpsWallRef.once('value', (snap) => {
      this.getTrumpsWallRef.set(snap.val() + 200)
      });
  }
}

updateWorldScoresAdReward() {
  if (this._isMounted) {
  this.getWorldRef.once('value', (snap) => {
      this.getWorldRef.set(snap.val() + 200)
      });
  }
}

updateTeamTPAdReward() {
  if (this._isMounted) {
  if(this.state.teamTP === this.state.teamTP) {
    this.setState({
      teamTP: Number(this.state.teamTP + 200)
    });
    AsyncStorage.setItem(this.props.keyTP, `${this.state.teamTP}`);
    }
  }
}

updateTrumpsWallScores() {
    if (this._isMounted) {
      this.getTrumpsWallRef.once('value', (snap) => {
          this.getTrumpsWallRef.set(snap.val() + this.state.shotValue)
          });
    }
}

updateWorldScores() {
     if (this._isMounted) {
      this.getWorldRef.once('value', (snap) => {
          this.getWorldRef.set(snap.val() + this.state.shotValue)
          });
    }
}

updateTeamTP() {
    if (this._isMounted) {
      if(this.state.teamTP === this.state.teamTP) {
        this.setState({
          teamTP: Number(this.state.teamTP)
        });
        AsyncStorage.setItem(this.props.keyTP, `${this.state.teamTP}`);
    }
  }
}

updateShotValue() {
    if (this._isMounted) {
      if (this.state.score >= this.state.shotGoal) {
        levelUpSound();
        this.setState({
          score: 0,
          shotValue: this.state.shotValue + 1,
          shotGoal: this.state.shotGoal + 3,
          speed: this.state.speed + .5
        })
    }
  }
}

updateAfterTeamScoreGoal = () => {
    if (this._isMounted) {
      if(this.state.teamScore >= this.state.teamScoreGoal) {
        const newTrophyCount = this.state.trophyCount + 1;
        this.setState((previousState) => ({
          trophyCount: newTrophyCount,
          teamScore: previousState.cloneTeamScore
        }));
        this.getTeamRefTrophy.once('value', (snap) => {
          this.getTeamRefTrophy.set(snap.val()+ newTrophyCount)
          this.getTeamRef.set(snap.val()+ this.state.cloneTeamScore)
      });
    }
  }
}

setGameOver = () => {
    this.gameOver = true;
    clearInterval(this.pillarInterval);
    gameOverSound();
};

reset = () => {
    this.gameStarted = false;
    this.gameOver = false;
    this.setState({ 
      score: 0,
      shotValue: 1,
      shotGoal: this.state.shotGoalClone,
      speed: this.state.speedClone,
      adRewarded: this.state.adRewarded = false
    });
    this.player.reset(this.scene.size.width * -0.3, 0);
    this.player.angle = 0;
    this.pipes.removeAll();
};

onSetup = async ({ scene }) => {
    this.scene = scene;
    this.scene.add(this.pipes);
    await this.setupBackground();
    await this.setupGround();
    await this.setupPlayer();

    this.reset();
};

updateGame = delta => {
    if (this.gameStarted) {
      this.velocity -= GRAVITY * delta;
      const target = this.groundNode.top;

      if (!this.gameOver) {
        const playerBox = new THREE.Box3().setFromObject(this.player);

        this.pipes.forEachAlive(pipe => {
          pipe.x += pipe.velocity;
          const pipeBox = new THREE.Box3().setFromObject(pipe);

          if (pipeBox.intersectsBox(playerBox)) {
            this.setGameOver();
            gameOverSound();
          }
          if (
            pipe.name === 'bottom' &&
            !pipe.passed &&
            pipe.x < this.player.x
          ) {
            pipe.passed = true;
            this.addScore();
          }
        });

        this.player.angle = Math.min(
          Math.PI / 4,
          Math.max(-Math.PI / 2, (FLAP + this.velocity) / FLAP)
        );

        if (this.player.y <= target) {
          this.setGameOver();
        }
        this.player.update(delta);
      }

      if (this.player.y <= target) {
        this.player.angle = -Math.PI / 2;
        this.player.y = target;
        this.velocity = 0;
      } else {
        this.player.y += this.velocity * delta;
      }
    } else {
      this.player.update(delta);
      this.player.y = 8 * Math.cos(Date.now() / 200);
      this.player.angle = 0;
    }

    if (!this.gameOver) {
      this.groundNode.children.map((node, index) => {
        node.x -= this.state.speed;
        if (node.x < this.scene.size.width * -1) {
          let nextIndex = index + 1;
          if (nextIndex === this.groundNode.children.length) {
            nextIndex = 0;
          }
          const nextNode = this.groundNode.children[nextIndex];
          node.x = nextNode.x + this.scene.size.width - 1.55;
      }
    });
  }
};

goBack = () => {
    buttonClick();
    this.props.navigation.replace('WorldPreMenu');
}

toggleMenu = () => {
    buttonClick(); 
    this.setState({
      isHidden: !this.state.isHidden,
      isNotHidden: !this.state.isNotHidden 
    });
}

goAlert = () => {
    Alert.alert(
      `Sorry, gotta wait ${secondsToHms(this.state.timerOne)}!`
  )
}

goRewardedAd = async () => {
    buttonClick();
    if(this.state.adOneDisable == false) {
      await AdMobRewarded.requestAdAsync();
      await AdMobRewarded.showAdAsync();
    } else if (this.state.adOneDisable == true) {
      this.goAlert();
  }
}

renderScore = () => (
    <View style={styles.personalScore}>
      <View style={styles.playButtonContainerTimeGame}>
        <GameTopScore hide={this.state.isNotHidden}>

          <Text allowFontScaling={false}style={[styles.scoreMainTextTwo, { fontFamily: 'ncaa'}]}>
            Level {this.state.shotValue}
          </Text>

          <Text allowFontScaling={false}style={[styles.scoreMainText, { fontFamily: 'ncaa'}]}>
            {this.state.score} / {this.state.shotGoal}
          </Text>

          <Text allowFontScaling={false}style={[styles.userTotalPoints, { fontFamily: 'ncaa'}]}>
            {numberWithCommas(this.state.teamTP)}
          </Text>
        </GameTopScore>
      </View>
    </View>
);

renderMenu = () => (
    <GameMenuScreen hide={this.state.isHidden}>
          <View style={styles.gameMenu}>
            <View style={styles.playButtonContainerTime}>
                <Text allowFontScaling={false}style={[styles.buttonText, { fontFamily: 'gamefont', color: 'grey', textShadowColor: 'black', textShadowOffset: {width: 1, height: 2}, textShadowRadius: 1, textAlign: 'center', lineHeight: 35}]}>
                  GAME MENU
                </Text>
            </View>
            <View style={styles.playButtonContainerTime}>
              <Image style={styles.flagImageShare} source={this.state.teamImage} />
            </View>
            <View style={[styles.buttonLayoutTwo, {flexDirection: 'column'}]}>
                <View style={styles.scoreColumn}>
                  <View style={{top: this.state.buttonPressedThree ? 2 : 0}}>
                    <ButtonSmall 
                      onPress={this.goRewardedAd} 
                      onPressIn={() => this.setState({buttonPressedThree: true})} 
                      onPressOut={() => this.setState({buttonPressedThree: false})}
                      disabled={this.state.adOneDisable}>
                            <View style={styles.playButtonContainerTime}>
                              <Text allowFontScaling={false}style={[styles.buttonText, { fontFamily: 'gamefont', color: 'grey', textShadowColor: 'black', textShadowOffset: {width: 1, height: 2}, textShadowRadius: 1, fontSize: 14}]}>
                                BUFF ONE
                              </Text>
                            </View>
                    </ButtonSmall>
                  </View>
                  <View style={styles.playButtonContainerTime}>
                    <Text allowFontScaling={false}style={[styles.scoreTextGame, { fontFamily: 'ncaa'}]}>
                      GAIN 200 POINTS FOR {this.state.countryName}
                    </Text>
                  </View>
                  <Text allowFontScaling={false}style={[styles.scoreTextGame, { fontFamily: 'ncaa', fontSize: 16, color: 'red'}]}>
                    {secondsToHms(this.state.timerOne)}
                  </Text>

                  {/* <View style={{top: this.state.buttonPressedSix ? 2 : 0}}>
                    <ButtonSmall 
                      onPress={this.goRewardedAdTwo} 
                      onPressIn={() => this.setState({buttonPressedSix: true})} 
                      onPressOut={() => this.setState({buttonPressedSix: false})}
                      disabled={this.state.adTwoDisable}>
                            <View style={styles.playButtonContainerTime}>
                              <Text allowFontScaling={false}style={[styles.buttonText, { fontFamily: 'gamefont', color: 'grey', textShadowColor: 'black', textShadowOffset: {width: 1, height: 2}, textShadowRadius: 1, fontSize: 14}]}>
                                BUFF TWO
                              </Text>
                            </View>
                    </ButtonSmall>
                  </View>
                  <View style={styles.playButtonContainerTime}>
                    <Text allowFontScaling={false}style={[styles.scoreTextGame, { fontFamily: 'ncaa'}]}>
                      30 Seconds x2 MULTIPLIER 
                    </Text>
                  </View>
                  <Text allowFontScaling={false}style={[styles.scoreTextGame, { fontFamily: 'ncaa', fontSize: 16, color: 'red'}]}>
                    {secondsToHms(this.state.timerTwo)}
                  </Text> */}
                </View>

                <View style={styles.scoreColumn}>
                  <View style={{top: this.state.buttonPressedFour ? 2 : 0}}>
                    <ButtonSmall 
                      onPress={this._shareMessage} 
                      onPressIn={() => this.setState({buttonPressedFour: true})} 
                      onPressOut={() => this.setState({buttonPressedFour: false})}>
                              <View style={styles.playButtonContainerTime}>
                                <Text allowFontScaling={false}style={[styles.buttonText, { fontFamily: 'gamefont', color: 'grey', textShadowColor: 'black', textShadowOffset: {width: 1, height: 2}, textShadowRadius: 1, fontSize: 14, textAlign: 'center'}]}>
                                  SHARE WITH FRIENDS
                                </Text>
                              </View>
                    </ButtonSmall>
                  </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.buttonLayoutTwo}>
                        <View style={{top: this.state.buttonPressedFive ? 2 : 0}}>
                          <ButtonSmall 
                            onPress={this.toggleMenu} 
                            onPressIn={() => this.setState({buttonPressedFive: true})} 
                            onPressOut={() => this.setState({buttonPressedFive: false})}>
                            <View style={styles.playButtonContainerTime}>
                              <Text allowFontScaling={false}style={[styles.scoreTextGame, { fontFamily: 'ncaa'}]}>
                                CLOSE MENU
                              </Text>
                            </View>
                          </ButtonSmall>
                        </View>
                      </View>
                    </View>
              </View>
      </View>
      </View>
  </GameMenuScreen>
  )

  renderScoreTwo = () => (
    <View style={styles.scoreBoxTwo}>
      <View style={styles.scoreColumn}>
        <Text allowFontScaling={false}style={[styles.scoreTextGame, { fontFamily: 'ncaa'}]}>
          {this.props.countryName}
        </Text>
        <Text allowFontScaling={false}style={[styles.scoreTextGame, { fontFamily: 'ncaa'}]}>
          {numberWithCommas(this.state.teamScore)} / {numberWithCommas(this.state.teamScoreGoal)}
        </Text>         
      <View style={[styles.buttonLayoutTwo, {flexDirection: 'row'}]}>

      <View style={{top: this.state.buttonPressed ? 2 : 0}}>
          <ButtonSmall 
            onPress={this.goBack} 
            onPressIn={() => this.setState({buttonPressed: true})} 
            onPressOut={() => this.setState({buttonPressed: false})}>
            <View style={styles.playButtonContainerTime}>
              <Text allowFontScaling={false}style={[styles.scoreTextGame, { fontFamily: 'ncaa'}]}>
                BACK 
              </Text>
            </View>
          </ButtonSmall>
      </View>

      <View style={{top: this.state.buttonPressedTwo ? 2 : 0}}>
          <ButtonSmall 
            onPress={this.toggleMenu} 
            onPressIn={() => this.setState({buttonPressedTwo: true})} 
            onPressOut={() => this.setState({buttonPressedTwo: false})}
            hide={this.state.isNotHidden}>
            <View style={styles.playButtonContainerTime}>
              <Text allowFontScaling={false}style={[styles.scoreTextGame, { fontFamily: 'ncaa'}]}>
                Menu
              </Text>
            </View>
          </ButtonSmall>
        </View>
      </View>
    </View>
  </View>
  );

  render() {
    const ADBANNER_ID = `${this.state.AdMobRewardAdID}`
    AdMobRewarded.setAdUnitID(ADBANNER_ID);
    console.disableYellowBox = true;
    return (
      <View style={StyleSheet.absoluteFill}>
        <SpriteView
          touchDown={() => this.tap()}
          touchMoved={() => {}}
          touchUp={() => {}}
          update={this.updateGame}
          onSetup={this.onSetup}
        />
        {this.renderScore()}
        {this.renderMenu()}
        {this.renderScoreTwo()}
        <AdMobBannerComponent />
      </View>
    );
  }
}

export default withNavigation(TrumpsWallGameAdd);