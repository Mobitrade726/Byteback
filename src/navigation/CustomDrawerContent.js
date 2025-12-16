import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawerContent = ({navigation}) => {
  const menuItems = [
    {label: 'Home', icon: 'home-outline', route: 'Home', isActive: true},
    {label: 'Discover', icon: 'search-outline', route: 'Discover'},
    {label: 'My Order', icon: 'bag-outline', route: 'Orders'},
    {label: 'My profile', icon: 'person-outline', route: 'Profile'},
    {label: 'My wallet', icon: 'wallet-outline', route: 'Wallet'},
    {
      label: 'My notifications',
      icon: 'information-circle-outline',
      route: 'Notifications',
    },
    {label: 'My wishlist', icon: 'heart-outline', route: 'Wishlist'},
  ];

  const otherItems = [
    {label: 'Setting', icon: 'settings-outline', route: 'Settings'},
    {label: 'Support', icon: 'mail-outline', route: 'Support'},
    {label: 'Contact', icon: 'chatbubble-outline', route: 'Contact'},
    {label: 'About us', icon: 'information-circle-outline', route: 'About'},
  ];

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => navigation.closeDrawer()}>
            <Ionicons name="close" size={28} color="#00AEEF" />
          </TouchableOpacity>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/profile.png')} // Replace with your avatar path
              style={styles.avatar}
            />
            <View style={{marginHorizontal: 15}}>
              <Text style={styles.name}>Sandeep</Text>
              <Text style={styles.email}>sandeepux@gmail.com</Text>
            </View>
          </View>
        </View>

        {/* Main Items */}
        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.item, item.isActive && styles.activeItem]}
              onPress={() => navigation.navigate(item.route)}>
              <Ionicons
                name={item.icon}
                size={20}
                color={item.isActive ? '#000' : '#777'}
                style={styles.icon}
              />
              <Text style={[styles.label, item.isActive && styles.activeLabel]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}

          {/* OTHER label */}
          <Text style={styles.sectionLabel}>OTHER</Text>

          {otherItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => navigation.navigate(item.route)}>
              <Ionicons
                name={item.icon}
                size={20}
                color="#777"
                style={styles.icon}
              />
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFCFA',
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  closeIcon: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginBottom: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -10,
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  menu: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 5,
  },
  activeItem: {
    backgroundColor: '#EAE7E4',
  },
  icon: {
    marginRight: 15,
  },
  label: {
    fontSize: 15,
    color: '#555',
  },
  activeLabel: {
    fontWeight: 'bold',
    color: '#000',
  },
  sectionLabel: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 13,
    color: '#888',
    fontWeight: '600',
  },
});

export default CustomDrawerContent;
