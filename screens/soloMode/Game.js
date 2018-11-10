import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import Files from './Files';
import { Font } from 'expo';
import { Group, Node, Sprite, SpriteView } from '../../GameKit';
import { withNavigation } from 'react-navigation';
import { THREE } from 'expo-three'
import "expo-asset-utils";
import "three";
import "react-native-console-time-polyfill";
import "text-encoding";
import "xmldom-qsa";
import styles from '../../src/styles/Styles';
import AdMobBannerComponent from '../components/AdMobBannerComponent';
import { buttonClick, gameOverSound, levelUpSound } from '../components/SoundEffects';

// const SPEED = 1.6;
const GRAVITY = 1100;
const FLAP = 320;
const SPAWN_RATE = 2600;
const OPENING = 120;
const GROUND_HEIGHT = 64;

const ncaa = require('../../assets/fonts/ncaa.otf');
const worldFlag = require('../../assets/images/flagimages/worldflag.png');

class Game extends React.Component {
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
        score: 0,
        scoreClone: 0,
        shot: 1,
        shots: 0,
        shotGoal: 3,
        shotGoalClone: 3,
        speed: 1.6,
        speedClone: 1.6,
        bestScore: 0
      };
  }

  async componentDidMount() {
    StatusBar.setHidden(true);
    Font.loadAsync({
      'ncaa': ncaa
    }).then(() => {
      this.setState({
        fontLoaded: true
      });
    });
  }

  async componentWillMount() {
    THREE.suppressExpoWarnings(true);

    // this.props.bestscore

    const totalPoints = await AsyncStorage.getItem(this.props.keyTP);
    if (totalPoints) {
      this.setState({
        bestScore: Number(totalPoints)
      });
    } else {
      await AsyncStorage.setItem(this.props.keyTP, '0')
      this.setState({
        bestScore: Number(totalPoints)
      });
    }

  }


  setupPlayer = async () => {
    const size = {
      width: 28 * this.scale,
      height: 28 * this.scale,
    };

    const sprite = new Sprite();
    await sprite.setup({
      image: worldFlag,
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
      image: Files.sprites.ground,
      size,
      name: 'ground',
    });

    const nodeB = await this.setupStaticNode({
      image: Files.sprites.ground,
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
      image: Files.sprites.bg,
      size,
      name: 'bg',
    });

    scene.add(bg);
  };

  setupPipe = async ({ key, y }) => {
    const size = { width: 52, height: 320 };

    const tbs = {
      top: Files.sprites.pipe_top,
      bottom: Files.sprites.pipe_bottom,
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
        height: size.height * scale,
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

    const pipeY =
      this.scene.size.height / 2 +
      (Math.random() - 0.5) * this.scene.size.height * 0.2;
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
      // ADD SOUND EFFECT HERE
    } else {
      this.reset();
    }
  };

  addScore = () => {
    this.setState({ 
      score: this.state.score += this.state.shot,
      shots: this.state.shots + 1,
    });
    this.updateShotValue();
    this.updateHighScore();
  };

  updateShotValue() {
    if (this.state.score >= this.state.shotGoal) {
      levelUpSound();
      this.setState({
        score: 0,
        shotValue: this.state.shotValue + 1,
        shotGoal: this.state.shotGoal * 2,
        speed: this.state.speed + .5,
        bestScore: this.state.bestScore + 1
      });
    }
  }

  updateHighScore() {
    if (this.state.score > this.state.bestScore) {
      this.setState({
        bestScore: Number(this.state.score)
      });
      AsyncStorage.setItem(this.props.keyTP, `${this.state.score}`)
    }
  }


  setGameOver = () => {
    gameOverSound();
    this.gameOver = true;

    clearInterval(this.pillarInterval);
  };

  reset = () => {
    this.gameStarted = false;
    this.gameOver = false;
    this.setState({ 
      score: 0,
      shotValue: 1,
      shotGoal: this.state.shotGoalClone,
      speed: this.state.speedClone
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
    this.props.navigation.replace('PreMainMenu');
  }

  renderScore = () => (
    <View style={styles.personalScore}>
      <View style={styles.playButtonContainerTimeGame}>

        <Text style={[styles.scoreMainTextTwo, { fontFamily: 'ncaa'}]}>
          Level {this.state.shotValue}
        </Text>
        <Text
          style={[styles.scoreMainText, { fontFamily: 'ncaa'}]}>
          {this.state.score} / {this.state.shotGoal}
        </Text>
        <Text style={[styles.scoreMainTextTwo, { fontFamily: 'ncaa'}]}>
          HighScore = {this.state.bestScore}
        </Text>
        
      </View>
    </View>
  );

  renderScoreTwo = () => (  
    <View style={styles.scoreBoxTwo}>
      <View style={{top: this.state.buttonPressed ? 2 : 0}}>
            <TouchableOpacity
                activeOpacity={10} 
                style={styles.playButtonContainer} 
                onPress={this.goBack} 
                onPressIn={() => this.setState({buttonPressed: true})}
                onPressOut={() => this.setState({buttonPressed: false})}>
                      <View style={styles.playButtonContainerTime}>
                        <Text style={[styles.scoreTextGame, { fontFamily: 'ncaa'}]}>BACK</Text>
                      </View>
              </TouchableOpacity>
        </View>          
    </View>
  );

  render() {
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
        {this.renderScoreTwo()}
        <AdMobBannerComponent />
      </View>
    );
  }
}

export default withNavigation(Game);