// import {StyleSheet} from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFA',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//   },
//   backButton: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     padding: 6,
//     left: 0,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//     textAlign: 'center',
//   },
//   tabs: {
//     flexDirection: 'row',
//     backgroundColor: '#E7F5EB',
//     marginHorizontal: 15,
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   activeTab: {
//     backgroundColor: '#22C55E',
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   activeTabText: {
//     color: '#fff',
//   },
//   card: {
//     backgroundColor: '#F2F2F2',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 30,
//     marginTop: -20,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between', // ✅ space between iconText & Edit
//   },

//   iconText: {
//     flex: 1, // ✅ allow it to take full width
//     marginLeft: 10,
//   },

//   edit: {
//     color: '#11A5D7',
//     fontWeight: '600',
//     fontSize: 14,
//     alignSelf: 'flex-start',
//   },
//   address: {
//     marginVertical: 0,
//     fontSize: 14,
//     color: '#444',
//     width: '90%',
//   },
//   radioRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 0,
//   },
//   defaultLabel: {
//     marginLeft: 8,
//     color: '#444',
//     fontSize: 14,
//   },
//   addButton: {
//     backgroundColor: '#22C55E',
//     margin: 15,
//     paddingVertical: 12,
//     borderRadius: 30,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'flex-end',
//     gap: 6,
//     width: '50%',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// // const styles_addnewaddress = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F4F7F5',
// //     justifyContent: 'space-between',
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     padding: 15,
// //     justifyContent: 'space-between',
// //   },
// //   backIcon: {
// //     backgroundColor: '#fff',
// //     borderRadius: 50,
// //     padding: 5,
// //     elevation: 2,
// //   },
// //   title: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#111',
// //   },
// //   body: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   message: {
// //     fontSize: 16,
// //     color: '#555',
// //     fontWeight: '500',
// //   },
// //   button: {
// //     backgroundColor: '#22C55E',
// //     padding: 16,
// //     margin: 15,
// //     borderRadius: 14,
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// // });

// const styles_addnewaddress = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFA',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     justifyContent: 'space-between',
//   },
//   backIcon: {
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     padding: 5,
//     elevation: 2,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#111',
//   },
//   form: {
//     padding: 0,
//     paddingBottom: 30,
//   },
//   label: {
//     marginBottom: 6,
//     marginTop: 10,
//     fontWeight: '600',
//     color: '#000',
//   },
//   input: {
//     backgroundColor: '#EDEBE9',
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 4,
//     fontFamily: 'Source Serif 4',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginTop: 20,
//     marginLeft: 2,
//     gap: 10,
//   },
//   checkboxLabel: {
//     fontWeight: '600',
//     color: '#000',
//   },
//   checkboxSubText: {
//     fontSize: 13,
//     color: '#444',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 30,
//   },
//   button: {
//     flex: 0.48,
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 17,
//     fontFamily: 'Source Serif 4',
//   },
// });

// export {styles, styles_addnewaddress};

import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import responsive from '../../../../constants/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(10),
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: moderateScale(20),
    padding: moderateScale(6),
    left: 0,
  },
  headerTitle: {
    fontSize: responsiveFontSize(2), // ~16
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#E7F5EB',
    marginHorizontal: moderateScale(15),
    borderRadius: moderateScale(25),
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#22C55E',
  },
  tabText: {
    fontSize: responsiveFontSize(2), // ~16
    fontWeight: 'bold',
    color: '#555',
  },
  activeTabText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#EAE6E5',
    borderRadius: moderateScale(10),
    padding: moderateScale(14), marginVertical: responsive.marginVertical(5)

  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
  },

  iconBox: {
    justifyContent: 'center', alignSelf:'center',
    marginRight: moderateScale(10),
  },

  textSection: {
    flex: 1,
  },

  typeText: {
    fontSize: responsive.fontSize(16),
    fontWeight: '600',
    color: '#171D1C',
    marginBottom: 4,
  },

  address: {
    fontSize: responsive.fontSize(12),
    color: '#666666',
  },

  edit: {
    color: '#11A5D7',
    fontSize: responsive.fontSize(12),
    fontWeight: '600',
    paddingHorizontal: moderateScale(4),
  },

  radioRow: {
    flexDirection: 'row',
    alignItems: 'center', marginBottom: responsive.marginBottom(10)
  },
  addButton: {
    backgroundColor: '#1C9C48',
    padding: responsive.padding(10),
    borderRadius: responsive.borderRadius(12),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: moderateScale(6),
    right:moderateScale(15),
    marginBottom: responsiveHeight(1),
  },
  addButtonText: {
    color: '#FFFBFA',
    fontSize: responsive.fontSize(12),
    fontWeight: 'bold',
  },
  defaultLabel: {
    marginLeft: moderateScale(5),
    fontSize: responsive.fontSize(14),
    color: '#1A1A1A',
    fontWeight: '500',
  },
});

const styles_addnewaddress = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(15),
    justifyContent: 'space-between',
  },
  backIcon: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(50),
    padding: moderateScale(5),
    elevation: 2,
  },
  title: {
    fontSize: responsiveFontSize(2.2), // ~18
    fontWeight: 'bold',
    color: '#111',
  },
  form: {
    padding: 0,
    paddingBottom: verticalScale(30),
  },
  label: {
    marginBottom: verticalScale(6),
    marginTop: verticalScale(10),
    fontWeight: '600',
    color: '#000',
    fontSize: responsiveFontSize(1.8),
  },
  input: {
    backgroundColor: '#EDEBE9',
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    marginBottom: verticalScale(4),
    fontFamily: 'Source Serif 4',
    fontSize: responsiveFontSize(1.8),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: verticalScale(20),
    marginLeft: moderateScale(2),
    gap: moderateScale(10),
  },
  checkboxLabel: {
    fontWeight: '600',
    color: '#000',
    fontSize: responsiveFontSize(1.8),
  },
  checkboxSubText: {
    fontSize: responsiveFontSize(1.5),
    color: '#444',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(30),
  },
  button: {
    flex: 0.48,
    padding: verticalScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Source Serif 4',
  },
});

export { styles, styles_addnewaddress };
