import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  addToWishlistAPI,
  fetchWishlist,
  removeFromWishlistAPI,
} from '../../../redux/slices/wishlistSlice';
import {
  fetchProductList,
  fetchFilterData,
  addRecentlyViewed,
  fetchProductLatestStock,
} from '../../../redux/slices/productSlice';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import {
  responsiveHeight as RH,
  responsiveWidth as RW,
  responsiveFontSize as RF,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { ProductCardStyles } from '../../../constants/ProductCardStyles';
import { FilterModalStyles_All } from '../../../constants/FilterModalStyles_Search';

const { width } = Dimensions.get('window');

const Recentlyadd = ({ tabId, catName, catId }) => {
  const navigation = useNavigation(); // ✅ make sure navigation is available
  const dispatch = useDispatch();
  const { filterdata, lateststock, loading } = useSelector(
    state => state.product,
  );

  // state
  // const [lateststock, setProductData] = useState();
  const [applyselectedfilters, ApplyselectedFilters] = useState();
  const [filteredProduct, setFilteredProducts] = useState([]);
  const [showSortModal, setShowSortModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('lowToHigh');
  const [showFilterModal, setFilterSortModal] = useState(false);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedTab, setSelectedTab] = useState('brands');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  console.log('applyselectedfilters----------->', applyselectedfilters);
  console.log('filteredProduct----------->', filteredProduct);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchProductList());
      dispatch(fetchProductLatestStock());
      dispatch(fetchFilterData(catId));
      dispatch(addRecentlyViewed());
      dispatch(fetchWishlist());
      
    }, [dispatch]),
  );

  // Apply filters
  useEffect(() => {
    if (!lateststock) return;

    if (!applyselectedfilters) {
      setFilteredProducts(
        lateststock.filter(item => item.category === catName),
      );
      return;
    }

    const filtered = lateststock.filter(item => {
      // OS filter
      if (item.category !== catName) return false;

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
        applyselectedfilters.grade_number &&
        item.grade_number !== applyselectedfilters.grade_number
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
  }, [applyselectedfilters, lateststock, catName]);

  // Filter & Wishlist
  let BRANDS = filterdata?.brands;
  let grades = filterdata?.grades;
  let COLORS = filterdata?.colors;
  let ramOptions = filterdata?.rams;
  let storageOptions = filterdata?.roms;
  let Varients = filterdata?.variants;

  const sortOptions = [
    { key: 'lowToHigh', label: 'Price (Low to High)' },
    { key: 'highToLow', label: 'Price (High to Low)' },
    { key: 'grade', label: 'Grade (A1–A9)' },
  ];

  const FILTER_TABS = [
    { key: 'brands', label: 'Brands', icon: 'pricetags-outline' },
    { key: 'color', label: 'Color', icon: 'color-palette-outline' },
    { key: 'grade', label: 'Grade', icon: 'shield-checkmark-outline' },
    { key: 'specs', label: 'Specific', icon: 'document-text-outline' },
  ];

  const renderRamOption = (item, selectedItem, setSelectedItem) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.optionButton,
        selectedItem === item && styles.selectedButton,
      ]}
      onPress={() => setSelectedItem(item)}
    >
      <Text
        style={[
          styles.optionText,
          selectedItem === item && styles.selectedText,
        ]}
      >
        {item?.ram_name}
      </Text>
    </TouchableOpacity>
  );
  const renderStorageOption = (item, selectedItem, setSelectedItem) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.optionButton,
        selectedItem === item && styles.selectedButton,
      ]}
      onPress={() => setSelectedItem(item)}
    >
      <Text
        style={[
          styles.optionText,
          selectedItem === item && styles.selectedText,
        ]}
      >
        {item?.rom_name}
      </Text>
    </TouchableOpacity>
  );

  const handleApply = () => {
    setShowSortModal(false);
    setFilterSortModal(false);
    // Combine all selected filters into an object
    const selectedFilters = {
      brands: selectedBrands,
      colors: selectedColors,
      grade: selectedGrades,
      ram: selectedRam,
      storage: selectedStorage,
    };
    ApplyselectedFilters(selectedFilters);
  };

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedGrades([]);
    setSelectedRam(null);
    setSelectedStorage(null);
    setSelectedVariant(null)
    ApplyselectedFilters(null);
  };
  const toggleBrand = brand => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand],
    );
  };
  const toggleColor = colorName => {
    setSelectedColors(prev =>
      prev.includes(colorName)
        ? prev.filter(c => c !== colorName)
        : [...prev, colorName],
    );
  };
  const renderItemColor = ({ item }) => {
    const isSelected = selectedColors.includes(item.color_name);
    return (
      <TouchableOpacity
        onPress={() => toggleColor(item.color_name)}
        style={[
          FilterModalStyles_All.colorBox,
          isSelected && FilterModalStyles_All.selectedWrapper_c,
        ]}
      >
        <View
          style={[
            FilterModalStyles_All.colorCircle_c,
            { backgroundColor: item.hex },
            isSelected && FilterModalStyles_All.colorCircleSelected_c,
          ]}
        />
        <Text
          style={[
            FilterModalStyles_All.colorLabel_c,
            { color: isSelected ? '#000' : '#555' },
          ]}
        >
          {item.color_name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRightPane = () => {
    switch (selectedTab) {
      case 'brands':
        return (
          <FlatList
            showsVerticalScrollIndicator={false}
            key={`cat-brands`}
            data={BRANDS}
            keyExtractor={(item, index) =>
              item.name?.toString() ?? index.toString()
            }
            renderItem={({ item }) => {
              const selected = selectedBrands.includes(item.brand_name);
              return (
                <TouchableOpacity
                  onPress={() => toggleBrand(item.brand_name)}
                  style={[
                    FilterModalStyles_All.brandItem,
                    selected && FilterModalStyles_All.brandItemSelected,
                  ]}
                >
                  <Text
                    style={[
                      FilterModalStyles_All.brandText,
                      selected && { color: '#fff' },
                    ]}
                  >
                    {item.brand_name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        );

      case 'color':
        return (
          <FlatList
            key={`cat-color`}
            data={COLORS}
            keyExtractor={(item, index) =>
              item.name?.toString() ?? index.toString()
            }
            numColumns={3}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingTop: 10,
              flex: 1,
              marginBottom: responsiveHeight(10),
            }}
            renderItem={renderItemColor}
          />
        );

      case 'grade':
        return (
          <FlatList
            key={`cat-grade`}
            data={grades}
            keyExtractor={(item, index) =>
              item.id?.toString() ?? index.toString()
            }
            renderItem={renderItemGrade}
          />
        );

      case 'specs':
        const isMobile = catName === 'Mobile';
        const isLaptop = catName === 'Laptop';

        return (
          <>
            {isLaptop && (
              <>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={FilterModalStyles_All.subHeading}>RAM</Text>
                  <View style={FilterModalStyles_All.optionContainer}>
                    {ramOptions.map(item =>
                      renderRamOption(item, selectedRam, setSelectedRam),
                    )}
                  </View>

                  <Text style={FilterModalStyles_All.subHeading}>Storage</Text>
                  <View style={FilterModalStyles_All.optionContainer}>
                    {storageOptions.map(item =>
                      renderStorageOption(
                        item,
                        selectedStorage,
                        setSelectedStorage,
                      ),
                    )}
                  </View>
                </ScrollView>
              </>
            )}

            {/* ✅ Laptop category -> Variants */}
            {isMobile && (
              <>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={FilterModalStyles_All.subHeading}>Variants</Text>

                  <View style={FilterModalStyles_All.optionContainer}>
                    {Varients.map((item, index) => {
                      const isSelected = selectedVariant === item?.id;

                      return (
                        <TouchableOpacity
                          key={item?.id || index}
                          style={[
                            FilterModalStyles_All.optionButton,
                            isSelected && FilterModalStyles_All.selectedButton,
                          ]}
                          onPress={() => setSelectedVariant(item?.id)}
                        >
                          <Text
                            style={[
                              FilterModalStyles_All.optionText,
                              isSelected && { color: '#fff' },
                            ]}
                          >
                            {item?.variant_name || item?.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
              </>
            )}

            {/* agar na Mobile hai na Laptop, kuch bhi show mat karo ya generic text */}
            {!isMobile && !isLaptop && (
              <Text style={{ marginTop: 10, color: '#555' }}>
                No specifications available for this category.
              </Text>
            )}
          </>
        );

      default:
        return (
          <View style={styles.rightPane}>
            <Text>No filter selected</Text>
          </View>
        );
    }
  };

  const toggleGrade = gradeNumber => {
    setSelectedGrades(prev =>
      prev.includes(gradeNumber)
        ? prev.filter(g => g !== gradeNumber)
        : [...prev, gradeNumber],
    );
  };

  const renderItemGrade = ({ item }) => {
    const gradeNumber = item?.grade_number;
    const isSelected = selectedGrades.includes(gradeNumber);
    return (
      <TouchableOpacity
        onPress={() => toggleGrade(gradeNumber)}
        style={[
          FilterModalStyles_All.brandItem,
          isSelected && FilterModalStyles_All.brandItemSelected,
        ]}
      >
        <Text
          style={[
            FilterModalStyles_All.brandText,
            isSelected && { color: '#fff' },
          ]}
        >
          {gradeNumber || '--'}
        </Text>
      </TouchableOpacity>
    );
  };

  const ProductCard = ({ item }) => {
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
            resizeMode='contain'
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

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <TouchableOpacity
          onPress={() => setShowSortModal(true)}
          style={styles.sortButton}
        >
          <Icon name="grid" size={moderateScale(16)} color="#000" />
          <Text style={styles.sortText}>Sort By</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilterSortModal(true)}
          style={styles.filterButton}
        >
          <Icon name="sliders" size={moderateScale(16)} color="#000" />
          <Text style={styles.sortText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredProduct}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: moderateScale(80),
          marginHorizontal: 10,
          justifyContent:
            filteredProduct.length === 1 ? 'flex-start' : 'space-between',
        }}
        ListEmptyComponent={
          !loading && (
            <View
              style={{ alignItems: 'center', marginTop: verticalScale(20) }}
            >
              <Image
                source={require('../../../../assets/images/emptyproduct.png')}
                style={{
                  resizeMode: 'contain',
                  height: verticalScale(120), // responsive
                  width: scale(150), // responsive
                }}
              />

              <Text
                style={{
                  textAlign: 'center',
                  marginTop: verticalScale(10),
                  fontSize: moderateScale(18), // responsive font
                  fontWeight: 'bold',
                  color: '#000',
                }}
              >
                Oops
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  marginTop: verticalScale(10),
                  color: '#000',
                  fontSize: moderateScale(16),
                  paddingHorizontal: scale(20),
                }}
              >
                Can’t find what you’re looking for?
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  marginTop: verticalScale(10),
                  color: '#777',
                  fontSize: moderateScale(14),
                  paddingHorizontal: scale(20),
                }}
              >
                Try adjusting your filters or browsing all products.
              </Text>
            </View>
          )
        }
      />

      {/* Sort Modal */}
      <Modal visible={showSortModal} transparent={false} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={{ margin: 20, flex: 1 }}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowSortModal(false)}>
                <Ionicons name="close" size={moderateScale(24)} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Sort by</Text>
              <Ionicons
                name="grid-outline"
                size={moderateScale(20)}
                color="#000"
              />
            </View>

            {/* Sort Options */}
            <View style={styles.optionList}>
              {sortOptions.map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={styles.optionRow}
                  onPress={() => setSelectedOption(option.key)}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                  <View
                    style={[
                      styles.radioOuter,
                      selectedOption === option.key &&
                        styles.radioOuterSelected,
                    ]}
                  >
                    {selectedOption === option.key && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Apply Button */}
          <View style={styles.applyWrapper}>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={false}
      >
        <View style={FilterModalStyles_All.modalContainer}>
          <View style={FilterModalStyles_All.header1}>
            <TouchableOpacity onPress={() => setFilterSortModal(false)}>
              <Ionicons name="close" size={moderateScale(24)} />
            </TouchableOpacity>
            <Text style={FilterModalStyles_All.headerTitle1}>Filter</Text>
            <Ionicons name="options-outline" size={moderateScale(20)} />
          </View>

          <View style={FilterModalStyles_All.body}>
            <View style={FilterModalStyles_All.leftPane}>
              {FILTER_TABS.map(tab => (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    FilterModalStyles_All.tabItem,
                    selectedTab === tab.key &&
                      FilterModalStyles_All.tabItemSelected,
                  ]}
                  onPress={() => setSelectedTab(tab.key)}
                >
                  <Ionicons
                    name={tab.icon}
                    size={moderateScale(18)}
                    color={selectedTab === tab.key ? '#000' : '#555'}
                  />
                  <Text
                    style={[
                      FilterModalStyles_All.tabLabel,
                      selectedTab === tab.key && { fontWeight: '600' },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {renderRightPane()}
          </View>

          <View style={FilterModalStyles_All.footer}>
            <TouchableOpacity
              style={FilterModalStyles_All.resetBtn}
              onPress={handleReset}
            >
              <Text style={FilterModalStyles_All.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={FilterModalStyles_All.applyBtn}
              onPress={handleApply}
            >
              <Text style={FilterModalStyles_All.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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

  seeAllText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginTop: verticalScale(20),
    marginLeft: scale(12),
    marginBottom: verticalScale(10),
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: scale(10),
  },

  budgetCard: {
    width: width / 2.3,
    marginBottom: verticalScale(10),
    alignItems: 'center',
  },

  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: verticalScale(100),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },

  budgetImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  budgetLabel: {
    position: 'absolute',
    bottom: verticalScale(8),
    left: scale(10),
    color: 'white',
    fontSize: moderateScale(12),
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(4),
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

  name: {
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },

  color: {
    fontSize: moderateScale(12),
    marginVertical: verticalScale(2),
  },

  price: {
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },

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

  gradeTitle: {
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },

  gradeDesc: {
    fontSize: moderateScale(12),
    color: '#444',
  },

  learnMoreBtn: {
    backgroundColor: '#fff',
    padding: moderateScale(6),
    marginTop: verticalScale(6),
    borderRadius: moderateScale(6),
    alignSelf: 'flex-start',
  },

  learnMoreText: {
    fontWeight: 'bold',
  },

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

  actionText: {
    marginLeft: scale(6),
  },

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

  leftContainer: {
    flex: 1,
    paddingRight: scale(10),
  },

  heading: {
    fontSize: RF(2.4),
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: verticalScale(6),
  },

  subheading: {
    fontSize: RF(2),
    fontWeight: '500',
    color: '#333',
    marginBottom: verticalScale(8),
  },

  description: {
    fontSize: RF(1.8),
    color: '#7E7E7E',
    marginBottom: verticalScale(20),
  },

  button: {
    backgroundColor: '#EAE8E8',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(24),
    borderRadius: moderateScale(16),
    alignSelf: 'flex-start',
  },

  buttonText: {
    fontSize: RF(1.8),
    color: '#000',
    fontWeight: '600',
  },

  buttonL: {
    backgroundColor: '#EAE8E8',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(24),
    borderRadius: moderateScale(16),
    marginHorizontal: scale(10),
  },

  buttonTextL: {
    fontSize: RF(1.8),
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },

  imageG: {
    width: RW(30),
    height: RW(30),
  },

  headerButtons: {
    flexDirection: 'row',
    gap: scale(12),
    marginLeft: scale(15),
    marginVertical: verticalScale(10),
  },

  sortButton: {
    borderWidth: scale(1),
    borderColor: '#bbb',
    borderRadius: moderateScale(25),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },

  filterButton: {
    borderWidth: scale(1),
    borderColor: '#bbb',
    borderRadius: moderateScale(25),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },

  sortText: {
    fontSize: RF(1.6),
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
    fontSize: RF(1.6),
    fontWeight: 'bold',
  },

  name_Flash: {
    fontSize: RF(1.8),
    fontWeight: '600',
    color: '#222',
  },

  refurbished: {
    fontSize: RF(1.5),
    color: '#555',
    marginBottom: verticalScale(4),
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },

  price: {
    fontSize: RF(1.7),
    fontWeight: 'bold',
    color: '#222',
  },

  originalPrice: {
    fontSize: RF(1.5),
    color: '#777',
    textDecorationLine: 'line-through',
  },

  grade: {
    fontSize: RF(1.5),
    color: '#444',
    marginTop: verticalScale(2),
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
    top: scale(6),
    right: scale(6),
    backgroundColor: '#fff',
    padding: moderateScale(5),
    borderRadius: moderateScale(20),
    elevation: 2,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: verticalScale(10),
    borderWidth: scale(1),
    padding: verticalScale(10),
    alignSelf: 'center',
    width: RW(75),
    borderRadius: moderateScale(10),
  },

  modalTitle: {
    fontSize: RF(1.8),
    fontWeight: '500',
  },

  optionList: {
    marginVertical: verticalScale(20),
  },

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(15),
  },

  optionText: {
    fontSize: RF(1.6),
    color: '#000',
  },

  radioOuter: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterSelected: {
    borderColor: '#000',
  },

  radioInner: {
    height: scale(10),
    width: scale(10),
    borderRadius: scale(5),
    backgroundColor: '#000',
  },

  applyWrapper: {
    bottom: verticalScale(30),
    alignItems: 'flex-end',
    marginRight: scale(50),
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

  // LEFT PANEL
  body: { flex: 1, flexDirection: 'row' },

  leftPane: {
    width: scale(110),
    borderRightWidth: scale(1),
    borderColor: '#ccc',
    paddingVertical: verticalScale(10),
  },

  tabItem: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    gap: scale(6),
  },

  tabItemSelected: {
    backgroundColor: '#F0F0F0',
  },

  tabLabel: {
    fontSize: RF(1.6),
    color: '#000',
  },

  rightPane: {
    flex: 1,
    padding: scale(16),
  },

  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // FIXED: Items next to each other
    marginVertical: verticalScale(10),
    marginLeft: scale(10),
    gap: scale(50), // spacing between the two texts
    width: '75%',
  },
  rightHeader_cat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
    width: '75%',
  },
  rightTitle: {
    fontSize: RF(1.8),
    fontWeight: '500',
  },

  selectedCount: {
    fontSize: RF(1.5),
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
    fontSize: RF(1.7),
    color: '#000',
  },

  itemCount: {
    fontSize: RF(1.5),
    color: '#888',
  },

  separator: {
    borderBottomWidth: scale(1),
    borderColor: '#ddd',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(16),
    borderTopWidth: scale(1),
    borderColor: '#eee',
  },

  resetBtn: {
    borderWidth: scale(1),
    borderColor: '#000',
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },

  resetText: { color: '#000', fontWeight: '500' },

  applyBtn: {
    backgroundColor: '#000',
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },

  title_cat: {
    fontSize: RF(2),
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
    width: RW(38),
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
    fontSize: RF(1.6),
    color: '#000',
    fontWeight: '500',
  },

  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(8),
  },

  selectedRange: {
    marginTop: verticalScale(14),
    fontSize: RF(1.8),
    fontWeight: '500',
    color: '#000',
  },

  rail: {
    flex: 1,
    height: verticalScale(4),
    backgroundColor: '#ccc',
    borderRadius: scale(2),
  },

  railSelected: {
    height: verticalScale(4),
    backgroundColor: '#333',
    borderRadius: scale(2),
  },

  thumb: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: '#fff',
    borderWidth: scale(2),
    borderColor: '#333',
    elevation: 2,
  },

  label: {
    alignItems: 'center',
    padding: scale(6),
    backgroundColor: '#fff',
    borderRadius: scale(6),
    borderWidth: scale(1),
    borderColor: '#ccc',
  },

  labelText: {
    fontSize: RF(1.4),
    color: '#333',
  },

  headerRow_C: {
    flexDirection: 'row',
    padding: scale(16),
    borderBottomWidth: scale(1),
    borderColor: '#eee',
  },

  title_c: {
    fontSize: RF(1.8),
    fontWeight: '600',
  },

  selectedCount_c: {
    fontSize: RF(1.6),
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
    width: RW(18),
    marginHorizontal: scale(5),
    marginBottom: verticalScale(15),
  },

  colorCircleWrapper_c: {
    padding: scale(0),
    borderRadius: moderateScale(16),
  },

  selectedWrapper_c: {
    backgroundColor: '#F2F2F2',
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(15),
    marginHorizontal: scale(5),
    alignItems: 'center',
    width: RW(18),
  },

  colorCircle_c: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    borderWidth: scale(2),
    borderColor: 'transparent',
  },

  colorCircleSelected_c: {
    borderColor: '#000',
    borderWidth: scale(3),
  },

  colorLabel_c: {
    marginTop: verticalScale(6),
    fontSize: RF(1.3),
    color: '#333',
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },

  gradeButton: {
    borderWidth: scale(1),
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
    fontSize: RF(1.8),
    color: '#000',
    fontWeight: '500',
  },

  gradeTextSelected: {
    color: '#fff',
  },

  header_panel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
    width: '90%',
  },

  discountButton: {
    borderWidth: scale(1),
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
    fontSize: RF(1.8),
    color: '#000',
    fontWeight: '500',
  },

  discountTextSelected: {
    color: '#fff',
  },

  subHeading: {
    fontSize: RF(1.8),
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
    borderWidth: scale(1),
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
});

export default Recentlyadd;
