import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
  addToCartAPI,
  checkoutAPI,
  fetchCartAPI,
} from '../../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { API_BASE_URL } from '../../../utils/utils';
import {
  fetchProductList,
  addRecentlyViewed,
} from '../../../redux/slices/productSlice';
import { fetchProfile } from '../../../redux/slices/profileSlice';
import Header from '../../../constants/Header';
import Share from 'react-native-share';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Loader from '../../../constants/Loader';
import AlertModal from '../../../constants/AlertModal';
import responsive from '../../../constants/responsive';
import {
  addToWishlistAPI,
  removeFromWishlistAPI,
  fetchWishlist,
} from '../../../redux/slices/wishlistSlice';

const { width } = Dimensions.get('window');
const OUTER_SIZE = responsive.width(52);
const INNER_SIZE = responsive.width(36);
const ICON_SIZE = responsive.width(36);

const isGoodStatus = status => {
  if (!status) return false;

  const goodStatuses = [
    'excellent',
    'minor sign of usage',
    'available',
    'working',
    'no bent',
  ];

  return goodStatuses.includes(status.toLowerCase());
};

const InfoItem = ({ label, value, working, showDivider = true }) => (
  <>
    <View style={styles.row}>
      {working !== undefined && (
        <Ionicons
          name={working ? 'checkmark' : 'close'}
          size={16}
          color={working ? 'green' : 'red'}
          style={{ marginRight: 6 }}
        />
      )}

      <Text style={styles.label}>{label}</Text>

      {value ? <Text style={styles.value}>{value}</Text> : null}
    </View>

    {showDivider && <View style={styles.dividerspecification} />}
  </>
);

const trustFeatures = [
  {
    id: '1',
    iconType: 'MaterialIcons',
    icon: 'groups',
    text: '100k+ Satisfied Customers',
  },
  {
    id: '2',
    iconType: 'AntDesign',
    icon: 'unlock',
    text: 'Secure Payments',
  },
  {
    id: '3',
    iconType: 'Feather',
    icon: 'headphones',
    text: 'Responsive Customer Support',
  },
  {
    id: '4',
    iconType: 'Entypo',
    icon: 'lab-flask',
    text: 'ISO Certified QC Lab',
  },
  {
    id: '5',
    iconType: 'MaterialIcons',
    icon: 'privacy-tip',
    text: 'Data Privacy Protected',
  },
];

const getIconComponent = type => {
  switch (type) {
    case 'MaterialIcons':
      return MaterialIcons;
    case 'AntDesign':
      return AntDesign;
    case 'Feather':
      return Feather;
    case 'Entypo':
      return Entypo;
    default:
      return MaterialIcons;
  }
};

const InfoCard = ({ iconType, icon, text }) => {
  const Icon = getIconComponent(iconType);
  return (
    <View style={styles.infoCardD}>
      <View
        style={{
          backgroundColor: '#EAE6E5',
          padding: moderateScale(7),
          borderRadius: moderateScale(5),
        }}
      >
        <Icon name={icon} size={moderateScale(12)} color="#000" />
      </View>
      <Text style={styles.infoTextD}>{text}</Text>
    </View>
  );
};

const ProductList = ({ route, iconType, icon, text }) => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [showSpecs, setShowSpecs] = useState(false); // Toggle state
  const [showSpecs1, setShowSpecs1] = useState(false); // Toggle state
  const { product_barcode_id, product_barcode_price } = route.params; // 👈 get product
  const { data } = useSelector(state => state.profile);
  const [loading1, setLoading] = useState(true);
  const [error1, setError] = useState(null);
  const dispatch = useDispatch();
  const { loading, productData } = useSelector(state => state.product);

  const [product, setProduct] = useState('');

  const item = product;
  const wishlistItems = useSelector(state => state.wishlist.items);

  const isInWishlist = wishlistItems.some(
    w => Number(w.barcode_id) === Number(product?.barcode?.barcode_id),
  );

  // const isInWishlist = wishlistItems.some(w => w.barcode_id == item.barcode_id);
  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlistAPI(item));
    } else {
      dispatch(addToWishlistAPI(item));
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const { items } = useSelector(state => state.cart);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  useEffect(() => {
    dispatch(fetchCartAPI());
    dispatch(fetchWishlist());
  }, [dispatch]);

  const productId = product?.barcode?.barcode_id; // <-- single id
  const alreadyInCart = items?.some(
    item => Number(item?.barcode_id) === Number(productId),
  );

  const handleAddToCart = () => {
    if (!product) return;

    const showAlert = (msg, type = 'error') => {
      setAlertMessage(msg);
      setAlertType(type);
      setAlertVisible(true);
    };

    if (alreadyInCart) {
      showAlert('This product is already in your cart.', 'error');
      return;
    }
    dispatch(addToCartAPI({ product, navigation })); // ✅ pass an object
  };
  const handleBuyNow = () => {
    if (isKYCIncomplete) {
      Alert.alert(
        'KYC Required',
        'Please complete your KYC first.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Complete KYC',
            onPress: () => navigation.navigate('KycCompleteStatus'),
          },
        ],
        { cancelable: true },
      );
      return;
    }

    // 2) Call checkout API for single product
    dispatch(
      checkoutAPI({
        type: 'single_product',
        barcode_id: product?.barcode?.barcode_id,
        single_product_price: product?.barcode?.purchase_price,
        // navigation,
      }),
    );

    // 3) Navigate to Checkout screen with price & qty arrays
    navigation.navigate('Checkout', {
      product_barcode_id_id: product?.barcode?.barcode_id,
      product_barcode_price_p: product?.barcode?.purchase_price,
    });
  };

  let featureImage = product?.feature_images || [];
  let barcodeDetails = product?.barcode || [];
  let modelSpecification = product?.model_specification || [];
  let barcode_id = barcodeDetails?.barcode_id;
  let device_qc_reports = product?.device_qc_reports || [];
  let product_categry = product?.category || [];

  // 🔹 Utility function to safely extract values
  const extractValues = (reports, pathFn) =>
    (reports || []).map(pathFn).filter(Boolean);

  // 🔹 Usage
  const gradeNumbers = extractValues(
    device_qc_reports,
    item => item?.latest_info?.device_report_grade_number?.grade_number,
  );

  const switchings = extractValues(
    device_qc_reports,
    item => item?.latest_info?.device_switched_status,
  );

  const devicelocked = extractValues(
    device_qc_reports,
    item => item?.latest_info?.device_locked_status,
  );
  const deviceage = extractValues(
    device_qc_reports,
    item => item?.latest_info?.device_age,
  );
  const latest_info = extractValues(
    device_qc_reports,
    item => item?.latest_info,
  );

  const details =
    device_qc_reports?.reduce((acc, item) => {
      if (item?.latest_info?.details) {
        acc.push(...item.latest_info.details);
      }
      return acc;
    }, []) || [];

  const accessories =
    device_qc_reports?.reduce((acs, item) => {
      if (item?.latest_info?.accessories) {
        acs.push(...item.latest_info.accessories);
      }
      return acs;
    }, []) || [];

  const getDeviceAgeLabel = age => {
    switch (
      String(age) // ensure string or number works
    ) {
      case '0':
        return '0-3 Months';
      case '1':
        return '3-6 Months';
      case '2':
        return '6-9 Months';
      case '3':
        return '9-12 Months';
      case '4':
        return 'Out of Warranty';
      default:
        return 'N/A';
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_BASE_URL}/product_detail/${product_barcode_id}`,
        );
        if (response.data) {
          setProduct(response.data.data);
        } else {
          setError('Product not found');
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to load product');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_barcode_id]);

  const isKYCIncomplete = !data?.vendordocuments?.proof_of_identity;

  useEffect(() => {
    dispatch(addRecentlyViewed(product_barcode_id));
    dispatch(fetchProductList());
    dispatch(fetchProfile());
  }, [dispatch]);

  // Suppose you already have `product` data from API

  const label = product_categry === 'mobile' ? 'IMEI Number' : 'Serial Number';

  const rowData = [label];

  const productSpecs = [
    [rowData, barcodeDetails?.imei_number],
    ['Model Name', barcodeDetails?.barcode_model?.model_name],
    ['Color', barcodeDetails?.barcode_color?.color_name],
    ...(product_categry === 'mobile'
      ? [['SIM Type', modelSpecification?.sim_type]]
      : []),
    ['Touchscreen', modelSpecification?.touchscreen],
  ];

  const handleShare = async item => {
    try {
      const shareOptions = {
        title: 'Check this product!',
        message: `${item?.brand_name} - ${item?.model_name}\nAmazing price on Byteback!`,
        url: item?.product_image_url, // ✅ direct image URL
      };

      await Share.open(shareOptions);
    } catch (error) {}
  };

  if (loading1) {
    return <Loader size="large" color="green" />;
  }

  const staticImages = [
    {
      id: 1,
      image: require('../../../../assets/images/productlistslider.png'),
    },
    {
      id: 2,
      image: require('../../../../assets/images/productlistslider.png'),
    },
    {
      id: 3,
      image: require('../../../../assets/images/productlistslider.png'),
    },
  ];

  const imagesToShow =
    featureImage && featureImage.length > 0 ? featureImage : staticImages;

  const currentModelName =
    product?.model_specification?.model_name ||
    product?.barcode?.barcode_model?.model_name;

  const similarProducts = productData?.filter(
    item => item?.model_name?.toLowerCase() === currentModelName?.toLowerCase(),
  );

  const currentGrade = Array.isArray(gradeNumbers)
    ? gradeNumbers[0]?.trim()?.toUpperCase()
    : gradeNumbers?.trim()?.toUpperCase();

  const currentCategory = product?.category?.trim()?.toLowerCase();

  const similarProductsGrade = Array.isArray(productData)
    ? productData.filter(item => {
        const itemGrade = item?.grade_number?.trim()?.toUpperCase();

        const itemCategory = item?.category?.trim()?.toLowerCase();

        return (
          itemGrade === currentGrade && // ✅ same grade
          itemCategory === currentCategory // ✅ same category
        );
      })
    : [];

  const renderItemSimilar = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.push('ProductList', {
          product_barcode_id: item?.barcode_id,
          product_barcode_price: item?.price,
        });
      }}
      style={styles.cardsimilar}
    >
      <Image
        source={
          item?.feature_image
            ? { uri: item.feature_image }
            : require('../../../../assets/images/productlistslider.png')
        }
        style={styles.imagesimilar}
      />

      <Text style={styles.titlesimilar}>{item?.model_name}</Text>

      <Text style={styles.descsimilar}>{item?.color_name}</Text>

      <Text style={styles.descsimilar}>
        {item?.category === 'Mobile'
          ? item?.variant_name
          : `${item?.ram || '-'} / ${item?.rom || '-'}`}
      </Text>

      <Text style={styles.gradesimilar}>Grade {item?.grade_number}</Text>

      <Text style={styles.pricesimilar}>₹{item?.price}</Text>
    </TouchableOpacity>
  );
  const renderItemGrade = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.push('ProductList', {
          product_barcode_id: item?.barcode_id,
          product_barcode_price: item?.price,
        });
      }}
      style={styles.cardsimilar}
    >
      <Image
        source={
          item?.feature_image
            ? { uri: item.feature_image }
            : require('../../../../assets/images/productlistslider.png')
        }
        style={styles.imagesimilar}
      />

      <Text style={styles.titlesimilar}>{item?.model_name}</Text>

      <Text style={styles.descsimilar}>{item?.color_name}</Text>

      <Text style={styles.descsimilar}>
        {item?.category === 'Mobile'
          ? item?.variant_name
          : `${item?.ram || '-'} / ${item?.rom || '-'}`}
      </Text>

      <Text style={styles.gradesimilar}>Grade {item?.grade_number}</Text>

      <Text style={styles.pricesimilar}>₹{item?.price}</Text>
    </TouchableOpacity>
  );

  const features = [
    '30 Days ByteBack Warranty',
    '52 parameters Quality Check',
    'Valid GST Bill',
  ];

  const paymentMethods = [
    {
      id: '1',
      label: 'Byteback\nWallet',
      icon: require('../../../../assets/images/Wallet--Streamline-Kameleon.png'),
    },
    {
      id: '2',
      label: 'COD',
      icon: require('../../../../assets/images/Truck--Streamline-Kameleon.png'),
    },
    {
      id: '3',
      label: 'UPI',
      icon: require('../../../../assets/images/Smartphone--Streamline-Kameleon.png'),
    },
    {
      id: '4',
      label: 'Credit Card',
      icon: require('../../../../assets/images/Credit-Card-3--Streamline-Kameleon.png'),
    },
    {
      id: '5',
      label: 'Debit Card',
      icon: require('../../../../assets/images/Credit-Card-3--Streamline-Kameleon-1.png'),
    },
    {
      id: '6',
      label: 'Net Banking',
      icon: require('../../../../assets/images/Bank--Streamline-Kameleon.png'),
    },
  ];

  const screenDefects = details.filter(d => d.defect_type === 'Screen Defects');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Product detail screen"
          navigation={navigation}
          showBack={true}
          showSearch
        />
        <View style={styles.container}>
          <Swiper
            key={imagesToShow.length}
            ref={swiperRef}
            autoplay={imagesToShow.length > 1}
            loop={imagesToShow.length > 1}
            showsPagination
            style={styles.swiper}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            paginationStyle={styles.pagination}
            onIndexChanged={index => setActiveIndex(index)}
          >
            {imagesToShow.map((item, index) => (
              <Image
                key={index}
                source={item.url ? { uri: item.url } : item.image}
                style={styles.mainImage}
                resizeMode="cover"
              />
            ))}
          </Swiper>

          <View
            style={{
              marginVertical: 10,
              marginHorizontal: responsive.marginHorizontal(5),
            }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {imagesToShow.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => {
                    swiperRef.current?.scrollTo(index, true); // ✅ ONLY THIS
                    setActiveIndex(index); // for highlight
                  }}
                  style={{
                    alignSelf: 'center',
                    marginHorizontal: responsive.marginHorizontal(3),
                  }}
                >
                  <Image
                    source={item.url ? { uri: item.url } : item.image}
                    style={[
                      styles.thumbnailImage,
                      activeIndex === index && styles.activeThumbnail,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featureContainer}
          >
            {features.map((item, index) => (
              <View key={index} style={styles.featureChip}>
                <Text style={styles.featureText}>{item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.iconColumn}>
          <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
            <Ionicons name="share-social-outline" size={15} color="#000" />
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.iconButton}
            onPress={() => swiperRef.current?.scrollBy(1)}
          >
            <Ionicons name="chevron-forward-outline" size={16} color="#000" />
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={ProductCardStyles.heartIconD}
            onPress={() => handleWishlistToggle()}
          >
            <AntDesign
              name={isInWishlist ? 'heart' : 'hearto'}
              size={20}
              color={isInWishlist ? '#E74C3C' : '#999'}
            />
          </TouchableOpacity> */}

          {/* ❤️ Wishlist */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleWishlistToggle}
          >
            <AntDesign
              name={isInWishlist ? 'heart' : 'hearto'}
              size={18}
              color={isInWishlist ? '#E74C3C' : '#000'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => swiperRef.current?.scrollBy(1)}
          >
            <Ionicons name="chevron-forward-outline" size={16} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => swiperRef.current?.scrollBy(-1)}
          >
            <Ionicons name="chevron-back" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.headerP}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: responsive.marginBottom(5),
            }}
          >
            <View>
              <Text style={styles.brandP}>
                {barcodeDetails?.barcode_brand?.brand_name || 'N/A'}
              </Text>
              <Text style={styles.titleP}>
                {barcodeDetails?.barcode_model?.model_name || 'N/A'}
              </Text>
              <Text style={styles.priceP}>
                ₹{barcodeDetails?.purchase_price || 'N/A'}
              </Text>
              <Text style={{ fontSize: responsive.fontSize(12) }}>
                Size: {barcodeDetails?.barcode_variant?.variant_name || 'N/A'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'center',
                  // alignSelf: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: responsive.fontSize(12) }}>
                  Color: {barcodeDetails?.barcode_color?.color_name || 'N/A'}
                </Text>
                <View
                  style={{
                    marginBottom: moderateScale(2),
                    marginLeft: moderateScale(20),
                  }}
                >
                  <Octicons
                    name="dot-fill"
                    size={moderateScale(20)}
                    color="#000"
                  />
                </View>
              </View>
            </View>
            <View style={{ marginRight: moderateScale(0) }}>
              <Text
                style={{
                  fontSize: responsive.fontSize(30),
                  fontWeight: 'bold',
                }}
              >
                {gradeNumbers || 'N/A'}
              </Text>
              <Text style={styles.grade}>Grade</Text>
            </View>
          </View>
          {/* Buttons */}
          <View style={styles.divider} />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('Cart', {productData: barcodeDetails})
              // }
              onPress={handleAddToCart}
              disabled={loading}
              style={styles.addToCart}
            >
              <Text style={styles.btnText}>
                {!alreadyInCart ? 'Add to Cart' : 'Added'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleBuyNow()}
              style={styles.buyNow}
            >
              <Text style={styles.btnTextWhite}>Buy Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
        </View>

        <Text
          style={{
            fontSize: responsive.fontSize(16),
            marginTop: responsive.marginTop(10),
            marginHorizontal: responsive.marginHorizontal(10),
            marginVertical: responsive.marginVertical(8),
            fontWeight: '500',
          }}
        >
          Available Payment Method
        </Text>
        <FlatList
          horizontal
          data={paymentMethods}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.circleOuter}>
                <View style={styles.circleInner}>
                  <Image source={item.icon} style={styles.icon} />
                </View>
              </View>
              <Text style={styles.labelpayment}>{item.label}</Text>
            </View>
          )}
        />

        <Text
          style={{
            fontSize: responsive.fontSize(16),
            marginTop: responsive.marginTop(10),
            marginHorizontal: responsive.marginHorizontal(8),
            fontWeight: 'bold',
          }}
        >
          {barcodeDetails?.barcode_model?.model_name || 'N/A'} Highlights
        </Text>

        {/* Specifications & QC Report  */}
        <View style={styles.specSection}>
          {/* <Text style={styles.headlines}>
            {barcodeDetails?.barcode_model?.model_name || 'N/A'} Highlights
          </Text> */}
          <View style={{ marginTop: moderateScale(8) }}>
            <View
              style={{
                backgroundColor: '#EAE6E5',
                padding: responsive.padding(8),
              }}
            >
              <Text
                style={{
                  fontSize: responsive.fontSize(16),
                  fontWeight: 'bold',
                }}
              >
                Key Features
              </Text>
            </View>
            {productSpecs.map(([label, value], index) => (
              <View
                key={label}
                style={[
                  styles.specRowFeature,
                  {
                    backgroundColor: index % 2 === 0 ? '#F0F0F0' : '#D9D9D9',
                  },
                ]}
              >
                <Text style={styles.specLabelFeature}>{label}</Text>
                <Text style={styles.specValueFeature}>{value || 'N/A'}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: responsive.marginHorizontal(8),
              marginTop: moderateScale(10),
            }}
          >
            <Text
              style={{
                fontSize: responsive.fontSize(16),
                fontWeight: 'bold',
              }}
            >
              View All Specifications
            </Text>
            <TouchableOpacity onPress={() => setShowSpecs(prev => !prev)}>
              <SimpleLineIcons
                name={showSpecs ? 'arrow-up' : 'arrow-down'}
                size={moderateScale(12)} // responsive size
                color="#000"
              />
            </TouchableOpacity>
          </View>

          {showSpecs && (
            <View style={{}}>
              <Text style={styles.headlinesviewspecifications}>
                OS & Processor Features
              </Text>
              <View style={styles.dividerspecification} />

              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>
                  Operating System
                </Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.operating_system || 'N/A'}
                </Text>
              </View>

              <View style={styles.dividerspecification} />

              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>Processor</Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.processor || 'N/A'}
                </Text>
              </View>

              <Text style={styles.headlinesviewspecifications}>
                Display Features
              </Text>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>Display Size</Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.screen_size || 'N/A'}
                </Text>
              </View>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>Resolution</Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.resolution || 'N/A'}
                </Text>
              </View>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>GPU</Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.graphics || 'N/A'}
                </Text>
              </View>

              <Text style={styles.headlinesviewspecifications}>
                Memory & Storage
              </Text>
              <View style={styles.dividerspecification} />
              {barcodeDetails?.barcode_brand?.category === 'Mobile' ? (
                <>
                  <View style={styles.specRowSpecification}>
                    <Text style={styles.specLabelSpecification}>
                      Internal Storage
                    </Text>
                    <Text style={styles.specValuespecification}>
                      {barcodeDetails?.barcode_storage || 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.dividerspecification} />
                  <View style={styles.specRowSpecification}>
                    <Text style={styles.specLabelSpecification}>RAM</Text>
                    <Text style={styles.specValuespecification}>
                      {barcodeDetails?.barcode_ram || 'N/A'}
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.specRowSpecification}>
                    <Text style={styles.specLabelSpecification}>
                      Internal Storage
                    </Text>
                    <Text style={styles.specValuespecification}>
                      {barcodeDetails?.barcode_storage?.rom_name || 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.dividerspecification} />
                  <View style={styles.specRowSpecification}>
                    <Text style={styles.specLabelSpecification}>RAM</Text>
                    <Text style={styles.specValuespecification}>
                      {barcodeDetails?.barcode_storage?.rom_code || 'N/A'}
                    </Text>
                  </View>
                </>
              )}

              <Text style={styles.headlinesviewspecifications}>
                Camera Features
              </Text>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>
                  Primary Camera
                </Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.front_camera || 'N/A'}
                </Text>
              </View>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>
                  Secondary Camera
                </Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.no_of_rear_camera || 'N/A'}
                </Text>
              </View>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>Front Flashs</Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.front_flash || 'N/A'}
                </Text>
              </View>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>Back Flashs</Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.rear_flash || 'N/A'}
                </Text>
              </View>
              <Text style={styles.headlinesviewspecifications}>
                Other Details
              </Text>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>Sensors</Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.fingerprint_sensor || 'N/A'}
                </Text>
              </View>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>GPS Type</Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.gps || 'N/A'}
                </Text>
              </View>
              <Text style={styles.headlinesviewspecifications}>
                Battery & Power
              </Text>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>
                  Battery Capacity
                </Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.battery_capacity || 'N/A'}
                </Text>
              </View>
              <Text style={styles.headlinesviewspecifications}>Dimensions</Text>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>Size</Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.dimensions || 'N/A'}
                </Text>
              </View>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>Weight</Text>
                <Text style={styles.specValuespecification}>
                  {modelSpecification?.weight || 'N/A'}
                </Text>
              </View>
              <Text style={styles.headlinesviewspecifications}>Warranty</Text>
              <View style={styles.dividerspecification} />
              <View style={styles.specRowSpecification}>
                <Text style={styles.specLabelSpecification}>
                  Warranty Summary
                </Text>
                <Text style={styles.specValuespecification}>
                  1 Year Manufacturer Warranty for Device and 6 Months
                  Manufacturer Warranty for In-Box Accessories
                </Text>
              </View>
              {/* <View style={styles.specRow}>
                <Text style={styles.specLabel}>Domestic Warranty</Text>
                <Text style={styles.specValue}>1 Year</Text>
              </View> */}
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: responsive.marginHorizontal(8),
              marginVertical: moderateScale(10),
            }}
          >
            <Text
              style={{
                fontSize: responsive.fontSize(16),
                fontWeight: 'bold',
              }}
            >
              QC Report
            </Text>
            <TouchableOpacity onPress={() => setShowSpecs1(prev => !prev)}>
              <SimpleLineIcons
                name={showSpecs1 ? 'arrow-up' : 'arrow-down'}
                size={moderateScale(12)} // responsive size
                color="#000"
              />
            </TouchableOpacity>
          </View>

          {showSpecs1 && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: moderateScale(10),
                }}
              >
                <View style={{}}>
                  <Text style={styles.specLabel}>Barcode Number</Text>
                  <Text style={styles.specLabel}>Switched ON</Text>
                  <Text style={styles.specLabel}>Device Locked</Text>
                  <Text style={styles.specLabel}>Warranty</Text>
                </View>
                <View>
                  <Text style={styles.specLabel}>
                    {barcodeDetails?.barcode_number?.barcode_number || 'N/A'}
                  </Text>
                  <Text style={styles.specLabel}>{switchings || 'N/A'}</Text>
                  <Text style={styles.specLabel}>{devicelocked || 'N/A'}</Text>
                  <Text style={styles.specLabel}>
                    {getDeviceAgeLabel(deviceage) || 'N/A'}
                  </Text>
                </View>
              </View>
              {/* <Text style={styles.headlines}>Accessories</Text>
              {accessories.map((d, idx) => (
                <InfoItem key={idx} label={d?.accessory_name || 'N/A'} />
              ))} */}

              {accessories?.length > 0 && (
                <>
                  <Text style={styles.headlinesviewspecifications}>
                    Accessories
                  </Text>
                  <View style={styles.dividerspecification} />

                  {accessories.map((d, idx, arr) => (
                    <InfoItem
                      key={idx}
                      label={d?.accessory_name || 'N/A'}
                      showDivider={idx !== arr.length - 1} // 🔑 last pe nahi
                    />
                  ))}
                </>
              )}

              <Text style={styles.headlinesviewspecifications}>
                Body Defects
              </Text>
              <View style={styles.dividerspecification} />

              {details
                .filter(d => d.defect_type === 'Body Defects')
                .map((d, idx, arr) => {
                  const status = d.parameter_status?.parameter_status_name;

                  return (
                    <InfoItem
                      key={idx}
                      label={d.parameter?.parameter_name || 'N/A'}
                      value={status || 'N/A'}
                      working={isGoodStatus(status)}
                      showDivider={idx !== arr.length - 1} // 🔑 last pe nahi
                    />
                  );
                })}

              <Text style={styles.headlinesviewspecifications}>
                Screen Defects
              </Text>
              <View style={styles.dividerspecification} />
              {details
                .filter(d => d.defect_type === 'Screen Defects')
                .map((d, idx, arr) => {
                  const status = d.parameter_status?.parameter_status_name;

                  return (
                    <InfoItem
                      key={idx}
                      label={d.parameter?.parameter_name || 'N/A'}
                      value={status || 'N/A'}
                      working={isGoodStatus(status)}
                      showDivider={idx !== arr.length - 1} // 🔑 last pe nahi
                    />
                  );
                })}
              <Text style={styles.headlinesviewspecifications}>
                Functional Defects
              </Text>
              <View style={styles.dividerspecification} />

              {details
                .filter(d => d.defect_type === 'Functional Problems')
                .map((d, idx) => {
                  const status = d.parameter_status?.parameter_status_name;

                  return (
                    <InfoItem
                      key={idx}
                      label={d.parameter?.parameter_name || 'N/A'}
                      value={status || 'N/A'}
                      working={isGoodStatus(status)}
                    />
                  );
                })}
            </>
          )}
        </View>

        <View
          style={{
            marginBottom: moderateScale(5),
            flexDirection: 'row',
            alignSelf: 'center',
            borderRadius: 8,
            marginHorizontal: moderateScale(10),
            marginTop: scale(10),
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
            source={require('../../../../assets/images/mini.png')} // Replace with your image path
            style={styles.imageG}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            fontSize: responsive.fontSize(16),
            marginTop: responsive.marginTop(10),
            marginHorizontal: responsive.marginHorizontal(8),
            marginVertical: responsive.marginVertical(8),
            fontWeight: 'bold',
          }}
        >
          View Similar Products
        </Text>

        <FlatList
          data={similarProducts}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItemSimilar}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
        <Text
          style={{
            fontSize: responsive.fontSize(16),
            marginTop: responsive.marginTop(10),
            marginHorizontal: responsive.marginHorizontal(10),
            marginVertical: responsive.marginVertical(12),
            fontWeight: 'bold',
          }}
        >
          You Might Like
        </Text>
        <FlatList
          data={similarProductsGrade}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItemGrade}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
        <Text style={styles.subHeadingD}>Buy Smart. Buy Secure.</Text>
        <View style={styles.featureGridD}>
          <View style={styles.featureBoxD}>
            <AntDesign
              name="clockcircleo"
              size={moderateScale(12)}
              color="#000"
            />
            <Text
              style={{
                fontSize: responsive.fontSize(12),
              }}
            >
              Over a Decade of Service
            </Text>
          </View>
          <View style={[styles.featureBoxD]}>
            <Feather name="truck" size={moderateScale(12)} color="#000" />
            <Text
              style={{
                fontSize: responsive.fontSize(12),
              }}
            >
              Pan-India Delivery
            </Text>
          </View>
          <View style={styles.featureBoxD}>
            <EvilIcons name="undo" size={moderateScale(16)} color="#000" />
            <Text
              style={{
                fontSize: responsive.fontSize(12),
              }}
            >
              14-Day Return Policy
            </Text>
          </View>
          <View style={styles.featureBoxD}>
            <MaterialIcons
              name="security"
              size={moderateScale(12)}
              color="#000"
            />
            <Text
              style={{
                fontSize: responsive.fontSize(12),
              }}
            >
              30-Day Testing Warranty
            </Text>
          </View>
        </View>

        <Text style={[styles.subHeadingD]}>Your Trust, Our Commitment</Text>
        <ScrollView
          style={{ marginHorizontal: responsive.marginHorizontal(10) }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trustFeatures.map(item => (
            <InfoCard
              key={item.id}
              iconType={item.iconType}
              icon={item.icon}
              text={item.text}
            />
          ))}
        </ScrollView>
        <AlertModal
          visible={alertVisible}
          message={alertMessage}
          type={alertType}
          onOk={() => {
            setAlertVisible(false);
          }}
          onClose={() => setAlertVisible(false)}
        />

        <AlertModal
          visible={alertVisible}
          title={alertType === 'success' ? 'Success' : 'Error'}
          message={alertMessage}
          type={alertType}
          onOk={() => {
            setAlertVisible(false);

            // 👉 ONLY SUCCESS case navigate karega
            if (alertType === 'success') {
              setAlertVisible(false);
              navigation.navigate('BottomNavigator');
            }
          }}
          onClose={() => setAlertVisible(false)}
        />
      </ScrollView>
    </View>
  );
};

export default ProductList;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    justifyContent: 'space-between',
    marginHorizontal: rw(2.5),
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: scale(20),
    padding: moderateScale(6),
  },
  headerTitle: {
    fontSize: rf(2),
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },

  swiper: {
    height: responsive.height(360),
  },

  mainImage: {
    borderRadius: responsive.borderRadius(10),
    height: responsive.height(360),
    width: responsive.width(360),
    alignSelf: 'center',
    padding: responsive.padding(16),
  },

  pagination: {
    bottom: responsive.bottom(8), // kam rakho
  },
  dot: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#FFFBFA',
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  iconColumn: {
    position: 'absolute',
    right: rw(5),
    top: rh(12),
    zIndex: 10,
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: responsive.padding(5),
    borderRadius: responsive.borderRadius(20),
    marginVertical: verticalScale(6),
    elevation: 3,
    justifyContent: 'center',
  },

  /* 🔽 THUMBNAILS */
  thumbnailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsive.width(360),
    marginTop: 12,
    alignSelf: 'center',
  },

  thumbnailImage: {
    width: responsive.width(115),
    height: responsive.height(115),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  activeThumbnail: {
    borderColor: '#1C9C48',
    borderWidth: 2,
  },

  thumbnailStrip: {
    marginTop: verticalScale(0),
  },
  headerP: {
    padding: 0,
    marginHorizontal: rw(4),
    marginVertical: verticalScale(1),
  },
  brandP: {
    color: '#11A5D7',
    fontSize: responsive.fontSize(16),
    marginVertical: moderateScale(1),
    marginTop: moderateScale(5),
  },
  titleP: {
    fontSize: responsive.fontSize(28),
    fontWeight: 'bold',
    marginVertical: verticalScale(1),
    color: '#1A1A2D',
  },
  priceP: {
    fontSize: responsive.fontSize(16),
    color: '#1A1A2D',
    fontWeight: 'bold',
  },
  strikePrice: {
    textDecorationLine: 'line-through',
    color: '#777',
    marginBottom: verticalScale(1),
  },
  grade: {
    textAlign: 'center',
    fontWeight: 'semibold',
    color: '#333333',
    fontSize: responsive.fontSize(14),
    marginTop: -5,
  },
  variant: { fontSize: rf(2), color: '#333', marginBottom: verticalScale(1) },
  buttonRow: {
    flexDirection: 'row',
    margin: responsive.margin(8),
    gap: responsive.gap(10),
  },
  addToCart: {
    flex: 1,
    backgroundColor: '#FFFBFA',
    padding: responsive.padding(8),
    borderRadius: responsive.borderRadius(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666666',
    justifyContent: 'center',
  },
  buyNow: {
    flex: 1,
    backgroundColor: '#1C9C48',
    padding: responsive.padding(8),
    borderRadius: responsive.borderRadius(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666666',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: '600',
    fontSize: responsive.fontSize(16),
    textAlign: 'center',
  },
  btnTextWhite: {
    color: '#fff',
    fontWeight: '600',
    fontSize: responsive.fontSize(16),
  },
  bullets: { marginTop: verticalScale(1) },
  bullet: { marginBottom: verticalScale(1), color: '#555', fontSize: rf(1.8) },
  viewMore: { color: '#007aff', marginTop: verticalScale(1.5) },
  variantsSection: { padding: 0, marginHorizontal: rw(4) },
  sectionTitle: {
    fontSize: rf(2.2),
    fontWeight: '700',
    marginBottom: verticalScale(2),
    padding: moderateScale(10),
  },
  variantFilters: {
    flexDirection: 'row',
    gap: rw(2),
    marginBottom: verticalScale(2),
  },
  filterTag: {
    backgroundColor: '#eee',
    paddingHorizontal: rw(3),
    paddingVertical: verticalScale(1),
    borderRadius: scale(20),
  },
  variantCard: {
    width: rw(35),
    marginRight: rw(4),
    alignItems: 'center',
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(10),
  },
  variantImage: {
    width: rw(25),
    height: rw(25),
    resizeMode: 'contain',
    marginBottom: verticalScale(1),
  },

  specSection: {},
  specRowFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    borderBottomWidth: 0.5,
    borderBottomColor: '#dcdcdc',
  },

  specLabelFeature: {
    width: '25%', // 👈 label column
    fontSize: responsive.fontSize(12),
    color: '#666',
    marginHorizontal: responsive.marginHorizontal(10),
  },

  specValueFeature: {
    width: '55%', // 👈 value column
    fontSize: responsive.fontSize(12),
    color: '#666',
    textAlign: 'left', // 🔑 start se hi
    marginHorizontal: responsive.marginHorizontal(10),
  },

  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
  },
  specLabel: {
    fontSize: responsive.fontSize(13),
    color: '#171D1C',
    marginVertical: responsive.marginVertical(10),
  },
  specValue: {
    fontSize: responsive.fontSize(13),
    color: '#171D1C',
    textAlign: 'left', // 🔑 start se hi
  },

  specRowSpecification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: responsive.padding(15),
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderBottomColor: '#000',
  },
  specLabelSpecification: {
    fontSize: responsive.fontSize(12),
    color: '#666666',
  },
  specValuespecification: {
    maxWidth: '60%',
    textAlign: 'right',
    fontSize: responsive.fontSize(12),
    color: '#666666',
  },

  scrollContainer: {
    paddingHorizontal: rw(2.5),
    marginTop: verticalScale(1.5),
  },
  pill: {
    backgroundColor: '#EDEDED',
    borderRadius: scale(10),
    paddingHorizontal: rw(3),
    paddingVertical: verticalScale(1.5),
    marginRight: rw(2),
  },
  pillText: { color: '#000', fontSize: rf(1.8), fontWeight: '500' },
  headlines: {
    fontSize: rf(1.5),
    fontWeight: '700',
    marginVertical: verticalScale(10),
    marginLeft: moderateScale(15),
  },
  headlinesviewspecifications: {
    fontSize: responsive.fontSize(16),
    fontWeight: '500',
    padding: responsive.padding(10),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderBottomColor: '#000',
    padding: responsive.padding(8),
  },
  label: { flex: 1, fontSize: rf(1.5), marginLeft: rw(2) },
  value: { fontSize: rf(1.5), color: 'gray' },

  videoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  videoCard: {
    alignItems: 'center',
    padding: moderateScale(10),
    borderWidth: 1,
    borderRadius: scale(8),
    width: '48%',
  },

  productCard: { marginRight: rw(3), width: rw(25), marginLeft: rw(4) },
  productImage: {
    height: rh(15),
    width: rw(25),
    borderRadius: scale(10),
    backgroundColor: '#eee',
  },
  productTitle: { fontSize: rf(1.3), marginTop: verticalScale(0.5) },
  productPrice: {
    fontWeight: 'bold',
    marginTop: verticalScale(0.5),
    color: '#666666',
    fontSize: rf(1.3),
  },

  cardContainerV: {
    width: rw(60),
    marginRight: rw(4),
    borderWidth: 0.5,
    elevation: 0.5,
    borderColor: '#e0e0e0',
    borderRadius: scale(8),
  },
  imageWrapperV: { borderRadius: scale(10), overflow: 'hidden' },
  imageV: { height: rh(22), justifyContent: 'center', alignItems: 'center' },
  playIconWrapperV: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: scale(50),
    padding: moderateScale(8),
  },
  labelV: {
    marginTop: verticalScale(1),
    fontSize: rf(1.8),
    marginLeft: rw(4),
    fontWeight: '600',
    color: '#000',
    marginBottom: verticalScale(0.5),
  },

  leftContainer: {
    flex: 1,
    paddingRight: scale(10),
  },
  heading: {
    fontSize: responsive.fontSize(14),
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: verticalScale(6),
  },
  subheading: {
    fontSize: responsive.fontSize(12),
    fontWeight: '500',
    color: '#333',
    marginBottom: verticalScale(8),
  },
  description: {
    fontSize: responsive.fontSize(10),
    color: '#7E7E7E',
    marginBottom: verticalScale(20),
  },
  button: {
    backgroundColor: '#EAE8E8',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(24),
    borderRadius: moderateScale(16),
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: responsive.fontSize(12),
    color: '#000',
    fontWeight: '600',
  },
  imageG: {
    width: width * 0.3,
    height: width * 0.3,
  },

  headingD: {
    fontSize: rf(2.2),
    fontWeight: 'bold',
    marginVertical: verticalScale(1),
  },
  subHeadingD: {
    fontSize: responsive.fontSize(16),
    marginTop: responsive.marginTop(10),
    marginHorizontal: responsive.marginHorizontal(10),
    marginVertical: responsive.marginVertical(8),
    fontWeight: 'bold',
  },
  cardD: {
    width: rw(40),
    marginRight: rw(3),
    padding: moderateScale(10),
    backgroundColor: '#f7f7f7',
    borderRadius: scale(10),
  },
  imageD: { width: '100%', height: rh(15), resizeMode: 'contain' },
  nameD: { fontWeight: 'bold', marginTop: verticalScale(1) },
  detailsD: { fontSize: rf(1.6), color: '#666' },
  priceD: { fontWeight: 'bold', color: '#000', marginTop: verticalScale(0.5) },
  featureGridD: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: responsive.marginHorizontal(8),
  },
  featureBoxD: {
    width: '48%',
    backgroundColor: '#ddd',
    borderRadius: scale(8),
    marginBottom: verticalScale(1),
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsive.padding(10),
    gap: 5,
  },
  infoCardD: {
    width: responsive.width(160),
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(5),
    borderRadius: scale(5),
    margin: rw(1),
    borderWidth: 1,
    marginHorizontal: responsive.marginHorizontal(2),
  },
  infoTextD: { marginLeft: rw(1.5), fontSize: rf(1) },
  cardDe: {
    alignItems: 'center',
    marginHorizontal: rw(2.5),
    backgroundColor: '#fff',
    padding: moderateScale(12),
    borderRadius: scale(12),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: rw(40),
  },
  cardTextDe: {
    marginTop: verticalScale(1),
    textAlign: 'center',
    fontSize: rf(1.8),
    color: '#333',
  },

  cardsimilar: {
    marginRight: 5,
  },

  imagesimilar: {
    width: responsive.width(115),
    height: responsive.height(115),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  titlesimilar: {
    fontSize: responsive.fontSize(12),
    fontWeight: '600',
    marginTop: 2,
    color: '#000',
    marginLeft: 3,
  },

  descsimilar: {
    fontSize: responsive.fontSize(12),
    color: '#666',
    marginLeft: 3,
  },

  gradesimilar: {
    fontSize: responsive.fontSize(12),
    color: '#888',
    marginLeft: 3,
  },

  pricesimilar: {
    fontSize: responsive.fontSize(13),
    fontWeight: '700',
    color: '#000',
    marginLeft: 3,
  },

  featureContainer: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  featureChip: {
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: responsive.borderRadius(12),
    marginRight: 10,
  },
  featureText: {
    fontSize: responsive.fontSize(15),
    color: '#000',
    fontWeight: '500',
  },

  labelpayment: {
    flex: 1,
    fontSize: responsive.fontSize(10),
    textAlign: 'center',
    marginVertical: 5,
  },

  list: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  item: {
    alignItems: 'center',
    marginHorizontal: 5,
  },

  circleOuter: {
    width: OUTER_SIZE,
    height: OUTER_SIZE,
    borderRadius: OUTER_SIZE / 2,
    backgroundColor: '#E6F0E6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleInner: {
    width: INNER_SIZE,
    height: INNER_SIZE,
    borderRadius: INNER_SIZE / 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: 'contain',
  },

  divider: {
    height: 1,
    backgroundColor: '#333', // dark grey / black
    opacity: 0.6,
  },
  dividerspecification: {
    height: 1,
    backgroundColor: '#333', // dark grey / black
    opacity: 0.6,
  },
});
