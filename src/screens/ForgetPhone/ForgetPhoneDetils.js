import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  Animated,
} from 'react-native';
import Header from '../../constants/Header';
import responsive from '../../constants/responsive';
import { styles_forgetpassword } from '../ForgetPassword/styles';
import { useDispatch, useSelector } from 'react-redux';
import { forgotEmailAPI } from '../../redux/slices/forgotPasswordSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import { moderateScale } from 'react-native-size-matters';
import { useRoute } from '@react-navigation/native';

const ForgetPhoneDetils = ({ navigation, route }) => {
  const [accountType] = useState('individual');
  const [errors, setErrors] = useState({});
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const toastAnim = new Animated.Value(0);
  const { contact_number } = route.params || {};

  console.log('contact_number===============>', contact_number);

  useEffect(() => {
    dispatch(forgotEmailAPI());
  }, [dispatch]);

  const copyEmail = () => {
    Clipboard.setString(contact_number || '');
    setShowToast(true);

    Animated.timing(toastAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowToast(false));
    }, 2000);
  };

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
          <Text style={styles_forgetpassword.title}>
            Contact No. Recovered!
          </Text>
          {/* ✅ Success Icon */}
          <View style={styles.iconWrapper}>
            <View style={styles.checkCircle}>
              <Ionicons
                name="checkmark-circle-outline"
                size={42}
                color="#4CAF50"
              />
            </View>
          </View>

          <Text style={styles_forgetpassword.label}>
            Your registered Contact No. is:
          </Text>
          {/* ✅ Email + Copy */}
          <View style={styles.emailRow}>
            <Text style={styles.emailText}>{contact_number}</Text>
            <TouchableOpacity style={styles.copyBtn} onPress={copyEmail}>
              <Ionicons
                name="copy-outline"
                size={moderateScale(10)}
                color="#4CAF50"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles_forgetpassword.button, { marginTop: 10 }]}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={[styles_forgetpassword.buttonText]}>
              Back to Log In
            </Text>
          </TouchableOpacity>
{/* 
          <Text
            style={styles_forgetpassword.loginLink}
            onPress={() =>
              navigation.navigate('ForgetPassword', {
                accountType: accountType,
              })
            }
          >
            Forget password?
          </Text> */}
        </View>
      </View>
    </>
  );
};

export default ForgetPhoneDetils;

const styles = StyleSheet.create({
  iconWrapper: {
    marginVertical: responsive.marginVertical(20),
  },
  checkCircle: {
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsive.marginVertical(5),
  },

  emailText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },

  copyBtn: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    padding: 6,
    borderRadius: 8,
  },
});
