import { Dimensions, Platform, StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('window');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ProductCardStyles = StyleSheet.create({
  cardD: {
    width: width / 2.3,
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    shadowRadius: moderateScale(4),
    marginHorizontal: moderateScale(5),
    marginVertical: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: '#ccc',
  },

  gradeTextD: {
    fontSize: responsiveFontSize(1.5), // RF(1.4) ko RFValue use kar ke adjust kiya
    fontWeight: '500',
    color: '#555',
    marginHorizontal: scale(10),
  },

  productNameD: {
    fontSize: responsiveFontSize(1.5), // RF(1.4) ko RFValue use kar ke adjust kiya
    fontWeight: '500',
    color: '#000',
    marginHorizontal: scale(10),
  },

  colorTextD: {
    fontSize: responsiveFontSize(1.5), // RF(1.4) ko RFValue use kar ke adjust kiya
    fontWeight: '500',
    color: '#000',
    marginHorizontal: scale(10),
  },

  priceD: {
    fontSize: responsiveFontSize(1.5), // RF(1.4) ko RFValue use kar ke adjust kiya
    fontWeight: '500',
    color: '#000',
    marginHorizontal: scale(10),
    marginBottom: moderateScale(5)
  },

  refurbishedLabelD: {
    alignSelf: 'center',
    fontSize: responsiveFontSize(1.5),
    color: '#000',
    backgroundColor: '#EAE6E5',
    width: '100%',
    textAlign: 'center',
    padding: moderateScale(5),
  },

  heartIconD: {
    position: 'absolute',
    top: verticalScale(30),
    right: scale(6),
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    padding: moderateScale(5),
    elevation: 2,
  },

  imageD: {
    width: '100%',
    height: responsiveHeight(10), 
  },

  listContainerD: {
    padding: scale(10),
  },
});
export { ProductCardStyles };
