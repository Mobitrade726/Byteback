import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetForgotPasswordState,
  forgotMobileAPI,
} from '../../redux/slices/forgotPasswordSlice';
import AlertModal from '../../constants/AlertModal';
import Header from '../../constants/Header';
import responsive from '../../constants/responsive';
import { styles_forgetpassword } from '../ForgetPassword/styles';

const ForgetPhone = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [accountType] = useState('individual');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [contactNumber, setContactNumber] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.forgotPassword);

  console.log('email------------->', email);

  const Submit = async () => {
    setSubmitted(true);
    if (!validateInputs()) return;

    try {
      const response = await dispatch(forgotMobileAPI(email)).unwrap(); // 👈 yahin se API ka data milega
      setContactNumber(response?.data?.contact_number); // ✅ store here

      // 🔥 response === action.payload
      if (response?.status === true) {
        setAlertMessage(response?.message);
        setAlertType('success');
        setAlertVisible(true);
      } else {
        setAlertMessage(response?.message);
        setAlertType('error');
        setAlertVisible(true);
      }
    } catch (err) {
      console.log('err++++++++++++++++', err);
      // ❌ rejectWithValue ka data yahan milega
      setAlertMessage(err);
      setAlertType('error');
      setAlertVisible(true);
    }
  };

  // ✅ Validation logic reused
  const validateInputs = () => {
    const newErrors = {};

    // ✅ Required check
    if (!email?.trim()) {
      newErrors.email = 'Email is required';
    }
    // ✅ Format check
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Real-time validation if form was submitted
  useEffect(() => {
    if (submitted) {
      validateInputs();
    }
  }, [email]);

  return (
    <>
      <View style={styles_forgetpassword.content}>
        <Header
          navigation={navigation}
          showBack={true}
          showSearch={false}
          onBackPress={() => navigation.goBack()}
        />
        <View style={{ paddingHorizontal: responsive.paddingHorizontal(15) }}>
          <Text style={styles_forgetpassword.title}>Forgot Contact No.?</Text>
          <Text style={styles_forgetpassword.description}>
            Don’t worry! It happens. Please enter the email associated with your
            account.
          </Text>

          <Text style={styles_forgetpassword.label}>Email address</Text>
          <TextInput
            style={[
              styles_forgetpassword.input,
              errors.email && { borderColor: 'red' },
            ]}
            placeholder="Enter your email"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ForgetEmail')}>
            <Text style={styles_forgetpassword.labelemail}>Forgot Email?</Text>
          </TouchableOpacity>
          {errors.email && (
            <Text style={styles_forgetpassword.errorText}>{errors.email}</Text>
          )}
          <TouchableOpacity
            style={[
              styles_forgetpassword.button,
              { marginTop: 10 },
              loading && { opacity: 0.7 },
            ]}
            onPress={() => Submit()}
            disabled={loading}
          >
            <Text style={[styles_forgetpassword.buttonText]}>
              {loading ? 'Sending...' : 'Recover Contact No.'}
            </Text>
          </TouchableOpacity>

          <Text style={styles_forgetpassword.footer}>
            Remember Contact No?{' '}
            <Text
              style={styles_forgetpassword.loginLink}
              onPress={() =>
                navigation.navigate('OtpLoginScreen', {
                  accountType: accountType,
                })
              }
            >
              Log in with OTP
            </Text>
          </Text>

          <AlertModal
            visible={alertVisible}
            title={alertType === 'success' ? 'Success' : 'Error'}
            message={alertMessage}
            type={alertType}
            onOk={() => {
              setAlertVisible(false);

              if (alertType === 'success') {
                navigation.navigate('ForgetPhoneDetils', {
                  contact_number: contactNumber,
                });
                // dispatch(resetForgotPasswordState());
              }
            }}
            onClose={() => setAlertVisible(false)}
          />
        </View>
      </View>
    </>
  );
};

export default ForgetPhone;
