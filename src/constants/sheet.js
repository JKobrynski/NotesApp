import {Dimensions} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const vh = HEIGHT / 100;
const vw = WIDTH / 100;

export {vh, vw};
