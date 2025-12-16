import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
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
import { fetchProductList, loading } from '../../../redux/slices/productSlice';
import Header from '../../../constants/Header';
import { ProductCardStyles } from '../../../constants/ProductCardStyles';
import { moderateScale } from 'react-native-size-matters';

const budgetOptions = [
  { id: 1, label: 'Under ₹10,000' },
  { id: 2, label: '₹10,000 - ₹20,000' },
  { id: 3, label: '₹20,000 - ₹30,000' },
  { id: 4, label: 'Above ₹30,000' },
];

const HomeShopByBudget = ({ navigation }) => {
  const route = useRoute();
  const { budget, osname, arrayosname, priceId, rangeLabel , rangeLabeldefault} = route.params || {};
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selected, setSelected] = useState(rangeLabel || rangeLabeldefault);
  const dispatch = useDispatch();
  const { productData } = useSelector(state => state.product);
  const wishlistItems = useSelector(state => state.wishlist.items);

  // Set selected budget from route param
  useEffect(() => {
    if (priceId) {
      const selectedBudget = budgetOptions.find(item => item.id === priceId);
      if (selectedBudget) setSelected(selectedBudget.label);
    }
    if (budget) setSelected(budget);
  }, [priceId, budget]);

  useEffect(() => {
    dispatch(fetchWishlist()); // fetch wishlist on screen load
    dispatch(fetchProductList()); // fetch wishlist on screen load
  }, [dispatch]);

  // Filter products by OS
  const products = useMemo(() => {
    if (!productData || productData.length === 0) return [];

    if (arrayosname && Array.isArray(arrayosname) && arrayosname.length > 0) {
      return productData.filter(item =>
        arrayosname.some(
          os =>
            item.operating_systems &&
            String(item.operating_systems).toLowerCase() ===
              String(os).toLowerCase(),
        ),
      );
    }
    if (osname) {
      return productData.filter(
        item =>
          item.operating_systems &&
          String(item.operating_systems).toLowerCase() ===
            String(osname).toLowerCase(),
      );
    }
    return productData;
  }, [productData, osname, arrayosname]);

  // Filter by price
  useEffect(() => {
    if (!products || products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [];
    switch (selected) {
      case 'Under ₹10,000':
        filtered = products.filter(item => parseFloat(item.price) < 10000);
        break;
      case '₹10,000 - ₹20,000':
        filtered = products.filter(
          item =>
            parseFloat(item.price) >= 10000 && parseFloat(item.price) <= 20000,
        );
        break;
      case '₹20,000 - ₹30,000':
        filtered = products.filter(
          item =>
            parseFloat(item.price) > 20000 && parseFloat(item.price) <= 30000,
        );
        break;
      case 'Above ₹30,000':
        filtered = products.filter(item => parseFloat(item.price) > 30000);
        break;
    }
    setFilteredProducts(filtered);
  }, [selected, products]);

  // Product card component
  const ProductCardFilter = ({ item }) => {
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
              size={20}
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
      <ScrollView>
        <Header
          title="Shop by Budget"
          navigation={navigation}
          showBack={true}
        />
        <Text style={{ fontWeight: 'bold', marginBottom: 10, marginLeft: 15 }}>
          {osname}
        </Text>

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
                selected === range.label
                  ? styles.pillSelected_shop
                  : styles.pillUnselected_shop,
              ]}
              onPress={() => setSelected(range.label)}
            >
              <Text
                style={[
                  styles.pillText_shop,
                  selected === range.label
                    ? styles.textSelected_shop
                    : styles.textUnselected_shop,
                ]}
              >
                {range.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product List */}
        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => <ProductCardFilter item={item} />}
            keyExtractor={item => item.id?.toString()}
            numColumns={2}
            contentContainerStyle={{
              paddingHorizontal: moderateScale(15),
              paddingBottom: moderateScale(80),
              justifyContent:
                filteredProducts.length === 1 ? 'flex-start' : 'space-between',
            }}
          />
        ) : (
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Ionicons name="alert-circle-outline" size={50} color="#777" />
            <Text style={{ fontSize: 16, color: '#777', marginTop: 10 }}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  backButton: { backgroundColor: '#f5f5f5', borderRadius: 20, padding: 6 },
  headerTitle: { fontSize: 16, fontWeight: '500', color: '#000' },
  imageContainerD: { position: 'relative', backgroundColor: '#f4f4f4' },
  imageD: { width: '100%', height: 250, resizeMode: 'stretch' },
  cardD: {
    width: 190,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowRadius: 4,
    marginHorizontal: 5,
  },
  refurbishedLabelD: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 12,
    color: '#000',
    backgroundColor: '#EAE6E5',
    width: '100%',
    textAlign: 'center',
    padding: 5,
  },
  gradeBoxD: {
    paddingVertical: 2,
    position: 'absolute',
    marginTop: 225,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    borderWidth: 0.2,
  },
  gradeTextD: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },
  productNameD: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
    marginHorizontal: 10,
    color: '#000',
  },
  colorTextD: {
    fontSize: 13,
    color: '#000',
    marginHorizontal: 10,
    marginTop: 2,
  },
  priceRowD: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  priceD: { fontSize: 14, fontWeight: 'bold', color: '#000', marginRight: 6 },
  heartIconD: {
    position: 'absolute',
    top: 28,
    right: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  container_shop: { paddingHorizontal: 10, marginBottom: 10 },
  pill_shop: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  pillSelected_shop: { backgroundColor: '#4B4B4B' },
  pillUnselected_shop: { backgroundColor: '#EFECEC' },
  pillText_shop: { fontSize: 14, fontWeight: '600' },
  textSelected_shop: { color: 'white' },
  textUnselected_shop: { color: '#222' },
});

export default HomeShopByBudget;
