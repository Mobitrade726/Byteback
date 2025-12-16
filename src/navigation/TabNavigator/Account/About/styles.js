import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

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
  content: {
    padding: 0,
  },
  greenCard: {
    backgroundColor: '#1D9D4C',
    borderBottomRightRadius: scale(120),
    borderBottomLeftRadius: scale(20),
    padding: moderateScale(20),
  },
  sectionTitle: {
    color: '#fff',
    fontSize: responsiveFontSize(2.5), // ~20
    fontWeight: '500', // medium
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10),
  },
  divider: {
    height: verticalScale(1),
    backgroundColor: '#ccc',
    marginBottom: verticalScale(15),
  },
  mainTitle: {
    color: '#fff',
    fontSize: responsiveFontSize(2.2), // ~18
    fontWeight: 'bold',
    fontFamily: 'Source Serif 4',
    marginBottom: verticalScale(15),
  },
  bodyText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.9), // ~15
    fontFamily: 'Source Serif 4',
    marginBottom: verticalScale(10),
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
