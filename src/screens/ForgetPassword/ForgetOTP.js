// // // // // // import React, { useRef, useState, useEffect } from 'react';
// // // // // // import {
// // // // // //   View,
// // // // // //   Text,
// // // // // //   TextInput,
// // // // // //   TouchableOpacity,
// // // // // //   View,
// // // // // // } from 'react-native';
// // // // // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // // // // import { styles_forgetotp } from './styles';
// // // // // // import { useSelector } from 'react-redux';

// // // // // // const ForgetOTP = ({ navigation }) => {
// // // // // //   const [otpforget, setOtp] = useState(['', '', '', '']);
// // // // // //   const [timer, setTimer] = useState(20);
// // // // // //   const inputs = useRef([]);
// // // // // //   const [errors, setErrors] = useState({});
// // // // // //   const [submitted, setSubmitted] = useState(false);
// // // // // //   const { verifyLoading, verifySuccess, verifyError } = useSelector(
// // // // // //     state => state.forgotPassword,
// // // // // //   );

// // // // // //   // ✅ Validation logic reused
// // // // // //   const validateInputs = (otp = otpforget) => {
// // // // // //     const newErrors = {};
// // // // // //     const combinedOtp = otp.join('');

// // // // // //     if (combinedOtp.trim() === '') {
// // // // // //       newErrors.otp = 'OTP is required';
// // // // // //     } else if (combinedOtp.length < 4) {
// // // // // //       newErrors.otp = 'OTP must be 4 digits';
// // // // // //     }

// // // // // //     setErrors(newErrors);
// // // // // //   };

// // // // // //   // ✅ Real-time validation if form was submitted
// // // // // //   useEffect(() => {
// // // // // //     if (submitted) {
// // // // // //       validateInputs();
// // // // // //     }
// // // // // //   }, [otpforget]);

// // // // // //   useEffect(() => {
// // // // // //     if (timer > 0) {
// // // // // //       const interval = setInterval(() => setTimer(timer - 1), 1000);
// // // // // //       return () => clearInterval(interval);
// // // // // //     }
// // // // // //   }, [timer]);

// // // // // //   const handleChange = (text, index) => {
// // // // // //     if (/^\d$/.test(text)) {
// // // // // //       const newOtp = [...otpforget];
// // // // // //       newOtp[index] = text;
// // // // // //       setOtp(newOtp);
// // // // // //       // Focus next input
// // // // // //       if (index < 3) {
// // // // // //         inputs.current[index + 1].focus();
// // // // // //       }
// // // // // //     } else if (text === '') {
// // // // // //       const newOtp = [...otpforget];
// // // // // //       newOtp[index] = '';
// // // // // //       setOtp(newOtp);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleVerify = () => {
// // // // // //     setSubmitted(true);
// // // // // //     const isValid = validateInputs();

// // // // // //     if (!isValid) return;

// // // // // //     if (Object.keys(errors).length === 0) {
// // // // // //       navigation.navigate('setPassword');
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <View style={styles_forgetotp.container}>
// // // // // //       {/* Back Button */}
// // // // // //       <TouchableOpacity
// // // // // //         style={styles_forgetotp.backButton}
// // // // // //         onPress={() => navigation.goBack()}
// // // // // //       >
// // // // // //         <Ionicons name="chevron-back-outline" size={24} color="#000" />
// // // // // //       </TouchableOpacity>

// // // // // //       <View style={styles_forgetotp.content}>
// // // // // //         <Text style={styles_forgetotp.title}>Please check your email</Text>
// // // // // //         <Text style={styles_forgetotp.subtitle}>
// // // // // //           We’ve sent a code to{' '}
// // // // // //           <Text style={{ fontWeight: 'bold' }}>xxxxxxxxxxx@gmail.com</Text>
// // // // // //         </Text>

// // // // // //         <View style={styles_forgetotp.otpContainer}>
// // // // // //           {otpforget.map((digit, index) => (
// // // // // //             <TextInput
// // // // // //               key={index}
// // // // // //               ref={el => (inputs.current[index] = el)}
// // // // // //               style={[
// // // // // //                 styles_forgetotp.otpBox,
// // // // // //                 errors.otpforget && { borderColor: 'red' },
// // // // // //               ]}
// // // // // //               keyboardType="number-pad"
// // // // // //               maxLength={1}
// // // // // //               value={digit}
// // // // // //               onChangeText={text => handleChange(text, index)}
// // // // // //             />
// // // // // //           ))}
// // // // // //         </View>
// // // // // //         {errors.otp && (
// // // // // //           <Text style={styles_forgetotp.errorText}>{errors.otp}</Text>
// // // // // //         )}

// // // // // //         <TouchableOpacity
// // // // // //           style={styles_forgetotp.button}
// // // // // //           onPress={handleVerify}
// // // // // //         >
// // // // // //           <Text style={styles_forgetotp.buttonText}>Verify</Text>
// // // // // //         </TouchableOpacity>

// // // // // //         <Text style={styles_forgetotp.resendText}>
// // // // // //           Send code again{' '}
// // // // // //           <Text style={{ fontWeight: 'bold' }}>{`00:${
// // // // // //             timer < 10 ? '0' + timer : timer
// // // // // //           }`}</Text>
// // // // // //         </Text>
// // // // // //       </View>
// // // // // //     </View>
// // // // // //   );
// // // // // // };

// // // // // // export default ForgetOTP;

// // // // // import React, { useRef, useState, useEffect } from 'react';
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   TextInput,
// // // // //   TouchableOpacity,
// // // // //   View,
// // // // //   ActivityIndicator,
// // // // // } from 'react-native';
// // // // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // // // import { styles_forgetotp } from './styles';
// // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // import { verifyOtpAPI } from '../../redux/slices/forgotPasswordSlice';

// // // // // const ForgetOTP = ({ navigation, route }) => {
// // // // //   const { email } = route.params; // 👈 email from previous screen

// // // // //   const dispatch = useDispatch();
// // // // //   const inputs = useRef([]);

// // // // //   const [otpforget, setOtp] = useState(['', '', '', '']);
// // // // //   const [timer, setTimer] = useState(20);
// // // // //   const [errors, setErrors] = useState({});
// // // // //   const [submitted, setSubmitted] = useState(false);

// // // // //   const { verifyLoading, verifySuccess, verifyError } = useSelector(
// // // // //     state => state.forgotPassword,
// // // // //   );

// // // // //   /* ================= VALIDATION ================= */
// // // // //   const validateInputs = (otp = otpforget) => {
// // // // //     const newErrors = {};
// // // // //     const combinedOtp = otp.join('');

// // // // //     if (combinedOtp.trim() === '') {
// // // // //       newErrors.otp = 'OTP is required';
// // // // //     } else if (combinedOtp.length < 4) {
// // // // //       newErrors.otp = 'OTP must be 4 digits';
// // // // //     }

// // // // //     setErrors(newErrors);
// // // // //     return Object.keys(newErrors).length === 0;
// // // // //   };

// // // // //   /* ================= REAL TIME VALIDATION ================= */
// // // // //   useEffect(() => {
// // // // //     if (submitted) {
// // // // //       validateInputs();
// // // // //     }
// // // // //   }, [otpforget]);

// // // // //   /* ================= TIMER ================= */
// // // // //   useEffect(() => {
// // // // //     if (timer > 0) {
// // // // //       const interval = setInterval(() => {
// // // // //         setTimer(prev => prev - 1);
// // // // //       }, 1000);
// // // // //       return () => clearInterval(interval);
// // // // //     }
// // // // //   }, [timer]);

// // // // //   /* ================= OTP INPUT ================= */
// // // // //   const handleChange = (text, index) => {
// // // // //     if (/^\d?$/.test(text)) {
// // // // //       const newOtp = [...otpforget];
// // // // //       newOtp[index] = text;
// // // // //       setOtp(newOtp);

// // // // //       if (text && index < 3) {
// // // // //         inputs.current[index + 1]?.focus();
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   /* ================= VERIFY OTP ================= */
// // // // //   const handleVerify = () => {
// // // // //     setSubmitted(true);
// // // // //     const isValid = validateInputs();
// // // // //     if (!isValid) return;

// // // // //     const otp = otpforget.join('');

// // // // //     dispatch(
// // // // //       verifyOtpAPI({
// // // // //         email,
// // // // //         otp,
// // // // //       }),
// // // // //     );
// // // // //   };

// // // // //   /* ================= SUCCESS NAVIGATION ================= */
// // // // //   useEffect(() => {
// // // // //     if (verifySuccess) {
// // // // //       navigation.replace('setPassword', { email });
// // // // //     }
// // // // //   }, [verifySuccess]);

// // // // //   return (
// // // // //     <View style={styles_forgetotp.container}>
// // // // //       {/* Back Button */}
// // // // //       <TouchableOpacity
// // // // //         style={styles_forgetotp.backButton}
// // // // //         onPress={() => navigation.goBack()}>
// // // // //         <Ionicons name="chevron-back-outline" size={24} color="#000" />
// // // // //       </TouchableOpacity>

// // // // //       <View style={styles_forgetotp.content}>
// // // // //         <Text style={styles_forgetotp.title}>Please check your email</Text>

// // // // //         <Text style={styles_forgetotp.subtitle}>
// // // // //           We’ve sent a code to{' '}
// // // // //           <Text style={{ fontWeight: 'bold' }}>{email}</Text>
// // // // //         </Text>

// // // // //         {/* OTP BOXES */}
// // // // //         <View style={styles_forgetotp.otpContainer}>
// // // // //           {otpforget.map((digit, index) => (
// // // // //             <TextInput
// // // // //               key={index}
// // // // //               ref={el => (inputs.current[index] = el)}
// // // // //               style={[
// // // // //                 styles_forgetotp.otpBox,
// // // // //                 errors.otp && { borderColor: 'red' },
// // // // //               ]}
// // // // //               keyboardType="number-pad"
// // // // //               maxLength={1}
// // // // //               value={digit}
// // // // //               onChangeText={text => handleChange(text, index)}
// // // // //             />
// // // // //           ))}
// // // // //         </View>

// // // // //         {/* ERROR */}
// // // // //         {errors.otp && (
// // // // //           <Text style={styles_forgetotp.errorText}>{errors.otp}</Text>
// // // // //         )}

// // // // //         {verifyError && (
// // // // //           <Text style={styles_forgetotp.errorText}>{verifyError}</Text>
// // // // //         )}

// // // // //         {/* VERIFY BUTTON */}
// // // // //         <TouchableOpacity
// // // // //           style={styles_forgetotp.button}
// // // // //           onPress={handleVerify}
// // // // //           disabled={verifyLoading}>
// // // // //           {verifyLoading ? (
// // // // //             <ActivityIndicator color="#fff" />
// // // // //           ) : (
// // // // //             <Text style={styles_forgetotp.buttonText}>Verify</Text>
// // // // //           )}
// // // // //         </TouchableOpacity>

// // // // //         {/* TIMER */}
// // // // //         <Text style={styles_forgetotp.resendText}>
// // // // //           Send code again{' '}
// // // // //           <Text style={{ fontWeight: 'bold' }}>
// // // // //             {`00:${timer < 10 ? '0' + timer : timer}`}
// // // // //           </Text>
// // // // //         </Text>
// // // // //       </View>
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // export default ForgetOTP;

// // // // import React, { useRef, useState, useEffect } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TextInput,
// // // //   TouchableOpacity,
// // // //   View,
// // // //   ActivityIndicator,
// // // // } from 'react-native';
// // // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // // import { styles_forgetotp } from './styles';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { verifyOtpAPI } from '../../redux/slices/forgotPasswordSlice';

// // // // const ForgetOTP = ({ navigation, route }) => {
// // // //   const { email } = route.params;

// // // //   const dispatch = useDispatch();
// // // //   const inputs = useRef([]);

// // // //   // 🔥 6 DIGIT OTP
// // // //   const [otpforget, setOtp] = useState(['', '', '', '', '', '']);
// // // //   const [timer, setTimer] = useState(20);
// // // //   const [errors, setErrors] = useState({});
// // // //   const [submitted, setSubmitted] = useState(false);

// // // //   const { verifyLoading, verifySuccess, verifyError } = useSelector(
// // // //     state => state.forgotPassword,
// // // //   );

// // // //   /* ================= VALIDATION ================= */
// // // //   const validateInputs = (otp = otpforget) => {
// // // //     const newErrors = {};
// // // //     const combinedOtp = otp.join('');

// // // //     if (combinedOtp.trim() === '') {
// // // //       newErrors.otp = 'OTP is required';
// // // //     } else if (combinedOtp.length < 6) {
// // // //       newErrors.otp = 'OTP must be 6 digits';
// // // //     }

// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   /* ================= REAL TIME VALIDATION ================= */
// // // //   useEffect(() => {
// // // //     if (submitted) {
// // // //       validateInputs();
// // // //     }
// // // //   }, [otpforget]);

// // // //   /* ================= TIMER ================= */
// // // //   useEffect(() => {
// // // //     if (timer > 0) {
// // // //       const interval = setInterval(() => {
// // // //         setTimer(prev => prev - 1);
// // // //       }, 1000);
// // // //       return () => clearInterval(interval);
// // // //     }
// // // //   }, [timer]);

// // // //   /* ================= OTP INPUT ================= */
// // // //   const handleChange = (text, index) => {
// // // //     if (/^\d?$/.test(text)) {
// // // //       const newOtp = [...otpforget];
// // // //       newOtp[index] = text;
// // // //       setOtp(newOtp);

// // // //       // 🔥 auto focus next (6 digits)
// // // //       if (text && index < 5) {
// // // //         inputs.current[index + 1]?.focus();
// // // //       }
// // // //     }
// // // //   };

// // // //   /* ================= VERIFY OTP ================= */
// // // //   const handleVerify = () => {
// // // //     setSubmitted(true);
// // // //     const isValid = validateInputs();
// // // //     if (!isValid) return;

// // // //     const otp = otpforget.join('');

// // // //     dispatch(
// // // //       verifyOtpAPI({
// // // //         email,
// // // //         otp,
// // // //       }),
// // // //     );
// // // //   };

// // // //   /* ================= SUCCESS ================= */
// // // //   useEffect(() => {
// // // //     if (verifySuccess) {
// // // //       navigation.replace('setPassword', { email });
// // // //     }
// // // //   }, [verifySuccess]);

// // // //   return (
// // // //     <View style={styles_forgetotp.container}>
// // // //       {/* Back Button */}
// // // //       <TouchableOpacity
// // // //         style={styles_forgetotp.backButton}
// // // //         onPress={() => navigation.goBack()}>
// // // //         <Ionicons name="chevron-back-outline" size={24} color="#000" />
// // // //       </TouchableOpacity>

// // // //       <View style={styles_forgetotp.content}>
// // // //         <Text style={styles_forgetotp.title}>Please check your email</Text>

// // // //         <Text style={styles_forgetotp.subtitle}>
// // // //           We’ve sent a code to{' '}
// // // //           <Text style={{ fontWeight: 'bold' }}>{email}</Text>
// // // //         </Text>

// // // //         {/* 🔥 6 OTP BOXES */}
// // // //         <View style={styles_forgetotp.otpContainer}>
// // // //           {otpforget.map((digit, index) => (
// // // //             <TextInput
// // // //               key={index}
// // // //               ref={el => (inputs.current[index] = el)}
// // // //               style={[
// // // //                 styles_forgetotp.otpBox,
// // // //                 errors.otp && { borderColor: 'red' },
// // // //               ]}
// // // //               keyboardType="number-pad"
// // // //               maxLength={1}
// // // //               value={digit}
// // // //               onChangeText={text => handleChange(text, index)}
// // // //             />
// // // //           ))}
// // // //         </View>

// // // //         {/* ERRORS */}
// // // //         {errors.otp && (
// // // //           <Text style={styles_forgetotp.errorText}>{errors.otp}</Text>
// // // //         )}

// // // //         {verifyError && (
// // // //           <Text style={styles_forgetotp.errorText}>{verifyError}</Text>
// // // //         )}

// // // //         {/* VERIFY BUTTON */}
// // // //         <TouchableOpacity
// // // //           style={styles_forgetotp.button}
// // // //           onPress={handleVerify}
// // // //           disabled={verifyLoading}>
// // // //           {verifyLoading ? (
// // // //             <ActivityIndicator color="#fff" />
// // // //           ) : (
// // // //             <Text style={styles_forgetotp.buttonText}>Verify</Text>
// // // //           )}
// // // //         </TouchableOpacity>

// // // //         {/* TIMER */}
// // // //         <Text style={styles_forgetotp.resendText}>
// // // //           Send code again{' '}
// // // //           <Text style={{ fontWeight: 'bold' }}>
// // // //             {`00:${timer < 10 ? '0' + timer : timer}`}
// // // //           </Text>
// // // //         </Text>
// // // //       </View>
// // // //     </View>
// // // //   );
// // // // };

// // // // export default ForgetOTP;

// // // import React, { useRef, useState, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   View,
// // //   ActivityIndicator,
// // // } from 'react-native';
// // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // import { styles_forgetotp } from './styles';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { verifyOtpAPI } from '../../redux/slices/forgotPasswordSlice';

// // // const ForgetOTP = ({ navigation, route }) => {
// // //   const { email } = route.params;

// // //   const dispatch = useDispatch();
// // //   const inputs = useRef([]);

// // //   // 🔥 6 DIGIT OTP
// // //   const [otpforget, setOtp] = useState(['', '', '', '', '', '']);
// // //   const [timer, setTimer] = useState(20);
// // //   const [errors, setErrors] = useState({});
// // //   const [submitted, setSubmitted] = useState(false);

// // //   const { verifyLoading, verifySuccess, verifyError } = useSelector(
// // //     state => state.forgotPassword,
// // //   );

// // //   /* ================= VALIDATION ================= */
// // //   const validateInputs = (otp = otpforget) => {
// // //     const newErrors = {};
// // //     const combinedOtp = otp.join('');

// // //     if (combinedOtp.trim() === '') {
// // //       newErrors.otp = 'OTP is required';
// // //     } else if (combinedOtp.length < 6) {
// // //       newErrors.otp = 'OTP must be 6 digits';
// // //     }

// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   /* ================= REAL TIME VALIDATION ================= */
// // //   useEffect(() => {
// // //     if (submitted) {
// // //       validateInputs();
// // //     }
// // //   }, [otpforget]);

// // //   /* ================= TIMER ================= */
// // //   useEffect(() => {
// // //     if (timer > 0) {
// // //       const interval = setInterval(() => {
// // //         setTimer(prev => prev - 1);
// // //       }, 1000);
// // //       return () => clearInterval(interval);
// // //     }
// // //   }, [timer]);

// // //   /* ================= OTP INPUT ================= */
// // //   const handleChange = (text, index) => {
// // //     if (/^\d?$/.test(text)) {
// // //       const newOtp = [...otpforget];
// // //       newOtp[index] = text;
// // //       setOtp(newOtp);

// // //       // 🔥 auto focus next (6 digits)
// // //       if (text && index < 5) {
// // //         inputs.current[index + 1]?.focus();
// // //       }
// // //     }
// // //   };

// // //   /* ================= VERIFY OTP ================= */
// // //   const handleVerify = () => {
// // //     setSubmitted(true);
// // //     const isValid = validateInputs();
// // //     if (!isValid) return;

// // //     const otp = otpforget.join('');

// // //     dispatch(
// // //       verifyOtpAPI({
// // //         email,
// // //         otp,
// // //       }),
// // //     );
// // //   };

// // //   /* ================= SUCCESS ================= */
// // //   useEffect(() => {
// // //     if (verifySuccess) {
// // //       navigation.replace('setPassword', { email });
// // //     }
// // //   }, [verifySuccess]);

// // //   return (
// // //     <View style={styles_forgetotp.container}>
// // //       {/* Back Button */}
// // //       <TouchableOpacity
// // //         style={styles_forgetotp.backButton}
// // //         onPress={() => navigation.goBack()}>
// // //         <Ionicons name="chevron-back-outline" size={18} color="#000" />
// // //       </TouchableOpacity>

// // //       <View style={styles_forgetotp.content}>
// // //         <Text style={styles_forgetotp.title}>Please check your email</Text>

// // //         <Text style={styles_forgetotp.subtitle}>
// // //           We’ve sent a code to{' '}
// // //           <Text style={{ fontWeight: 'bold' }}>{email}</Text>
// // //         </Text>

// // //         {/* 🔥 6 OTP BOXES */}
// // //         <View style={styles_forgetotp.otpContainer}>
// // //           {otpforget.map((digit, index) => (
// // //             <TextInput
// // //               key={index}
// // //               ref={el => (inputs.current[index] = el)}
// // //               style={[
// // //                 styles_forgetotp.otpBox,
// // //                 errors.otp && { borderColor: 'red' },
// // //               ]}
// // //               keyboardType="number-pad"
// // //               maxLength={1}
// // //               value={digit}
// // //               onChangeText={text => handleChange(text, index)}
// // //             />
// // //           ))}
// // //         </View>

// // //         {/* ERRORS */}
// // //         {errors.otp && (
// // //           <Text style={styles_forgetotp.errorText}>{errors.otp}</Text>
// // //         )}

// // //         {verifyError && (
// // //           <Text style={styles_forgetotp.errorText}>{verifyError}</Text>
// // //         )}

// // //         {/* VERIFY BUTTON */}
// // //         <TouchableOpacity
// // //           style={styles_forgetotp.button}
// // //           onPress={handleVerify}
// // //           disabled={verifyLoading}>
// // //           {verifyLoading ? (
// // //             <ActivityIndicator color="#fff" />
// // //           ) : (
// // //             <Text style={styles_forgetotp.buttonText}>Verify</Text>
// // //           )}
// // //         </TouchableOpacity>

// // //         {/* TIMER */}
// // //         <Text style={styles_forgetotp.resendText}>
// // //           Send code again{' '}
// // //           <Text style={{ fontWeight: 'bold' }}>
// // //             {`00:${timer < 10 ? '0' + timer : timer}`}
// // //           </Text>
// // //         </Text>
// // //       </View>
// // //     </View>
// // //   );
// // // };

// // // export default ForgetOTP;

// // import React, { useRef, useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// //   ActivityIndicator,
// // } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { styles_forgetotp } from './styles';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { verifyOtpAPI } from '../../redux/slices/forgotPasswordSlice';

// // const OTP_LENGTH = 6;

// // const ForgetOTP = ({ navigation, route }) => {
// //   const { email } = route.params;

// //   const dispatch = useDispatch();
// //   const inputs = useRef([]);

// //   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
// //   const [timer, setTimer] = useState(20);
// //   const [submitted, setSubmitted] = useState(false);

// //   const { verifyLoading, verifySuccess, verifyData, verifyError } = useSelector(
// //     state => state.forgotPassword,
// //   );

// //   /* ================= TIMER ================= */
// //   useEffect(() => {
// //     if (timer > 0) {
// //       const t = setInterval(() => setTimer(p => p - 1), 1000);
// //       return () => clearInterval(t);
// //     }
// //   }, [timer]);

// //   /* ================= AUTO VERIFY ================= */
// //   useEffect(() => {
// //     const joined = otp.join('');
// //     if (joined.length === OTP_LENGTH && !joined.includes('')) {
// //       handleVerify(true);
// //     }
// //   }, [otp]);

// //   useEffect(() => {
// //     if (verifySuccess) {
// //       navigation.reset({
// //         index: 0,
// //         routes: [{ name: 'setPassword' }],
// //       });
// //     }
// //   }, [verifySuccess]);

// //   /* ================= OTP CHANGE ================= */
// //   const handleChange = (text, index) => {
// //     if (!/^\d?$/.test(text)) return;

// //     const newOtp = [...otp];
// //     newOtp[index] = text;
// //     setOtp(newOtp);

// //     if (text && index < OTP_LENGTH - 1) {
// //       inputs.current[index + 1]?.focus();
// //     }

// //     if (!text && index > 0) {
// //       inputs.current[index - 1]?.focus();
// //     }
// //   };

// //   /* ================= VERIFY ================= */
// //   const handleVerify = (auto = false) => {
// //     setSubmitted(true);

// //     const joinedOtp = otp.join('');
// //     if (joinedOtp.length < OTP_LENGTH) return;

// //     dispatch(
// //       verifyOtpAPI({
// //         email,
// //         otp: joinedOtp,
// //       }),
// //     );
// //   };

// //   console.log('verifyError------------------------>', verifyError);
// //   console.log('verifySuccess------------------------>', verifySuccess);
// //   console.log('verifyData------------------------>', verifyData);

// //   /* ================= SUCCESS ================= */
// //   // useEffect(() => {
// //   //   if (verifySuccess) {
// //   //     navigation.replace('SetPassword', { email });
// //   //   }
// //   // }, [verifySuccess]);

// //   return (
// //     <View style={styles_forgetotp.container}>
// //       {/* BACK */}
// //       <TouchableOpacity
// //         style={styles_forgetotp.backButton}
// //         onPress={() => navigation.goBack()}
// //       >
// //         <Ionicons name="chevron-back" size={20} />
// //       </TouchableOpacity>

// //       <View style={styles_forgetotp.content}>
// //         <Text style={styles_forgetotp.title}>Check your email</Text>

// //         <Text style={styles_forgetotp.subtitle}>
// //           We sent a 6-digit code to{'\n'}
// //           <Text style={styles_forgetotp.email}>{email}</Text>
// //         </Text>

// //         {/* OTP */}
// //         <View style={styles_forgetotp.otpCard}>
// //           {otp.map((digit, index) => (
// //             <TextInput
// //               key={index}
// //               ref={el => (inputs.current[index] = el)}
// //               style={[
// //                 styles_forgetotp.otpBox,
// //                 digit && styles_forgetotp.otpFilled,
// //               ]}
// //               keyboardType="number-pad"
// //               maxLength={1}
// //               value={digit}
// //               onChangeText={t => handleChange(t, index)}
// //             />
// //           ))}
// //         </View>

// //         {verifyError && (
// //           <Text style={styles_forgetotp.errorText}>{verifyError}</Text>
// //         )}

// //         {/* VERIFY BUTTON */}
// //         <TouchableOpacity
// //           style={[styles_forgetotp.button, verifyLoading && { opacity: 0.7 }]}
// //           onPress={() => handleVerify(false)}
// //           disabled={verifyLoading}
// //         >
// //           {verifyLoading ? (
// //             <ActivityIndicator color="#fff" />
// //           ) : (
// //             <Text style={styles_forgetotp.buttonText}>Verify</Text>
// //           )}
// //         </TouchableOpacity>

// //         {/* TIMER */}
// //         <Text style={styles_forgetotp.resendText}>
// //           Send again in{' '}
// //           <Text style={{ fontWeight: '700' }}>
// //             00:{timer < 10 ? `0${timer}` : timer}
// //           </Text>
// //         </Text>
// //       </View>
// //     </View>
// //   );
// // };

// // export default ForgetOTP;

// import React, { useRef, useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   ActivityIndicator,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   verifyOtpAPI,
//   resetForgotPasswordState,
// } from '../../redux/slices/forgotPasswordSlice';
// import { styles_forgetotp } from './styles';

// const OTP_LENGTH = 6;

// const ForgetOTP = ({ navigation, route }) => {
//   const { email } = route.params;

//   const dispatch = useDispatch();
//   const inputs = useRef([]);

//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
//   const [timer, setTimer] = useState(20);
//   const [submitted, setSubmitted] = useState(false);

//   const { loading, success, error, verifyData } = useSelector(
//     state => state.forgotPassword,
//   );

//   /* ================= TIMER ================= */
//   useEffect(() => {
//     if (timer <= 0) return;
//     const t = setInterval(() => setTimer(p => p - 1), 1000);
//     return () => clearInterval(t);
//   }, [timer]);

//   /* ================= AUTO VERIFY ================= */
//   useEffect(() => {
//     const joined = otp.join('');
//     if (joined.length === OTP_LENGTH && !joined.includes('')) {
//       handleVerify(true);
//     }
//   }, [otp]);

//   /* ================= SUCCESS ================= */
//   // useEffect(() => {

//   // }, [success]);

//   /* ================= OTP CHANGE ================= */
//   const handleChange = (text, index) => {
//     if (!/^\d?$/.test(text)) return;

//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);

//     if (text && index < OTP_LENGTH - 1) {
//       inputs.current[index + 1]?.focus();
//     }

//     if (!text && index > 0) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   /* ================= VERIFY ================= */

//   console.log('success------------otp--------------->', verifyData?.status)

//   const handleVerify = (auto = false) => {
//     setSubmitted(true);

//     const joinedOtp = otp.join('');
//     if (joinedOtp.length < OTP_LENGTH) return;

//     dispatch(
//       verifyOtpAPI({
//         email,
//         otp: joinedOtp,
//       }),
//     );

//     if (verifyData?.status === true) {
//       dispatch(resetForgotPasswordState());
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'setPassword', params: { email } }],
//       });
//     }
//   };

//   return (
//     <View style={styles_forgetotp.container}>
//       {/* BACK */}
//       <TouchableOpacity
//         style={styles_forgetotp.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="chevron-back" size={15} color="#000" />
//       </TouchableOpacity>

//       <View style={styles_forgetotp.content}>
//         <Text style={styles_forgetotp.title}>Check your email</Text>

//         <Text style={styles_forgetotp.subtitle}>
//           We sent a 6-digit code to{'\n'}
//           <Text style={styles_forgetotp.email}>{email}</Text>
//         </Text>

//         {/* OTP BOXES */}
//         <View style={styles_forgetotp.otpCard}>
//           {otp.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={el => (inputs.current[index] = el)}
//               style={[
//                 styles_forgetotp.otpBox,
//                 digit && styles_forgetotp.otpFilled,
//               ]}
//               keyboardType="number-pad"
//               maxLength={1}
//               value={digit}
//               onChangeText={t => handleChange(t, index)}
//             />
//           ))}
//         </View>

//         {/* ERROR */}
//         {error && <Text style={styles_forgetotp.errorText}>{error}</Text>}

//         {/* VERIFY BUTTON */}
//         <TouchableOpacity
//           style={[styles_forgetotp.button, loading && { opacity: 0.7 }]}
//           onPress={() => handleVerify(false)}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles_forgetotp.buttonText}>Verify</Text>
//           )}
//         </TouchableOpacity>

//         {/* TIMER */}
//         <TouchableOpacity style={styles_forgetotp.resendText}>
//           Send again in{' '}
//           <Text style={{ fontWeight: '700' }}>
//             00:{timer < 10 ? `0${timer}` : timer}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ForgetOTP;

// // // // // // import React, { useRef, useState, useEffect } from 'react';
// // // // // // import {
// // // // // //   View,
// // // // // //   Text,
// // // // // //   TextInput,
// // // // // //   TouchableOpacity,
// // // // // //   View,
// // // // // // } from 'react-native';
// // // // // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // // // // import { styles_forgetotp } from './styles';
// // // // // // import { useSelector } from 'react-redux';

// // // // // // const ForgetOTP = ({ navigation }) => {
// // // // // //   const [otpforget, setOtp] = useState(['', '', '', '']);
// // // // // //   const [timer, setTimer] = useState(20);
// // // // // //   const inputs = useRef([]);
// // // // // //   const [errors, setErrors] = useState({});
// // // // // //   const [submitted, setSubmitted] = useState(false);
// // // // // //   const { verifyLoading, verifySuccess, verifyError } = useSelector(
// // // // // //     state => state.forgotPassword,
// // // // // //   );

// // // // // //   // ✅ Validation logic reused
// // // // // //   const validateInputs = (otp = otpforget) => {
// // // // // //     const newErrors = {};
// // // // // //     const combinedOtp = otp.join('');

// // // // // //     if (combinedOtp.trim() === '') {
// // // // // //       newErrors.otp = 'OTP is required';
// // // // // //     } else if (combinedOtp.length < 4) {
// // // // // //       newErrors.otp = 'OTP must be 4 digits';
// // // // // //     }

// // // // // //     setErrors(newErrors);
// // // // // //   };

// // // // // //   // ✅ Real-time validation if form was submitted
// // // // // //   useEffect(() => {
// // // // // //     if (submitted) {
// // // // // //       validateInputs();
// // // // // //     }
// // // // // //   }, [otpforget]);

// // // // // //   useEffect(() => {
// // // // // //     if (timer > 0) {
// // // // // //       const interval = setInterval(() => setTimer(timer - 1), 1000);
// // // // // //       return () => clearInterval(interval);
// // // // // //     }
// // // // // //   }, [timer]);

// // // // // //   const handleChange = (text, index) => {
// // // // // //     if (/^\d$/.test(text)) {
// // // // // //       const newOtp = [...otpforget];
// // // // // //       newOtp[index] = text;
// // // // // //       setOtp(newOtp);
// // // // // //       // Focus next input
// // // // // //       if (index < 3) {
// // // // // //         inputs.current[index + 1].focus();
// // // // // //       }
// // // // // //     } else if (text === '') {
// // // // // //       const newOtp = [...otpforget];
// // // // // //       newOtp[index] = '';
// // // // // //       setOtp(newOtp);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleVerify = () => {
// // // // // //     setSubmitted(true);
// // // // // //     const isValid = validateInputs();

// // // // // //     if (!isValid) return;

// // // // // //     if (Object.keys(errors).length === 0) {
// // // // // //       navigation.navigate('setPassword');
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <View style={styles_forgetotp.container}>
// // // // // //       {/* Back Button */}
// // // // // //       <TouchableOpacity
// // // // // //         style={styles_forgetotp.backButton}
// // // // // //         onPress={() => navigation.goBack()}
// // // // // //       >
// // // // // //         <Ionicons name="chevron-back-outline" size={24} color="#000" />
// // // // // //       </TouchableOpacity>

// // // // // //       <View style={styles_forgetotp.content}>
// // // // // //         <Text style={styles_forgetotp.title}>Please check your email</Text>
// // // // // //         <Text style={styles_forgetotp.subtitle}>
// // // // // //           We’ve sent a code to{' '}
// // // // // //           <Text style={{ fontWeight: 'bold' }}>xxxxxxxxxxx@gmail.com</Text>
// // // // // //         </Text>

// // // // // //         <View style={styles_forgetotp.otpContainer}>
// // // // // //           {otpforget.map((digit, index) => (
// // // // // //             <TextInput
// // // // // //               key={index}
// // // // // //               ref={el => (inputs.current[index] = el)}
// // // // // //               style={[
// // // // // //                 styles_forgetotp.otpBox,
// // // // // //                 errors.otpforget && { borderColor: 'red' },
// // // // // //               ]}
// // // // // //               keyboardType="number-pad"
// // // // // //               maxLength={1}
// // // // // //               value={digit}
// // // // // //               onChangeText={text => handleChange(text, index)}
// // // // // //             />
// // // // // //           ))}
// // // // // //         </View>
// // // // // //         {errors.otp && (
// // // // // //           <Text style={styles_forgetotp.errorText}>{errors.otp}</Text>
// // // // // //         )}

// // // // // //         <TouchableOpacity
// // // // // //           style={styles_forgetotp.button}
// // // // // //           onPress={handleVerify}
// // // // // //         >
// // // // // //           <Text style={styles_forgetotp.buttonText}>Verify</Text>
// // // // // //         </TouchableOpacity>

// // // // // //         <Text style={styles_forgetotp.resendText}>
// // // // // //           Send code again{' '}
// // // // // //           <Text style={{ fontWeight: 'bold' }}>{`00:${
// // // // // //             timer < 10 ? '0' + timer : timer
// // // // // //           }`}</Text>
// // // // // //         </Text>
// // // // // //       </View>
// // // // // //     </View>
// // // // // //   );
// // // // // // };

// // // // // // export default ForgetOTP;

// // // // // import React, { useRef, useState, useEffect } from 'react';
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   TextInput,
// // // // //   TouchableOpacity,
// // // // //   View,
// // // // //   ActivityIndicator,
// // // // // } from 'react-native';
// // // // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // // // import { styles_forgetotp } from './styles';
// // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // import { verifyOtpAPI } from '../../redux/slices/forgotPasswordSlice';

// // // // // const ForgetOTP = ({ navigation, route }) => {
// // // // //   const { email } = route.params; // 👈 email from previous screen

// // // // //   const dispatch = useDispatch();
// // // // //   const inputs = useRef([]);

// // // // //   const [otpforget, setOtp] = useState(['', '', '', '']);
// // // // //   const [timer, setTimer] = useState(20);
// // // // //   const [errors, setErrors] = useState({});
// // // // //   const [submitted, setSubmitted] = useState(false);

// // // // //   const { verifyLoading, verifySuccess, verifyError } = useSelector(
// // // // //     state => state.forgotPassword,
// // // // //   );

// // // // //   /* ================= VALIDATION ================= */
// // // // //   const validateInputs = (otp = otpforget) => {
// // // // //     const newErrors = {};
// // // // //     const combinedOtp = otp.join('');

// // // // //     if (combinedOtp.trim() === '') {
// // // // //       newErrors.otp = 'OTP is required';
// // // // //     } else if (combinedOtp.length < 4) {
// // // // //       newErrors.otp = 'OTP must be 4 digits';
// // // // //     }

// // // // //     setErrors(newErrors);
// // // // //     return Object.keys(newErrors).length === 0;
// // // // //   };

// // // // //   /* ================= REAL TIME VALIDATION ================= */
// // // // //   useEffect(() => {
// // // // //     if (submitted) {
// // // // //       validateInputs();
// // // // //     }
// // // // //   }, [otpforget]);

// // // // //   /* ================= TIMER ================= */
// // // // //   useEffect(() => {
// // // // //     if (timer > 0) {
// // // // //       const interval = setInterval(() => {
// // // // //         setTimer(prev => prev - 1);
// // // // //       }, 1000);
// // // // //       return () => clearInterval(interval);
// // // // //     }
// // // // //   }, [timer]);

// // // // //   /* ================= OTP INPUT ================= */
// // // // //   const handleChange = (text, index) => {
// // // // //     if (/^\d?$/.test(text)) {
// // // // //       const newOtp = [...otpforget];
// // // // //       newOtp[index] = text;
// // // // //       setOtp(newOtp);

// // // // //       if (text && index < 3) {
// // // // //         inputs.current[index + 1]?.focus();
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   /* ================= VERIFY OTP ================= */
// // // // //   const handleVerify = () => {
// // // // //     setSubmitted(true);
// // // // //     const isValid = validateInputs();
// // // // //     if (!isValid) return;

// // // // //     const otp = otpforget.join('');

// // // // //     dispatch(
// // // // //       verifyOtpAPI({
// // // // //         email,
// // // // //         otp,
// // // // //       }),
// // // // //     );
// // // // //   };

// // // // //   /* ================= SUCCESS NAVIGATION ================= */
// // // // //   useEffect(() => {
// // // // //     if (verifySuccess) {
// // // // //       navigation.replace('setPassword', { email });
// // // // //     }
// // // // //   }, [verifySuccess]);

// // // // //   return (
// // // // //     <View style={styles_forgetotp.container}>
// // // // //       {/* Back Button */}
// // // // //       <TouchableOpacity
// // // // //         style={styles_forgetotp.backButton}
// // // // //         onPress={() => navigation.goBack()}>
// // // // //         <Ionicons name="chevron-back-outline" size={24} color="#000" />
// // // // //       </TouchableOpacity>

// // // // //       <View style={styles_forgetotp.content}>
// // // // //         <Text style={styles_forgetotp.title}>Please check your email</Text>

// // // // //         <Text style={styles_forgetotp.subtitle}>
// // // // //           We’ve sent a code to{' '}
// // // // //           <Text style={{ fontWeight: 'bold' }}>{email}</Text>
// // // // //         </Text>

// // // // //         {/* OTP BOXES */}
// // // // //         <View style={styles_forgetotp.otpContainer}>
// // // // //           {otpforget.map((digit, index) => (
// // // // //             <TextInput
// // // // //               key={index}
// // // // //               ref={el => (inputs.current[index] = el)}
// // // // //               style={[
// // // // //                 styles_forgetotp.otpBox,
// // // // //                 errors.otp && { borderColor: 'red' },
// // // // //               ]}
// // // // //               keyboardType="number-pad"
// // // // //               maxLength={1}
// // // // //               value={digit}
// // // // //               onChangeText={text => handleChange(text, index)}
// // // // //             />
// // // // //           ))}
// // // // //         </View>

// // // // //         {/* ERROR */}
// // // // //         {errors.otp && (
// // // // //           <Text style={styles_forgetotp.errorText}>{errors.otp}</Text>
// // // // //         )}

// // // // //         {verifyError && (
// // // // //           <Text style={styles_forgetotp.errorText}>{verifyError}</Text>
// // // // //         )}

// // // // //         {/* VERIFY BUTTON */}
// // // // //         <TouchableOpacity
// // // // //           style={styles_forgetotp.button}
// // // // //           onPress={handleVerify}
// // // // //           disabled={verifyLoading}>
// // // // //           {verifyLoading ? (
// // // // //             <ActivityIndicator color="#fff" />
// // // // //           ) : (
// // // // //             <Text style={styles_forgetotp.buttonText}>Verify</Text>
// // // // //           )}
// // // // //         </TouchableOpacity>

// // // // //         {/* TIMER */}
// // // // //         <Text style={styles_forgetotp.resendText}>
// // // // //           Send code again{' '}
// // // // //           <Text style={{ fontWeight: 'bold' }}>
// // // // //             {`00:${timer < 10 ? '0' + timer : timer}`}
// // // // //           </Text>
// // // // //         </Text>
// // // // //       </View>
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // export default ForgetOTP;

// // // // import React, { useRef, useState, useEffect } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TextInput,
// // // //   TouchableOpacity,
// // // //   View,
// // // //   ActivityIndicator,
// // // // } from 'react-native';
// // // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // // import { styles_forgetotp } from './styles';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { verifyOtpAPI } from '../../redux/slices/forgotPasswordSlice';

// // // // const ForgetOTP = ({ navigation, route }) => {
// // // //   const { email } = route.params;

// // // //   const dispatch = useDispatch();
// // // //   const inputs = useRef([]);

// // // //   // 🔥 6 DIGIT OTP
// // // //   const [otpforget, setOtp] = useState(['', '', '', '', '', '']);
// // // //   const [timer, setTimer] = useState(20);
// // // //   const [errors, setErrors] = useState({});
// // // //   const [submitted, setSubmitted] = useState(false);

// // // //   const { verifyLoading, verifySuccess, verifyError } = useSelector(
// // // //     state => state.forgotPassword,
// // // //   );

// // // //   /* ================= VALIDATION ================= */
// // // //   const validateInputs = (otp = otpforget) => {
// // // //     const newErrors = {};
// // // //     const combinedOtp = otp.join('');

// // // //     if (combinedOtp.trim() === '') {
// // // //       newErrors.otp = 'OTP is required';
// // // //     } else if (combinedOtp.length < 6) {
// // // //       newErrors.otp = 'OTP must be 6 digits';
// // // //     }

// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   /* ================= REAL TIME VALIDATION ================= */
// // // //   useEffect(() => {
// // // //     if (submitted) {
// // // //       validateInputs();
// // // //     }
// // // //   }, [otpforget]);

// // // //   /* ================= TIMER ================= */
// // // //   useEffect(() => {
// // // //     if (timer > 0) {
// // // //       const interval = setInterval(() => {
// // // //         setTimer(prev => prev - 1);
// // // //       }, 1000);
// // // //       return () => clearInterval(interval);
// // // //     }
// // // //   }, [timer]);

// // // //   /* ================= OTP INPUT ================= */
// // // //   const handleChange = (text, index) => {
// // // //     if (/^\d?$/.test(text)) {
// // // //       const newOtp = [...otpforget];
// // // //       newOtp[index] = text;
// // // //       setOtp(newOtp);

// // // //       // 🔥 auto focus next (6 digits)
// // // //       if (text && index < 5) {
// // // //         inputs.current[index + 1]?.focus();
// // // //       }
// // // //     }
// // // //   };

// // // //   /* ================= VERIFY OTP ================= */
// // // //   const handleVerify = () => {
// // // //     setSubmitted(true);
// // // //     const isValid = validateInputs();
// // // //     if (!isValid) return;

// // // //     const otp = otpforget.join('');

// // // //     dispatch(
// // // //       verifyOtpAPI({
// // // //         email,
// // // //         otp,
// // // //       }),
// // // //     );
// // // //   };

// // // //   /* ================= SUCCESS ================= */
// // // //   useEffect(() => {
// // // //     if (verifySuccess) {
// // // //       navigation.replace('setPassword', { email });
// // // //     }
// // // //   }, [verifySuccess]);

// // // //   return (
// // // //     <View style={styles_forgetotp.container}>
// // // //       {/* Back Button */}
// // // //       <TouchableOpacity
// // // //         style={styles_forgetotp.backButton}
// // // //         onPress={() => navigation.goBack()}>
// // // //         <Ionicons name="chevron-back-outline" size={24} color="#000" />
// // // //       </TouchableOpacity>

// // // //       <View style={styles_forgetotp.content}>
// // // //         <Text style={styles_forgetotp.title}>Please check your email</Text>

// // // //         <Text style={styles_forgetotp.subtitle}>
// // // //           We’ve sent a code to{' '}
// // // //           <Text style={{ fontWeight: 'bold' }}>{email}</Text>
// // // //         </Text>

// // // //         {/* 🔥 6 OTP BOXES */}
// // // //         <View style={styles_forgetotp.otpContainer}>
// // // //           {otpforget.map((digit, index) => (
// // // //             <TextInput
// // // //               key={index}
// // // //               ref={el => (inputs.current[index] = el)}
// // // //               style={[
// // // //                 styles_forgetotp.otpBox,
// // // //                 errors.otp && { borderColor: 'red' },
// // // //               ]}
// // // //               keyboardType="number-pad"
// // // //               maxLength={1}
// // // //               value={digit}
// // // //               onChangeText={text => handleChange(text, index)}
// // // //             />
// // // //           ))}
// // // //         </View>

// // // //         {/* ERRORS */}
// // // //         {errors.otp && (
// // // //           <Text style={styles_forgetotp.errorText}>{errors.otp}</Text>
// // // //         )}

// // // //         {verifyError && (
// // // //           <Text style={styles_forgetotp.errorText}>{verifyError}</Text>
// // // //         )}

// // // //         {/* VERIFY BUTTON */}
// // // //         <TouchableOpacity
// // // //           style={styles_forgetotp.button}
// // // //           onPress={handleVerify}
// // // //           disabled={verifyLoading}>
// // // //           {verifyLoading ? (
// // // //             <ActivityIndicator color="#fff" />
// // // //           ) : (
// // // //             <Text style={styles_forgetotp.buttonText}>Verify</Text>
// // // //           )}
// // // //         </TouchableOpacity>

// // // //         {/* TIMER */}
// // // //         <Text style={styles_forgetotp.resendText}>
// // // //           Send code again{' '}
// // // //           <Text style={{ fontWeight: 'bold' }}>
// // // //             {`00:${timer < 10 ? '0' + timer : timer}`}
// // // //           </Text>
// // // //         </Text>
// // // //       </View>
// // // //     </View>
// // // //   );
// // // // };

// // // // export default ForgetOTP;

// // // import React, { useRef, useState, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   View,
// // //   ActivityIndicator,
// // // } from 'react-native';
// // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // import { styles_forgetotp } from './styles';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { verifyOtpAPI } from '../../redux/slices/forgotPasswordSlice';

// // // const ForgetOTP = ({ navigation, route }) => {
// // //   const { email } = route.params;

// // //   const dispatch = useDispatch();
// // //   const inputs = useRef([]);

// // //   // 🔥 6 DIGIT OTP
// // //   const [otpforget, setOtp] = useState(['', '', '', '', '', '']);
// // //   const [timer, setTimer] = useState(20);
// // //   const [errors, setErrors] = useState({});
// // //   const [submitted, setSubmitted] = useState(false);

// // //   const { verifyLoading, verifySuccess, verifyError } = useSelector(
// // //     state => state.forgotPassword,
// // //   );

// // //   /* ================= VALIDATION ================= */
// // //   const validateInputs = (otp = otpforget) => {
// // //     const newErrors = {};
// // //     const combinedOtp = otp.join('');

// // //     if (combinedOtp.trim() === '') {
// // //       newErrors.otp = 'OTP is required';
// // //     } else if (combinedOtp.length < 6) {
// // //       newErrors.otp = 'OTP must be 6 digits';
// // //     }

// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   /* ================= REAL TIME VALIDATION ================= */
// // //   useEffect(() => {
// // //     if (submitted) {
// // //       validateInputs();
// // //     }
// // //   }, [otpforget]);

// // //   /* ================= TIMER ================= */
// // //   useEffect(() => {
// // //     if (timer > 0) {
// // //       const interval = setInterval(() => {
// // //         setTimer(prev => prev - 1);
// // //       }, 1000);
// // //       return () => clearInterval(interval);
// // //     }
// // //   }, [timer]);

// // //   /* ================= OTP INPUT ================= */
// // //   const handleChange = (text, index) => {
// // //     if (/^\d?$/.test(text)) {
// // //       const newOtp = [...otpforget];
// // //       newOtp[index] = text;
// // //       setOtp(newOtp);

// // //       // 🔥 auto focus next (6 digits)
// // //       if (text && index < 5) {
// // //         inputs.current[index + 1]?.focus();
// // //       }
// // //     }
// // //   };

// // //   /* ================= VERIFY OTP ================= */
// // //   const handleVerify = () => {
// // //     setSubmitted(true);
// // //     const isValid = validateInputs();
// // //     if (!isValid) return;

// // //     const otp = otpforget.join('');

// // //     dispatch(
// // //       verifyOtpAPI({
// // //         email,
// // //         otp,
// // //       }),
// // //     );
// // //   };

// // //   /* ================= SUCCESS ================= */
// // //   useEffect(() => {
// // //     if (verifySuccess) {
// // //       navigation.replace('setPassword', { email });
// // //     }
// // //   }, [verifySuccess]);

// // //   return (
// // //     <View style={styles_forgetotp.container}>
// // //       {/* Back Button */}
// // //       <TouchableOpacity
// // //         style={styles_forgetotp.backButton}
// // //         onPress={() => navigation.goBack()}>
// // //         <Ionicons name="chevron-back-outline" size={18} color="#000" />
// // //       </TouchableOpacity>

// // //       <View style={styles_forgetotp.content}>
// // //         <Text style={styles_forgetotp.title}>Please check your email</Text>

// // //         <Text style={styles_forgetotp.subtitle}>
// // //           We’ve sent a code to{' '}
// // //           <Text style={{ fontWeight: 'bold' }}>{email}</Text>
// // //         </Text>

// // //         {/* 🔥 6 OTP BOXES */}
// // //         <View style={styles_forgetotp.otpContainer}>
// // //           {otpforget.map((digit, index) => (
// // //             <TextInput
// // //               key={index}
// // //               ref={el => (inputs.current[index] = el)}
// // //               style={[
// // //                 styles_forgetotp.otpBox,
// // //                 errors.otp && { borderColor: 'red' },
// // //               ]}
// // //               keyboardType="number-pad"
// // //               maxLength={1}
// // //               value={digit}
// // //               onChangeText={text => handleChange(text, index)}
// // //             />
// // //           ))}
// // //         </View>

// // //         {/* ERRORS */}
// // //         {errors.otp && (
// // //           <Text style={styles_forgetotp.errorText}>{errors.otp}</Text>
// // //         )}

// // //         {verifyError && (
// // //           <Text style={styles_forgetotp.errorText}>{verifyError}</Text>
// // //         )}

// // //         {/* VERIFY BUTTON */}
// // //         <TouchableOpacity
// // //           style={styles_forgetotp.button}
// // //           onPress={handleVerify}
// // //           disabled={verifyLoading}>
// // //           {verifyLoading ? (
// // //             <ActivityIndicator color="#fff" />
// // //           ) : (
// // //             <Text style={styles_forgetotp.buttonText}>Verify</Text>
// // //           )}
// // //         </TouchableOpacity>

// // //         {/* TIMER */}
// // //         <Text style={styles_forgetotp.resendText}>
// // //           Send code again{' '}
// // //           <Text style={{ fontWeight: 'bold' }}>
// // //             {`00:${timer < 10 ? '0' + timer : timer}`}
// // //           </Text>
// // //         </Text>
// // //       </View>
// // //     </View>
// // //   );
// // // };

// // // export default ForgetOTP;

// // import React, { useRef, useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// //   ActivityIndicator,
// // } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { styles_forgetotp } from './styles';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { verifyOtpAPI } from '../../redux/slices/forgotPasswordSlice';

// // const OTP_LENGTH = 6;

// // const ForgetOTP = ({ navigation, route }) => {
// //   const { email } = route.params;

// //   const dispatch = useDispatch();
// //   const inputs = useRef([]);

// //   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
// //   const [timer, setTimer] = useState(20);
// //   const [submitted, setSubmitted] = useState(false);

// //   const { verifyLoading, verifySuccess, verifyData, verifyError } = useSelector(
// //     state => state.forgotPassword,
// //   );

// //   /* ================= TIMER ================= */
// //   useEffect(() => {
// //     if (timer > 0) {
// //       const t = setInterval(() => setTimer(p => p - 1), 1000);
// //       return () => clearInterval(t);
// //     }
// //   }, [timer]);

// //   /* ================= AUTO VERIFY ================= */
// //   useEffect(() => {
// //     const joined = otp.join('');
// //     if (joined.length === OTP_LENGTH && !joined.includes('')) {
// //       handleVerify(true);
// //     }
// //   }, [otp]);

// //   useEffect(() => {
// //     if (verifySuccess) {
// //       navigation.reset({
// //         index: 0,
// //         routes: [{ name: 'setPassword' }],
// //       });
// //     }
// //   }, [verifySuccess]);

// //   /* ================= OTP CHANGE ================= */
// //   const handleChange = (text, index) => {
// //     if (!/^\d?$/.test(text)) return;

// //     const newOtp = [...otp];
// //     newOtp[index] = text;
// //     setOtp(newOtp);

// //     if (text && index < OTP_LENGTH - 1) {
// //       inputs.current[index + 1]?.focus();
// //     }

// //     if (!text && index > 0) {
// //       inputs.current[index - 1]?.focus();
// //     }
// //   };

// //   /* ================= VERIFY ================= */
// //   const handleVerify = (auto = false) => {
// //     setSubmitted(true);

// //     const joinedOtp = otp.join('');
// //     if (joinedOtp.length < OTP_LENGTH) return;

// //     dispatch(
// //       verifyOtpAPI({
// //         email,
// //         otp: joinedOtp,
// //       }),
// //     );
// //   };

// //   console.log('verifyError------------------------>', verifyError);
// //   console.log('verifySuccess------------------------>', verifySuccess);
// //   console.log('verifyData------------------------>', verifyData);

// //   /* ================= SUCCESS ================= */
// //   // useEffect(() => {
// //   //   if (verifySuccess) {
// //   //     navigation.replace('SetPassword', { email });
// //   //   }
// //   // }, [verifySuccess]);

// //   return (
// //     <View style={styles_forgetotp.container}>
// //       {/* BACK */}
// //       <TouchableOpacity
// //         style={styles_forgetotp.backButton}
// //         onPress={() => navigation.goBack()}
// //       >
// //         <Ionicons name="chevron-back" size={20} />
// //       </TouchableOpacity>

// //       <View style={styles_forgetotp.content}>
// //         <Text style={styles_forgetotp.title}>Check your email</Text>

// //         <Text style={styles_forgetotp.subtitle}>
// //           We sent a 6-digit code to{'\n'}
// //           <Text style={styles_forgetotp.email}>{email}</Text>
// //         </Text>

// //         {/* OTP */}
// //         <View style={styles_forgetotp.otpCard}>
// //           {otp.map((digit, index) => (
// //             <TextInput
// //               key={index}
// //               ref={el => (inputs.current[index] = el)}
// //               style={[
// //                 styles_forgetotp.otpBox,
// //                 digit && styles_forgetotp.otpFilled,
// //               ]}
// //               keyboardType="number-pad"
// //               maxLength={1}
// //               value={digit}
// //               onChangeText={t => handleChange(t, index)}
// //             />
// //           ))}
// //         </View>

// //         {verifyError && (
// //           <Text style={styles_forgetotp.errorText}>{verifyError}</Text>
// //         )}

// //         {/* VERIFY BUTTON */}
// //         <TouchableOpacity
// //           style={[styles_forgetotp.button, verifyLoading && { opacity: 0.7 }]}
// //           onPress={() => handleVerify(false)}
// //           disabled={verifyLoading}
// //         >
// //           {verifyLoading ? (
// //             <ActivityIndicator color="#fff" />
// //           ) : (
// //             <Text style={styles_forgetotp.buttonText}>Verify</Text>
// //           )}
// //         </TouchableOpacity>

// //         {/* TIMER */}
// //         <Text style={styles_forgetotp.resendText}>
// //           Send again in{' '}
// //           <Text style={{ fontWeight: '700' }}>
// //             00:{timer < 10 ? `0${timer}` : timer}
// //           </Text>
// //         </Text>
// //       </View>
// //     </View>
// //   );
// // };

// // export default ForgetOTP;

// import React, { useRef, useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   ActivityIndicator,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   verifyOtpAPI,
//   resetForgotPasswordState,
// } from '../../redux/slices/forgotPasswordSlice';
// import { styles_forgetotp } from './styles';

// const OTP_LENGTH = 6;

// const ForgetOTP = ({ navigation, route }) => {
//   const { email } = route.params;

//   const dispatch = useDispatch();
//   const inputs = useRef([]);

//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
//   const [timer, setTimer] = useState(20);
//   const [submitted, setSubmitted] = useState(false);

//   const { loading, success, error, verifyData } = useSelector(
//     state => state.forgotPassword,
//   );

//   /* ================= TIMER ================= */
//   useEffect(() => {
//     if (timer <= 0) return;
//     const t = setInterval(() => setTimer(p => p - 1), 1000);
//     return () => clearInterval(t);
//   }, [timer]);

//   /* ================= AUTO VERIFY ================= */
//   useEffect(() => {
//     const joined = otp.join('');
//     if (joined.length === OTP_LENGTH && !joined.includes('')) {
//       handleVerify(true);
//     }
//   }, [otp]);

//   /* ================= SUCCESS ================= */
//   // useEffect(() => {

//   // }, [success]);

//   /* ================= OTP CHANGE ================= */
//   const handleChange = (text, index) => {
//     if (!/^\d?$/.test(text)) return;

//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);

//     if (text && index < OTP_LENGTH - 1) {
//       inputs.current[index + 1]?.focus();
//     }

//     if (!text && index > 0) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   /* ================= VERIFY ================= */

//   console.log('success------------otp--------------->', verifyData?.status);

//   const handleVerify = (auto = false) => {
//     setSubmitted(true);

//     const joinedOtp = otp.join('');
//     if (joinedOtp.length < OTP_LENGTH) return;

//     dispatch(
//       verifyOtpAPI({
//         email,
//         otp: joinedOtp,
//       }),
//     );

//     if (verifyData?.status === true) {
//       dispatch(resetForgotPasswordState());
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'setPassword', params: { email } }],
//       });
//     }
//   };

//   return (
//     <View style={styles_forgetotp.container}>
//       {/* BACK */}
//       <TouchableOpacity
//         style={styles_forgetotp.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="chevron-back" size={15} color="#000" />
//       </TouchableOpacity>

//       <View style={styles_forgetotp.content}>
//         <Text style={styles_forgetotp.title}>Check your email</Text>

//         <Text style={styles_forgetotp.subtitle}>
//           We sent a 6-digit code to{'\n'}
//           <Text style={styles_forgetotp.email}>{email}</Text>
//         </Text>

//         {/* OTP BOXES */}
//         <View style={styles_forgetotp.otpCard}>
//           {otp.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={el => (inputs.current[index] = el)}
//               style={[
//                 styles_forgetotp.otpBox,
//                 digit && styles_forgetotp.otpFilled,
//               ]}
//               keyboardType="number-pad"
//               maxLength={1}
//               value={digit}
//               onChangeText={t => handleChange(t, index)}
//             />
//           ))}
//         </View>

//         {/* ERROR */}
//         {error && <Text style={styles_forgetotp.errorText}>{error}</Text>}

//         {/* VERIFY BUTTON */}
//         <TouchableOpacity
//           style={[styles_forgetotp.button, loading && { opacity: 0.7 }]}
//           onPress={() => handleVerify(false)}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles_forgetotp.buttonText}>Verify</Text>
//           )}
//         </TouchableOpacity>

//         {/* TIMER */}
//         <View style={styles_forgetotp.resendText}>
//           <TouchableOpacity>
//             <Text>Send again in</Text>
//           </TouchableOpacity>
//           <Text style={{ fontWeight: '700', marginLeft: 5 }}>
//             00:{timer < 10 ? `0${timer}` : timer}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default ForgetOTP;

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
  verifyOtpAPI,
  resetForgotPasswordState,
  forgotPasswordAPI, // make sure you have this in your slice
} from '../../redux/slices/forgotPasswordSlice';
import { styles_forgetotp } from './styles';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import { moderateScale } from 'react-native-size-matters';
import Header from '../../constants/Header';

const OTP_LENGTH = 6;
const RESEND_LIMIT = 3;

const ForgetOTP = ({ navigation, route }) => {
  const { email } = route.params;
  const dispatch = useDispatch();
  const inputs = useRef([]);

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(20);
  const [resendCount, setResendCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const { loading, error, verifyData } = useSelector(
    state => state.forgotPassword,
  );

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timer <= 0) return;
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  /* ================= AUTO VERIFY ================= */
  useEffect(() => {
    const joined = otp.join('');
    if (joined.length === OTP_LENGTH && !joined.includes('')) {
      handleVerify(true);
    }
  }, [otp]);

  /* ================= OTP CHANGE ================= */
  const handleChange = (text, index) => {
    if (!/^\d?$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  /* ================= VERIFY ================= */
  const handleVerify = (auto = false) => {
    setSubmitted(true);

    const joinedOtp = otp.join('');
    if (joinedOtp.length < OTP_LENGTH) return;

    dispatch(
      verifyOtpAPI({
        email,
        otp: joinedOtp,
      }),
    ).then(res => {
      if (res.payload?.status) {
        dispatch(resetForgotPasswordState());
        navigation.reset({
          index: 0,
          routes: [{ name: 'setPassword', params: { email } }],
        });
      }
    });
  };

  /* ================= RESEND OTP ================= */
  const handleResendOtp = async () => {
    if (timer > 0 || resendCount >= RESEND_LIMIT) return;

    try {
      // Pass email exactly as in ForgotPasswordScreen
      const response = await dispatch(forgotPasswordAPI(email)).unwrap();

      if (response?.status === true) {
        setOtp(Array(OTP_LENGTH).fill('')); // clear OTP inputs
        inputs.current[0]?.focus(); // focus first input
        setTimer(20); // reset timer
        setResendCount(prev => prev + 1);
      } else {
        console.log('Resend OTP failed:', response?.message);
      }
    } catch (err) {
      console.log('Resend OTP Error:', err);
    }
  };

  return (
    <>
      <Header
        navigation={navigation}
        showBack={true}
        showSearch={false}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles_forgetotp.container}>
        <View style={styles_forgetotp.content}>
          <Text style={styles_forgetotp.title}>Check your email</Text>

          <Text style={styles_forgetotp.subtitle}>
            We sent a 6-digit code to{'\n'}
            <Text style={styles_forgetotp.email}>{email}</Text>
          </Text>

          {/* OTP BOXES */}
          <View style={styles_forgetotp.otpCard}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={el => (inputs.current[index] = el)}
                style={[
                  styles_forgetotp.otpBox,
                  digit && styles_forgetotp.otpFilled,
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={t => handleChange(t, index)}
              />
            ))}
          </View>

          {/* ERROR */}
          {error && <Text style={styles_forgetotp.errorText}>{error}</Text>}

          {/* VERIFY BUTTON */}
          <TouchableOpacity
            style={[styles_forgetotp.button, loading && { opacity: 0.7 }]}
            onPress={() => handleVerify(false)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles_forgetotp.buttonText}>Verify</Text>
            )}
          </TouchableOpacity>

          {/* RESEND / TIMER */}
          <View style={styles_forgetotp.resendText}>
            <TouchableOpacity
              onPress={handleResendOtp}
              disabled={timer > 0 || resendCount >= RESEND_LIMIT}
            >
              <Text style={{ color: timer > 0 ? 'gray' : '#007AFF' }}>
                {resendCount >= RESEND_LIMIT
                  ? 'Resend limit reached'
                  : timer > 0
                  ? 'Send again in'
                  : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
            {timer > 0 && (
              <Text
                style={{
                  fontWeight: '700',
                  marginLeft: 5,
                  textAlign: 'center',
                }}
              >
                00:{timer < 10 ? `0${timer}` : timer}
              </Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default ForgetOTP;
