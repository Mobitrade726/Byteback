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
  const {
    carouselData,
    brands,
    uri,
    mobileBudget,
    LaptopBudget,
    SUPPORT_CARDS,
    catList,
    status,
  } = useSelector(state => state.home);
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

  const ProductMobile = ({ item }) => (
    <>
      <View style={styles.offerCard}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <Text style={styles.productNameD}>{item.label}</Text>
      <Text style={styles.colorTextD}>{item.subname}</Text>
    </>
  );
  const ProductLaptop = ({ item }) => (
    <View style={styles.cardM}>
      <Image source={{ uri: item.image }} style={styles.imageM} />
      <Text style={styles.productNameD}>{item.label}</Text>
      <Text style={styles.colorTextD}>{item.subname}</Text>
    </View>
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
            <Text style={ProductCardStyles.refurbishedLabelD}>
              (Refurbished)
            </Text>
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

  const SUPPORT_CARDS_renderItem = ({ item }) => (
    <View style={styles.cardSUPPORT_CARDS}>
      <View style={styles.iconCircleSUPPORT_CARDS}>
        <Icon name={item.icon} size={20} color="#fff" />
      </View>
      <Text style={styles.cardTitleSUPPORT_CARDS}>{item.title}</Text>
      <Text style={styles.cardDescriptionSUPPORT_CARDS}>
        {item.description}
      </Text>
    </View>
  );

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

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Header navigation={navigation} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Carousel */}
          <HeroCarousel data={carouselData} navigation={navigation} />
          <FlatList
            horizontal
            data={catList} // clone and reverse
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('RecentlyAddedTab')}
            style={{ flex: 1, backgroundColor: '#fff', marginHorizontal: moderateScale(10) }}
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
            onPress={() => navigation.navigate('shopbybrandsTab')}
          >
            <FlatList
              horizontal
              data={brands}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('shopbybrandfilter', {
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

          <Section title="Shop by budget">
            <View
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
                  navigation.navigate('HomeShopByBudget', {
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
              keyExtractor={item => item.id}
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
                  navigation.navigate('HomeShopByBudget', {
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
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainerD}
              showsHorizontalScrollIndicator={false}
            />
          </Section>

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
                  keyExtractor={item => item.id?.toString()}
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
            }}
            source={require('../../../assets/images/gstrate.png')}
          ></ImageBackground>
          <View
            style={{
              width: '95%',
              marginVertical: scale(15),
              flexDirection: 'row',
              alignSelf: 'center',
            }}
          >
            <View style={styles.leftContainer}>
              <Text style={styles.heading}>What is A1 to A9?</Text>
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
            <FlatList
              data={SUPPORT_CARDS}
              renderItem={SUPPORT_CARDS_renderItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.containerSUPPORT_CARDS}
            />
          </Section>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default Home;
