import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles_forgetpassword} from './styles';

const ForgotPasswordScreen = ({navigation}) => {
  const [emailforget, setEmail] = useState('');
  const [selectedOption, accountType] = useState('individual');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // ✅ Validation logic reused
  const validateInputs = (email = emailforget) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (
      !emailRegex.test(email.trim()) &&
      !phoneRegex.test(email.trim())
    ) {
      newErrors.email = 'Enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Real-time validation if form was submitted
  useEffect(() => {
    if (submitted) {
      validateInputs();
    }
  }, [emailforget]);

  const handleSendCode = () => {
    setSubmitted(true);
    const isValid = validateInputs();

    if (!isValid) return;
    if (Object.keys(errors).length === 0) {
      navigation.navigate('ForgetOTP');
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <SafeAreaView style={styles_forgetpassword.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles_forgetpassword.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        {/* Content */}
        <View style={styles_forgetpassword.content}>
          <Text style={styles_forgetpassword.title}>Forgot password?</Text>
          <Text style={styles_forgetpassword.description}>
            Don’t worry! It happens. Please enter the email associated with your
            account.
          </Text>

          <Text style={styles_forgetpassword.label}>Email address</Text>
          <TextInput
            style={[
              styles_forgetpassword.input,
              errors.email && {borderColor: 'red'},
            ]}
            placeholder="Enter your email address"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            keyboardType="email-address"
            value={emailforget}
            onChangeText={setEmail}
          />
          {errors.email && (
            <Text style={styles_forgetpassword.errorText}>{errors.email}</Text>
          )}
          <TouchableOpacity
            style={styles_forgetpassword.button}
            onPress={handleSendCode}>
            <Text style={styles_forgetpassword.buttonText}>Send Code</Text>
          </TouchableOpacity>

          <Text style={styles_forgetpassword.footer}>
            Remember password?{' '}
            <Text
              style={styles_forgetpassword.loginLink}
              onPress={() =>
                navigation.navigate('LoginScreen', {accountType: accountType})
              }>
              Log in
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ForgotPasswordScreen;
