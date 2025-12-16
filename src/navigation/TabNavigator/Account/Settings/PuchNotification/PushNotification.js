import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PushNotification = ({navigation}) => {
  const [showNotifications, setShowNotifications] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);
  const [lockScreenNotification, setLockScreenNotification] = useState(false);

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
          <Text style={styles.headerTitle}>Push Notifications</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={{marginHorizontal: 20}}>
        {/* Setting Items */}
        <View style={styles.item}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Show notifications</Text>
            <Text style={styles.subtitle}>
              Receive push notifications for new messages
            </Text>
          </View>
          <Switch
            value={showNotifications}
            onValueChange={setShowNotifications}
            thumbColor="#fff"
            trackColor={{false: '#ccc', true: '#00AEEF'}}
          />
        </View>

        <View style={styles.item}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Notification sounds</Text>
            <Text style={styles.subtitle}>Play sound for new messages</Text>
          </View>
          <Switch
            value={notificationSound}
            onValueChange={setNotificationSound}
            thumbColor="#fff"
            trackColor={{false: '#ccc', true: '#00AEEF'}}
          />
        </View>

        <View style={styles.item}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Lock screen notifications</Text>
            <Text style={styles.subtitle}>
              Allow notification on the lock screen
            </Text>
          </View>
          <Switch
            value={lockScreenNotification}
            onValueChange={setLockScreenNotification}
            thumbColor="#fff"
            trackColor={{false: '#ccc', true: '#00AEEF'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PushNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F6',
    paddingHorizontal: 0,
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
  },
});
