import { StyleSheet, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Splash = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const checkToken = async () => {
      setTimeout(() => {
        if (token) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'BottomNavigator' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'OnboardingScreen' }],
          });
        }
      }, 1000);
    };

    checkToken();
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />

      <LinearGradient
        colors={['#fff', '#fff']}
        locations={[0.2, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.container}
      >
        <Image
          source={require('../../../assets/images/Logo.jpeg')}
          style={styles.logo}
        />
      </LinearGradient>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: '75%',
    resizeMode: 'contain',
  },
});
