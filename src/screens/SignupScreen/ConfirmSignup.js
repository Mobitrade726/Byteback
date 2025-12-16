import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {styles_confirmSignup} from './styles';
import Header from '../../constants/Header';

const ConfirmSignup = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {accountType} = route.params;

  return (
    <>
      <Header
        title="You're Registered!"
        navigation={navigation}
        showBack={true}
        showSearch={false}
      />
      <SafeAreaView style={styles_confirmSignup.container}>
        <Text style={styles_confirmSignup.title}>You're Registered!</Text>
        {accountType === 'individual' ? (
          <Image
            source={require('../../../assets/images/confirmsignup.png')}
            style={styles_confirmSignup.image}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require('../../../assets/images/confirmsignupreg.png')}
            style={styles_confirmSignup.image}
            resizeMode="contain"
          />
        )}

        <Text style={styles_confirmSignup.welcomeText}>Welcome to</Text>
        <Text style={styles_confirmSignup.brandText}>Byteback</Text>

        <Text style={styles_confirmSignup.description}>
          Your account has been successfully created as an {accountType}{' '}
          account. You're now ready to explore exclusive inventory!
        </Text>

        <TouchableOpacity
          style={styles_confirmSignup.loginButton}
          onPress={() =>
            navigation.navigate('LoginScreen', {accountType: accountType})
          }>
          <Text style={styles_confirmSignup.loginButtonText}>
            Continue to Login
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default ConfirmSignup;
