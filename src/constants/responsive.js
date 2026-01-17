// import {Dimensions} from 'react-native';

// const {width, height} = Dimensions.get('window');
// const BASE_WIDTH = 375;
// const BASE_HEIGHT = 812;
// const scaleSize = size => (width / BASE_WIDTH) * size;
// const verticalScaleSize = size => (height / BASE_HEIGHT) * size;
// const responsiveFontSize = size => {
//   const scaleFactor = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
//   return Math.round(size * scaleFactor);
// };

// const responsive = {
//   width: size => scaleSize(size),
//   height: size => verticalScaleSize(size),
//   fontSize: size => responsiveFontSize(size),
//   margin: size => scaleSize(size),
//   padding: size => scaleSize(size),
//   borderRadius: size => scaleSize(size),
//   paddingBottom: size => scaleSize(size),
//   paddingHorizontal: size => scaleSize(size),
//   marginBottom: size => scaleSize(size),
//   bottom: size => scaleSize(size),
//   gap: size => scaleSize(size),
//   marginVertical: size => scaleSize(size),
//   marginHorizontal: size => scaleSize(size),
//   marginTop: size => scaleSize(size),
  
// };

// export default responsive;


import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const scaleSize = size => (width / BASE_WIDTH) * size;
const verticalScaleSize = size => (height / BASE_HEIGHT) * size;

const responsiveFontSize = size => {
  const scaleFactor = Math.min(
    width / BASE_WIDTH,
    height / BASE_HEIGHT,
  );
  return Math.round(size * scaleFactor);
};

const responsive = {
  width: size => scaleSize(size),
  height: size => verticalScaleSize(size),

  fontSize: size => responsiveFontSize(size),

  padding: size => scaleSize(size),
  paddingHorizontal: size => scaleSize(size),
  paddingBottom: size => verticalScaleSize(size),

  margin: size => scaleSize(size),
  marginHorizontal: size => scaleSize(size),
  marginVertical: size => verticalScaleSize(size),
  marginTop: size => verticalScaleSize(size),
  marginBottom: size => verticalScaleSize(size),

  borderRadius: size => scaleSize(size),

  bottom: size => verticalScaleSize(size),

  gap: size => scaleSize(size),
};

export default responsive;
