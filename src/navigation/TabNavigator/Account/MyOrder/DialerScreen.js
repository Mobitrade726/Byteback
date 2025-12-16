import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DialerScreen = ({ route, navigation }) => {
  const phone = route?.params?.phone;

  const [number, setNumber] = useState('');

  // ⭐ Auto-set phone number from route
  useEffect(() => {
    if (phone) {
      setNumber(phone);
    }
  }, [phone]);

  const handlePress = value => {
    setNumber(prev => prev + value);
  };

  const handleDelete = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (!number) return;
    console.log('Calling:', number);
    // Actual phone call
    // Linking.openURL(`tel:${number}`);
  };

  const keys = [
    { value: '1' },
    { value: '2', sub: 'ABC' },
    { value: '3', sub: 'DEF' },
    { value: '4', sub: 'GHI' },
    { value: '5', sub: 'JKL' },
    { value: '6', sub: 'MNO' },
    { value: '7', sub: 'PQRS' },
    { value: '8', sub: 'TUV' },
    { value: '9', sub: 'WXYZ' },
    { value: '*' },
    { value: '0', sub: '+' },
    { value: '#' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Number Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{number || ' '}</Text>

        <TouchableOpacity onPress={handleDelete} disabled={!number}>
          <Ionicons
            name="backspace-outline"
            size={28}
            color={number ? '#000' : '#aaa'}
          />
        </TouchableOpacity>
      </View>

      {/* Dialpad */}
      <View style={styles.dialpadContainer}>
        {keys.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.keyButton}
            onPress={() => handlePress(item.value)}
          >
            <Text style={styles.keyText}>{item.value}</Text>
            {item.sub && <Text style={styles.subText}>{item.sub}</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* Call Button */}
      <TouchableOpacity style={styles.callButton} onPress={handleCall}>
        <Ionicons name="call" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DialerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  displayContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  displayText: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: 2,
  },

  dialpadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  keyButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1.5%',
    borderRadius: 100,
  },

  keyText: {
    fontSize: 32,
    fontWeight: '600',
  },

  subText: {
    fontSize: 12,
    color: '#777',
    marginTop: -5,
  },

  callButton: {
    backgroundColor: '#1DB954',
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
});
