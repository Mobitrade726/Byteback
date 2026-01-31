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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../constants/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { clearProfile } from '../../redux/slices/profileSlice';
import responsive from '../../constants/responsive';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const Home = ({ navigation }) => {
  const token = useSelector(state => state.auth.token);

  console.log('token------------------->', token);

  const { mobileBudget, LaptopBudget, SUPPORT_CARDS } = useSelector(
    state => state.home,
  );

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

  const ProductMobile = ({ item }) => (
    <>
      <View style={ProductCardStyles.cardHome}>
        <Image
          source={item.image}
          style={ProductCardStyles.imageHome}
          resizeMode="cover"
        />
      </View>
      <Text style={ProductCardStyles.productNameHome}>{item.label}</Text>
      <Text style={ProductCardStyles.colorTextHome}>{item.subname}</Text>
    </>
  );
  const ProductLaptop = ({ item }) => (
    <>
      <View style={ProductCardStyles.cardHome}>
        <Image
          source={item.image}
          style={ProductCardStyles.imageHome}
          resizeMode="cover"
        />
      </View>

      <Text style={ProductCardStyles.productNameHome}>{item.label}</Text>
      <Text style={ProductCardStyles.colorTextHome}>{item.subname}</Text>
    </>
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
      <View
        style={{
          width: responsive.width(170),
          marginHorizontal: responsive.marginHorizontal(5),
        }}
      >
        <View style={ProductCardStyles.cardShadow}>
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
                  PRE-OWNED
                </Text>
              )}

              <Image
                source={{ uri: item.feature_image }}
                style={ProductCardStyles.imageD}
                resizeMode="contain"
              />

              {/* ❤️ Wishlist Button */}
              <TouchableOpacity
                style={ProductCardStyles.heartIconD}
                onPress={() => handleWishlistToggle()}
              >
                <AntDesign
                  name={isInWishlist ? 'heart' : 'hearto'}
                  size={moderateScale(12)}
                  color={isInWishlist ? '#E74C3C' : '#999'}
                />
              </TouchableOpacity>
            </View>

            <Text style={ProductCardStyles.gradeText}>
              Grade {item.grade_number}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Product Info */}
        <Text style={ProductCardStyles.productName}>{item.model_name}</Text>
        <Text style={ProductCardStyles.colorText}>● {item.color_name}</Text>
        <Text style={ProductCardStyles.price}>₹ {item.price}</Text>
      </View>
    );
  };

  const SUPPORT_CARDS_renderItem = ({ item }) => (
    <View style={styles.cardSUPPORT_CARDS}>
      <View style={styles.iconCircleSUPPORT_CARDS}>
        <Icon name={item.icon} size={moderateScale(12)} color="#fff" />
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
      <View style={{ backgroundColor: '#fff' }}>
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
                  activeOpacity={0.8}
                >
                  {/* Image with overlay */}
                  <ImageBackground
                    source={
                      item.brand_image_url
                        ? { uri: item.brand_image_url }
                        : require('../../../assets/images/empty.jpeg')
                    }
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end', // text bottom me
                      width: responsive.width(100),
                      height: responsive.height(120),
                      borderRadius: responsive.borderRadius(20),
                      marginHorizontal: responsive.marginHorizontal(2),
                    }}
                    imageStyle={{
                      resizeMode: 'contain',
                      borderRadius: responsive.borderRadius(20),
                    }}
                  >
                    <View
                      style={{
                        width: '100%',
                        paddingVertical: moderateScale(1),
                      }}
                    >
                      <Text
                        style={{
                          fontSize: moderateScale(10),
                          fontWeight: '700',
                          color: '#fff',
                          marginLeft: 15,

                          // readability
                          textShadowColor: 'rgba(0,0,0,0.8)',
                          textShadowOffset: { width: 0, height: 1 },
                          textShadowRadius: 3,

                          marginBottom:
                            Platform.OS === 'ios'
                              ? responsive.marginBottom(10) // 👈 iOS zyada space
                              : responsive.marginBottom(10), // 👈 Android normal
                        }}
                      >
                        {item.brand_name}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </Section>
          <Section
            title="Shop by budget"
            onPress={() => navigation.navigate('ShopByBudget')}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  fontSize: responsive.fontSize(15),
                  marginBottom: moderateScale(8),
                }}
              >
                Get Smartphones
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ShopByBudget', {
                    priceId: mobileBudget[0]?.id,
                    catName: 'Mobile',
                  })
                }
              >
                <Ionicons
                  name="chevron-forward"
                  size={moderateScale(12)}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={mobileBudget}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ marginHorizontal: 5 }}
                  onPress={() =>
                    navigation.navigate('ShopByBudget', {
                      priceId: item.id,
                      catName: item?.cat, // shows both iOS & Android
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
                marginTop: moderateScale(10),
              }}
            >
              <Text
                style={{
                  fontSize: responsive.fontSize(15),
                  marginBottom: moderateScale(8),
                }}
              >
                Get Macbooks & Windows PC
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ShopByBudget', {
                    priceId: mobileBudget[0]?.id,
                    catName: 'Laptop',
                  })
                }
              >
                <Ionicons
                  name="chevron-forward"
                  size={moderateScale(12)}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={LaptopBudget}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ marginHorizontal: 5 }}
                  onPress={() =>
                    navigation.navigate('ShopByBudget', {
                      priceId: item.id,
                      catName: item?.cat,
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
            />
            {/* <View style={styles.grid}>
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
            </View> */}
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
                  keyExtractor={item => item.barcode_id?.toString()}
                  showsHorizontalScrollIndicator={false}
                />
              </Section>
            </>
          ) : null}

          <ImageBackground
            style={{
              width: '100%',
              aspectRatio: 16 / 9, // change to match your image ratio
              marginTop: moderateScale(20),
            }}
            resizeMode="cover"
            source={require('../../../assets/images/gstrate.png')}
          ></ImageBackground>
          <View
            style={{
              width: '92%',
              marginTop: scale(20),
              marginBottom: moderateScale(5),
              flexDirection: 'row',
              alignSelf: 'center',
              padding: responsive.padding(5),
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
            <FlatList
              data={SUPPORT_CARDS}
              renderItem={SUPPORT_CARDS_renderItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.containerSUPPORT_CARDS}
            />
          </Section>
        </ScrollView>
      </View>
    </>
  );
};
export default Home;
