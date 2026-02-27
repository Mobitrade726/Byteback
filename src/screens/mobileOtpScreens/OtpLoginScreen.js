import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../../redux/slices/mobileauthSlice';
import { checkPhone } from '../../redux/slices/mobileauthSlice';
import responsive from '../../constants/responsive';
import AlertModal from '../../constants/AlertModal';
import Header from '../../constants/Header';

const OtpLoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error');
  const [alertButtons, setAlertButtons] = useState({
    primaryText: '',
    secondaryText: '',
    onPrimaryPress: () => {},
    onSecondaryPress: () => {},
  });

  const { loading, error } = useSelector(state => state.mobileauth);

  // const sendOTPHandler = async () => {
  //   if (mobile.length !== 10) return;

  //   // 1️⃣ First check phone
  //   const checkResult = await dispatch(checkPhone(mobile));

  //   console.log(
  //     'checkResult------------------>',
  //     checkResult?.payload?.message,
  //   );

  //   if (checkPhone.fulfilled.match(checkResult)) {
  //     // Optional: Agar API se success flag aata hai
  //     if (checkResult.payload?.registered) {
  //       // 2️⃣ Then send OTP
  //       const otpResult = await dispatch(sendOtp(mobile));

  //       if (sendOtp.fulfilled.match(otpResult)) {
  //         navigation.navigate('OTPScreen', { mobile });
  //       }
  //     } else {
  //       setAlertTitle('Mobile Number Not Registered');
  //       setAlertMessage(
  //         checkResult?.payload?.message ||
  //           'This mobile number is not linked to any existing account.',
  //       );
  //       setAlertType('error');

  //       setAlertButtons({
  //         primaryText: 'Recover Phone No.',
  //         secondaryText: 'Try Another Number',
  //         onPrimaryPress: () => {
  //           setAlertVisible(false);
  //           navigation.navigate('RecoverPhoneScreen'); // 👈 apna screen name
  //         },
  //         onSecondaryPress: () => {
  //           setAlertVisible(false);
  //           setMobile('');
  //         },
  //       });

  //       setAlertVisible(true);
  //       // alert(checkResult?.payload?.message);
  //     }
  //   }
  // };

  const sendOTPHandler = async () => {
    if (mobile.length !== 10) return;

    const checkResult = await dispatch(checkPhone(mobile));

    console.log(
      'checkResult-------------------+++++++++++',
      checkResult?.payload?.message,
    );

    if (checkPhone.fulfilled.match(checkResult)) {
      if (checkResult.payload?.status == false) {
        const otpResult = await dispatch(sendOtp(mobile));

        if (sendOtp.fulfilled.match(otpResult)) {
          navigation.navigate('OTPScreen', { mobile });
        }
      } else {
        setAlertTitle('Mobile Number Not Registered');
        setAlertMessage(
          'This mobile number is not linked to any existing account.',
        );
        setAlertType('error');

        setAlertButtons({
          primaryText: 'Recover Phone No.',
          secondaryText: 'Try Another Number',
          onPrimaryPress: () => {
            setAlertVisible(false);
            navigation.navigate('ForgetPhone');
          },
          onSecondaryPress: () => {
            setAlertVisible(false);
            // setMobile('');
          },
        });

        setAlertVisible(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        showBack={true}
        showSearch={false}
        onBackPress={() => navigation.goBack()}
      />
      <View style={{ padding: responsive.padding(20) }}>
        <Text style={styles.title}>Enter Registered Contact no.</Text>

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Phone"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
        />

        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        {/* 
        <TouchableOpacity
          style={[styles.button, mobile.length !== 10 && { opacity: 0.5 }]}
          disabled={mobile.length !== 10 || loading}
          onPress={sendOTPHandler}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Sending...' : 'Send OTP'}
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.button, mobile.length !== 10 && { opacity: 0.5 }]}
          disabled={mobile.length !== 10 || loading}
          onPress={sendOTPHandler}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send OTP</Text>
          )}
        </TouchableOpacity>

        <AlertModal
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          type={alertType}
          primaryText={alertButtons.primaryText}
          secondaryText={alertButtons.secondaryText}
          onPrimaryPress={alertButtons.onPrimaryPress}
          onSecondaryPress={alertButtons.onSecondaryPress}
          onClose={() => setAlertVisible(false)}
        />
      </View>
    </View>
  );
};

export default OtpLoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: responsive.fontSize(30),
    fontWeight: 'bold',
    // marginTop: responsive.marginBottom(50),
    color: '#1A1A2D',
  },
  input: {
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 12,
    padding: responsive.padding(13),
    marginVertical: responsive.marginVertical(20),
  },
  button: {
    backgroundColor: '#1C9C48',
    padding: responsive.padding(16),
    borderRadius: responsive.borderRadius(12),
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: responsive.fontSize(17),
  },
});
