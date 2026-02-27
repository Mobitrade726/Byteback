import React, { useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import responsive from '../../constants/responsive';

const OTPInput = ({ otp, setOtp, error }) => {
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (inputs.current[index] = ref)}
          style={[
            styles.input,
            error && { borderColor: '#CB444B' },
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={value =>
            handleChange(value, index)
          }
          onKeyPress={e => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: responsive.width(45),
    height: responsive.height(45),
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});