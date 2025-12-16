import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import Header from '../../../../constants/Header';

export default function SelectAddress({navigation}) {
  const [selectedShipping, setSelectedShipping] = useState(1);
  const [billingSame, setBillingSame] = useState(true);

  const addresses = [
    {
      id: 1,
      name: 'Acme Headquarters',
      address: '123 Elm Street, Springfield, IL 62701',
      icon: 'home-outline',
      default: true,
    },
    {
      id: 2,
      name: 'Main Distribution Center',
      address: '123 Elm Street, Springfield, IL 62701',
      icon: 'warehouse',
    },
    {
      id: 3,
      name: 'Global Solutions Office',
      address: '123 Elm Street, Springfield, IL 62701',
      icon: 'storefront-outline',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Header title="Checkout" navigation={navigation} showBack={true} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Shipping Address */}
          <Text style={styles.sectionTitle}>Shipping Address</Text>

          {addresses.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.addressCard,
                selectedShipping === item.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedShipping(item.id)}>
              <View style={styles.addressRow}>
                <Icon name={item.icon} size={28} color="#11A5D7" />
                <View style={{flex: 1, marginLeft: 10}}>
                  <Text style={styles.addressName}>{item.name}</Text>
                  <Text style={styles.addressText}>{item.address}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

          {/* Billing Address */}
          <Text style={[styles.sectionTitle, {marginTop: 20}]}>
            Billing Address
          </Text>
          <TouchableOpacity
            style={styles.billingRow}
            onPress={() => setBillingSame(!billingSame)}
            activeOpacity={0.7}>
            {/* Custom Radio Circle */}
            <View
              style={[
                styles.circle,
                billingSame ? styles.circleSelected : styles.circleUnselected,
              ]}>
              {billingSame && <View style={styles.innerCircle} />}
            </View>

            {/* Text */}
            <View>
              <Text style={styles.addressName}>Billing Address</Text>
              <Text style={styles.billingNote}>
                Use same address as shipping address
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.savedAddressBtn}>
            <Text style={styles.savedAddressText}>
              Select from saved addresses
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Save & Continue */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Checkout')}
        style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save & Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
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
  billingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 15,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circleSelected: {
    borderColor: 'green',
  },
  circleUnselected: {
    borderColor: 'gray',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  addressName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  billingNote: {
    color: 'gray',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  addressCard: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  selectedCard: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#00A86B',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  // addressName: {fontSize: 15, fontWeight: '600'},
  addressText: {fontSize: 13, color: '#555', marginTop: 2},
  editText: {fontSize: 14, color: '#000', fontWeight: '500'},
  defaultText: {fontSize: 12, color: '#777', marginTop: 5},
  // billingRow: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingHorizontal: 10,
  //   marginVertical: 10,
  // },
  // billingNote: {fontSize: 12, color: '#777'},
  savedAddressBtn: {
    backgroundColor: '#EAEAEA',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  savedAddressText: {fontSize: 14, fontWeight: '500'},
  saveBtn: {
    backgroundColor: '#1C9C48',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderRadius: 10,
  },
  saveBtnText: {color: '#fff', fontSize: 16, fontWeight: '600'},
});
