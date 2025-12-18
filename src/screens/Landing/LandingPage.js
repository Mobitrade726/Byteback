import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Header from '../../constants/Header';

const LandingPage = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('individual');

  const options = [
    {
      id: 'individual',
      label: 'As Individual account',
      icon: require('../../../assets/images/indivisual.png'),
    },
    {
      id: 'business',
      label: 'As a Business account',
      icon: require('../../../assets/images/business.png'),
    },
  ];

  return (
    <>
      <Header
        title="Create your account"
        navigation={navigation}
        showBack={true}
        showSearch={false}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {options.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionContainer}
              onPress={() => setSelectedOption(option.id)}>
              {/* <Image source={option.icon} style={styles.icon} /> */}
              <Text style={styles.optionText}>{option.label}</Text>

              <View style={styles.radioCircle}>
                {selectedOption === option.id && (
                  <View style={styles.selectedDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SignUpTab', {accountType: selectedOption})
          }
          style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default LandingPage;
