import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../constants/Header';

const PaymentScreen = ({navigation}) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [showUPI, setShowUPI] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [showNetBanking, setShowNetBanking] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Choose a Payment Method"
        navigation={navigation}
        showBack={true}
      />

      <ScrollView style={{marginHorizontal: 10}}>
        <Text style={styles.discountText}>
          You will get a 5% discount on prepaid payments.
        </Text>

        {/* Pay via UPI */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => {
            setShowUPI(!showUPI);
            setShowCard(false);
            setShowNetBanking(false);
          }}>
          <Image
            source={require('../../../../../assets/images/R.png')}
            style={styles.icon}
          />

          {/* Wrapper with space between text and icon */}
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.sectionTitle}>Pay via UPI</Text>
              <Text style={styles.sectionSubText}>
                Use your UPI app or ID to pay directly
              </Text>
            </View>

            {/* Chevron Icon aligned right */}
            <Ionicons
              name={showUPI ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#000"
            />
          </View>
        </TouchableOpacity>

        {showUPI && (
          <View style={styles.paymentOptions}>
            {[
              {
                name: 'Google Pay',
                image: require('../../../../../assets/images/GooglePay.png'),
              },
              {
                name: 'PhonePe',
                image: require('../../../../../assets/images/Phonepe.png'),
              },
              {
                name: 'Paytm',
                image: require('../../../../../assets/images/paytm.png'),
              },
              {
                name: 'BHIM',
                image: require('../../../../../assets/images/bhim.png'),
              },
            ].map(item => (
              <TouchableOpacity key={item.name} style={styles.upiOption}>
                <Image
                  source={item.image}
                  style={styles.upiImage}
                  resizeMode="contain"
                />
                <Text style={styles.upiText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Pay via Card */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => {
            setShowCard(!showCard);
            setShowUPI(false);
            setShowNetBanking(false);
          }}>
          <Image
            source={require('../../../../../assets/images/payviacard.png')}
            style={styles.icon}
          />
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.sectionTitle}>Pay via Card</Text>
              <Text style={styles.sectionSubText}>Visa, MasterCard, RuPay</Text>
            </View>
            <Ionicons
              name={showCard ? 'chevron-up' : 'chevron-down'}
              size={20}
            />
          </View>
        </TouchableOpacity>

        {showCard && (
          <>
            <Text style={{color: '#000', fontWeight: '600', marginTop: 10}}>
              Cardholder's Name
            </Text>
            <View style={styles.cardContainer}>
              <TextInput
                placeholder="Enter name on card"
                style={styles.input}
              />
              <Text style={{color: '#000', fontWeight: '600', marginBottom: 5}}>
                Card Number
              </Text>

              <TextInput
                placeholder="Enter Card number"
                style={styles.input}
                keyboardType="numeric"
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <Text style={{fontWeight: '600', color: '#000'}}>
                  Expiry Month
                </Text>
                <Text
                  style={{
                    right: 90,
                    fontWeight: '600',
                    color: '#000',
                    marginBottom: 0,
                  }}>
                  Expiry Month
                </Text>
              </View>
              <View style={styles.row}>
                <TextInput
                  placeholder="MM"
                  style={[styles.input, styles.halfInput]}
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="YY"
                  style={[styles.input, styles.halfInput]}
                  keyboardType="numeric"
                />
              </View>
              <Text style={{fontWeight: '600', color: '#000', marginBottom: 8}}>
                Expiry Month
              </Text>
              <TextInput
                placeholder="Enter CVV"
                style={styles.input}
                secureTextEntry
                keyboardType="numeric"
              />
            </View>
          </>
        )}

        {/* Net Banking */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => {
            setShowNetBanking(!showNetBanking);
            setShowUPI(false);
            setShowCard(false);
          }}>
          <Image
            source={require('../../../../../assets/images/banks.png')}
            style={styles.icon}
          />
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.sectionTitle}>Net Banking</Text>
              <Text style={styles.sectionSubText}>
                Pay using your bank’s net banking
              </Text>
            </View>
            <Ionicons
              name={showNetBanking ? 'chevron-up' : 'chevron-down'}
              size={20}
            />
          </View>
        </TouchableOpacity>

        {showNetBanking && (
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select Your Bank</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedBank}
                onValueChange={itemValue => setSelectedBank(itemValue)}>
                <Picker.Item label="Choose a bank" value="" />
                <Picker.Item label="HDFC Bank" value="hdfc" />
                <Picker.Item label="SBI" value="sbi" />
                <Picker.Item label="ICICI Bank" value="icici" />
              </Picker>
            </View>
          </View>
        )}

        {/* COD */}
        <TouchableOpacity style={styles.sectionHeader}>
          <Image
            source={require('../../../../../assets/images/cod.png')}
            style={styles.icon}
          />
          <View>
            <Text style={styles.sectionTitle}>Cash on Delivery (COD)</Text>
            <Text style={styles.sectionSubText}>Pay at your doorstep</Text>
          </View>
        </TouchableOpacity>

        {/* Pay at Store */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Wallet')}
          style={styles.sectionHeader}>
          <Image
            source={require('../../../../../assets/images/playatstor.png')}
            style={styles.icon}
          />
          <View>
            <Text style={styles.sectionTitle}>Pay at Store</Text>
            <Text style={styles.sectionSubText}>Pay during store pickup</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Proceed Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ProcessToPay')}
        style={styles.proceedButton}>
        <Text style={styles.proceedText}>Proceed to Pay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  discountText: {fontSize: 14, color: '#777', marginBottom: 10},
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  sectionTitle: {fontWeight: 'bold', fontSize: 16},
  sectionSubText: {color: 'green', fontSize: 14},
  icon: {width: 40, height: 40, marginRight: 10},
  paymentOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  upiOption: {alignItems: 'center', width: '23%', marginBottom: 10},
  upiImage: {width: 50, height: 50, borderRadius: 10, marginBottom: 5},

  cardContainer: {marginTop: 10},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  halfInput: {width: '48%'},

  dropdownContainer: {marginTop: 10},
  dropdownLabel: {fontSize: 16, marginBottom: 5},
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10, // if needed to separate from icon
  },
  proceedButton: {
    backgroundColor: '#18A558',
    padding: 15,
    marginTop: 25,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  proceedText: {color: '#fff', fontWeight: 'bold', fontSize: 16},
});

export default PaymentScreen;
