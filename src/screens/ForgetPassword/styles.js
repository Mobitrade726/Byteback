// import { StyleSheet, Dimensions } from 'react-native';
// import { responsiveHeight } from 'react-native-responsive-dimensions';

// const { width } = Dimensions.get('window');
// const OTP_SIZE = Math.min(45, (width - 80) / 6);

// const styles_forgetotp = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff', // very light green like screenshot
//   },
//   backButton: {
//     marginTop: 30,
//     marginLeft: 20,
//     width: 30,
//     height: 30,
//     backgroundColor: '#ffff',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//   },

//   content: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingTop: 30,
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#1A1A2D',
//   },

//   subtitle: {
//     fontSize: 15,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 10,
//     marginBottom: 28,
//   },

//   email: {
//     fontWeight: '700',
//     color: '#000',
//   },

//   /* OTP CARD */
//   otpCard: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 10,
//     padding: 20,
//     borderRadius: 22,
//     // backgroundColor: '#fff',
//     // elevation: 10,
//     marginBottom: 20,
//   },

//   otpBox: {
//     width: OTP_SIZE,
//     height: OTP_SIZE,
//     borderRadius: 14,
//     borderWidth: 1.5,
//     borderColor: '#f1f1f1',
//     textAlign: 'center',
//     fontSize: 12,
//     fontWeight: '700',
//     color: '#1A1A2D',
//     backgroundColor: '#fff',
//   },

//   otpFilled: {
//     borderColor: '#478F4E',
//     backgroundColor: '#EFFFF5',
//   },

//   button: {
//     width: '100%',
//     backgroundColor: '#478F4E',
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '800',
//   },

//   resendText: {
//     marginTop: 18,
//     fontSize: 14,
//     color: '#666',
//     flexDirection: 'row',
//   },

//   errorText: {
//     color: '#D32F2F',
//     marginBottom: 8,
//     fontSize: 13,
//   },
// });

// const styles_forgetpassword = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff', // very light green like screenshot
//   },
//   backButton: {
//     marginTop: 30,
//     marginLeft: 20,
//     width: 30,
//     height: 30,
//     backgroundColor: '#ffff',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     alignItems: 'stretch',
//     marginTop: 20,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#111',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 30,
//     fontWeight: 'regular',
//     fontFamily: 'Source Serif 4',
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: 'regular',
//     marginBottom: 8,
//     color: '#1A1A2D',
//   },
//   input: {
//     height: 50,
//     borderColor: '#333333',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     marginBottom: 25,
//     backgroundColor: '#fff',
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#478F4E', // green button
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 25,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: 'bold',
//     fontFamily: 'Source Serif 4',
//   },
//   footer: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#666666',
//     fontWeight: 'regular',
//     fontFamily: 'Source Serif 4',
//   },
//   loginLink: {
//     fontWeight: 'semibold',
//     color: '#1A1A2D',
//     fontSize: 14,
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

// const styles_setpassword = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff', // very light green like screenshot
//   },
//   backButton: {
//     marginTop: 30,
//     marginLeft: 20,
//     width: 30,
//     height: 30,
//     backgroundColor: '#ffff',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     paddingTop: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1A1A2D',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666666',
//     marginBottom: 20,
//     fontWeight: 'regular',
//     fontFamily: 'Source Serif 4',
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: 'regular',
//     color: '#1A1A2D',
//     marginBottom: 6,
//     fontWeight: 'regular',
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#333333',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     backgroundColor: '#fff',
//     height: 52,
//     marginBottom: 20,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#478F4E',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 30,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: 'bold',
//     fontFamily: 'Source Serif 4',
//   },
//   footer: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#666',
//     marginBottom: responsiveHeight(6),
//   },
//   loginLink: {
//     fontWeight: 'semibold',
//     color: '#000',
//     fontSize: 16,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     marginBottom: 10,
//     marginLeft: 5,
//     fontFamily: 'Source Serif 4',
//   },
// });

// export { styles_forgetotp, styles_forgetpassword, styles_setpassword };

import { StyleSheet, Dimensions } from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('window');
const OTP_SIZE = Math.min(rw(12), (width - rw(20)) / 6);


const styles_forgetotp = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  backButton: {
    marginTop: rh(4),
    marginLeft: rw(5),
    width: rw(8),
    height: rw(8),
    borderRadius: rw(4),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rw(6),
    paddingTop: rh(4),
  },

  title: {
    fontSize: rf(3.5),
    fontWeight: '800',
    color: '#1A1A2D',
  },

  subtitle: {
    fontSize: rf(2),
    color: '#666',
    textAlign: 'center',
    marginTop: rh(1.5),
    marginBottom: rh(4),
  },

  email: {
    fontWeight: '700',
    color: '#000',
  },

  otpCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: rw(2),
    padding: rw(4),
    borderRadius: rw(5),
    marginBottom: rh(3),
  },

  otpBox: {
    width: OTP_SIZE,
    height: OTP_SIZE,
    borderRadius: rw(3),
    borderWidth: 1.5,
    borderColor: '#f1f1f1',
    textAlign: 'center',
    fontSize: rf(1.8),
    fontWeight: '700',
    backgroundColor: '#fff',
  },

  otpFilled: {
    borderColor: '#478F4E',
    backgroundColor: '#EFFFF5',
  },

  button: {
    width: '100%',
    backgroundColor: '#478F4E',
    paddingVertical: rh(2),
    borderRadius: rw(3),
    alignItems: 'center',
    marginTop: rh(2),
  },

  buttonText: {
    color: '#fff',
    fontSize: rf(2.2),
    fontWeight: '800',
  },

  resendText: {
    marginTop: rh(2),
    fontSize: rf(1.8),
    color: '#666',
  },

  errorText: {
    color: '#D32F2F',
    marginBottom: rh(1),
    fontSize: rf(1.7),
  },
});


const styles_forgetpassword = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  backButton: {
    marginTop: rh(4),
    marginLeft: rw(5),
    width: rw(8),
    height: rw(8),
    borderRadius: rw(4),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  content: {
    flex: 1,
    paddingHorizontal: rw(6),
    marginTop: rh(1),
  },

  title: {
    fontSize: rf(3.8),
    fontWeight: 'bold',
    marginBottom: rh(1),
  },

  description: {
    fontSize: rf(2.1),
    color: '#555',
    marginBottom: rh(4),
    fontFamily: 'Source Serif 4',
  },

  label: {
    fontSize: rf(1.8),
    marginBottom: rh(1),
    color: '#1A1A2D',
  },

  input: {
    height: rh(6.8),
    borderWidth: 1,
    borderRadius: rw(2),
    paddingHorizontal: rw(4),
    marginBottom: rh(3),
    fontSize: rf(2),
  },

  button: {
    backgroundColor: '#478F4E',
    paddingVertical: rh(2),
    borderRadius: rw(2),
    alignItems: 'center',
    marginBottom: rh(3),
  },

  buttonText: {
    color: '#fff',
    fontSize: rf(2.2),
    fontWeight: 'bold',
    fontFamily: 'Source Serif 4',
  },

  footer: {
    textAlign: 'center',
    fontSize: rf(1.8),
    color: '#666',
    fontFamily: 'Source Serif 4',
  },

  loginLink: {
    fontSize: rf(1.8),
    fontWeight: '600',
    color: '#1A1A2D',
    fontFamily: 'Source Serif 4',
  },

  errorText: {
    color: 'red',
    fontSize: rf(1.7),
    marginBottom: rh(1),
    marginLeft: rw(1),
    fontFamily: 'Source Serif 4',
  },
});


const styles_setpassword = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  backButton: {
    marginTop: rh(4),
    marginLeft: rw(5),
    width: rw(8),
    height: rw(8),
    borderRadius: rw(4),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  content: {
    flex: 1,
    paddingHorizontal: rw(6),
    paddingTop: rh(3),
  },

  title: {
    fontSize: rf(2.6),
    fontWeight: 'bold',
    marginBottom: rh(1),
  },

  subtitle: {
    fontSize: rf(2),
    color: '#666',
    marginBottom: rh(3),
    fontFamily: 'Source Serif 4',
  },

  label: {
    fontSize: rf(1.8),
    marginBottom: rh(1),
    color: '#1A1A2D',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: rw(2.5),
    paddingHorizontal: rw(3),
    height: rh(6.8),
    marginBottom: rh(2.5),
  },

  input: {
    flex: 1,
    fontSize: rf(2),
    color: '#333',
  },

  button: {
    backgroundColor: '#478F4E',
    paddingVertical: rh(2),
    borderRadius: rw(2),
    alignItems: 'center',
    marginTop: rh(1.5),
    marginBottom: rh(4),
  },

  buttonText: {
    color: '#fff',
    fontSize: rf(2.2),
    fontWeight: 'bold',
    fontFamily: 'Source Serif 4',
  },

  footer: {
    textAlign: 'center',
    fontSize: rf(2),
    color: '#666',
    marginBottom: rh(6),
  },

  loginLink: {
    fontSize: rf(2),
    fontWeight: '600',
    color: '#000',
  },

  errorText: {
    color: 'red',
    fontSize: rf(1.7),
    marginBottom: rh(1),
    marginLeft: rw(1),
    fontFamily: 'Source Serif 4',
  },
});

export { styles_forgetotp, styles_forgetpassword, styles_setpassword };
