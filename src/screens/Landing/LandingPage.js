import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
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
      <View style={styles.containermain}>
        <Header
          title="Create your account"
          navigation={navigation}
          showBack={true}
          showSearch={false}
        />
        <View style={styles.container}>
          <Text style={styles.buttonTextLebel}>Login or Sign Up as</Text>
          <Text style={styles.buttonTextOptions}>Please select an option</Text>

          {options.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionContainer,
                selectedOption === option.id && styles.selectedOptionBorder,
              ]}
              onPress={() => setSelectedOption(option.id)}
            >
              <Image source={option.icon} style={styles.icon} />
              <Text style={styles.optionText}>{option.label}</Text>

              <View style={styles.radioCircle}>
                {selectedOption === option.id && (
                  <View style={styles.selectedDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SignUpTab', { accountType: selectedOption })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LandingPage;
