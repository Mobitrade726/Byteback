import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
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
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Loader from '../../../constants/Loader';
import AlertModal from '../../../constants/AlertModal';

const InfoItem = ({ label, value, working = true }) => (
  <View style={styles.row}>
    <Ionicons
      name={working ? 'checkmark' : 'close'}
      size={16}
      color={working ? 'green' : 'red'}
    />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
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
          padding: moderateScale(7), // responsive padding
          borderRadius: moderateScale(5), // responsive border radius
        }}
      >
        <Icon name={icon} size={moderateScale(20)} color="#000" />
      </View>
      <Text style={styles.infoTextD}>{text}</Text>
    </View>
  );
};

const ProductDetail = ({ route, iconType, icon, text }) => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [showSpecs, setShowSpecs] = useState(false); // Toggle state
  const [showSpecs1, setShowSpecs1] = useState(false); // Toggle state
  const { product_barcode_id, product_barcode_price } = route.params; // 👈 get product
  const { data } = useSelector(state => state.profile);
  const [loading1, setLoading] = useState(true);
  const [error1, setError] = useState(null);
  const dispatch = useDispatch();
  const [product, setProduct] = useState('');
  const { loading } = useSelector(state => state.product);
  const [activeIndex, setActiveIndex] = useState(0);
  const { items } = useSelector(state => state.cart);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  useEffect(() => {
    dispatch(fetchCartAPI());
  }, [dispatch]);

  const handleAddToCart = () => {
    if (!product) return;

    const productId = product?.barcode?.barcode_id; // <-- single id

    const showAlert = (msg, type = 'error') => {
      setAlertMessage(msg);
      setAlertType(type);
      setAlertVisible(true);
    };

    const alreadyInCart = items?.some(
      item => Number(item?.barcode_id) === Number(productId),
    );

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
        console.error(err);
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
  const productSpecs = [
    ['IMEI Number', barcodeDetails?.imei_number],
    ['Model Name', barcodeDetails?.barcode_model?.model_name],
    ['Color', barcodeDetails?.barcode_color?.color_name],
    ['SIM Type', modelSpecification?.sim_type],
    // ['Hybrid Sim Slot', product?.hybrid_sim_slot ? 'Yes' : 'No'],
    ['Touchscreen', modelSpecification?.touchscreen],
    // ['Quick Charging', product?.quick_charging ? 'Yes' : 'No'],
    // ['Sound Enhancements', product?.sound_enhancements],
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          // title="Product List"
          navigation={navigation}
          showBack={true}
          showSearch
        />

        {/* Main Image Carousel */}
        <View style={styles.carouselWrapper}>
          <Swiper
            ref={swiperRef}
            autoplay
            loop
            showsPagination={false}
            dotColor="#ccc"
            activeDotColor="#000"
            onIndexChanged={index => setActiveIndex(index)}
            style={styles.swiper}
          >
            {featureImage.map((imgObj, index) => (
              <Image
                key={index}
                source={
                  imgObj?.url
                    ? { uri: imgObj?.url }
                    : require('../../../../assets/images/empty.jpeg')
                }
                style={styles.mainImage}
                resizeMode="cover"
              />
            ))}
          </Swiper>

          {/* Floating Right-side Icons */}
          <View style={styles.iconColumn}>
            <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
              <Ionicons
                name="share-social-outline"
                size={moderateScale(18)}
                color="#000"
              />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={18} color="#000" />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => swiperRef.current.scrollBy(1)}
            >
              {/* ➡️ next */}
              <Ionicons
                name="chevron-forward-outline"
                size={moderateScale(18)}
                color="#000"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => swiperRef.current.scrollBy(-1)}
            >
              {/* ⬅️ prev */}
              <Ionicons
                name="chevron-back"
                size={moderateScale(18)}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Thumbnails Strip */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailStrip}
          contentContainerStyle={{ paddingHorizontal: moderateScale(10) }}
        >
          {featureImage.map((imgObj, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (swiperRef.current) {
                  swiperRef.current.scrollBy(index - activeIndex); // jump to clicked image
                }
              }}
            >
              <Image
                source={
                  imgObj?.url
                    ? { uri: imgObj.url }
                    : require('../../../../assets/images/empty.jpeg')
                }
                style={[
                  styles.thumbnail,
                  index === activeIndex && styles.activeThumb,
                ]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Header */}
        <View style={styles.headerP}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
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
              <Text style={styles.variant}>
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
                <Text style={styles.variant}>
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
                    size={moderateScale(22)}
                    color="#000"
                  />
                </View>
              </View>
            </View>
            <View style={{ marginRight: moderateScale(20) }}>
              <Text style={{ fontSize: moderateScale(48), fontWeight: 'bold' }}>
                {gradeNumbers || 'N/A'}
              </Text>
              <Text style={styles.grade}>Grade</Text>
            </View>
          </View>
          {/* Buttons */}
          <View
            style={{
              borderWidth: moderateScale(0.5),
              marginTop: moderateScale(8),
            }}
          ></View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('Cart', {productData: barcodeDetails})
              // }
              onPress={handleAddToCart}
              disabled={loading}
              style={styles.addToCart}
            >
              <Text style={styles.btnText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleBuyNow()}
              style={styles.buyNow}
            >
              <Text style={styles.btnTextWhite}>Buy Now</Text>
            </TouchableOpacity>
          </View>
          <View style={{ borderWidth: moderateScale(0.5) }}></View>
        </View>

        {/* Specifications & QC Report  */}
        <View style={styles.specSection}>
          <Text style={styles.headlines}>
            {barcodeDetails?.barcode_model?.model_name || 'N/A'} Highlights
          </Text>
          <View style={{}}>
            <View style={{ backgroundColor: '#EAE6E5', padding: scale(5) }}>
              <Text style={{ fontSize: rf(2.5), fontWeight: '600' }}>
                Key Features
              </Text>
            </View>
            {productSpecs.map(([label, value], index) => (
              <View
                key={label}
                style={[
                  styles.specRow,
                  {
                    backgroundColor: index % 2 === 0 ? '#FFFBFA' : '#66666680',
                  },
                ]}
              >
                <Text style={styles.specLabel}>{label}</Text>
                <Text style={styles.specValue}>{value || 'N/A'}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              fontSize: moderateScale(18), // responsive font size
              marginHorizontal: scale(8),
              marginTop: scale(8),
            }}
          >
            <Text
              style={{
                fontSize: rf(2.2),
                marginVertical: moderateScale(5),
                fontWeight: 'bold',
              }}
            >
              View All Specifications
            </Text>
            <TouchableOpacity onPress={() => setShowSpecs(prev => !prev)}>
              <SimpleLineIcons
                name={showSpecs ? 'arrow-up' : 'arrow-down'}
                size={moderateScale(20)} // responsive size
                color="#000"
              />
            </TouchableOpacity>
          </View>

          {showSpecs && (
            <View>
              <Text style={styles.headlines}>OS & Processor Features</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Operating System</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.operating_system || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Processor</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.processor || 'N/A'}
                </Text>
              </View>

              <Text style={styles.headlines}>Display Features</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Display Size</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.screen_size || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Resolution</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.resolution || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>GPU</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.graphics || 'N/A'}
                </Text>
              </View>

              <Text style={styles.headlines}>Memory & Storage</Text>
              {barcodeDetails?.barcode_brand?.category === 'Mobile' ? (
                <>
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Internal Storage</Text>
                    <Text style={styles.specValue}>
                      {barcodeDetails?.barcode_storage || 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>RAM</Text>
                    <Text style={styles.specValue}>
                      {barcodeDetails?.barcode_ram || 'N/A'}
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Internal Storage</Text>
                    <Text style={styles.specValue}>
                      {barcodeDetails?.barcode_storage?.rom_name || 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>RAM</Text>
                    <Text style={styles.specValue}>
                      {barcodeDetails?.barcode_storage?.rom_code || 'N/A'}
                    </Text>
                  </View>
                </>
              )}

              <Text style={styles.headlines}>Camera Features</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Primary Camera</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.front_camera || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Secondary Camera</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.no_of_rear_camera || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Front Flashs</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.front_flash || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Back Flashs</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.rear_flash || 'N/A'}
                </Text>
              </View>
              <Text style={styles.headlines}>Other Details</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Sensors</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.fingerprint_sensor || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>GPS Type</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.gps || 'N/A'}
                </Text>
              </View>
              <Text style={styles.headlines}>Battery & Power</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Battery Capacity</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.battery_capacity || 'N/A'}
                </Text>
              </View>
              <Text style={styles.headlines}>Dimensions</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Size</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.dimensions || 'N/A'}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Weight</Text>
                <Text style={styles.specValue}>
                  {modelSpecification?.weight || 'N/A'}
                </Text>
              </View>
              <Text style={styles.headlines}>Warranty</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Warranty Summary</Text>
                <Text style={styles.specValue}>
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
              fontSize: moderateScale(18), // responsive font size
              marginHorizontal: scale(8),
              marginBottom: moderateScale(15),
              marginVertical: moderateScale(10),
            }}
          >
            <Text style={{ fontSize: rf(2.2), fontWeight: 'bold' }}>
              QC Report
            </Text>
            <TouchableOpacity onPress={() => setShowSpecs1(prev => !prev)}>
              <SimpleLineIcons
                name={showSpecs1 ? 'arrow-up' : 'arrow-down'}
                size={moderateScale(20)} // responsive size
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
                  marginHorizontal: rw(2.5),
                }}
              >
                <View style={{}}>
                  <Text style={styles.specLabel}>Barcode Number</Text>
                  <Text style={styles.specLabel}>Switched ON</Text>
                  <Text style={styles.specLabel}>Device Locked</Text>
                  <Text style={styles.specLabel}>Warranty</Text>
                </View>
                <View>
                  <Text style={styles.specLabel}>{barcodeDetails?.barcode_number?.barcode_number || 'N/A'}</Text>
                  <Text style={styles.specLabel}>{switchings || 'N/A'}</Text>
                  <Text style={styles.specLabel}>{devicelocked || 'N/A'}</Text>
                  <Text style={styles.specLabel}>
                    {getDeviceAgeLabel(deviceage) || 'N/A'}
                  </Text>
                </View>
              </View>
              <Text style={styles.headlines}>Accessories</Text>
              <InfoItem label="Box with same IMEI / SN" value="" />
              <InfoItem label="Charging Adapter" value="" />
              <InfoItem label="Charging Cable" value="" />
              <InfoItem label="Earphone" value="" />

              <Text style={styles.headlines}>Body Defects</Text>

              {details
                .filter(d => d.defect_type === 'Body Defects') // only Body Defects
                .map((d, idx) => (
                  <InfoItem
                    key={idx}
                    label={d.parameter?.parameter_name || 'N/A'}
                    value={d.parameter_status?.parameter_status_name || 'N/A'}
                    working={d.parameter_status?.parameter_status_name || 'N/A'}
                  />
                ))}

              <Text style={styles.headlines}>Screen Defects</Text>

              {details
                .filter(d => d.defect_type === 'Screen Defects') // only Body Defects
                .map((d, idx) => (
                  <InfoItem
                    key={idx}
                    label={d.parameter?.parameter_name || 'N/A'}
                    value={d.parameter_status?.parameter_status_name || 'N/A'}
                    working={d.parameter_status?.parameter_status_name || 'N/A'}
                  />
                ))}

              <Text style={styles.headlines}>Functional Defects</Text>
              {details
                .filter(d => d.defect_type === 'Functional Problems') // only Body Defects
                .map((d, idx) => (
                  <InfoItem
                    key={idx}
                    label={d.parameter?.parameter_name || 'N/A'}
                    value={d.parameter_status?.parameter_status_name || 'N/A'}
                    working={d.parameter_status?.parameter_status_name || 'N/A'}
                  />
                ))}

              {/* <InfoItem label="Camera Lens" value="Minor Signs" />
              <InfoItem label="Back Panel" value="Minor Signs" />
              <InfoItem label="Screw" value="Available" />
              <InfoItem label="Frame" value="Excellent" />
              <InfoItem label="Device Bent" value="No Bent" />
              <InfoItem label="Chrome" value="Excellent" />
              <InfoItem label="Sim Tray" value="Excellent" /> */}
              {/* 
              // <Text style={styles.headlines}>Screen Defects</Text>
              <InfoItem label="Display" value="Excellent" />
              <InfoItem label="Front Glass" value="Minor Signs" />
              <InfoItem label="Screen Quality" value="Original" />

              <Text style={styles.headlines}>Functional Defects</Text>
              <InfoItem label="WiFi" value="Not Working" working={false} />
              <InfoItem label="Proximity Sensor" value="Working" />
              <InfoItem label="Bluetooth" value="Working" />
              <InfoItem label="Reciever" value="Working" />
              <InfoItem label="Ringer" value="Working" />
              <InfoItem label="Vibrator" value="Working" />
              <InfoItem label="Mic" value="Working" />
              <InfoItem label="SIM Status" value="Working" />
              <InfoItem label="Front Flash Light" value="Working" />
              <InfoItem label="Back Flash Light" value="Working" />
              <InfoItem label="Fingerprint" value="Working" />
              <InfoItem label="Front Camera" value="Working" />
              <InfoItem label="Back Camera" value="Working" />

              <InfoItem label="Portrait Camera" value="Not Working" />
              <InfoItem label="Charging Jack" value="Working" />
              <InfoItem label="Earphone Jack" value="Working" />
              <InfoItem label="Home Key" value="Working" />
              <InfoItem label="Power Key" value="Working" />
              <InfoItem label="Silent Key " value="Working" />
              <InfoItem label="Volume Key" value="Working" />
              <InfoItem label="Face Lock" value="Working" />
              <InfoItem label="True Tone" value="Working" />
              <InfoItem label="Error Message" value="Working" />
              <InfoItem label="Battery" value="Working" />
              <InfoItem label="Battery Health" value="92%" /> */}
            </>
          )}
        </View>

        {/* Grade A1 to A9  */}
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            marginLeft: rw(1.8),
            // marginVertical: rh(1.3),
            flexDirection: 'row',
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
            source={require('../../../../assets/images/mini.png')} // Replace with your image path
            style={styles.imageG}
            resizeMode="contain"
          />
        </View>

        {/* View Similar Products  */}
        {/* <Text style={styles.headlines}>View Similar Products</Text> */}

        <Text style={styles.subHeadingD}>Buy Smart. Buy Secure.</Text>
        <View style={styles.featureGridD}>
          <View style={styles.featureBoxD}>
            <AntDesign
              name="clockcircleo"
              size={moderateScale(18)}
              color="#000"
            />
            <Text
              style={{
                width: '90%',
                marginLeft: moderateScale(5),
                fontSize: moderateScale(12),
              }}
            >
              Over a Decade of Service
            </Text>
          </View>
          <View style={[styles.featureBoxD]}>
            <Feather name="truck" size={moderateScale(20)} color="#000" />
            <Text
              style={{
                width: '90%',
                marginLeft: moderateScale(5),
                fontSize: moderateScale(12),
              }}
            >
              Pan-India Delivery
            </Text>
          </View>
          <View style={styles.featureBoxD}>
            <EvilIcons name="undo" size={moderateScale(25)} color="#000" />
            <Text
              style={{
                width: '90%',
                marginLeft: moderateScale(5),
                fontSize: moderateScale(12),
              }}
            >
              14-Day Return Policy
            </Text>
          </View>
          <View style={styles.featureBoxD}>
            <MaterialIcons
              name="security"
              size={moderateScale(20)}
              color="#000"
            />
            <Text
              style={{
                width: '90%',
                marginLeft: moderateScale(5),
                fontSize: moderateScale(12),
              }}
            >
              7-Day Testing Warranty
            </Text>
          </View>
        </View>

        <Text style={styles.subHeadingD}>Your Trust, Our Commitment</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
    </SafeAreaView>
  );
};

export default ProductDetail;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  carouselWrapper: {
    position: 'relative',
    height: rh(31),
    borderRadius: scale(10),
    overflow: 'hidden',
    marginHorizontal: rw(2.5),
  },
  mainImage: {
    width: '98%',
    alignSelf: 'center',
    height: rh(30),
    borderRadius: scale(10),
    resizeMode: 'center',
    borderWidth: 1,
    borderColor: '#1C9C48',
  },
  iconColumn: {
    position: 'absolute',
    right: rw(2),
    top: rh(2),
    zIndex: 10,
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: moderateScale(8),
    borderRadius: scale(20),
    marginVertical: verticalScale(6),
    elevation: 3,
  },
  thumbnailStrip: {
    marginTop: verticalScale(0),
  },
  thumbnail: {
    width: rw(32),
    height: rw(38),
    borderRadius: scale(12),
    marginHorizontal: rw(1),
    resizeMode: 'center',
  },
  headerP: {
    padding: 0,
    marginHorizontal: rw(4),
    marginVertical: verticalScale(1),
  },
  brandP: {
    color: '#007aff',
    fontSize: rf(3),
    marginVertical: moderateScale(5),
  },
  titleP: {
    fontSize: rf(2.5),
    fontWeight: '700',
    marginVertical: verticalScale(1),
  },
  priceP: { fontSize: rf(3), color: '#1C9C48', fontWeight: '700' },
  strikePrice: {
    textDecorationLine: 'line-through',
    color: '#777',
    marginBottom: verticalScale(1),
  },
  grade: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    fontSize: rf(2),
  },
  variant: { fontSize: rf(2.2), color: '#333', marginBottom: verticalScale(1) },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: verticalScale(5),
    gap: rw(3),
  },
  addToCart: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: verticalScale(12),
    borderRadius: scale(8),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#666666',
  },
  buyNow: {
    flex: 1,
    backgroundColor: '#1C9C48',
    padding: verticalScale(12),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  btnText: { fontWeight: '600', fontSize: rf(2) },
  btnTextWhite: { color: '#fff', fontWeight: '600', fontSize: rf(2) },
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
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(1.5),
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderBottomColor: '#000',
  },
  specLabel: {
    fontSize: rf(2),
    fontWeight: '500',
    color: '#666666',
    marginVertical: verticalScale(5),
    marginHorizontal: rw(2),
  },
  specValue: {
    color: '#555',
    maxWidth: '60%',
    textAlign: 'right',
    marginHorizontal: rw(1),
    fontSize: rf(2),
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
    fontSize: rf(2.2),
    fontWeight: '700',
    marginVertical: verticalScale(10),
    marginLeft: rw(2.5),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(1.5),
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderBottomColor: '#000',
    padding: moderateScale(15),
  },
  label: { flex: 1, fontSize: rf(2.5), marginLeft: rw(2) },
  value: { fontSize: rf(2), color: 'gray' },

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

  leftContainer: { flex: 1, paddingRight: rw(2.5) },
  heading: {
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: verticalScale(2),
  },
  subheading: {
    fontSize: rf(1.8),
    fontWeight: '500',
    color: '#333',
    marginBottom: verticalScale(2),
  },
  description: {
    fontSize: rf(1.5),
    color: '#7E7E7E',
    marginBottom: verticalScale(8),
  },
  button: {
    backgroundColor: '#EAE8E8',
    paddingVertical: verticalScale(5),
    paddingHorizontal: rw(5),
    borderRadius: scale(16),
    alignSelf: 'flex-start',
  },
  buttonText: { fontSize: rf(2), color: '#000', fontWeight: '600' },
  imageG: { width: rw(30), height: rw(30) },

  headingD: {
    fontSize: rf(2.2),
    fontWeight: 'bold',
    marginVertical: verticalScale(1),
  },
  subHeadingD: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    padding: moderateScale(10),
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
    justifyContent: 'space-between',
    marginVertical: verticalScale(0),
    margin: rw(2.5),
  },
  featureBoxD: {
    width: '48%',
    backgroundColor: '#ddd',
    padding: moderateScale(10),
    borderRadius: scale(8),
    marginBottom: verticalScale(1),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(5),
  },
  infoCardD: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(5),
    borderRadius: scale(5),
    margin: rw(1.5),
    borderWidth: 1,
    marginBottom: responsiveHeight(5),
  },
  infoTextD: { marginLeft: rw(1.5), fontSize: rf(1.8) },
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
});
