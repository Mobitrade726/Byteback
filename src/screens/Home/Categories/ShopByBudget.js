import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlistAPI,
  removeFromWishlistAPI,
  fetchWishlist,
} from '../../../redux/slices/wishlistSlice';
import { fetchProductList } from '../../../redux/slices/productSlice';
import Header from '../../../constants/Header';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  responsiveHeight as RH,
  responsiveWidth as RW,
  responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import { ProductCardStyles } from '../../../constants/ProductCardStyles';

const { width } = Dimensions.get('window');

const budgetOptions = [
  { id: 1, label: 'Under ₹10,000' },
  { id: 2, label: '₹10,000 - ₹20,000' },
  { id: 3, label: '₹20,000 - ₹30,000' },
  { id: 4, label: 'Above ₹30,000' },
];

const ShopByBudget = ({ navigation }) => {
  const route = useRoute();
  const { osName, catId, priceId, catName, rangeLabel } = route.params || {};
  const { catList } = useSelector(state => state.home);
  const [selectedOS, setSelectedOS] = useState(osList?.[0]?.os_name || null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(rangeLabel);



  const dispatch = useDispatch();
  const { productData } = useSelector(state => state.product);
  const wishlistItems = useSelector(state => state.wishlist.items);

  const selectedCategoryData = catList.find(
    item => item.category_name === catName,
  );

  const osList = selectedCategoryData?.os_list || [];

  // Fetch wishlist and products
  useEffect(() => {
    dispatch(fetchWishlist());
    dispatch(fetchProductList());
  }, [dispatch]);

  // Filter products by selected OS
  const filteredByOS = useMemo(() => {
    if (!selectedOS) return productData || [];
    return productData.filter(
      item =>
        item.operating_systems &&
        item.operating_systems.toLowerCase() === selectedOS.toLowerCase(),
    );
  }, [selectedOS, productData]);

  // Filter products by selected price range
  const finalFilteredProducts = useMemo(() => {
    if (!filteredByOS || filteredByOS.length === 0) return [];

    switch (selectedPriceRange) {
      case 'Under ₹10,000':
        return filteredByOS.filter(item => parseFloat(item.price) < 10000);
      case '₹10,000 - ₹20,000':
        return filteredByOS.filter(
          item =>
            parseFloat(item.price) >= 10000 && parseFloat(item.price) <= 20000,
        );
      case '₹20,000 - ₹30,000':
        return filteredByOS.filter(
          item =>
            parseFloat(item.price) > 20000 && parseFloat(item.price) <= 30000,
        );
      case 'Above ₹30,000':
        return filteredByOS.filter(item => parseFloat(item.price) > 30000);
      default:
        return filteredByOS;
    }
  }, [selectedPriceRange, filteredByOS]);

  // Product card component
  const ProductCard = ({ item }) => {
    const isInWishlist = wishlistItems.some(
      w => w.barcode_id === item.barcode_id,
    );

    const handleWishlistToggle = () => {
      if (isInWishlist) dispatch(removeFromWishlistAPI(item));
      else dispatch(addToWishlistAPI(item));
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductList', {
            product_barcode_id: item?.barcode_id,
          })
        }
        style={ProductCardStyles.cardD}
      >
        <View style={ProductCardStyles.imageContainerD}>
          {item && (
            <Text style={ProductCardStyles.refurbishedLabelD}>
              (Refurbished)
            </Text>
          )}

          <Image
            source={{ uri: item.feature_image }}
            style={ProductCardStyles.imageD}
          />

          <TouchableOpacity
            style={ProductCardStyles.heartIconD}
            onPress={handleWishlistToggle}
          >
            <AntDesign
              name={isInWishlist ? 'heart' : 'hearto'}
              size={moderateScale(20)}
              color={isInWishlist ? '#E74C3C' : '#999'}
            />
          </TouchableOpacity>
        </View>

        {/* <View style={ProductCardStyles.gradeBoxD}> */}
          <Text style={ProductCardStyles.gradeTextD}>
            Grade {item.grade_number}
          </Text>
        {/* </View> */}

        <Text style={ProductCardStyles.productNameD}>{item.model_name}</Text>
        <Text style={ProductCardStyles.colorTextD}>● {item.color_name}</Text>
        <View style={ProductCardStyles.priceRowD}>
          <Text style={ProductCardStyles.priceD}>₹ {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Shop by Budget"
        navigation={navigation}
        showBack
        showSearch
      />
      <ScrollView>
        {/* Category Name */}
        {/* <Text
          style={{
            fontWeight: 'bold',
            marginBottom: verticalScale(10),
            marginLeft: scale(15),
            fontSize: moderateScale(16),
          }}
        >
          {catName}
        </Text> */}

        {/* OS Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.container_shop}
        >
          {osList?.map((os, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pill_shop,
                selectedOS === os.os_name
                  ? styles.pillSelected_shop
                  : styles.pillUnselected_shop,
              ]}
              onPress={() => setSelectedOS(os.os_name)}
            >
              <Text
                style={[
                  styles.pillText_shop,
                  selectedOS === os.os_name
                    ? styles.textSelected_shop
                    : styles.textUnselected_shop,
                ]}
              >
                {os.os_name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Price Range Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.container_shop}
        >
          {budgetOptions.map((range, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pill_shop,
                selectedPriceRange === range.label
                  ? styles.pillSelected_shop
                  : styles.pillUnselected_shop,
              ]}
              onPress={() => setSelectedPriceRange(range.label)}
            >
              <Text
                style={[
                  styles.pillText_shop,
                  selectedPriceRange === range.label
                    ? styles.textSelected_shop
                    : styles.textUnselected_shop,
                ]}
              >
                {range.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products List */}
        {finalFilteredProducts.length > 0 ? (
          <FlatList
            data={finalFilteredProducts}
            renderItem={({ item }) => <ProductCard item={item} />}
            keyExtractor={item => item.id?.toString()}
            numColumns={2}
            contentContainerStyle={{
              paddingHorizontal: moderateScale(10),
              paddingBottom: moderateScale(80),
              justifyContent:
                finalFilteredProducts.length === 1
                  ? 'flex-start'
                  : 'space-between',
            }}
          />
        ) : (
          <View style={{ alignItems: 'center', marginTop: verticalScale(60) }}>
            <Ionicons
              name="alert-circle-outline"
              size={moderateScale(50)}
              color="#777"
            />
            <Text
              style={{
                fontSize: moderateScale(16),
                color: '#777',
                marginTop: verticalScale(10),
              }}
            >
              No products available in this range.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },

  container_shop: {
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(10),
  },
  pill_shop: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    borderRadius: scale(20),
    marginRight: scale(10),
  },
  pillSelected_shop: { backgroundColor: '#4B4B4B' },
  pillUnselected_shop: { backgroundColor: '#EFECEC' },
  pillText_shop: { fontSize: moderateScale(14), fontWeight: '600' },
  textSelected_shop: { color: 'white' },
  textUnselected_shop: { color: '#222' },

  gradeBoxD: {
    paddingVertical: verticalScale(2),
    position: 'absolute',
    marginTop: verticalScale(230),
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: moderateScale(10),
    borderWidth: scale(0.2),
  },

  gradeTextD: {
    fontSize: RF(1.4),
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },

  productNameD: {
    fontSize: RF(1.6),
    fontWeight: 'bold',
    marginTop: verticalScale(6),
    marginHorizontal: scale(10),
    color: '#000',
  },

  colorTextD: {
    fontSize: RF(1.5),
    color: '#000',
    marginHorizontal: scale(10),
    marginTop: verticalScale(2),
  },

  priceRowD: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(10),
    marginTop: verticalScale(4),
    marginBottom: verticalScale(10),
  },

  priceD: {
    fontSize: RF(1.6),
    fontWeight: 'bold',
    color: '#000',
    marginRight: scale(6),
  },

  originalPriceD: {
    fontSize: RF(1.4),
    color: '#888',
    textDecorationLine: 'line-through',
  },

  refurbishedLabelD: {
    alignSelf: 'center',
    fontSize: RF(1.4),
    color: '#000',
    backgroundColor: '#EAE6E5',
    width: '100%',
    textAlign: 'center',
    padding: moderateScale(5),
  },

  heartIconD: {
    position: 'absolute',
    top: verticalScale(30),
    right: scale(6),
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    padding: moderateScale(5),
    elevation: 2,
  },

  imageContainerD: { position: 'relative' },

  imageD: {
    width: '100%',
    height: verticalScale(90),
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },

  listContainerD: {
    padding: scale(10),
  },

  cardD: {
    width: width / 2.2,
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowRadius: moderateScale(4),
    marginHorizontal: moderateScale(5),
    marginVertical: moderateScale(5),
    borderWidth: moderateScale(0.5),
  },
});

export default ShopByBudget;
