// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
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
//       <SafeAreaView style={styles.container}>
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
//       </SafeAreaView>
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
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Header from '../../../constants/Header';

const { width, height } = Dimensions.get('window');

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
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: scale(10),
    paddingTop: verticalScale(0),
  },
  card: {
    flex: 1,
    margin: scale(5),
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    alignItems: 'center',
    padding: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: 3,
  },
  cardImage: {
    width: width / 2.8, // adjust to fit 2 columns with margin
    height: verticalScale(75),
  },
  cardTitle: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
});

export default Categories;
