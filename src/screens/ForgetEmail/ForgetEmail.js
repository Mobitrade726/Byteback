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
  forgotEmailAPI,
} from '../../redux/slices/forgotPasswordSlice';
import AlertModal from '../../constants/AlertModal';
import Header from '../../constants/Header';
import responsive from '../../constants/responsive';
import { styles_forgetpassword } from '../ForgetPassword/styles';

const ForgetEmail = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [accountType] = useState('individual');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const dispatch = useDispatch();

  const { loading } = useSelector(
    state => state.forgotPassword,
  );

  const Submit = async () => {
    setSubmitted(true);
    if (!validateInputs()) return;

    try {
      const response = await dispatch(forgotEmailAPI(mobile)).unwrap(); // 👈 yahin se API ka data milega

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
      // ❌ rejectWithValue ka data yahan milega
      setAlertMessage(err);
      setAlertType('error');
      setAlertVisible(true);
    }
  };

  // ✅ Validation logic reused
  const validateInputs = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;

    if (!mobile || mobile.trim() === '') {
      newErrors.mobile = 'Mobile number is required';
    } else if (!phoneRegex.test(mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Real-time validation if form was submitted
  useEffect(() => {
    if (submitted) {
      validateInputs();
    }
  }, [mobile]);

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
          <Text style={styles_forgetpassword.title}>Recover Email ID</Text>
          <Text style={styles_forgetpassword.description}>
            Please enter your registered mobile number to recover your email
            address.
          </Text>

          <Text style={styles_forgetpassword.label}>Mobile number</Text>
          <TextInput
            style={[
              styles_forgetpassword.input,
              errors.mobile && { borderColor: 'red' },
            ]}
            placeholder="Enter your mobile number"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={text => setMobile(text.replace(/[^0-9]/g, ''))}
          />

          {errors.mobile && (
            <Text style={styles_forgetpassword.errorText}>{errors.mobile}</Text>
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
              {loading ? 'Sending...' : 'Recover Email ID'}
            </Text>
          </TouchableOpacity>

          <Text style={styles_forgetpassword.footer}>
            Remember Email ID?{' '}
            <Text
              style={styles_forgetpassword.loginLink}
              onPress={() =>
                navigation.navigate('LoginScreen', { accountType: accountType })
              }
            >
              Log in
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
                navigation.navigate('ForgetEmailDetils');
                dispatch(resetForgotPasswordState());
              }
            }}
            onClose={() => setAlertVisible(false)}
          />
        </View>
      </View>
    </>
  );
};

export default ForgetEmail;
