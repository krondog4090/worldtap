import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    // zIndex: 0,
    alignItems: 'center'
  },
  menuContainer: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainTitle: {
    fontSize: 82
  },
  mainHeader: {
    flex: 1,
    top: 64
  },
  buttonLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 35,
    alignItems: 'center'
  },
  buttonLayoutTwo: {
    flexDirection: 'row'
  },
  playButtonContainer: {
    backgroundColor: 'lightgray',
    borderRadius: 7,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 1,
    // elevation: 6,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 7
    }
  },
  playButtonContainerFlagButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 50,
    alignItems: 'center',
    margin: 2,
    padding: 2,
    shadowColor: 'black',
    shadowOpacity: 1,
    // elevation: 6,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 7
    }
  },
  playButtonContainerTwo: {
    backgroundColor: '#0E69AA',
    borderRadius: 7,
    alignItems: 'center',
    margin: 1,
    padding: 1,
    shadowColor: 'gray',
    shadowOpacity: 1,
    // elevation: 6,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 7
    }
  },
  playButtonContainerTime: {
    flexDirection: 'row',
    borderRadius: 2,
    alignItems: 'center',
    shadowColor: 'black',
    padding: 4,
    shadowOpacity: 0.3,
    // elevation: 6,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 7
    }
  },
  gameMenu: {
    flexDirection: 'column',
    backgroundColor: '#6aaf6a',
    borderRadius: 5,
    shadowColor: 'black',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    shadowOpacity: 1,
    // elevation: 6,
    shadowRadius: 2,
    shadowOffset: {
      width: 3,
      height: 7
    }
  },
  playButtonContainerTimeGame: {
    borderRadius: 2,
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOpacity: 1,
    // elevation: 6,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 7
    }
  },
  buttonText: {
    fontSize: 30
  },
  buttonTextTwo: {
    fontSize: 22
  },
  arrowsFont: {
    flex: 0.2
  },
  container: {
    flex: 1,
    backgroundColor: '#787878'
  },
  flagImageMenu: {
    top: 15,
    height: 58,
    width: 58,
    resizeMode: 'contain'
  },
  topContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  titleContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#6aaf6a',
    borderWidth: 0.1,
    borderColor: 'black'
  },
  titleContainerMenu: {
    // flex: .2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#6aaf6a',
    borderWidth: 0.1,
    borderColor: 'black'
  },
  titleContainerMainMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderWidth: 0.1,
    borderColor: 'black'
  },
  underText: {
    fontSize: 16
  },
  eastContainer: {
    backgroundColor: '#0E69AA',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d6d7da'
  },
  eastText: {
    color: 'white',
    fontSize: 32
  },
  flagImage: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5
  },
  flagImageCount: {
    height: 35,
    width: 35,
    resizeMode: 'contain'
  },
  warningSign: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  flagImageShare: {
    height: 100,
    width: 100,
    resizeMode: 'contain'
  },
  countryImageShare: {
    height: 105,
    width: 105,
    resizeMode: 'contain'
  },
  containerIndex: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'rgb(46,46,48)'
  },
  trophyBox: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  flagBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eafeea',
    borderWidth: 2,
    borderColor: 'grey'
  },
  countryText: {
    fontWeight: 'bold',
    paddingLeft: 10,
    textAlign: 'auto',
    flex: 1,
    color: 'black',
    fontSize: 20
  },
  trophyText: {
    flex: 0.2,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 18
  },
  buttonIndex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  scoreText: {
    flex: 0.5,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 18
  },
  containerCont: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topScoreText: {
    fontSize: 22
  },
  personalScore: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 64,
    backgroundColor: 'transparent'
  },
  userTotalPoints: {
    textAlign: 'center',
    fontSize: 24,
    left: 0,
    right: 0,
    color: 'blue',
    backgroundColor: 'transparent'
  },
  scoreMainText: {
    textAlign: 'center',
    fontSize: 38,
    left: 0,
    right: 0,
    color: 'white',
    backgroundColor: 'transparent'
  },
  scoreMainTextTwo: {
    textAlign: 'center',
    fontSize: 24,
    left: 0,
    right: 0,
    color: 'black',
    backgroundColor: 'transparent'
  },
  scoreTextGame: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center'
  },
  textScore: {
    fontSize: 18,
    color: 'black'
  },
  scoreColumn: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  scoreBoxTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-around',
    left: 0,
    right: 0,
    bottom: 50
  },
  scoreBoxThree: {
    flexDirection: 'row',
    backgroundColor: 'red',
    position: 'absolute',
    justifyContent: 'space-around',
    left: 0,
    right: 0,
    bottom: 50
  },
  flexPadding: {
    flex: 0.1
  },
  containerShare: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#6aaf6a',
    justifyContent: 'center',
    alignItems: 'center'
  },
  underTextTwo: {
    fontSize: 20
  },
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 60,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // width,
    position: 'absolute',
    top: 30
  },
  offlineText: {
    color: '#fff',
    position: 'absolute',
    bottom: 5
  }
});

module.exports = styles;
