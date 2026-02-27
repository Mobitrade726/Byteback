
// // screens/SuccessScreen.js

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const SuccessScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Verified ✅</Text>
//       <Text style={styles.subtitle}>Welcome to Byteback</Text>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Home')}
//       >
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SuccessScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: '700' },
//   subtitle: { marginVertical: 10 },
//   button: {
//     backgroundColor: '#2E7D32',
//     padding: 15,
//     borderRadius: 8,
//     marginTop: 20,
//     width: 200,
//   },
//   buttonText: { color: '#fff', textAlign: 'center' },
// });


// screens/SuccessScreen.js

// screens/SuccessScreen.js

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';

const SuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#DCEFEA" />

      <View style={styles.card}>
        <Text style={styles.verifiedTitle}>Verified</Text>

        <Image
          source={require('../../../assets/images/otpveryfy.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.welcome}>
          Welcome to{'\n'}
          <Text style={styles.brand}>Byteback</Text>
        </Text>

        <Text style={styles.description}>
          You are Logged in to Byteback App
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.replace('Home')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFBFA',
    borderRadius: 30,
    paddingVertical: 35,
    paddingHorizontal: 25,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
  },

  verifiedTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E1E2D',
    marginBottom: 15,
  },

  image: {
    width: 250,
    height: 250,
  },

  welcome: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    color: '#222',
  },

  brand: {
    color: '#2E7D32',
    fontWeight: '800',
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },

  button: {
    marginTop: 30,
    backgroundColor: '#4E8F4F',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 15,
    elevation: 4,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});