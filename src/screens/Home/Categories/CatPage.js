import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  addToWishlistAPI,
  removeFromWishlistAPI,
} from '../../../redux/slices/wishlistSlice';
import {
  fetchProductList,
  fetchFilterData,
} from '../../../redux/slices/productSlice';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Section from '../Section';

const { width } = Dimensions.get('window');
const cardSize = width * 0.3;

const CatPage = ({ catName, osName, catId }) => {
  const { uri } = useSelector(state => state.cat);
  const { catList, brands } = useSelector(state => state.home);
  const navigation = useNavigation(); // ✅ make sure navigation is available
  const dispatch = useDispatch();
  const { productData, filterdata } = useSelector(state => state.product);
  // state
  const [applyselectedfilters, ApplyselectedFilters] = useState();
  const [filteredProduct, setFilteredProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('lowToHigh');

  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  // Apply filters
  useEffect(() => {
    if (!productData) return;

    if (!applyselectedfilters) {
      setFilteredProducts(
        productData.filter(item => item.operating_systems === catName),
      );
      return;
    }

    const filtered = productData.filter(item => {
      // OS filter
      if (item.operating_systems !== catName) return false;

      // Brand filter
      if (
        applyselectedfilters.brands &&
        applyselectedfilters.brands.length > 0 &&
        !applyselectedfilters.brands.includes(item.brand_name)
      )
        return false;

      // Color filter
      if (
        applyselectedfilters.colors &&
        applyselectedfilters.colors.length > 0 &&
        !applyselectedfilters.colors.includes(item.color_name)
      )
        return false;

      // Grade filter
      if (
        applyselectedfilters.grade &&
        item.grade_number !== applyselectedfilters.grade.grade
      )
        return false;

      // RAM filter
      if (
        applyselectedfilters.ram &&
        item.ram_id !== applyselectedfilters.ram.id
      )
        return false;

      // Storage filter
      if (
        applyselectedfilters.storage &&
        item.rom_id !== applyselectedfilters.storage.id
      )
        return false;

      return true;
    });
    // Apply sorting
    if (selectedOption === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedOption === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selectedOption === 'grade') {
      filtered.sort((a, b) => a.grade_number.localeCompare(b.grade_number));
    }
    setFilteredProducts(filtered);
  }, [applyselectedfilters, productData, catName]);

  const selectedCategoryData = catList.find(
    item => item.category_name.toLowerCase() === catName.toLowerCase(),
  );

  const categoryOSList = selectedCategoryData?.os_list || [];

  // categoryBrands = category-wise + OS-wise brands
  const categoryBrands = brands.filter(
    brand =>
      // Category match
      brand.product_category.some(cat => cat.id === selectedCategoryData?.id) &&
      // OS match (agar osName available hai)
      (osName
        ? brand.operatingsystem.some(
            os => os.os_name.toLowerCase() === osName.toLowerCase(),
          )
        : true), // agar OS filter nahi, to ignore
  );

  const budgetOptions = [
    {
      id: 1,
      label: 'Under ₹10,000',
      image: 'https://i.postimg.cc/Pf3MBSK6/Category-Card-01-1.png',
    },
    {
      id: 2,
      label: '₹10,000 - ₹20,000',
      image: 'https://i.postimg.cc/0NRJJB0y/Category-Card-02.png',
    },
    {
      id: 3,
      label: '₹20,000 - ₹30,000',
      image:
        'https://i.postimg.cc/zvBLrZ80/create-an-image-with-multiple-smartphones-that-are-under-10000-20000-rupees.png',
    },
    {
      id: 4,
      label: 'Above ₹30,000',
      image: 'https://i.postimg.cc/Ls3hg6sx/Category-Card-4.png',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: moderateScale(40) }} showsVerticalScrollIndicator={false}>
        <View style={styles.osContainer}>
          {categoryOSList.length > 0
            ? categoryOSList.map((item, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Cat_OS_Product', {
                      osName: item.os_name,
                      catId: catId,
                      catName: catName,
                    })
                  }
                  key={index}
                  style={styles.osCard}
                >
                  <ImageBackground
                    source={{ uri: item.image_url }}
                    style={styles.osImage}
                    imageStyle={styles.osImageStyle}
                  >
                    <LinearGradient
                      colors={[
                        'rgba(0,0,0,0.6)',
                        'rgba(0,0,0,0.2)',
                        'transparent',
                      ]}
                      style={styles.osGradient}
                    >
                      <Text style={styles.osTitle}>{item.os_name}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              ))
            : null}
        </View>
        {categoryOSList?.length > 0 ? (
          <>
            <Section
              title="Shop by brands"
              onPress={() => navigation.navigate('ShopbybrandsTab')}
            >
              <FlatList
                data={categoryBrands}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
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
                    onPress={() =>
                      navigation.navigate('Shopbybrandfilter', {
                        osName: item.brand_name,
                        catName: item.product_category
                          .map(c => c.category_name)
                          .join(', '),
                      })
                    }
                  >
                    {/* IMAGE */}
                    <ImageBackground
                      source={
                        item.brand_image_url
                          ? { uri: item.brand_image_url }
                          : require('../../../../assets/images/empty.jpeg')
                      }
                      style={{
                        width: '100%',
                        height: cardSize,
                        // borderRadius: moderateScale(10),
                        overflow: 'hidden',
                        // justifyContent: 'center',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                      imageStyle={{
                        // borderRadius: moderateScale(10),
                        // resizeMode: 'contain',
                        borderTopLeftRadius: moderateScale(20),
                        borderTopRightRadius: moderateScale(20),
                      }}
                    >
                      <LinearGradient
                        colors={['rgba(249, 247, 247, 0)', 'rgba(0,0,0,0.45)']}
                        style={styles.brandGradient}
                      />
                    </ImageBackground>

                    {/* BRAND NAME BELOW IMAGE */}
                    <Text
                      style={{
                        // marginTop: moderateScale(6),
                        // fontSize: moderateScale(11),
                        // fontWeight: '600',
                        // textAlign: 'center',
                        // color: '#000',
                        marginTop: moderateScale(10),
                        fontSize: moderateScale(14),
                        fontWeight: '700',
                        color: '#333',
                        textAlign: 'center',
                      }}
                      // numberOfLines={1}
                    >
                      {item.brand_name}
                    </Text>
                  </TouchableOpacity>
                )}
                scrollEnabled={false}
              />
            </Section>

            {/* Shop by Budget */}
            <View
              style={{
                backgroundColor: '#f1f1f1',
                marginTop: moderateScale(20),
                paddingVertical: 15,
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(20),
                  marginVertical: moderateScale(10),
                  marginHorizontal: moderateScale(15),
                  fontWeight: '600',
                  color: '#222',
                }}
              >
                Shop by Budget
              </Text>
              {/* <View style={styles.grid}>
              {budgetOptions.map((item, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ShopByBudget', {
                      osName: osName,
                      catName: catName,
                      priceId: item.id,
                    })
                  }
                  key={index}
                  style={styles.budgetCard}
                >
                  <View style={styles.imageWrapper}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.budgetImage}
                    />
                    <Text style={styles.budgetLabel}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View> */}
              <View style={styles.grid}>
                {budgetOptions.map((item, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ShopByBudget', {
                        osName: osName,
                        catName: catName,
                        priceId: item.id,
                        rangeLabel: item.label,
                      })
                    }
                    key={index}
                    style={styles.budgetCard}
                    activeOpacity={0.8}
                  >
                    <View style={styles.cardContent}>
                      <LinearGradient
                        colors={['#3d8e2a', '#b4ffa5']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradientCircle}
                      >
                        <Ionicons
                          name="pricetag-outline"
                          size={28}
                          color="#fff"
                        />
                      </LinearGradient>

                      <Text style={styles.budgetTitle}>{item.label}</Text>

                      <Text style={styles.budgetSubText}>Tap to Explore</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: verticalScale(8),
              paddingHorizontal: scale(20),
            }}
          >
            <Image
              source={require('../../../../assets/images/emptyproduct.png')}
              style={{
                width: scale(140),
                height: verticalScale(140),
                resizeMode: 'contain',
                opacity: 0.9,
              }}
            />

            <Text
              style={{
                fontSize: moderateScale(22),
                fontWeight: '700',
                color: '#000',
                marginTop: verticalScale(20),
              }}
            >
              No Products Available
            </Text>

            <Text
              style={{
                fontSize: moderateScale(15),
                color: '#666',
                textAlign: 'center',
                marginTop: verticalScale(8),
                lineHeight: moderateScale(22),
                paddingHorizontal: scale(10),
              }}
            >
              We couldn’t find matching products right now. Try exploring other
              categories or adjust filters.
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
    paddingVertical: verticalScale(5),
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: moderateScale(20),
    padding: moderateScale(6),
    left: 0,
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  osContainer: {
    flexDirection: 'row',
    marginTop: responsiveHeight(1),
    marginHorizontal: moderateScale(10),
  },

  osCard: {
    borderRadius: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
    marginHorizontal: moderateScale(10),
    overflow: 'hidden',
    borderWidth: 1,
    shadowRadius: 6,
    borderColor: '#f1f1f1',
  },

  osImage: {
    flex: 1,
    justifyContent: 'flex-end',
    width: responsiveHeight(10),
    height: responsiveHeight(12),
  },

  osImageStyle: {
    borderRadius: responsiveWidth(0),
  },

  osGradient: {
    padding: responsiveWidth(1),
  },

  osTitle: {
    fontSize: responsiveFontSize(1),
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  bannerImage: {
    width: '100%',
    height: verticalScale(240),
    resizeMode: 'stretch',
  },
  bannerTextContainer: {
    position: 'absolute',
    bottom: verticalScale(20),
    left: scale(12),
  },
  bannerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAllBtn: {
    marginTop: verticalScale(6),
    backgroundColor: '#fff',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8),
    width: '60%',
  },
  seeAllText: { fontWeight: 'bold', textAlign: 'center' },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginTop: verticalScale(20),
    marginLeft: scale(12),
    marginBottom: verticalScale(10),
  },
  // grid: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-around',
  //   paddingHorizontal: scale(10),
  // },
  // budgetCard: {
  //   width: width / 2.3,
  //   marginBottom: verticalScale(10),
  //   alignItems: 'center',
  // },
  // imageWrapper: {
  //   position: 'relative',
  //   width: '100%',
  //   height: verticalScale(100),
  //   borderRadius: moderateScale(10),
  //   overflow: 'hidden',
  // },
  // budgetImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  // budgetLabel: {
  //   position: 'absolute',
  //   bottom: verticalScale(8),
  //   left: scale(10),
  //   color: 'white',
  //   fontSize: moderateScale(12),
  //   paddingHorizontal: scale(6),
  //   paddingVertical: verticalScale(2),
  //   borderRadius: moderateScale(4),
  // },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(10),
  },

  budgetCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: moderateScale(16),
    paddingVertical: moderateScale(18),
    marginBottom: moderateScale(15),
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardContent: {
    alignItems: 'center',
  },

  gradientCircle: {
    width: moderateScale(58),
    height: moderateScale(58),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },

  budgetTitle: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#222',
    marginTop: 2,
  },

  budgetSubText: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    margin: scale(10),
    width: width / 2.2,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: verticalScale(120),
    resizeMode: 'contain',
  },
  refurbished: {
    position: 'absolute',
    top: verticalScale(8),
    left: scale(8),
    fontSize: moderateScale(11),
    color: '#777',
  },
  heart: {
    position: 'absolute',
    top: verticalScale(8),
    right: scale(8),
    zIndex: 1,
    padding: moderateScale(5),
  },
  grade: {
    fontSize: moderateScale(12),
    color: '#888',
    marginVertical: verticalScale(4),
  },
  name: { fontWeight: 'bold', fontSize: moderateScale(14) },
  color: { fontSize: moderateScale(12), marginVertical: verticalScale(2) },
  price: { fontWeight: 'bold', fontSize: moderateScale(14) },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: moderateScale(12),
    marginLeft: scale(4),
  },
  gradeInfo: {
    flexDirection: 'row',
    padding: moderateScale(12),
    margin: moderateScale(12),
    backgroundColor: '#f2f2f2',
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },
  gradeBadge: {
    width: moderateScale(60),
    height: moderateScale(60),
    marginRight: scale(12),
  },
  gradeTitle: { fontWeight: 'bold', fontSize: moderateScale(14) },
  gradeDesc: { fontSize: moderateScale(12), color: '#444' },
  learnMoreBtn: {
    backgroundColor: '#fff',
    padding: moderateScale(6),
    marginTop: verticalScale(6),
    borderRadius: moderateScale(6),
    alignSelf: 'flex-start',
  },
  learnMoreText: { fontWeight: 'bold', fontSize: moderateScale(12) },
  rowBtns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: verticalScale(20),
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
  },
  actionText: { marginLeft: scale(6), fontSize: moderateScale(14) },

  // --- Product Details ---
  badgeTextD: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  gradeBoxD: {
    paddingVertical: verticalScale(2),
    position: 'absolute',
    marginTop: verticalScale(232),
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: moderateScale(10),
    borderWidth: 0.2,
  },
  gradeTextD: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },
  productNameD: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginTop: verticalScale(6),
    marginHorizontal: scale(10),
    color: '#000',
  },
  colorTextD: {
    fontSize: moderateScale(13),
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
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#000',
    marginRight: scale(6),
  },
  originalPriceD: {
    fontSize: moderateScale(13),
    color: '#888',
    textDecorationLine: 'line-through',
  },
  refurbishedLabelD: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: moderateScale(12),
    color: '#000',
    backgroundColor: '#EAE6E5',
    width: '100%',
    textAlign: 'center',
    paddingVertical: verticalScale(5),
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
  imageContainerD: { position: 'relative', backgroundColor: '#f4f4f4' },
  imageD: { width: '100%', height: verticalScale(250), resizeMode: 'stretch' },
  listContainerD: { padding: moderateScale(10) },
  cardD: {
    width: width / 2.1,
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowRadius: moderateScale(4),
    marginHorizontal: moderateScale(5),
  },

  leftContainer: { flex: 1, paddingRight: moderateScale(10) },
  heading: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: verticalScale(6),
  },
  subheading: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: '#333',
    marginBottom: verticalScale(8),
  },
  description: {
    fontSize: moderateScale(16),
    color: '#7E7E7E',
    marginBottom: verticalScale(20),
  },
  button: {
    backgroundColor: '#EAE8E8',
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(24),
    borderRadius: moderateScale(16),
    alignSelf: 'flex-start',
  },
  buttonText: { fontSize: moderateScale(16), color: '#000', fontWeight: '600' },
  buttonL: {
    backgroundColor: '#EAE8E8',
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(24),
    borderRadius: moderateScale(16),
    marginHorizontal: moderateScale(10),
  },
  buttonTextL: {
    fontSize: moderateScale(16),
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
  imageG: { width: width * 0.3, height: width * 0.3 },

  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: moderateScale(20),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#000',
    paddingBottom: verticalScale(10),
    borderWidth: 1,
    padding: moderateScale(10),
    alignSelf: 'center',
    width: width * 0.8,
    borderRadius: moderateScale(10),
  },
  modalTitle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  optionList: {
    marginVertical: verticalScale(20),
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
  },
  optionText: {
    fontSize: moderateScale(15),
    color: '#000',
  },
  radioOuter: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#000',
  },
  radioInner: {
    height: moderateScale(10),
    width: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: '#000',
  },
  applyWrapper: {
    bottom: verticalScale(30),
    alignItems: 'flex-end',
    marginRight: scale(10),
  },
  applyButton: {
    backgroundColor: '#333',
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },
  applyText: {
    color: '#fff',
    fontWeight: '500',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPane: {
    width: scale(110),
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingVertical: verticalScale(10),
  },
  tabItem: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(10),
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: scale(6),
  },
  tabItemSelected: {
    backgroundColor: '#F0F0F0',
  },
  tabLabel: {
    fontSize: moderateScale(14),
    color: '#000',
  },
  rightPane: {
    flex: 1,
    padding: moderateScale(16),
  },
  rightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
    marginLeft: scale(10),
    width: '75%',
  },
  rightHeader_cat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
    width: '75%',
  },
  rightTitle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginBottom: verticalScale(5),
  },
  selectedCount: {
    fontSize: moderateScale(14),
    color: '#333',
  },
  brandItem: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    borderRadius: moderateScale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
  },
  brandItemSelected: {
    backgroundColor: '#222',
  },
  brandText: {
    fontSize: moderateScale(15),
    color: '#000',
  },
  itemCount: {
    fontSize: moderateScale(14),
    color: '#888',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(0),
  },
  resetBtn: {
    borderWidth: moderateScale(1),
    borderColor: '#000',
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },
  resetText: {
    color: '#000',
    fontWeight: '500',
    fontSize: moderateScale(10),
  },
  applyBtn: {
    backgroundColor: '#000',
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },
  title_cat: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginBottom: verticalScale(16),
  },
  grid_cat: {
    justifyContent: 'center',
  },
  gridRow_cat: {
    justifyContent: 'space-evenly',
    marginBottom: verticalScale(16),
  },
  card_cat: {
    width: '38%',
    aspectRatio: 1,
    backgroundColor: '#eee',
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSelected_cat: {
    backgroundColor: '#333',
  },
  label_cat: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(14),
    color: '#000',
    fontWeight: '500',
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(8),
  },
  price: {
    fontSize: moderateScale(14),
    color: '#333',
  },
  selectedRange: {
    marginTop: verticalScale(14),
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#000',
  },
  rail: {
    flex: 1,
    height: verticalScale(4),
    backgroundColor: '#ccc',
    borderRadius: moderateScale(2),
  },
  railSelected: {
    height: verticalScale(4),
    backgroundColor: '#333',
    borderRadius: moderateScale(2),
  },
  thumb: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    alignItems: 'center',
    padding: moderateScale(6),
    backgroundColor: '#fff',
    borderRadius: moderateScale(6),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  labelText: {
    fontSize: moderateScale(12),
    color: '#333',
  },
  headerRow_C: {
    flexDirection: 'row',
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title_c: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  selectedCount_c: {
    fontSize: moderateScale(14),
    color: '#000',
    marginLeft: scale(150),
    fontWeight: 'bold',
  },
  row_c: {
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  colorItem_c: {
    alignItems: 'center',
    width: '18%',
    marginHorizontal: scale(5),
    marginBottom: verticalScale(15),
  },
  colorCircleWrapper_c: {
    padding: 0,
    borderRadius: moderateScale(16),
  },
  selectedWrapper_c: {
    backgroundColor: '#F2F2F2',
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(15),
    marginHorizontal: scale(5),
    alignItems: 'center',
    width: '18%',
  },
  colorCircle_c: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    borderWidth: moderateScale(2),
    borderColor: 'transparent',
  },
  colorCircleSelected_c: {
    borderColor: '#000',
    borderWidth: moderateScale(3),
  },
  colorLabel_c: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(10),
    color: '#333',
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  gradeButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(12),
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
  },
  gradeButtonSelected: {
    backgroundColor: '#222',
  },
  gradeText: {
    fontSize: moderateScale(16),
    color: '#000',
    fontWeight: '500',
  },
  gradeTextSelected: {
    color: '#fff',
  },
  header_panel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#eee',
    marginBottom: verticalScale(10),
    width: '90%',
  },
  discountButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(12),
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
  },
  discountButtonSelected: {
    backgroundColor: '#222',
  },
  discountTexts: {
    fontSize: moderateScale(16),
    color: '#000',
    fontWeight: '500',
  },
  discountTextSelected: {
    color: '#fff',
  },
  subHeading: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(8),
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
  },
  optionButton: {
    borderWidth: moderateScale(1),
    borderColor: '#000',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(10),
    marginRight: scale(10),
  },
  selectedButton: {
    backgroundColor: '#333',
  },
  selectedText: {
    color: '#fff',
  },

  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: scale(12),
    marginLeft: scale(15),
    marginBottom: verticalScale(10),
  },
  sortButton: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: moderateScale(25),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: moderateScale(25),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  sortText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#000',
  },
  card_Flash: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
    margin: scale(10),
  },
  leftSection: {
    flex: 1,
    paddingRight: scale(12),
  },
  discountText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  name_Flash: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#222',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  originalPrice: {
    fontSize: moderateScale(13),
    color: '#777',
    textDecorationLine: 'line-through',
  },
  rightSection: {
    width: scale(100),
    height: scale(100),
    position: 'relative',
  },
  image_Flash: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(12),
  },
  heartIcon: {
    position: 'absolute',
    top: verticalScale(6),
    right: scale(6),
    backgroundColor: '#fff',
    padding: scale(5),
    borderRadius: moderateScale(20),
    elevation: 2,
  },
});

export default CatPage;
