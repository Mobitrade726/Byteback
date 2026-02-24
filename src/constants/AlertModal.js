// // import React, { useEffect, useRef } from 'react';
// // import { View, Text, Modal, TouchableOpacity, Animated, StyleSheet } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';

// // const AlertModal = ({ visible, onClose, title, message, type = "success" }) => {
// //   const scale = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     if (visible) {
// //       Animated.spring(scale, {
// //         toValue: 1,
// //         friction: 6,
// //         useNativeDriver: true,
// //       }).start();
// //     } else {
// //       scale.setValue(0);
// //     }
// //   }, [visible]);

// //   const icon =
// //     type === "success" ? "checkmark-circle" :
// //     type === "error" ? "close-circle" :
// //     "alert-circle";

// //   const iconColor =
// //     type === "success" ? "#4CAF50" :
// //     type === "error" ? "#F44336" :
// //     "#FFC107";

// //   return (
// //     <Modal transparent visible={visible} animationType="fade">
// //       <View style={styles.overlay}>
// //         <Animated.View style={[styles.modalBox, { transform: [{ scale }] }]}>

// //           <Ionicons name={icon} size={70} color={iconColor} />

// //           <Text style={styles.title}>{title}</Text>
// //           <Text style={styles.message}>{message}</Text>

// //           <TouchableOpacity style={styles.button} onPress={onClose}>
// //             <Text style={styles.buttonText}>OK</Text>
// //           </TouchableOpacity>

// //         </Animated.View>
// //       </View>
// //     </Modal>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   overlay: {
// //     flex: 1,
// //     backgroundColor: 'rgba(0,0,0,0.45)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   modalBox: {
// //     width: '80%',
// //     backgroundColor: 'white',
// //     padding: 25,
// //     borderRadius: 20,
// //     alignItems: 'center',
// //     elevation: 15,
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: '600',
// //     marginTop: 10,
// //     color: '#222',
// //   },
// //   message: {
// //     fontSize: 16,
// //     textAlign: 'center',
// //     color: '#555',
// //     marginVertical: 10,
// //   },
// //   button: {
// //     marginTop: 12,
// //     backgroundColor: '#3D6DCC',
// //     paddingVertical: 12,
// //     paddingHorizontal: 40,
// //     borderRadius: 12,
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontSize: 17,
// //     fontWeight: '600',
// //   },
// // });

// // export default AlertModal;

// // import React, { useEffect, useRef } from 'react';
// // import { View, Text, Modal, TouchableOpacity, Animated, StyleSheet } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';

// // const AlertModal = ({ visible, onClose, onOk, title, message, type = "success" }) => {
// //   const scale = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     if (visible) {
// //       Animated.spring(scale, {
// //         toValue: 1,
// //         friction: 6,
// //         useNativeDriver: true,
// //       }).start();
// //     } else {
// //       scale.setValue(0);
// //     }
// //   }, [visible]);

// //   const icon =
// //     type === "success" ? "checkmark-circle" :
// //     type === "error" ? "close-circle" :
// //     "alert-circle";

// //   const iconColor =
// //     type === "success" ? "#4CAF50" :
// //     type === "error" ? "#F44336" :
// //     "#FFC107";

// //   return (
// //     <Modal transparent visible={visible} animationType="fade">
// //       <View style={styles.overlay}>
// //         <Animated.View style={[styles.modalBox, { transform: [{ scale }] }]}>

// //           <Ionicons name={icon} size={70} color={iconColor} />

// //           <Text style={styles.title}>{title}</Text>
// //           <Text style={styles.message}>{message}</Text>

// //           {/* OK Button → NOW it uses onOk */}
// //           <TouchableOpacity style={styles.button} onPress={onOk}>
// //             <Text style={styles.buttonText}>OK</Text>
// //           </TouchableOpacity>

// //         </Animated.View>
// //       </View>
// //     </Modal>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   overlay: {
// //     flex: 1,
// //     backgroundColor: 'rgba(0,0,0,0.45)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   modalBox: {
// //     width: '80%',
// //     backgroundColor: 'white',
// //     padding: 25,
// //     borderRadius: 20,
// //     alignItems: 'center',
// //     elevation: 15,
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: '600',
// //     marginTop: 10,
// //     color: '#222',
// //   },
// //   message: {
// //     fontSize: 16,
// //     textAlign: 'center',
// //     color: '#555',
// //     marginVertical: 10,
// //   },
// //   button: {
// //     marginTop: 12,
// //     backgroundColor: '#478F4E',
// //     paddingVertical: 12,
// //     paddingHorizontal: 40,
// //     borderRadius: 12,
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontSize: 17,
// //     fontWeight: '600',
// //   },
// // });

// // export default AlertModal;

// import React, { useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   Animated,
//   StyleSheet,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {
//   responsiveHeight as rh,
//   responsiveWidth as rw,
//   responsiveFontSize as rf,
// } from 'react-native-responsive-dimensions';

// // const AlertModal = ({ visible, onClose, onOk, title, message, type = "success" }) => {
// //   const scale = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     if (visible) {
// //       Animated.spring(scale, {
// //         toValue: 1,
// //         friction: 6,
// //         useNativeDriver: true,
// //       }).start();
// //     } else {
// //       scale.setValue(0);
// //     }
// //   }, [visible]);

// //   const icon =
// //     type === "success" ? "checkmark-circle" :
// //     type === "error" ? "close-circle" :
// //     "alert-circle";

// //   const iconColor =
// //     type === "success" ? "#4CAF50" :
// //     type === "error" ? "#F44336" :
// //     "#FFC107";

// //   return (
// //     <Modal transparent visible={visible} animationType="fade">
// //       <View style={styles.overlay}>
// //         <Animated.View style={[styles.modalBox, { transform: [{ scale }] }]}>

// //           <Ionicons
// //             name={icon}
// //             size={rf(8)}
// //             color={iconColor}
// //             style={{ marginBottom: rh(1) }}
// //           />

// //           <Text style={styles.title}>{title}</Text>
// //           <Text style={styles.message}>{message}</Text>

// //           <TouchableOpacity style={styles.button} onPress={onOk}>
// //             <Text style={styles.buttonText}>OK</Text>
// //           </TouchableOpacity>

// //         </Animated.View>
// //       </View>
// //     </Modal>
// //   );
// // };

// const AlertModal = ({
//   visible,
//   onClose,
//   onOk,
//   title,
//   message,
//   type = 'success',
// }) => {
//   const scale = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     if (visible) {
//       Animated.spring(scale, {
//         toValue: 1,
//         friction: 6,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       scale.setValue(0);
//     }
//   }, [visible]);

//   const icon =
//     type === 'success'
//       ? 'checkmark-circle'
//       : type === 'error'
//       ? 'close-circle'
//       : 'alert-circle';

//   const iconColor =
//     type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#FFC107';

//   return (
//     <Modal transparent visible={visible} animationType="fade">
//       <View style={styles.overlay}>
//         <Animated.View style={[styles.modalBox, { transform: [{ scale }] }]}>
//           <Ionicons name={icon} size={70} color={iconColor} />

//           <Text style={styles.title}>{title}</Text>
//           <Text style={styles.message}>{message}</Text>

//           {/* OK Button → NOW it uses onOk */}
//           <TouchableOpacity style={styles.button} onPress={onOk}>
//             <Text style={styles.buttonText}>OK</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.45)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   modalBox: {
//     width: rw(82),
//     backgroundColor: '#fff',
//     paddingVertical: rh(3),
//     paddingHorizontal: rw(6),
//     borderRadius: rw(6),
//     alignItems: 'center',
//     elevation: 15,
//   },

//   title: {
//     fontSize: rf(2),
//     fontWeight: '600',
//     marginTop: rh(1),
//     color: '#222',
//     textAlign: 'center',
//   },

//   message: {
//     fontSize: rf(1.5),
//     textAlign: 'center',
//     color: '#555',
//     marginVertical: rh(1.5),
//     lineHeight: rf(2.6),
//   },

//   button: {
//     marginTop: rh(2),
//     backgroundColor: '#478F4E',
//     paddingVertical: rh(1.5),
//     paddingHorizontal: rw(14),
//     borderRadius: rw(3),
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: rf(1.5),
//     fontWeight: '600',
//   },
// });

// export default AlertModal;


import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';

const AlertModal = ({
  visible,
  onClose,
  onOk,
  title,
  message,
  type = 'success',

  // 👇 NEW PROPS
  primaryText,
  secondaryText,
  onPrimaryPress,
  onSecondaryPress,
}) => {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start();
    } else {
      scale.setValue(0);
    }
  }, [visible]);

  const icon =
    type === 'success'
      ? 'checkmark-circle'
      : type === 'error'
      ? 'close-circle'
      : 'alert-circle';

  const iconColor =
    type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#FFC107';

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalBox, { transform: [{ scale }] }]}>
          <Ionicons name={icon} size={70} color={iconColor} />

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          {/* 🔥 BUTTON SECTION */}
          <View style={styles.buttonRow}>

            {/* Secondary Button */}
            {secondaryText && (
              <TouchableOpacity
                style={[styles.button, styles.secondaryBtn]}
                onPress={onSecondaryPress}>
                <Text style={[styles.buttonText, { color: '#333' }]}>
                  {secondaryText}
                </Text>
              </TouchableOpacity>
            )}

            {/* Primary Button OR Default OK */}
            {primaryText ? (
              <TouchableOpacity
                style={styles.button}
                onPress={onPrimaryPress}>
                <Text style={styles.buttonText}>
                  {primaryText}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={onOk || onClose}>
                <Text style={styles.buttonText}>
                  OK
                </Text>
              </TouchableOpacity>
            )}

          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: rw(90),
    backgroundColor: '#fff',
    paddingVertical: rh(3),
    paddingHorizontal: rw(6),
    borderRadius: rw(6),
    alignItems: 'center',
    elevation: 15,
  },

  title: {
    fontSize: rf(2),
    fontWeight: '600',
    marginTop: rh(1),
    color: '#222',
    textAlign: 'center',
  },

  message: {
    fontSize: rf(1.5),
    textAlign: 'center',
    color: '#555',
    marginVertical: rh(1.5),
    lineHeight: rf(2.6),
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: rh(2),
  },

  button: {
    backgroundColor: '#478F4E',
    paddingVertical: rh(1.5),
    paddingHorizontal: rw(6),
    borderRadius: rw(3),
    marginHorizontal: rw(1.5),
  },

  secondaryBtn: {
    backgroundColor: '#E0E0E0',
  },

  buttonText: {
    color: '#fff',
    fontSize: rf(1.5),
    fontWeight: '600',
  },
});

export default AlertModal;
