// import {StyleSheet} from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 10,
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

//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomColor: '#eee',
//   },
//   icon: {
//     marginRight: 15,
//     color: '#000',
//     width: 30,
//   },
//   text: {
//     flex: 1,
//     fontSize: 17,
//     color: '#333',
//     fontWeight:"regular",
//     fontFamily: 'Source Serif 4',
//   },
//   arrow: {
//     color: '#888',
//   },
//   sectionTitle: {
//     marginTop: 25,
//     marginBottom: 5,
//     fontSize: 17,
//     fontWeight: 'bold',
//     color: '#171D1C',
//     fontFamily: 'Source Serif 4',
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     backgroundColor: '#00AEEF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 40,
//     paddingVertical: 15,
//     borderRadius: 14,
//   },
//   logoutText: {
//     color: '#fff',
//     fontSize: 16,
//     marginLeft: 10,
//     fontWeight: '600',
//   },
// });

// export default styles;

import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    paddingHorizontal: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: moderateScale(12),
    color: '#000',
  },
  text: {
    flex: 1,
    fontSize: responsiveFontSize(2), // ~16
    color: '#000',
  },
  arrow: {
    color: '#000',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00AEEF',
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    marginTop: verticalScale(20),
    marginHorizontal: moderateScale(16),
  },
  logoutText: {
    fontSize: responsiveFontSize(1.9), // ~15
    color: '#fff',
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: '#555',
    paddingHorizontal: moderateScale(16),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(14),
    paddingHorizontal: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default styles;

