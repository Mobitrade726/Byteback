import { Dimensions, Platform, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b7a3e',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  image: {
    width: width * 0.9,
    height: height * 0.5,
    marginTop: Platform.OS === 'ios' ? 30 : 40,
  },
  textContainer: {
    width: '100%',
    backgroundColor: '#e6f2ec',
    padding: width * 0.06,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: height * 0.35,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginTop: 5,
    fontFamily: 'SourceSerif4',
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#333',
    fontWeight: '600',
    marginTop: 5,
    fontFamily: 'SourceSerif4',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: height * 0.04,
    gap: width * 0.12,
    flexWrap: 'wrap',
  },
  skipButton: {
    borderColor: '#3b7a3e',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    minWidth: width * 0.35,
  },
  skipText: {
    color: '#3b7a3e',
    fontWeight: '600',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#3b7a3e',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    minWidth: width * 0.35,
  },
  nextText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  nextButton1: {
    backgroundColor: '#3b7a3e',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    minWidth: width * 0.35,
  },
  nextText1: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: height * 0.42,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
  },
});
export default styles