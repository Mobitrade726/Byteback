// import {StyleSheet} from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   backButton: {
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     borderRadius: 25,
//     width: 40,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     marginTop:12,
//   },
//   title: {
//     fontSize: 50,
//     fontWeight: 'bold',
//     color: '#3c8c4d',
//     marginBottom: 40,
//   },
//   input: {
//     height: 55,
//     borderColor: '#333',
//     borderWidth: 1.2,
//     borderRadius: 15,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     marginBottom: 15,
//     fontFamily: 'Source Serif 4',
//   },
//   forgotContainer: {
//     alignItems: 'flex-end',
//     marginBottom: 20,
//   },
//   forgotText: {
//     color: '#c44242',
//     textDecorationLine: 'underline',
//     fontSize: 17,
//     fontFamily: 'Source Serif 4',
//   },
//   loginButton: {
//     backgroundColor: '#478F4E',
//     borderRadius: 16,
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   loginText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     fontFamily: 'Source Serif 4',
//   },
//   signupButton: {
//     backgroundColor: '#4B9AC1',
//     borderRadius: 16,
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   signupText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: 'bold',
//     fontFamily: 'Source Serif 4',
//   },
//   bottomText: {
//     color: '#c44242',
//     fontSize: 17,
//     textAlign: 'center',
//     fontWeight: '600',
//     fontFamily: 'Source Serif 4',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     marginBottom: 10,
//     marginLeft: 5,
//     fontFamily: 'Source Serif 4',
//   },
// });

// export default styles;

import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import responsive from '../../constants/responsive';

const { width, height } = Dimensions.get('window');

// Responsive multipliers
const wp = value => (width * value) / 100;
const hp = value => (height * value) / 100;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp(5), // 5% padding
    paddingTop: hp(2),
  },

  backButton: {
    marginBottom: hp(2),
    backgroundColor: '#fff',
    borderRadius: wp(10),
    width: wp(12),
    height: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginVertical: hp(2),
  },

  title: {
    fontSize: responsive.fontSize(64), // tablet & desktop bigger
    fontWeight: 'bold',
    color: '#3c8c4d',
    marginVertical: responsive.marginVertical(80),
  },

  input: {
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: responsive.borderRadius(16),
    paddingHorizontal: wp(4),
    fontSize: responsive.fontSize(17),
    fontFamily: 'Source Serif 4',
    padding: responsive.padding(13),
    color:"#000"
  },

  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: hp(2),
  },

  forgotText: {
    color: '#CB444B',
    textDecorationLine: 'underline',
    fontSize: responsive.fontSize(17),
    fontFamily: 'Source Serif 4',
    marginTop: hp(-1),
  },

  loginButton: {
    backgroundColor: '#478F4E',
    borderRadius: wp(4),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    marginBottom: hp(1),
    marginTop: responsive.marginTop(20),
  },

  loginText: {
    color: '#fff',
    fontSize: responsive.fontSize(17),
    fontWeight: 'bold',
    fontFamily: 'Source Serif 4',
  },

  signupButton: {
    backgroundColor: '#4B9AC1',
    borderRadius: wp(4),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    marginBottom: responsive.marginBottom(20),
  },

  signupText: {
    color: '#fff',
    fontSize: width > 600 ? 20 : 17,
    fontWeight: 'bold',
    fontFamily: 'Source Serif 4',
  },

  bottomText: {
    color: '#CB444B',
    fontSize: responsive.fontSize(17),
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Source Serif 4',
  },

  errorText: {
    color: 'red',
    fontSize: width > 600 ? 16 : 14,
    marginBottom: hp(1),
    marginLeft: wp(1),
    fontFamily: 'Source Serif 4',
  },
});
