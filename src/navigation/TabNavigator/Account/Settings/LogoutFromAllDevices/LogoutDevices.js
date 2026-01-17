import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Header from '../../../../../constants/Header';
import Toast from 'react-native-toast-message';
import {
  responsiveHeight,
  responsiveFontSize as RF,
  responsiveHeight as RH,
  responsiveWidth as RW,
} from 'react-native-responsive-dimensions';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDevicesAPI,
  logoutSingleDeviceAPI,
  logoutAllDevicesAPI,
} from '../../../../../redux/slices/logoutDevicesSlice';
import { logout } from '../../../../../redux/slices/authSlice';
import { clearAuthStorage } from '../../../../../utils/authStorage';

const LogoutDevices = ({ navigation }) => {
  const dispatch = useDispatch();

  const { devices, loading } = useSelector(state => state.logoutDevices);

  useEffect(() => {
    dispatch(fetchDevicesAPI());
  }, [dispatch]);

  const handleLogoutDevice = device_id => {
    Alert.alert('Confirm Logout', 'Do you want to logout from this device?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(logoutSingleDeviceAPI(device_id))
            .unwrap()
            .then(async message => {
              Toast.show({ type: 'success', text2: message });
              // 🔥 Navigate to login
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              });

              // refresh (optional)
              fetchDevicesAPI();
            })
            .catch(err => {
              console.log(err);
            });
        },
      },
    ]);
  };

  const handleLogoutAllDevices = () => {
    Alert.alert('Confirm Logout', 'Do you want to logout from all device?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(logoutAllDevicesAPI())
            .unwrap()
            .then(message => {
              Toast.show({ type: 'success', text2: message });

              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              });

              fetchDevicesAPI(); // refresh device list
            })
            .catch(err => {
              console.log(err);
            });
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Ionicons
            name="phone-portrait-outline"
            size={scale(14)}
            color="#555"
          />
          <Text style={styles.lastActiveText}>
            Last active: {item.lastActive}
          </Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.deviceName}>{item.name}</Text>
          <TouchableOpacity onPress={() => handleLogoutDevice(item.device_id)}>
            <SimpleLineIcons name="logout" size={scale(20)} color="#C84040" />
          </TouchableOpacity>
        </View>
        <Text style={styles.deviceLocation}>Location: {item.location}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Logged-in Devices"
        navigation={navigation}
        showBack={true}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4AB1E8"
          style={{ marginTop: RH(3) }}
        />
      ) : (
        <FlatList
          data={devices}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: RW(4) }}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: RH(2) }}>
              No logged-in devices found.
            </Text>
          }
        />
      )}

      <TouchableOpacity
        onPress={() => handleLogoutAllDevices()}
        style={styles.logoutAllButton}
      >
        <SimpleLineIcons name="logout" size={scale(18)} color="#fff" />
        <Text style={styles.logoutAllText}> Log out of all devices</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutDevices;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDFB' },
  card: {
    borderWidth: 1,
    borderColor: '#4AB1E8',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: RH(2),
    backgroundColor: '#fff',
  },
  deviceImage: {
    width: '100%',
    height: verticalScale(150),
    borderRadius: moderateScale(8),
  },
  infoContainer: { marginVertical: RH(1.5) },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: RH(0.8) },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastActiveText: {
    fontSize: RF(1.2),
    color: '#666',
    fontWeight: '500',
    marginLeft: RW(1),
  },
  deviceName: {
    fontSize: RF(2),
    fontWeight: '600',
    color: '#000',
    marginBottom: RH(0.5),
  },
  deviceLocation: { fontSize: RF(1.6), color: '#444', fontWeight: '400' },
  logoutAllButton: {
    flexDirection: 'row',
    backgroundColor: '#C84040',
    margin: RW(4),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: RH(1.8),
    marginBottom: responsiveHeight(1),
  },
  logoutAllText: {
    color: '#fff',
    fontSize: RF(1.8),
    fontWeight: '500',
    marginHorizontal: RW(1),
  },
});
