import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Header from '../../../../constants/Header';

const AboutMobiTrade = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
          title="About Byteback"
          navigation={navigation}
          showBack={true}
        />

      {/* Body */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.greenCard}>
          <Text style={styles.sectionTitle}>About Byteback</Text>
          <View style={styles.divider} />

          <Text style={styles.mainTitle}>
            Empowering the Next Generation{'\n'}with Trusted Technology
          </Text>

          <Text style={styles.bodyText}>
            <Text style={styles.bold}>Byteback</Text>, we believe that
            great technology should be accessible to everyone — not just the
            newest, but the smartest.{'\n'}
            By giving a second life to high-quality devices, we{' '}
            <Text style={styles.bold}>reduce e-waste</Text>,{' '}
            <Text style={styles.bold}>support sustainability</Text>, and offer{' '}
            <Text style={styles.bold}>reliable tech</Text> that's been tested,
            verified, and backed by warranty.
          </Text>

          <Text style={styles.bodyText}>
            Whether you're a <Text style={styles.bold}>student</Text>, a{' '}
            <Text style={styles.bold}>startup founder</Text>, or simply someone
            looking for <Text style={styles.bold}>dependable tech</Text> at
            honest prices, Byteback helps you stay connected without
            compromise. We're building a smarter future — one device at a time.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutMobiTrade;
