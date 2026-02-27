import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, resendOtp } from '../../redux/slices/mobileauthSlice';
import OTPInput from './OTPInput';
import RNOtpVerify from 'react-native-otp-verify';
import responsive from '../../constants/responsive';
import { setAuthData } from '../../redux/slices/authSlice';
import Header from '../../constants/Header';

const OTP_LENGTH = 6;

const OTPScreen = ({ route, navigation }) => {
  const { mobile } = route.params;

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.mobileauth);

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(40);

  const otpValue = otp.join('');

  // ✅ Android Auto Read
  useEffect(() => {
    if (Platform.OS === 'android') {
      RNOtpVerify.getOtp()
        .then(() => {
          RNOtpVerify.addListener(message => {
            const otpMatch = message.match(/\d{6}/);
            if (otpMatch) {
              setOtp(otpMatch[0].split(''));
            }
            RNOtpVerify.removeListener();
          });
        })
        .catch(console.log);
    }

    return () => RNOtpVerify.removeListener();
  }, []);

  // ✅ Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Auto Verify
  useEffect(() => {
    if (otpValue.length === OTP_LENGTH) {
      verifyOTPHandler();
    }
  }, [otpValue]);

  const verifyOTPHandler = async () => {
    if (otpValue.length !== OTP_LENGTH) return;

    try {
      const data = await dispatch(
        verifyOtp({ mobile, otp: otpValue }),
      ).unwrap();
      const token = data?.token;
      const userId = data?.userId;
      const deviceId = data?.deviceId;
      dispatch(setAuthData({ token, userId, deviceId }));
      navigation.replace('SuccessScreen');
    } catch (error) {
      console.log('OTP Failed');
    }
  };

  // ✅ RESEND HANDLER
  const resendOTPHandler = async () => {
    await dispatch(resendOtp(mobile));
    setTimer(30);
    setOtp(Array(OTP_LENGTH).fill(''));
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
        <Text style={styles.title}>Enter code</Text>

        <Text style={styles.subtitle}>We’ve sent an SMS to +91 {mobile}</Text>

        <OTPInput otp={otp} setOtp={setOtp} error={!!error} />

        {error && <Text style={styles.error}>{error}</Text>}

        {timer > 0 ? (
          <Text style={styles.timer}>
            Send again 00:{timer < 10 ? `0${timer}` : timer}
          </Text>
        ) : (
          <TouchableOpacity onPress={resendOTPHandler}>
            <Text style={styles.resend}>Resend Code</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            otpValue.length !== OTP_LENGTH && {
              opacity: 0.5,
            },
          ]}
          disabled={otpValue.length !== OTP_LENGTH || loading}
          onPress={verifyOTPHandler}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: responsive.fontSize(30),
    fontWeight: 'bold',
    color: '#1A1A2D',
  },
  subtitle: {
    color: '#666666',
    fontSize: responsive.fontSize(16),
    marginVertical: responsive.marginVertical(30),
  },
  error: {
    color: '#CB444B',
    marginTop: 15,
    textAlign: 'center',
  },
  timer: {
    marginTop: 20,
    textAlign: 'center',
    color: '#999',
    fontSize: responsive.fontSize(16),
  },
  resend: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666666',
    fontSize: responsive.fontSize(16),
  },
  button: {
    marginTop: responsive.marginTop(30),
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
