// // import { StyleSheet } from "react-native";
// // import {
// //   responsiveFontSize,
// //   responsiveHeight,
// //   responsiveWidth,
// // } from 'react-native-responsive-dimensions';
// // import {scale} from 'react-native-size-matters';


// // const styles_confirmSignup = StyleSheet.create({
// //   container: {
// //     flexGrow: 1,
// //     backgroundColor: '#f0fefa',
// //     alignItems: 'center',
// //     paddingVertical: responsiveHeight(4),
// //     paddingHorizontal: responsiveWidth(6),
// //   },
// //   backButton: {
// //     position: 'absolute',
// //     top: responsiveHeight(4),
// //     left: responsiveWidth(4),
// //     backgroundColor: '#e9f8f4',
// //     borderRadius: 20,
// //     padding: 6,
// //   },
// //   title: {
// //     fontSize: 32,
// //     fontWeight: '600',
// //     color: '#1a1a1a',
// //     marginTop: responsiveHeight(8),
// //     width: scale(288),
// //     textAlign:"center",
// //   },
// //   image: {
// //     width: responsiveWidth(50),
// //     height: responsiveHeight(20),
// //   },
// //   welcomeText: {
// //     fontSize: 34,
// //     color: '#000',
// //     fontWeight: '400',
// //   },
// //   brandText: {
// //     fontSize: 34,
// //     fontWeight: '700',
// //     color: '#3498db',
// //     marginBottom: responsiveHeight(1),
// //   },
// //   description: {
// //     fontSize: 17,
// //     textAlign: 'center',
// //     color: '#555',
// //     paddingHorizontal: responsiveWidth(4),
// //     marginBottom: responsiveHeight(2),
// //     fontFamily: 'Source Serif 4',
// //   },
// //   editButton: {
// //     width: '100%',
// //     borderWidth: 1,
// //     borderColor: '#3498db',
// //     borderRadius: 12,
// //     paddingVertical: responsiveHeight(1.8),
// //     marginBottom: responsiveHeight(2),
// //     backgroundColor: '#ffffff',
// //   },
// //   editButtonText: {
// //     textAlign: 'center',
// //     color: '#2e7d32',
// //     fontWeight: '600',
// //     fontSize: responsiveFontSize(2),
// //   },
// //   loginButton: {
// //     width: '100%',
// //     backgroundColor: '#2e7d32',
// //     borderRadius: 12,
// //     padding:10
// //   },
// //   loginButtonText: {
// //     textAlign: 'center',
// //     color: '#ffffff',
// //     fontWeight: '700',
// //     fontSize: responsiveFontSize(2),
// //   },
// // });

// // // const styles_signup = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#fffaf9',
// // //     padding: 20,
// // //   },
// // //   backButton: {
// // //     width: 40,
// // //     height: 40,
// // //     backgroundColor: '#fff',
// // //     borderRadius: 25,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     elevation: 3,
// // //     shadowColor: '#000',
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 5,
// // //   },
// // //   header: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     marginBottom: 10,
// // //     gap: 10,
// // //   },
// // //   backText: {
// // //     fontSize: 22,
// // //   },
// // //   title: {
// // //     fontSize: 20,
// // //     fontWeight: 'bold',
// // //     textAlign: 'center',
// // //     marginVertical: 15,
// // //   },
// // //   profileContainer: {
// // //     alignItems: 'center',
// // //     marginBottom: 10,
// // //   },
// // //   // profileCircle: {
// // //   //   backgroundColor: '#3c8c4d',
// // //   //   width: 200,
// // //   //   height: 200,
// // //   //   borderRadius: 100,
// // //   //   justifyContent: 'center',
// // //   //   alignItems: 'center',
// // //   // },
// // //   imageIcon: {
// // //     fontSize: 30,
// // //     color: '#fff',
// // //   },
// // //   editIcon: {
// // //     position: 'absolute',
// // //     bottom: 15,
// // //     right: 100,
// // //     backgroundColor: '#fff',
// // //     borderColor: '#000',
// // //     borderWidth: 2,
// // //     borderRadius: 25,
// // //     width: 40,
// // //     height: 40,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   editText: {
// // //     fontSize: 18,
// // //   },
// // //   input: {
// // //     height: 50,
// // //     borderColor: '#333',
// // //     borderWidth: 1.2,
// // //     borderRadius: 15,
// // //     paddingHorizontal: 15,
// // //     fontSize: 16,
// // //     marginVertical: 8,
// // //     fontFamily: 'Source Serif 4',
// // //   },
// // //   row: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //   },
// // //   registerButton: {
// // //     backgroundColor: '#4B9AC1',
// // //     borderRadius: 8,
// // //     paddingVertical: 15,
// // //     alignItems: 'center',
// // //     marginTop: 10,
// // //   },
// // //   registerText: {
// // //     color: '#fff',
// // //     fontSize: 18,
// // //     fontWeight: '600',
// // //     fontFamily: 'Source Serif 4',
// // //   },
// // //   orText: {
// // //     textAlign: 'center',
// // //     marginVertical: 12,
// // //     fontSize: 17,
// // //     color: '#555',
// // //     fontWeight: '600',
// // //     fontFamily: 'Source Serif 4',
// // //   },
// // //   socialButton: {
// // //     borderRadius: 10,
// // //     paddingVertical: 14,
// // //     alignItems: 'center',
// // //     marginBottom: 10,
// // //   },
// // //   whiteButton: {
// // //     backgroundColor: '#fff',
// // //     borderWidth: 1,
// // //     borderColor: '#aaa',
// // //   },
// // //   socialText: {
// // //     color: '#fff',
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //     fontFamily: 'Source Serif 4',
// // //   },
// // //   headerTitle: {
// // //     fontSize: 17,
// // //     fontWeight: '600',
// // //     marginLeft: 60,
// // //   },
// // //   editIconContainer: {
// // //     height: 50,
// // //     width: 50,
// // //     borderRadius: 100,
// // //     resizeMode: 'contain',
// // //     flexDirection: 'row',
// // //   },
// // //   profileImage: {
// // //     width: 100,
// // //     height: 100,
// // //     borderRadius: 100,
// // //     resizeMode: 'cover',
// // //   },
// // //   gstToggleContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     marginTop: 10,
// // //   },
// // //   gstToggleText: {
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //     color: '#333',
// // //   },
// // //   greenDot: {
// // //     width: 12,
// // //     height: 12,
// // //     borderRadius: 6,
// // //     backgroundColor: '#3c8c4d',
// // //     marginLeft: 8,
// // //   },
// // //   errorText: {
// // //   color: 'red',
// // //   fontSize: 13,
// // //   marginTop: 4,
// // //   marginBottom: 10,
// // //   fontFamily: 'Source Serif 4',
// // // },

// // // });

// // const styles_signup = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     paddingHorizontal: 20,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginVertical: 10,
// //   },
// //   backButton: {
// //     backgroundColor: '#fff',
// //     borderRadius: 20,
// //     padding: 6,
// //     elevation: 3,
// //     marginRight: 10,
// //   },
// //   headerTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#000',
// //   },
// //   tabs: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     marginTop: 10,
// //     borderBottomWidth: 1,
// //     borderColor: '#ddd',
// //     paddingBottom: 10,
// //   },
// //   tabActive: {
// //     alignItems: 'center',
// //     marginRight: 40,
// //   },
// //   tabInactive: {
// //     alignItems: 'center',
// //   },
// //   tabTextActive: {
// //     color: '#00AEEF',
// //     fontWeight: '600',
// //     fontSize: 14,
// //   },
// //   tabTextInactive: {
// //     color: '#aaa',
// //     fontWeight: '500',
// //     fontSize: 14,
// //   },
// //   gstRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginVertical: 20,
// //   },
// //   gstText: {
// //     fontSize: 16,
// //     color: '#000',
// //     flex: 1,
// //   },
// //   greenDot: {
// //     width: 14,
// //     height: 14,
// //     borderRadius: 7,
// //     backgroundColor: '#3CB371',
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#000',
// //     borderRadius: 10,
// //     paddingVertical: 10,
// //     paddingHorizontal: 15,
// //     marginBottom: 15,
// //     fontSize: 14,
// //     color: '#000',
// //   },
// //   pickerContainer: {
// //     borderWidth: 1,
// //     borderColor: '#000',
// //     borderRadius: 10,
// //     marginBottom: 15,
// //   },
// //   button: {
// //     backgroundColor: '#3498db',
// //     paddingVertical: 14,
// //     borderRadius: 14,
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontWeight: '600',
// //     fontSize: 16,
// //   },
// // });


// // export { styles_confirmSignup,  styles_signup};

// import { StyleSheet } from 'react-native';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// const styles_confirmSignup = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: RF(4), // responsive font
//     fontWeight: '600',
//     color: '#1a1a1a',
//     marginTop: RH(6),
//     textAlign: 'center',
//   },
//   image: {
//     width: RW(50),
//     height: RH(25),
//     marginVertical: RH(3),
//     resizeMode: 'contain',
//     alignSelf:'center',
//   },
//   welcomeText: {
//     fontSize: RF(3.5),
//     color: '#000',
//     fontWeight: '400',
//     textAlign: 'center',
//   },
//   brandText: {
//     fontSize: RF(4),
//     fontWeight: '700',
//     color: '#3498db',
//     marginBottom: RH(1),
//     textAlign: 'center',
//   },
//   description: {
//     fontSize: RF(2),
//     textAlign: 'center',
//     color: '#555',
//     paddingHorizontal: RW(4),
//     marginBottom: RH(3),
//     lineHeight: RF(3),
//   },
//   loginButton: {
//     width: '80%',
//     backgroundColor: '#2e7d32',
//     borderRadius: MSCALE(12),
//     paddingVertical: VSCALE(8),
//     alignSelf: 'center',
//     marginTop: RH(2),
//   },
//   loginButtonText: {
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: RF(2.2),
//   },
// });

// const styles_signup = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: RW(5),
//     paddingTop: RH(2),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: RH(1),
//   },
//   backButton: {
//     backgroundColor: '#fff',
//     borderRadius: MSCALE(20),
//     padding: MSCALE(6),
//     elevation: 3,
//     marginRight: RW(2),
//   },
//   headerTitle: {
//     fontSize: RF(2.5),
//     fontWeight: '600',
//     color: '#000',
//   },
//   tabs: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: RH(1),
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     paddingBottom: RH(1),
//   },
//   tabActive: {
//     alignItems: 'center',
//     marginRight: RW(6),
//   },
//   tabInactive: {
//     alignItems: 'center',
//   },
//   tabTextActive: {
//     color: '#00AEEF',
//     fontWeight: '600',
//     fontSize: RF(2),
//   },
//   tabTextInactive: {
//     color: '#aaa',
//     fontWeight: '500',
//     fontSize: RF(2),
//   },
//   gstRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: RH(2),
//   },
//   gstText: {
//     fontSize: RF(2),
//     color: '#000',
//     flex: 1,
//   },
//   greenDot: {
//     width: MSCALE(14),
//     height: MSCALE(14),
//     borderRadius: MSCALE(7),
//     backgroundColor: '#3CB371',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: MSCALE(10),
//     paddingVertical: VSCALE(1.5),
//     paddingHorizontal: RW(3),
//     marginBottom: RH(2),
//     fontSize: RF(2),
//     color: '#000',
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: MSCALE(10),
//     marginBottom: RH(2),
//   },
//   button: {
//     backgroundColor: '#3498db',
//     paddingVertical: VSCALE(2),
//     borderRadius: MSCALE(14),
//     alignItems: 'center',
//     marginTop: RH(2),
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: RF(2.2),
//   },
// });

// // Export styles
// export { styles_confirmSignup, styles_signup };

// // Helper constants
// const RW = responsiveWidth;
// const RH = responsiveHeight;
// const RF = responsiveFontSize;
// const SCALE = scale;
// const VSCALE = verticalScale;
// const MSCALE = moderateScale;



import { StyleSheet, Dimensions } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import responsive from "../../constants/responsive";

// ---------------
// Responsive Helpers
// ---------------
const RW = responsiveWidth;
const RH = responsiveHeight;
const RF = responsiveFontSize;
const SCALE = scale;
const VSCALE = verticalScale;
const MSCALE = moderateScale;

const { width } = Dimensions.get("window");

// Breakpoints
const isTablet = width >= 600;
const isDesktop = width >= 1000;

// Responsive font scaling
const RFF = val =>
  isDesktop ? RF(val * 1.4) : isTablet ? RF(val * 1.2) : RF(val);

// Responsive spacing
const RHP = val =>
  isDesktop ? RH(val * 1.2) : isTablet ? RH(val * 1.1) : RH(val);

// Responsive width
const RWP = val =>
  isDesktop ? RW(val * 1.2) : isTablet ? RW(val * 1.1) : RW(val);

//
// --------------------------------------------------------
// ConfirmSignup Styles (Fully Responsive)
// --------------------------------------------------------
//
const styles_confirmSignup = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: RWP(4),
  },

  title: {
    fontSize: responsive.fontSize(32),
    fontWeight: '700',
    color: "#1a1a1a",
    marginTop: RHP(6),
    textAlign: "center",
  },

  image: {
    width: RWP(50),
    height: RHP(25),
    marginVertical: RHP(3),
    resizeMode: "contain",
    alignSelf: "center",
  },

  welcomeText: {
    fontSize: responsive.fontSize(34),
    color: "#000",
    fontWeight: "400",
    textAlign: "center",
    marginVertical: moderateScale(10)
  },

  brandText: {
    fontSize: responsive.fontSize(34),
    fontWeight: "700",
    color: "#3498db",
    marginBottom: RHP(1),
    textAlign: "center",
  },

  description: {
    fontSize: responsive.fontSize(17),
    textAlign: "center",
    color: "#555",
    paddingHorizontal: RWP(6),
    marginBottom: RHP(3),
    lineHeight: RFF(3),
  },

  loginButton: {
    width: isDesktop ? "40%" : isTablet ? "60%" : "80%",
    backgroundColor: "#478F4E",
    borderRadius: MSCALE(12),
    paddingVertical: VSCALE(10),
    alignSelf: "center",
    marginTop: RHP(2),
  },

  loginButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: responsive.fontSize(16),
  },
});

//
// --------------------------------------------------------
// Signup Styles (Fully Responsive)
// --------------------------------------------------------
//
const styles_signup = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: RWP(5),
    paddingTop: RHP(3),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: RHP(1.5),
  },

  backButton: {
    backgroundColor: "#fff",
    borderRadius: MSCALE(20),
    padding: MSCALE(6),
    elevation: 3,
    marginRight: RWP(2),
  },

  headerTitle: {
    fontSize: RFF(2.6),
    fontWeight: "600",
    color: "#000",
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: RHP(1),
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: RHP(1),
  },

  tabActive: {
    alignItems: "center",
    marginRight: RWP(6),
  },

  tabInactive: {
    alignItems: "center",
  },

  tabTextActive: {
    color: "#00AEEF",
    fontWeight: "600",
    fontSize: RFF(2),
  },

  tabTextInactive: {
    color: "#aaa",
    fontWeight: "500",
    fontSize: RFF(2),
  },

  gstRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: RHP(2),
  },

  gstText: {
    fontSize: RFF(2),
    color: "#000",
    flex: 1,
  },

  greenDot: {
    width: MSCALE(14),
    height: MSCALE(14),
    borderRadius: MSCALE(7),
    backgroundColor: "#3CB371",
  },

  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: MSCALE(10),
    paddingVertical: VSCALE(1.5),
    paddingHorizontal: RWP(3),
    marginBottom: RHP(2),
    fontSize: RFF(2),
    color: "#000",
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: MSCALE(10),
    marginBottom: RHP(2),
  },

  button: {
    backgroundColor: "#3498db",
    paddingVertical: VSCALE(2),
    borderRadius: MSCALE(14),
    alignItems: "center",
    marginTop: RHP(2),
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: RFF(2.2),
  },
});

// Export styles
export { styles_confirmSignup, styles_signup };
