import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  StatusBar,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather'; // or use MaterialIcons, etc.
import { styles } from './styles'; // adjust path if needed
import HeroCarousel from './HeroCarousel';
import Section from './Section';
import Header from './Header';
import {
  fetchBanners,
  fetchOsList,
  fetchCatList,
  fetchBrands,
} from '../../redux/slices/homeSlice';
import {
  fetchRecentlyViewed,
  fetchProductList,
} from '../../redux/slices/productSlice';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  addToWishlistAPI,
  removeFromWishlistAPI,
} from '../../redux/slices/wishlistSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ProductCardStyles } from '../../constants/ProductCardStyles';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../constants/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { clearProfile } from '../../redux/slices/profileSlice';

const Home = ({ navigation }) => {
  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch();
  const { carouselData, brands, uri, catList, status } = useSelector(
    state => state.home,
  );
  const { recentlyview } = useSelector(state => state.product);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchOsList());
      dispatch(fetchBrands());
      dispatch(fetchBanners());
      dispatch(fetchRecentlyViewed());
      dispatch(fetchProductList());
      dispatch(fetchCatList());
    }, [dispatch]),
  );

  const RecentlyView = ({ item }) => {
    const wishlistItems = useSelector(state => state.wishlist.items);
    // ✅ check product already in wishlist
    const isInWishlist = wishlistItems.some(
      w => w.barcode_id == item.barcode_id,
    );
    const handleWishlistToggle = () => {
      if (isInWishlist) {
        dispatch(removeFromWishlistAPI(item));
      } else {
        dispatch(addToWishlistAPI(item));
      }
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
        {/* Image + Heart */}
        <View style={ProductCardStyles.imageContainerD}>
          {item && (
            <Text style={ProductCardStyles.refurbishedLabelD}>PRE-OWNED</Text>
          )}

          <Image
            source={{ uri: item.feature_image }}
            style={ProductCardStyles.imageD}
          />

          {/* ❤️ Wishlist Button */}
          <TouchableOpacity
            style={ProductCardStyles.heartIconD}
            onPress={() => handleWishlistToggle()}
          >
            <AntDesign
              name={isInWishlist ? 'heart' : 'hearto'}
              size={moderateScale(20)}
              color={isInWishlist ? '#E74C3C' : '#999'}
            />
          </TouchableOpacity>
        </View>

        {/* Grade Box */}
        {/* <View style={ProductCardStyles.gradeBoxD}> */}
        <Text style={ProductCardStyles.gradeTextD}>
          Grade {item.grade_number}
        </Text>
        {/* </View> */}

        {/* Product Info */}
        <Text style={ProductCardStyles.productNameD}>{item.model_name}</Text>
        <Text style={ProductCardStyles.colorTextD}>● {item.color_name}</Text>
        <View style={ProductCardStyles.priceRowD}>
          <Text style={ProductCardStyles.priceD}>₹ {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const FeatureItem = ({ icon, title, subtitle }) => {
    return (
      <View style={styles.itemfooter}>
        <View style={styles.iconOuteritemfooter}>
          <View style={styles.iconInneritemfooter}>
            <Ionicons name={icon} size={24} color="#fff" />
          </View>
        </View>

        <Text style={styles.titleitemfooter}>{title}</Text>
        <Text style={styles.subtitleitemfooter}>{subtitle}</Text>
      </View>
    );
  };

  // ✅ Handle Back Button
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert('Exit App', 'Do you want to exit the app?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ]);

        return true;
      } else {
        return false; // normal back
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const renderItem = ({ item }) => {
    const osName = item.os_list?.map(os => os.os_name);
    const catId = item.id;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CategoriesTab', {
            initialTab: item.category_name,
            osName: osName,
            catId: catId,
          })
        }
        style={styles.categoryCard}
      >
        <Image
          source={
            item.image_url
              ? { uri: item.image_url }
              : require('../../../assets/images/empty.jpeg')
          }
          style={styles.categoryImage}
        />

        <Text style={styles.categoryText}>{item.category_name}</Text>
      </TouchableOpacity>
    );
  };

  if (status === 'loading' && carouselData.length === 0) {
    return <Loader />;
  }

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
    <>
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Header navigation={navigation} />

        <ScrollView
          contentContainerStyle={{ paddingBottom: moderateScale(40) }}
          showsVerticalScrollIndicator={false}
        >
          {/* Carousel */}
          <HeroCarousel data={carouselData} navigation={navigation} />
          <FlatList
            horizontal
            data={catList} // clone and reverse
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('RecentlyAddedTab')}
            style={{
              flex: 1,
              backgroundColor: '#fff',
              marginHorizontal: moderateScale(10),
              marginBottom: moderateScale(8),
            }}
          >
            {/* Recently Added Banner */}
            <View style={{ marginTop: moderateScale(16) }}>
              <ImageBackground
                source={{
                  uri: uri?.url,
                }}
                style={styles.banner}
                imageStyle={{ borderRadius: moderateScale(12) }}
              >
                <View style={styles.bannerOverlay}>
                  <Text style={styles.bannerText}>Recently Added</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={moderateScale(20)}
                    color="#fff"
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          {/* Offers */}
          <Section
            title="Shop by brands"
            onPress={() => navigation.navigate('ShopbybrandsTab')}
          >
            <FlatList
              horizontal
              data={brands}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Shopbybrandfilter', {
                      brandname: item.brand_name,
                      catName: item.product_category
                        .map(c => c.category_name)
                        .join(', '),
                      osName: item.operatingsystem
                        .map(o => o.os_name)
                        .join(', '),
                      catId: item.product_category.map(c => c.id),
                    })
                  }
                  style={styles.brandCardContainer}
                  activeOpacity={0.8}
                >
                  {/* Image with overlay */}
                  <ImageBackground
                    source={
                      item.brand_image_url
                        ? { uri: item.brand_image_url }
                        : require('../../../assets/images/empty.jpeg')
                    }
                    style={styles.brandImage}
                    imageStyle={styles.brandImageStyle}
                  >
                    {/* Gradient Overlay */}
                    <LinearGradient
                      colors={['rgba(249, 247, 247, 0)', 'rgba(0,0,0,0.45)']}
                      style={styles.brandGradient}
                    />
                  </ImageBackground>

                  {/* Brand Name */}
                  <Text style={styles.brandTitle}>{item.brand_name}</Text>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </Section>
          <View
            style={{
              backgroundColor: '#f1f1f1',
              marginTop: moderateScale(20),
              paddingVertical: 15,
            }}
          >
            <Section title="Shop by budget">
              {/* <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  fontSize: moderateScale(15),
                  marginBottom: moderateScale(5),
                }}
              >
                Get Smartphones
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ShopByBudget', {
                    priceId: mobileBudget[0]?.id,
                    arrayosname: ['iOS', 'Android'], // shows both iOS & Android
                    rangeLabeldefault: 'Under ₹10,000',
                  })
                }
              >
                <Ionicons
                  name="chevron-forward"
                  size={moderateScale(20)}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={mobileBudget}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ShopByBudget', {
                      priceId: item.id,
                      arrayosname: ['iOS', 'Android'], // shows both iOS & Android
                      rangeLabel: item?.label,
                    })
                  }
                >
                  <ProductMobile item={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              contentContainerStyle={styles.listContainerD}
              showsHorizontalScrollIndicator={false}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: scale(5),
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(15),
                  marginBottom: moderateScale(5),
                }}
              >
                Get Macbooks & Windows PC
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ShopByBudget', {
                    priceId: mobileBudget[0]?.id,
                    arrayosname: ['macOS', 'windows'], // shows both iOS & Android
                    rangeLabeldefault: 'Under ₹10,000',
                  })
                }
              >
                <Ionicons
                  name="chevron-forward"
                  size={moderateScale(20)}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={LaptopBudget}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ShopByBudget', {
                      priceId: item.id,
                      arrayosname: ['macOS', 'windows'], // shows both iOS & Android
                      rangeLabel: item?.label,
                    })
                  }
                >
                  <ProductLaptop item={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              contentContainerStyle={styles.listContainerD}
              showsHorizontalScrollIndicator={false}
            /> */}
              <View style={styles.grid}>
                {budgetOptions.map((item, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ShopByBudget', {
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
            </Section>
          </View>

          {recentlyview?.length > 0 ? (
            <>
              <Section
                title="Recently Viewed"
                onPress={() => navigation.navigate('RecentlyView')}
              >
                <FlatList
                  horizontal
                  data={recentlyview}
                  renderItem={({ item }) => <RecentlyView item={item} />}
                  keyExtractor={item => item.barcode_id?.toString()}
                  showsHorizontalScrollIndicator={false}
                />
              </Section>
            </>
          ) : null}

          <ImageBackground
            style={{
              height: verticalScale(200),
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: moderateScale(20),
            }}
            source={require('../../../assets/images/gstrate.png')}
          ></ImageBackground>
          <View
            style={{
              width: '92%',
              marginTop: scale(20),
              marginBottom: moderateScale(5),
              flexDirection: 'row',
              alignSelf: 'center',
              borderWidth: 1,
              padding: 15,
              borderColor: '#ccc',
              backgroundColor: '#f9f9f9',
              borderRadius: 8,
            }}
          >
            <View style={styles.leftContainer}>
              <Text style={styles.heading}>What is A1 to A9 Grade?</Text>
              <Text style={styles.subheading}>How Does Our Grading Work?</Text>
              <Text style={styles.description}>
                Grading ranges from A1 (like new) to A9 (heavily used).
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('Grade')}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Learn More</Text>
              </TouchableOpacity>
            </View>

            {/* Right Image Section */}
            <Image
              source={require('../../../assets/images/mini.png')} // Replace with your image path
              style={styles.imageG}
              resizeMode="contain"
            />
          </View>
          <Section title="More Features">
            <View style={styles.container1}>
              <FeatureItem
                icon="car-outline"
                title="FREE AND FAST DELIVERY"
                subtitle="Free delivery for all orders over ₹5000"
              />

              <FeatureItem
                icon="headset-outline"
                title="24/7 CUSTOMER SERVICE"
                subtitle="Friendly 24/7 customer support"
              />

              <FeatureItem
                icon="shield-checkmark-outline"
                title="MONEY BACK GUARANTEE"
                subtitle="We return money within 30 days"
              />
            </View>
          </Section>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default Home;
