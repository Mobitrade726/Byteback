// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   StatusBar,
// } from 'react-native';
// import {useSelector} from 'react-redux';
// import Header from '../../../constants/Header';

// const Categories = ({navigation}) => {
//   const {osList} = useSelector(state => state.home);

//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate('CategoriesTab', {initialTab: item.os_name})
//       }
//       style={styles.card}>
//       <Image
//         source={{uri: item.image_url}}
//         style={styles.cardImage}
//         resizeMode="contain"
//       />
//       <Text style={styles.cardTitle}>{item.os_name}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <View style={styles.container}>
//         <Header title="Categories" navigation={navigation} showBack={true} />

//         {/* Category Grid */}
//         <FlatList
//           data={osList}
//           renderItem={renderItem}
//           keyExtractor={item => item.id}
//           numColumns={2}
//           contentContainerStyle={styles.list}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 0,
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
//   list: {
//     paddingHorizontal: 10,
//     paddingTop: 10,
//   },
//   card: {
//     flex: 1,
//     margin: 8,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     alignItems: 'center',
//     padding: 12,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   cardImage: {
//     width: 120,
//     height: 140,
//   },
//   cardTitle: {
//     marginTop: 8,
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#000',
//   },
// });

// export default Categories;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Header from '../../../constants/Header';
import responsive from '../../../constants/responsive';

const Categories = ({ navigation }) => {
  const { catList } = useSelector(state => state.home);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CategoriesTab', { initialTab: item.category_name })
      }
      style={styles.card}
    >
      <Image
        source={
          item.image_url
            ? { uri: item.image_url }
            : require('../../../../assets/images/empty.jpeg')
        }
        style={styles.cardImage}
        resizeMode="contain"
      />
      <Text style={styles.cardTitle}>{item.category_name}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <Header title="Categories" navigation={navigation} showBack={true} />

        {/* Category Grid */}
        <FlatList
          data={catList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  list: {
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: responsive.borderRadius(12),

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: moderateScale(6),

    // Android shadow
    elevation: 6,

    // Layout & spacing
    paddingVertical: responsive.paddingBottom(10),
    paddingHorizontal: responsive.gap(3),
    gap: responsive.gap(12),
    marginHorizontal: responsive.gap(6),
    marginVertical: responsive.gap(6),

    // Optional subtle border
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },

  cardImage: {
    height: responsive.height(160),
    width: responsive.width(160),
  },
  cardTitle: {
    fontSize: responsive.fontSize(14),
    fontWeight: '500',
    color: '#171D1C',
    textAlign: 'center',
  },
});

export default Categories;
