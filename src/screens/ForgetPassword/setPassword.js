import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles_setpassword} from './styles';

const setPassword = ({navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedOption, accountType] = useState('individual');

  useEffect(() => {
    const newErrors = {};

    if (!newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
  }, [newPassword, confirmPassword]);

  const handleReset = () => {
    // Final check before submission
    const newErrors = {};
    if (!newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length === 0) {
      navigation.navigate('LoginScreen');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <SafeAreaView style={styles_setpassword.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles_setpassword.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles_setpassword.content}>
        <Text style={styles_setpassword.title}>Reset password</Text>
        <Text style={styles_setpassword.subtitle}>
          Please type something you’ll remember
        </Text>

        {/* New Password */}
        <Text style={styles_setpassword.label}>New password</Text>
        <View style={styles_setpassword.inputWrapper}>
          <TextInput
            style={[
              styles_setpassword.input,
              errors.newPassword && {borderColor: 'red'},
            ]}
            secureTextEntry={!showNew}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={() => setShowNew(!showNew)}>
            <Ionicons
              name={showNew ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#555"
            />
          </TouchableOpacity>
        </View>
        {errors.newPassword && (
          <Text style={styles_setpassword.errorText}>{errors.newPassword}</Text>
        )}

        {/* Confirm Password */}
        <Text style={styles_setpassword.label}>Confirm new password</Text>
        <View style={styles_setpassword.inputWrapper}>
          <TextInput
            style={[
              styles_setpassword.input,
              errors.confirmPassword && {borderColor: 'red'},
            ]}
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons
              name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#555"
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && (
          <Text style={styles_setpassword.errorText}>
            {errors.confirmPassword}
          </Text>
        )}
        <TouchableOpacity
          style={styles_setpassword.button}
          onPress={handleReset}>
          <Text style={styles_setpassword.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles_setpassword.footer}>
        Already have an account?{'   '}
        <Text
          style={styles_setpassword.loginLink}
          onPress={() =>
            navigation.navigate('LoginScreen', {accountType: accountType})
          }>
          Log in
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default setPassword;
