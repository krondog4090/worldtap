// import * as THREE from "three"; // 0.88.0
// import ExpoTHREE from "expo-three"; // 2.0.2
import ExpoTHREE, { THREE } from 'expo-three'
import TextureAnimator from "./TextureAnimator";

import "expo-asset-utils"; // 0.0.0
import "three"; // Supported builtin module
import "react-native-console-time-polyfill"; // 0.0.6
import "text-encoding"; // 0.6.4
import "xmldom-qsa"; // 1.0.3

export default class Sprite extends THREE.Mesh {
  setup = async ({
    image,
    tilesHoriz,
    tilesVert,
    numTiles,
    tileDispDuration,
    filter = THREE.NearestFilter,
    size,
    position = {},
    ...props
  }) => {
    // Save props
    let _props = {
      image,
      tilesHoriz,
      tilesVert,
      numTiles,
      tileDispDuration,
      filter,
      size,
      position,
      ...props
    };

    // THREE.suppressExpoWarnings();

    Object.keys(_props).map(v => (this[`__${v}`] = _props[v]));

    // this._texture = await new ExpoTHREE.createTextureAsync({
    //   asset: Expo.Asset.fromModule(image)
    // });
    this._texture = await ExpoTHREE.loadAsync(image);
    /// Preserve Pixel Texture - no smoothing
    this._texture.magFilter = this._texture.minFilter = filter;

    this.animation = new TextureAnimator(
      this._texture,
      tilesHoriz,
      tilesVert,
      numTiles,
      tileDispDuration
    ); // texture, #horiz, #vert, #total, duration.
    this.material = new THREE.MeshBasicMaterial({
      map: this._texture,
      transparent: true
    });
    this.geometry = new THREE.PlaneGeometry(size.width, size.height, 1, 1);
    this.position.x = position.x || 0;
    this.position.y = position.y || 0;
  };
}