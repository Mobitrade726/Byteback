// FilterModalStyles.js
import { StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale } from 'react-native-size-matters';
import responsive from './responsive';

const FilterModalStyles_Search = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  headerTitle1: {
    fontSize: responsive.fontSize(20),
    color: '#333333',
  },

  body: {
    flex: 1,
    flexDirection: 'row',
  },

  leftPane: {
    width: '35%',
    borderRightWidth: 1,
    borderColor: '#eee',
    paddingVertical: moderateScale(10),
  },

  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(12),
  },

  tabItemSelected: {
    backgroundColor: '#f2f2f2',
  },

  tabLabel: {
    marginLeft: moderateScale(10),
    fontSize: responsive.fontSize(12),
    color: '#555',
  },

  rightPane: {
    flex: 1,
    padding: moderateScale(10),
  },

  brandItem: {
    padding: moderateScale(10),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: moderateScale(15),
  },

  brandItemSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },

  brandText: {
    fontSize: responsive.fontSize(12),
    color: '#000',
    textAlign: 'center',
  },

  colorBox: {
    alignItems: 'center',
    marginBottom: moderateScale(10),
    width: '30%',
    padding: 6,
    borderRadius: 8,
  },

  colorCircle_c: {
    width: 20,
    height: 20,
    borderRadius: 18,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  colorCircleSelected_c: {
    borderColor: '#000',
    borderWidth: 2,
  },

  selectedWrapper_c: {
    alignItems: 'center',
    marginBottom: moderateScale(10),
    width: '30%',
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },

  colorLabel_c: {
    fontSize: responsive.fontSize(8),
    textAlign: 'center',
  },

  gradeButton: {
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: moderateScale(10),
  },

  gradeButtonSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },

  gradeText: {
    textAlign: 'center',
    color: '#000',
    fontSize: responsive.fontSize(12),
  },

  gradeTextSelected: {
    color: '#fff',
  },

  subHeading: {
    fontSize: responsive.fontSize(12),
    marginVertical: 10,
  },

  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginRight: 10,
    marginBottom: moderateScale(10),
    width: '45%',
  },

  selectedButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },

  optionText: {
    color: '#000',
    textAlign: 'center',
    fontSize: responsive.fontSize(12),
  },

  selectedText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: responsive.fontSize(12),
  },

  footer: {
    flexDirection: 'row',
    padding: 6,
    borderTopWidth: 1,
    borderColor: '#fff',
  },

  resetBtn: {
    flex: 1,
    padding: responsive.padding(12),
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: responsive.borderRadius(12),
    marginRight: 10,
    alignItems: 'center',
  },

  resetText: {
    color: '#000',
    fontWeight: '600',
    fontSize: responsive.fontSize(16),
  },

  applyBtn: {
    flex: 1,
    padding: responsive.padding(12),
    backgroundColor: '#333333',
    borderRadius: responsive.borderRadius(12),
    alignItems: 'center',
  },

  applyText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: responsive.fontSize(16),
  },
});

export const FilterModalStyles_All = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  headerTitle1: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },

  body: {
    flex: 1,
    flexDirection: 'row',
  },

  leftPane: {
    width: '35%',
    borderRightWidth: 1,
    borderColor: '#eee',
    paddingVertical: moderateScale(10),
  },
  rightPane: {
    padding: moderateScale(10),
    width: '60%',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(12),
  },

  tabItemSelected: {
    backgroundColor: '#f2f2f2',
  },

  tabLabel: {
    marginLeft: moderateScale(10),
    fontSize: responsive.fontSize(12),
    color: '#555',
  },

  brandItem: {
    padding: moderateScale(10),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: moderateScale(15),
    alignSelf: 'center',
    width: '90%',
  },

  brandItemSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },

  brandText: {
    fontSize: responsive.fontSize(12),
    color: '#000',
    textAlign: 'center',
  },

  colorBox: {
    alignItems: 'center',
    marginBottom: moderateScale(10),
    width: '30%',
    borderRadius: 8,
    padding: 6,
  },

  colorCircle_c: {
    width: 20,
    height: 20,
    borderRadius: 18,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  colorCircleSelected_c: {
    borderColor: '#000',
    borderWidth: 2,
  },

  selectedWrapper_c: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    marginBottom: moderateScale(10),
    width: '30%',
    borderRadius: 8,
    padding: 6,
  },

  colorLabel_c: {
    fontSize: responsive.fontSize(8),
    textAlign: 'center',
  },

  subHeading: {
    fontSize: responsive.fontSize(12),
    marginVertical: 10,
    marginLeft: 8,
  },

  optionContainer: {
    flexDirection: 'row', // ✅ REQUIRED
    flexWrap: 'wrap',
  },

  optionButton: {
    width: '40%', // ✅ 2 column
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: moderateScale(10),
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },

  selectedButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },

  optionText: {
    color: '#000',
    textAlign: 'center',
    fontSize: responsive.fontSize(12),
  },

  selectedText: {
    color: '#fff',
    textAlign: 'center',
  },

  footer: {
    flexDirection: 'row',
    padding: 6,
    borderTopWidth: 1,
    borderColor: '#fff',
  },

  resetBtn: {
    flex: 1,
    padding: responsive.padding(12),
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: responsive.borderRadius(12),
    marginRight: 10,
    alignItems: 'center',
  },

  resetText: {
    color: '#000',
    fontWeight: '600',
    fontSize: responsive.fontSize(16),
  },

  applyBtn: {
    flex: 1,
    padding: responsive.padding(12),
    backgroundColor: '#333333',
    borderRadius: responsive.borderRadius(12),
    alignItems: 'center',
  },

  applyText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: responsive.fontSize(16),
  },
});

export default FilterModalStyles_Search;
