// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   View,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import LinearGradient from 'react-native-linear-gradient';

// const Grade = ({navigation}) => {
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const grades = [
//     {
//       title: 'A1 – Like New',
//       description:
//         'This is the best you can get. An A1 Grade product  looks and feels just like it came out of the box brand new. No scratches, no dents, no marks — nothing. Everything works perfectly, from the camera to the battery. ',
//       points: [
//         'Looks brand new, no signs of use.',
//         '100% working parts and features.',
//         'Bright, clear screen.',
//         'Strong battery life.',
//         'Perfect for those who want a “new phone” feel at a lower price.',
//       ],
//     },
//     {
//       title: 'A2 – Excellent',
//       description:
//         'Is almost perfect — you might spot a tiny scratch or faint mark if you look closely, but that’s it. All features work perfectly, so you’re getting top performance with a small cosmetic trade-off.',
//       points: [
//         'Very clean, tiny signs of use.',
//         'Everything works like it should.',
//         'Screen is clear and bright.',
//         'Battery holds charge well.',
//         'A great balance of looks and value.',
//       ],
//     },
//     {
//       title: 'A3 – Very Good',
//       description:
//         'Works great but has more visible signs of use — maybe a few heavier scratches or tiny unnoticeable marks on the screen. It still does everything it’s supposed to, just with a bit more “character.”',
//       points: [
//         'Works perfectly, just more visible wear.',
//         'May have scratches on screen or body.',
//         'All main features still work.',
//         'Screen might have tiny, hard-to-see spots.',
//         'A solid choice if you don’t mind a little wear.',
//       ],
//     },
//     {
//       title: 'A4 – Good',
//       description:
//         'An A4 grade works but shows clear signs of use — dents, scratches, or even parts that don’t match in color. Some features like speakers or charging ports might not work perfectly. Best if you just need a phone that does the basics.',
//       points: [
//         'Noticeable dents or scratches.',
//         'Some features may have issues.',
//         'Screen may have marks.',
//         'Still usable for calls, texts, and basic apps.',
//         'Lower price for basic needs.',
//       ],
//     },
//     {
//       title: 'A5 – Fair',
//       description:
//         'Grade A5 works but has bigger appearance problems — maybe a cracked screen, broken camera glass, or mismatched parts. It’s fine if you care more about function than looks, or plan to repair it later.',
//       points: [
//         'May have broken or cracked glass.',
//         'Works but might look rough.',
//         'Good for spare use or repairs.',
//         'Cheaper option.',
//         'May need appearance fixing to some extent.',
//       ],
//     },
//     {
//       title: 'A6 – Functional with Issues',
//       description:
//         'Still works but has some functional problems — maybe the Wi-Fi or Bluetooth doesn’t work, or there are lines on the screen. It’s fine for basic calls and texts, but not for full feature use.',
//       points: [
//         'Some features won’t work.',
//         'Minor screen problems possible.',
//         'Good for simple tasks only.',
//         'Might have replacement parts installed.',
//         'Best if you just need the basics.',
//       ],
//     },
//     {
//       title: 'A7 – Heavily Worn',
//       description:
//         'Has a lot of wear and several problems — maybe the camera doesn’t work, buttons are missing, or charging is tricky. Only get this if you’re okay with limited use or want it for parts.',
//       points: [
//         'Many features not working. ',
//         'Body may be badly damaged.',
//         'Limited use for daily tasks.',
//         'Cheap, mainly for parts.',
//         'Only for those who accept heavy wear.',
//       ],
//     },
//     {
//       title: 'A8 – Poor Condition',
//       description: 'Major wear or functional issues.',
//     },
//     {
//       title: 'A9 – Poor Condition',
//       description: 'Major wear or functional issues.',
//     },
//   ];

//   const toggleExpand = index => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={styles.backButton}>
//             <Ionicons name="chevron-back" size={22} color="#000" />
//           </TouchableOpacity>
//           <View>
//             <Text style={styles.headerTitle}>Grade Info</Text>
//           </View>
//           <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//             <Ionicons name="search" size={24} color="#333" />
//           </TouchableOpacity>
//         </View>

//         {/* Top Gradient Section */}
//         <LinearGradient
//           colors={['#a17f5d', '#6d4c41']}
//           style={styles.gradientBox}>
//           <Text style={styles.gradientText}>
//             Our grading system helps you understand the condition of refurbished
//             products. Each grade represents a different level of wear and tear,
//             ensuring transparency and satisfaction.
//           </Text>
//         </LinearGradient>

//         {/* Accordion List */}
//         {grades.map((item, index) => (
//           <View key={index} style={styles.accordionItem}>
//             <TouchableOpacity
//               style={styles.accordionHeader}
//               onPress={() => toggleExpand(index)}>
//               <Text style={styles.accordionTitle}>{item.title}</Text>
//               <Ionicons
//                 name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
//                 size={20}
//                 color="#000"
//               />
//             </TouchableOpacity>
//             {expandedIndex === index && (
//               <View style={styles.accordionContentWrapper}>
//                 <Text style={styles.accordionContent}>{item.description}</Text>

//                 {/* Points list */}
//                 {item.points && (
//                   <View style={styles.pointsSection}>
//                     <Text style={styles.pointsTitle}>
//                       What this means for you:
//                     </Text>
//                     {item.points.map((point, i) => (
//                       <View key={i} style={styles.pointRow}>
//                         <Text style={styles.bullet}>{'\u2022'}</Text>
//                         <Text style={styles.pointText}>{point}</Text>
//                       </View>
//                     ))}
//                   </View>
//                 )}
//               </View>
//             )}
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1},
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//   },
//   backButton: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     padding: 6,
//     left: 0,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//     textAlign: 'center',
//   },
//   gradientBox: {
//     marginBottom: 10,
//   },
//   gradientText: {fontSize: 12, color: '#fff', lineHeight: 20, padding: 15},
//   accordionItem: {
//     backgroundColor: '#EAE6E5',
//     marginHorizontal: 16,
//     borderRadius: 8,
//     marginBottom: 10,
//     overflow: 'hidden',
//   },
//   accordionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 14,
//     alignItems: 'center',
//   },
//   accordionTitle: {fontSize: 15, fontWeight: '500', color: '#000'},
//   accordionContent: {
//     paddingHorizontal: 14,
//     paddingBottom: 12,
//     fontSize: 14,
//     color: '#444',
//   },
//   pointsSection: {
//     marginTop: 5,
//   },
//   pointsTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 6,
//     color: '#333',
//   },
//   pointRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 4,
//   },
//   bullet: {
//     fontSize: 14,
//     color: '#666',
//     marginRight: 6,
//     lineHeight: 20,
//   },
//   pointText: {
//     fontSize: 14,
//     color: '#666',
//     flex: 1,
//     lineHeight: 20,
//   },
//   accordionContentWrapper: {
//     paddingHorizontal: 14,
//     paddingBottom: 12,
//   },
// });

// export default Grade;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Header from '../../../constants/Header';

const {width, height} = Dimensions.get('window');

const Grade = ({navigation}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const grades = [
    {
      title: 'A1 – Like New',
      description:
        'This is the best you can get. An A1 Grade product looks and feels just like it came out of the box brand new. No scratches, no dents, no marks — nothing. Everything works perfectly, from the camera to the battery.',
      points: [
        'Looks brand new, no signs of use.',
        '100% working parts and features.',
        'Bright, clear screen.',
        'Strong battery life.',
        'Perfect for those who want a “new phone” feel at a lower price.',
      ],
    },
    {
      title: 'A2 – Excellent',
      description:
        'Is almost perfect — you might spot a tiny scratch or faint mark if you look closely, but that’s it. All features work perfectly, so you’re getting top performance with a small cosmetic trade-off.',
      points: [
        'Very clean, tiny signs of use.',
        'Everything works like it should.',
        'Screen is clear and bright.',
        'Battery holds charge well.',
        'A great balance of looks and value.',
      ],
    },
    {
      title: 'A3 – Very Good',
      description:
        'Works great but has more visible signs of use — maybe a few heavier scratches or tiny unnoticeable marks on the screen. It still does everything it’s supposed to, just with a bit more “character.”',
      points: [
        'Works perfectly, just more visible wear.',
        'May have scratches on screen or body.',
        'All main features still work.',
        'Screen might have tiny, hard-to-see spots.',
        'A solid choice if you don’t mind a little wear.',
      ],
    },
    {
      title: 'A4 – Good',
      description:
        'An A4 grade works but shows clear signs of use — dents, scratches, or even parts that don’t match in color. Some features like speakers or charging ports might not work perfectly. Best if you just need a phone that does the basics.',
      points: [
        'Noticeable dents or scratches.',
        'Some features may have issues.',
        'Screen may have marks.',
        'Still usable for calls, texts, and basic apps.',
        'Lower price for basic needs.',
      ],
    },
    {
      title: 'A5 – Fair',
      description:
        'Grade A5 works but has bigger appearance problems — maybe a cracked screen, broken camera glass, or mismatched parts. It’s fine if you care more about function than looks, or plan to repair it later.',
      points: [
        'May have broken or cracked glass.',
        'Works but might look rough.',
        'Good for spare use or repairs.',
        'Cheaper option.',
        'May need appearance fixing to some extent.',
      ],
    },
    {
      title: 'A6 – Functional with Issues',
      description:
        'Still works but has some functional problems — maybe the Wi-Fi or Bluetooth doesn’t work, or there are lines on the screen. It’s fine for basic calls and texts, but not for full feature use.',
      points: [
        'Some features won’t work.',
        'Minor screen problems possible.',
        'Good for simple tasks only.',
        'Might have replacement parts installed.',
        'Best if you just need the basics.',
      ],
    },
    {
      title: 'A7 – Heavily Worn',
      description:
        'Has a lot of wear and several problems — maybe the camera doesn’t work, buttons are missing, or charging is tricky. Only get this if you’re okay with limited use or want it for parts.',
      points: [
        'Many features not working.',
        'Body may be badly damaged.',
        'Limited use for daily tasks.',
        'Cheap, mainly for parts.',
        'Only for those who accept heavy wear.',
      ],
    },
    {
      title: 'A8 – Poor Condition',
      description: 'Major wear or functional issues.',
    },
    {
      title: 'A9 – Poor Condition',
      description: 'Major wear or functional issues.',
    },
  ];

  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <Header
          title="Grade Info"
          navigation={navigation}
          showBack={true}
          showSearch
        />

        {/* Top Gradient Section */}
        <LinearGradient
          colors={['#a17f5d', '#6d4c41']}
          style={styles.gradientBox}>
          <Text style={styles.gradientText}>
            Our grading system helps you understand the condition of refurbished
            products. Each grade represents a different level of wear and tear,
            ensuring transparency and satisfaction.
          </Text>
        </LinearGradient>

        {/* Accordion List */}
        {grades.map((item, index) => (
          <View key={index} style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleExpand(index)}>
              <Text style={styles.accordionTitle}>{item.title}</Text>
              <Ionicons
                name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                size={moderateScale(20)}
                color="#000"
              />
            </TouchableOpacity>
            {expandedIndex === index && (
              <View style={styles.accordionContentWrapper}>
                <Text style={styles.accordionContent}>{item.description}</Text>

                {item.points && (
                  <View style={styles.pointsSection}>
                    <Text style={styles.pointsTitle}>
                      What this means for you:
                    </Text>
                    {item.points.map((point, i) => (
                      <View key={i} style={styles.pointRow}>
                        <Text style={styles.bullet}>{'\u2022'}</Text>
                        <Text style={styles.pointText}>{point}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: moderateScale(20),
    padding: scale(6),
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  gradientBox: {
    marginBottom: verticalScale(10),
  },
  gradientText: {
    fontSize: moderateScale(12),
    color: '#fff',
    lineHeight: verticalScale(20),
    padding: scale(15),
  },
  accordionItem: {
    backgroundColor: '#EAE6E5',
    marginHorizontal: scale(16),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(10),
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(14),
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: '#000',
  },
  accordionContentWrapper: {
    paddingHorizontal: scale(14),
    paddingBottom: verticalScale(12),
  },
  accordionContent: {
    fontSize: moderateScale(14),
    color: '#444',
    lineHeight: verticalScale(20),
  },
  pointsSection: {
    marginTop: verticalScale(5),
  },
  pointsTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginBottom: verticalScale(6),
    color: '#333',
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(4),
  },
  bullet: {
    fontSize: moderateScale(14),
    color: '#666',
    marginRight: scale(6),
    lineHeight: verticalScale(20),
  },
  pointText: {
    fontSize: moderateScale(14),
    color: '#666',
    flex: 1,
    lineHeight: verticalScale(20),
  },
});

export default Grade;
