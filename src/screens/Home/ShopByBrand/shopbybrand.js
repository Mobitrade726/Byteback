// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   View,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBrandList } from '../../../redux/slices/productSlice';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {
//   responsiveWidth,
//   responsiveHeight,
//   responsiveFontSize,
// } from 'react-native-responsive-dimensions';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import ActivityLoader from '../../../constants/Loader';

// const Shopbybrand = ({ catName }) => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const [page, setPage] = useState(1);
//   const [paginatedData, setPaginatedData] = useState([]);
//   const ITEMS_PER_PAGE = 8;

//   useEffect(() => {
//     if (filteredBrands && filteredBrands.length > 0) {
//       setPage(1);
//       setPaginatedData(filteredBrands.slice(0, ITEMS_PER_PAGE));
//     } else {
//       setPaginatedData([]);
//     }
//   }, [filteredBrands]);

//   const loadMore = () => {
//     const nextPage = page + 1;
//     const start = (nextPage - 1) * ITEMS_PER_PAGE;
//     const end = start + ITEMS_PER_PAGE;

//     const nextItems = filteredBrands.slice(start, end);

//     if (nextItems.length > 0) {
//       setPaginatedData(prev => [...prev, ...nextItems]);
//       setPage(nextPage);
//     }
//   };

//   const { brandList, loading: globalLoading } = useSelector(
//     state => state.product,
//   );

//   const [filteredBrands, setFilteredBrands] = useState([]);
//   const [loading, setLoading] = useState(true); // Loader for initial + tab change

//   // ----------------------
//   // 1) Fetch brand list on mount
//   // ----------------------

//   useFocusEffect(
//     useCallback(() => {
//       setLoading(true);
//       dispatch(fetchBrandList());
//     }, [dispatch]),
//   );

//   // ----------------------
//   // 2) Filter brands when brandList or catName changes
//   // ----------------------
//   useEffect(() => {
//     if (!brandList || brandList.length === 0) {
//       setFilteredBrands([]);
//       setLoading(false);
//       return;
//     }

//     setLoading(true); // show loader on tab change

//     const filterData = brandList.filter(item =>
//       item.product_category?.some(
//         os => os.category_name?.toLowerCase() === catName?.toLowerCase(),
//       ),
//     );

//     const unique = filterData.filter(
//       (item, i, arr) => i === arr.findIndex(x => x.id === item.id),
//     );

//     // simulate small delay for smoother loader UX
//     setTimeout(() => {
//       setFilteredBrands(unique);
//       setLoading(false); // hide loader
//     }, 300);
//   }, [brandList, catName]);

//   // ----------------------
//   // 3) Render brand item
//   // ----------------------
//   const renderBrandItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate('Shopbybrandfilter', {
//           brandname: item.brand_name,
//           catName: catName,
//         })
//       }
//       style={{
//         width: responsiveWidth(44),
//         backgroundColor: '#fff',
//         borderRadius: moderateScale(12),
//         marginBottom: verticalScale(10),
//         overflow: 'hidden',
//         elevation: 2,
//         padding: scale(8),
//       }}
//     >
//       <View style={{ alignItems: 'center' }}>
//         {item.brand_image_url ? (
//           <Image
//             source={{ uri: item.brand_image_url }}
//             style={{
//               width: '100%',
//               height: verticalScale(100),
//               borderRadius: moderateScale(8),
//             }}
//             resizeMode="contain"
//           />
//         ) : (
//           <View
//             style={{
//               width: '100%',
//               height: verticalScale(100),
//               backgroundColor: '#eee',
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: moderateScale(8),
//             }}
//           >
//             <Text style={{ fontSize: responsiveFontSize(1.7) }}>No Image</Text>
//           </View>
//         )}

//         <Text
//           style={{
//             marginTop: verticalScale(8),
//             fontSize: responsiveFontSize(2),
//             fontWeight: '600',
//             color: '#000',
//             textAlign: 'center',
//           }}
//         >
//           {item.brand_name}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   // ----------------------
//   // 4) Main Return
//   // ----------------------
//   if (loading) {
//     return <ActivityLoader size="large" color="#11A5D7" />;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       {/* <FlatList
//         data={filteredBrands}
//         keyExtractor={item => item.id.toString()}
//         numColumns={2}
//         columnWrapperStyle={{
//           justifyContent: 'space-between',
//           paddingHorizontal: scale(5),
//         }}
//         contentContainerStyle={{
//           paddingBottom: moderateScale(80),
//           justifyContent:
//             filteredBrands.length === 1 ? 'flex-start' : 'space-between',
//         }}
//         renderItem={renderBrandItem}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <View
//             style={{
//               flex: 1,
//               height: responsiveHeight(40),
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <Ionicons
//               name="pricetag-outline"
//               size={moderateScale(60)}
//               color="#999"
//             />
//             <Text
//               style={{
//                 marginTop: verticalScale(12),
//                 fontSize: responsiveFontSize(2.5),
//                 fontWeight: '700',
//                 color: '#333',
//               }}
//             >
//               No Brands Available
//             </Text>
//             <Text
//               style={{
//                 marginTop: verticalScale(8),
//                 fontSize: responsiveFontSize(1.8),
//                 color: '#777',
//                 textAlign: 'center',
//               }}
//             >
//               Try changing OS selection or check back later.
//             </Text>
//           </View>
//         }
//       /> */}
//       <FlatList
//         data={paginatedData} // <-- use paginatedData
//         keyExtractor={item => item.id.toString()}
//         numColumns={2}
//         columnWrapperStyle={{
//           justifyContent: 'space-between',
//           paddingHorizontal: scale(5),
//         }}
//         contentContainerStyle={{
//           paddingBottom: moderateScale(80),
//           justifyContent:
//             paginatedData.length === 1 ? 'flex-start' : 'space-between',
//         }}
//         renderItem={renderBrandItem}
//         showsVerticalScrollIndicator={false}
//         onEndReached={loadMore} // <-- auto load next items
//         onEndReachedThreshold={0.5} // <-- triggers when scroll near bottom
//         ListEmptyComponent={
//           <View
//             style={{
//               flex: 1,
//               height: responsiveHeight(40),
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <Ionicons
//               name="pricetag-outline"
//               size={moderateScale(60)}
//               color="#999"
//             />
//             <Text
//               style={{
//                 marginTop: verticalScale(12),
//                 fontSize: responsiveFontSize(2.5),
//                 fontWeight: '700',
//                 color: '#333',
//               }}
//             >
//               No Brands Available
//             </Text>
//             <Text
//               style={{
//                 marginTop: verticalScale(8),
//                 fontSize: responsiveFontSize(1.8),
//                 color: '#777',
//                 textAlign: 'center',
//               }}
//             >
//               Try changing OS selection or check back later.
//             </Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// export default Shopbybrand;

import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrandList } from '../../../redux/slices/productSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import ActivityLoader from '../../../constants/Loader';
import LinearGradient from 'react-native-linear-gradient';
import responsive from '../../../constants/responsive';

const { width } = Dimensions.get('window');

const CARD_GAP = scale(10);
const CARD_WIDTH = (width - CARD_GAP * 5) / 2;
const cardSize = CARD_WIDTH * 0.7;

const Shopbybrand = ({ catName }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    if (filteredBrands && filteredBrands.length > 0) {
      setPage(1);
      setPaginatedData(filteredBrands.slice(0, ITEMS_PER_PAGE));
    } else {
      setPaginatedData([]);
    }
  }, [filteredBrands]);

  const loadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const nextItems = filteredBrands.slice(start, end);

    if (nextItems.length > 0) {
      setPaginatedData(prev => [...prev, ...nextItems]);
      setPage(nextPage);
    }
  };

  const { brandList, loading: globalLoading } = useSelector(
    state => state.product,
  );

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(true); // Loader for initial + tab change

  // ----------------------
  // 1) Fetch brand list on mount
  // ----------------------

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      dispatch(fetchBrandList());
    }, [dispatch]),
  );

  // ----------------------
  // 2) Filter brands when brandList or catName changes
  // ----------------------
  useEffect(() => {
    if (!brandList || brandList.length === 0) {
      setFilteredBrands([]);
      setLoading(false);
      return;
    }

    setLoading(true); // show loader on tab change

    const filterData = brandList.filter(item =>
      item.product_category?.some(
        os => os.category_name?.toLowerCase() === catName?.toLowerCase(),
      ),
    );

    const unique = filterData.filter(
      (item, i, arr) => i === arr.findIndex(x => x.id === item.id),
    );

    // simulate small delay for smoother loader UX
    setTimeout(() => {
      setFilteredBrands(unique);
      setLoading(false); // hide loader
    }, 300);
  }, [brandList, catName]);

  // ----------------------
  // 3) Render brand item
  // ----------------------
  const renderBrandItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Shopbybrandfilter', {
          brandname: item.brand_name,
          catName: catName,
        })
      }
      style={{
        // width: cardSize,
        margin: moderateScale(4),
        // alignItems: 'center',
        width: moderateScale(150),
        marginHorizontal: moderateScale(10),
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: moderateScale(20),
        paddingBottom: moderateScale(12),
        borderWidth: 1,
        borderColor: '#ccc',
      }}
    >
      <View>
        {item.brand_image_url ? (
          <ImageBackground
            source={{ uri: item.brand_image_url }}
            style={{
              width: '100%',
              height: verticalScale(100),
              borderRadius: moderateScale(8),
            }}
            resizeMode="contain"
          />
        ) : (
          <View
            style={{
              width: '100%',
              height: verticalScale(100),
              backgroundColor: '#eee',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: moderateScale(8),
            }}
          >
            <Text style={{ fontSize: responsiveFontSize(1.7) }}>No Image</Text>
          </View>
        )}

        <Text
          style={{
            marginTop: verticalScale(8),
            fontSize: responsiveFontSize(2),
            fontWeight: '600',
            color: '#000',
            textAlign: 'center',
          }}
        >
          {item.brand_name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ProductBrandsList = ({ item }) => (
    <View style={styles.budgetWrapper}>
      <Image
        source={
          item.brand_image_url
            ? { uri: item.brand_image_url }
            : require('../../../../assets/images/empty.jpeg')
        }
        style={styles.budgetImageStyle}
        resizeMode="cover"
      />

      {/* 🔥 Price Overlay ON image */}
      <View style={styles.priceOverlay}>
        <Text style={styles.budgetTitle}>{item.brand_name}</Text>
      </View>
    </View>
  );

  // ----------------------
  // 4) Main Return
  // ----------------------
  if (loading) {
    return <ActivityLoader size="large" color="#11A5D7" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor:"#fff" }}>
      <FlatList
        data={paginatedData}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('Shopbybrandfilter', {
                brandname: item.brand_name,
                catName: catName,
              })
            }
            style={{
              marginVertical: 5,
              marginHorizontal: responsive.marginHorizontal(5),  borderRadius: moderateScale(12),

            }}
          >
            <ProductBrandsList item={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              height: responsiveHeight(40),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons
              name="pricetag-outline"
              size={moderateScale(60)}
              color="#999"
            />
            <Text
              style={{
                marginTop: verticalScale(12),
                fontSize: responsiveFontSize(2.5),
                fontWeight: '700',
                color: '#333',
              }}
            >
              No Brands Available
            </Text>
            <Text
              style={{
                marginTop: verticalScale(8),
                fontSize: responsiveFontSize(1.8),
                color: '#777',
                textAlign: 'center',
              }}
            >
              Try changing OS selection or check back later.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Shopbybrand;

const styles = StyleSheet.create({
  budgetWrapper: {
    borderRadius: moderateScale(25),
    overflow: 'hidden', // 🔥 very important
    elevation: 1,
    borderWidth: 0.1,
    backgroundColor: '#fff',
    width: responsive.height(200),
    alignItems: 'center',
  },

  budgetImageStyle: {
    width: responsive.height(220),
    height: responsive.height(190),
  },

  priceOverlay: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    padding: 5,
    marginLeft:30
    // paddingVertical: 10,
    // backgroundColor: 'rgba(0,0,0,0.05)',
    // alignItems: 'center',
  },

  budgetTitle: {
    color: '#fff',
    fontSize: responsive.fontSize(12),
    fontWeight: '500',

    // readability
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
