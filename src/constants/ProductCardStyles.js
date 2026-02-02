import { Dimensions, Platform, StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('window');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import responsive from './responsive';

const ProductCardStyles = StyleSheet.create({
  cardShadow: {
    // ✅ iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android needs bg to render shadow nicely
    backgroundColor: 'transparent',
  },

  cardD: {
    width: responsive.width(170),
    borderRadius: responsive.borderRadius(5),
    overflow: 'hidden',
    marginVertical: responsive.marginVertical(8),
    backgroundColor: '#fff',
    elevation: 5,
    // borderWidth:1
  },

  gradeText: {
    fontSize: responsive.fontSize(10),
    color: '#000',
    backgroundColor: '#FFFBFA',
    textAlign: 'center',
    borderRadius: responsive.borderRadius(5),
    padding: moderateScale(1),
    borderWidth: 0.3,
    borderColor: '#fff',
    marginHorizontal: responsive.marginHorizontal(3),
    marginBottom: responsive.marginBottom(1),
    elevation: 5,
  },

  productName: {
    fontSize: responsive.fontSize(16), // RF(1.4) ko RFValue use kar ke adjust kiya
    fontWeight: '500',
    color: '#000',
    // marginHorizontal: scale(10),
  },

  colorText: {
    fontSize: responsive.fontSize(12), // RF(1.4) ko RFValue use kar ke adjust kiya
    fontWeight: '500',
    color: '#000',
    // marginHorizontal: scale(10),
  },

  price: {
    fontSize: responsive.fontSize(14), // RF(1.4) ko RFValue use kar ke adjust kiya
    // fontWeight: '500',
    color: '#000',
    // marginHorizontal: scale(10),
    marginBottom: moderateScale(5),
  },

  refurbishedLabelD: {
    fontSize: responsive.fontSize(10),
    color: '#000',
    backgroundColor: '#EAE6E5',
    textAlign: 'center',
    padding: moderateScale(1),
  },

  heartIconD: {
    position: 'absolute',
    top: verticalScale(20),
    right: scale(6),
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    padding: moderateScale(5),
    elevation: 2,
  },

  imageD: {
    width: '100%',
    height: responsive.height(150),
  },

  listContainerD: {
    padding: scale(10),
  },

  cardHome: {
    // overflow: 'hidden', // 🔥 image rounded corners ke liye
    // borderRadius: moderateScale(10),
    borderRadius: moderateScale(12),
    overflow: 'hidden', // 🔥 very important
    elevation: 1,
    borderWidth: 0.1,
    backgroundColor: '#fff',
    width: responsive.height(160),
    alignItems: 'center',
  },

  productNameHome: {
    fontSize: responsive.fontSize(12), // RF(1.4) ko RFValue use kar ke adjust kiya
    fontWeight: 'bold',
    color: '#000',
    marginTop: responsive.marginTop(5),
    marginLeft: 5,
  },
  colorTextHome: {
    fontSize: responsive.fontSize(10), // RF(1.4) ko RFValue use kar ke adjust kiya
    color: '#666666',
    width: '80%',
    marginLeft: 5,
  },
  imageHome: {
    width: responsive.height(170),
    height: responsive.height(140),
  },
});
export { ProductCardStyles };
