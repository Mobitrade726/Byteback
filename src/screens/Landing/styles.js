// import { StyleSheet } from "react-native";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   headerTitle: {
//     fontSize: 17,
//     fontWeight: '600',
//     marginLeft: 80,
//     fontFamily: 'Source Serif 4',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 17,
//     color: 'gray',
//     marginBottom: 30,
//     fontFamily: 'Source Serif 4',
//   },
//   optionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   icon: {
//     width: 50,
//     height: 50,
//     marginRight: 12,
//     resizeMode: 'contain',
//   },
//   optionText: {
//     flex: 1,
//     fontSize: 16,
//     color: '#000',
//     fontFamily: 'Source Serif 4',
//     fontWeight:'600'
//   },
//   radioCircle: {
//     height: 20,
//     width: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: 'green',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedDot: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: 'green',
//   },
//   button: {
//     backgroundColor: '#4B9AC1',
//     paddingVertical: 14,
//     borderRadius: 10,
//     marginTop: 40,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     fontFamily: 'Source Serif 4',
//   },
// });

// export default styles;



import { StyleSheet, Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

// Responsive helper functions
const wp = p => (width * p) / 100;
const hp = p => (height * p) / 100;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: wp(5), // responsive padding
    paddingTop: hp(2),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(3),
  },

  headerTitle: {
    fontSize: width > 600 ? 22 : 17, // tablet & desktop bigger
    fontWeight: "600",
    marginLeft: width > 600 ? wp(15) : wp(20),
    fontFamily: "Source Serif 4",
  },

  title: {
    fontSize: width > 600 ? 28 : 22,
    fontWeight: "600",
    color: "#000",
    marginBottom: hp(0.8),
  },

  subtitle: {
    fontSize: width > 600 ? 20 : 17,
    color: "gray",
    marginBottom: hp(3),
    fontFamily: "Source Serif 4",
  },

  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(2),
    paddingHorizontal: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor:"#f1f1f1",
    marginVertical:moderateScale(3),
    borderRadius: moderateScale(12)
  },

  icon: {
    width: wp(12), // 12% of screen width
    height: wp(12),
    marginRight: wp(3),
    resizeMode: "contain",
    // tintColor:"#478F4E",
  },

  optionText: {
    flex: 1,
    fontSize: width > 600 ? 20 : 16,
    color: "#000",
    fontFamily: "Source Serif 4",
    fontWeight: "600",
  },

  radioCircle: {
    height: width > 600 ? 26 : 20,
    width: width > 600 ? 26 : 20,
    borderRadius: width > 600 ? 13 : 10,
    borderWidth: 1.4,
    borderColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedDot: {
    height: width > 600 ? 14 : 10,
    width: width > 600 ? 14 : 10,
    borderRadius: width > 600 ? 7 : 5,
    backgroundColor: "#478F4E",
  },

  button: {
    backgroundColor: "#478F4E",
    paddingVertical: hp(2.2),
    borderRadius: 10,
    marginBottom: hp(6),
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: width > 600 ? 20 : 16,
    fontWeight: "600",
    fontFamily: "Source Serif 4",
  },
});
