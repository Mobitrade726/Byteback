import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles_forgetotp} from './styles';

const ForgetOTP = ({navigation}) => {
  const [otpforget, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(20);
  const inputs = useRef([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ✅ Validation logic reused
  const validateInputs = (otp = otpforget) => {
    const newErrors = {};
    const combinedOtp = otp.join('');

    if (combinedOtp.trim() === '') {
      newErrors.otp = 'OTP is required';
    } else if (combinedOtp.length < 4) {
      newErrors.otp = 'OTP must be 4 digits';
    }

    setErrors(newErrors);
  };

  // ✅ Real-time validation if form was submitted
  useEffect(() => {
    if (submitted) {
      validateInputs();
    }
  }, [otpforget]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otpforget];
      newOtp[index] = text;
      setOtp(newOtp);
      // Focus next input
      if (index < 3) {
        inputs.current[index + 1].focus();
      }
    } else if (text === '') {
      const newOtp = [...otpforget];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleVerify = () => {
    
    setSubmitted(true);
    const isValid = validateInputs();

    if (!isValid) return;

    if (Object.keys(errors).length === 0) {
      navigation.navigate('setPassword');
    }
  };

  return (
    <SafeAreaView style={styles_forgetotp.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles_forgetotp.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles_forgetotp.content}>
        <Text style={styles_forgetotp.title}>Please check your email</Text>
        <Text style={styles_forgetotp.subtitle}>
          We’ve sent a code to{' '}
          <Text style={{fontWeight: 'bold'}}>xxxxxxxxxxx@gmail.com</Text>
        </Text>

        <View style={styles_forgetotp.otpContainer}>
          {otpforget.map((digit, index) => (
            <TextInput
              key={index}
              ref={el => (inputs.current[index] = el)}
              style={[
                styles_forgetotp.otpBox,
                errors.otpforget && {borderColor: 'red'},
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
            />
          ))}
        </View>
        {errors.otp && (
          <Text style={styles_forgetotp.errorText}>{errors.otp}</Text>
        )}

        <TouchableOpacity
          style={styles_forgetotp.button}
          onPress={handleVerify}>
          <Text style={styles_forgetotp.buttonText}>Verify</Text>
        </TouchableOpacity>

        <Text style={styles_forgetotp.resendText}>
          Send code again{' '}
          <Text style={{fontWeight: 'bold'}}>{`00:${
            timer < 10 ? '0' + timer : timer
          }`}</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ForgetOTP;
