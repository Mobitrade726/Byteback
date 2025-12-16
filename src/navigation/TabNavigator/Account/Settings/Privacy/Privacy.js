import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Privacy = ({navigation}) => {
  const [personalizedAds, setPersonalizedAds] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Privacy Settings</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={{marginHorizontal: 15, flex: 1}}>
        {/* Toggle Items */}
        <View style={styles.settingItem}>
          <Text style={styles.label}>Personalized Ads</Text>
          <Switch
            value={personalizedAds}
            onValueChange={setPersonalizedAds}
            trackColor={{false: '#ccc', true: '#00AEEF'}}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Location Tracking</Text>
          <Switch
            value={locationTracking}
            onValueChange={setLocationTracking}
            trackColor={{false: '#ccc', true: '#00AEEF'}}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Data Sharing</Text>
          <Switch
            value={dataSharing}
            onValueChange={setDataSharing}
            trackColor={{false: '#ccc', true: '#00AEEF'}}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=> navigation.navigate('TermsConditions')} style={styles.privacyButton}>
          <Feather name="link" size={18} color="#fff" />
          <Text style={styles.privacyButtonText}> Read Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton}>
          <Feather name="bookmark" size={18} color="#fff" />
          <Text style={styles.saveButtonText}> Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF9',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 6,
    left: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#171D1C',
    fontWeight: 'regular',
    fontFamily: 'Source Serif 4',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 5,
  },
  privacyButton: {
    flexDirection: 'row',
    backgroundColor: '#00AEEF',
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  privacyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'medium',
    fontFamily: 'Source Serif 4',
    marginHorizontal: 10,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#28A745',
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'medium',
    fontFamily: 'Source Serif 4',
    marginHorizontal: 10,
  },
});

export default Privacy;
