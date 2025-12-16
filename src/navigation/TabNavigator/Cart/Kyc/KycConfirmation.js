import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const KycConfirmation = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>KYC Status</Text>
          <Ionicons name="search" size={20} color="#000" />
        </View>
        {/* Under Review Text */}
        <Text style={styles.statusTitle}>Your account is under review</Text>
        <Text style={styles.statusSubtitle}>
          You can check your account status in the Accounts Panel.
        </Text>

        {/* Center Image Card */}
        <View style={{alignItems: 'center'}}>
          <ImageBackground
            source={{
              uri: 'https://i.postimg.cc/1XfPVgP3/Whats-App-Image-2025-08-08-at-10-25-32-AM.jpg',
            }}
            style={styles.imageCard}
            imageStyle={{
              borderRadius: 10,
              resizeMode: 'contain', // keeps image centered
            }}></ImageBackground>
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>KYC Submitted Successfully</Text>
        <Text style={styles.successMessage}>
          Your documents have been submitted for verification.{'\n'}
          We'll notify you within 24–48 hours.
        </Text>

        {/* Info Card */}
        <View style={styles.infoBox}>
          <View style={{alignSelf: 'center', backgroundColor: '#E8F2F2'}}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#555"
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={styles.nextStepsTitle}>Next Steps</Text>
            <Text style={styles.nextStepsText}>
              You will receive a notification. Dealer benefits will be unlocked
              upon approval.
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* Track Button */}
      <TouchableOpacity style={styles.trackBtn}>
        <Text style={styles.trackBtnText}>Track KYC Status</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default KycConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
    color: '#111',
    marginBottom: 15,
  },
  statusSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  imageCard: {
    height: 300,
    width: '95%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center', // centers children vertically
    alignItems: 'center', // centers children horizontally
    backgroundColor: '#fbc4a6', // fallback background like your screenshot
  },

  successTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical:10,
    marginBottom:20,
  },
  successMessage: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#E8F2F2',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  nextStepsTitle: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
    color: '#222',
  },
  nextStepsText: {
    fontSize: 13,
    color: '#2E9495',
    lineHeight: 18,
  },
  trackBtn: {
    backgroundColor: '#333',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom:10,
  },
  trackBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
