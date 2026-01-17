import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../../constants/Header';
import {
  addToWishlistAPI,
  removeFromWishlistAPI, fetchWishlist
} from '../../../redux/slices/wishlistSlice';
import {
  fetchProductList,
  fetchFilterData,
} from '../../../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import {
  responsiveHeight as RH,
  responsiveWidth as RW,
  responsiveFontSize as RF,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { ProductCardStyles } from '../../../constants/ProductCardStyles';
import Loader from '../../../constants/Loader';
import { FilterModalStyles_All } from '../../../constants/FilterModalStyles_Search';

const { width } = Dimensions.get('window');

const Cat_OS_Product = ({}) => {
  const route = useRoute();
  const { osName, catId, catName } = route.params || {};

  // modal filter

  const navigation = useNavigation(); // ✅ make sure navigation is available
  const dispatch = useDispatch();
  const { productData, filterdata, loading } = useSelector(
    state => state.product,
  );
  console.log('productData------------------->', productData);

  // state
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

  const toggleGrade = gradeNumber => {
    setSelectedGrades(prev =>
      prev.includes(gradeNumber)
        ? prev.filter(g => g !== gradeNumber)
        : [...prev, gradeNumber],
    );
  };

  useEffect(() => {
    dispatch(fetchProductList());
    dispatch(fetchFilterData(catId));
    dispatch(fetchWishlist(catId));
  }, [dispatch]);

  useEffect(() => {
    if (!productData || productData.length === 0) {
      setFilteredProducts([]);
      return;
    }

    const norm = v =>
      typeof v === 'string'
        ? v.toLowerCase().trim()
        : v == null
        ? ''
        : String(v).toLowerCase().trim();

    const wantedCat = norm(catName);
    const wantedOS = norm(osName);

    // 1) Base: category + OS
    let base = productData.filter(p => {
      const pCat = norm(p.category ?? p.category_name ?? p.cat_name);
      const pOS = norm(
        p.operating_systems ?? p.operating_system ?? p.os_name ?? p.os,
      );

      const matchCat = wantedCat ? pCat === wantedCat : true;
      const matchOS = wantedOS ? pOS === wantedOS : true;

      return matchCat && matchOS;
    });

    // 2) If no extra filters, sort base and set
    if (!applyselectedfilters) {
      if (selectedOption === 'lowToHigh')
        base.sort((a, b) => Number(a.price) - Number(b.price));
      else if (selectedOption === 'highToLow')
        base.sort((a, b) => Number(b.price) - Number(a.price));
      else if (selectedOption === 'grade')
        base.sort((a, b) =>
          String(a.grade_number).localeCompare(String(b.grade_number)),
        );

      setFilteredProducts(base);
      return;
    }

    // 3) Apply selected filters on top of base
    const filtered = base.filter(item => {
      // brand
      if (applyselectedfilters.brands?.length > 0) {
        if (!applyselectedfilters.brands.includes(item.brand_name))
          return false;
      }

      // color
      if (applyselectedfilters.colors?.length > 0) {
        if (!applyselectedfilters.colors.includes(item.color_name))
          return false;
      }

      // grade (supports either object or primitive)
      if (applyselectedfilters.grade?.length > 0) {
        if (!applyselectedfilters.grade.includes(item.grade_number))
          return false;
      }

      // ram (compare by id or primitive)
      if (applyselectedfilters.ram) {
        const ramId = applyselectedfilters.ram.id ?? applyselectedfilters.ram;
        if (String(item.ram_id) !== String(ramId)) return false;
      }

      // storage
      if (applyselectedfilters.storage) {
        const romId =
          applyselectedfilters.storage.id ?? applyselectedfilters.storage;
        if (String(item.rom_id) !== String(romId)) return false;
      }

      return true;
    });

    // 4) Sorting
    if (selectedOption === 'lowToHigh')
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    else if (selectedOption === 'highToLow')
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    else if (selectedOption === 'grade')
      filtered.sort((a, b) =>
        String(a.grade_number).localeCompare(String(b.grade_number)),
      );

    setFilteredProducts(filtered);
  }, [productData, catName, osName, applyselectedfilters, selectedOption]);

  // Filter & Wishlist
  let BRANDS = filterdata?.brands;
  let grades = filterdata?.grades;
  let COLORS = filterdata?.colors;
  let Varients = filterdata?.variants;
  let ramOptions = filterdata?.rams;
  let storageOptions = filterdata?.roms;

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
        FilterModalStyles_All.optionButton,
        selectedItem === item && FilterModalStyles_All.selectedButton,
      ]}
      onPress={() => setSelectedItem(item)}
    >
      <Text
        style={[
          FilterModalStyles_All.optionText,
          selectedItem === item && FilterModalStyles_All.selectedText,
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
        FilterModalStyles_All.optionButton,
        selectedItem === item && FilterModalStyles_All.selectedButton,
      ]}
      onPress={() => setSelectedItem(item)}
    >
      <Text
        style={[
          FilterModalStyles_All.optionText,
          selectedItem === item && FilterModalStyles_All.selectedText,
        ]}
      >
        {item?.rom_name}
      </Text>
    </TouchableOpacity>
  );

  const handleApply = () => {
    const selectedFilters = {
      brands: selectedBrands,
      colors: selectedColors,
      grade: selectedGrades,
      ram: selectedRam,
      storage: selectedStorage,
    };
    ApplyselectedFilters(selectedFilters);
    setFilterSortModal(false);
    setShowSortModal(false);
  };

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedGrades([]);
    setSelectedRam(null);
    setSelectedStorage(null);
    setSelectedVariant(null);
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
              item?.color_id ? `color-${item.color_id}` : `color-index-${index}`
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
          <>
            <FlatList
              key={`cat-grade`}
              data={grades}
              keyExtractor={(item, index) =>
                item.name?.toString() ?? index.toString()
              }
              renderItem={renderItemGrade}
            />
          </>
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

  const renderItemGrade = ({ item }) => {
    const gradeNumber = item?.grade_number;
    const isSelected = selectedGrades.includes(gradeNumber);

    return (
      <>
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
      </>
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

          {/* <Image
            source={{ uri: item.feature_image }}
            style={ProductCardStyles.imageD}
          /> */}

          <Image
            source={
              item?.feature_image
                ? { uri: item.feature_image }
                : require('../../../../assets/images/empty.jpeg')
            }
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
              size={20}
              color={isInWishlist ? '#E74C3C' : '#999'}
            />
          </TouchableOpacity>
        </View>

        {/* Grade Box */}

        <Text style={ProductCardStyles.gradeTextD}>
          Grade {item.grade_number}
        </Text>

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
      <Header title={osName} navigation={navigation} showBack={true} />
      <View style={styles.headerButtons}>
        <TouchableOpacity
          onPress={() => setShowSortModal(true)}
          style={styles.sortButton}
        >
          <Icon name="grid" size={16} color="#000" />
          <Text style={styles.sortText}>Sort By</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilterSortModal(true)}
          style={styles.filterButton}
        >
          <Icon name="sliders" size={16} color="#000" />
          <Text style={styles.sortText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      {loading ? (
        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <Loader size="large" />
        </View>
      ) : filteredProduct.length > 0 ? (
        <FlatList
          data={filteredProduct}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={(item, index) =>
            item.id?.toString() ?? index.toString()
          }
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: moderateScale(15),
            paddingBottom: moderateScale(80),
            justifyContent:
              filteredProduct.length === 1 ? 'flex-start' : 'space-between',
          }}
        />
      ) : (
        <View style={{ alignItems: 'center', marginTop: moderateScale(60) }}>
          <Ionicons name="alert-circle-outline" size={50} color="#777" />
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#777',
              marginTop: moderateScale(10),
            }}
          >
            No products available in this range.
          </Text>
        </View>
      )}

      {/* Sort Modal */}
      <Modal visible={showSortModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={{ margin: 20, flex: 1 }}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowSortModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Sort by</Text>
              <Ionicons name="grid-outline" size={20} color="#000" />
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
      <Modal visible={showFilterModal} animationType="slide" transparent>
        <View style={FilterModalStyles_All.modalContainer}>
          {/* Header */}
          <View style={FilterModalStyles_All.header1}>
            <TouchableOpacity onPress={() => setFilterSortModal(false)}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
            <Text style={FilterModalStyles_All.headerTitle1}>Filter</Text>
            <Ionicons name="options-outline" size={20} />
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
                    size={18}
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
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Right Pane */}
              {renderRightPane()}
            </ScrollView>
          </View>

          {/* Footer */}
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
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  backButton: { backgroundColor: '#f5f5f5', borderRadius: 20, padding: 6 },
  headerTitle: { fontSize: 16, fontWeight: '500', color: '#000' },

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

  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    marginLeft: 15,
    marginBottom: 10,
  },
  sortButton: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  card_Flash: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    margin: 10,
  },
  leftSection: {
    flex: 1,
    paddingRight: 12,
  },
  discountText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  name_Flash: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  refurbished: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  originalPrice: {
    fontSize: 13,
    color: '#777',
    textDecorationLine: 'line-through',
  },
  grade: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
  },
  rightSection: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  image_Flash: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  heartIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    elevation: 2,
  },
  listContainerD: {
    padding: 10,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#000',
    paddingBottom: 10,
    borderWidth: 1,
    padding: 10,
    alignSelf: 'center',
    width: 300,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionList: {
    marginVertical: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 15,
    color: '#000',
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#000',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  applyWrapper: {
    bottom: 30,
    alignItems: 'flex-end',
    marginRight: 50,
  },
  applyButton: {
    backgroundColor: '#333',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  applyText: {
    color: '#fff',
    fontWeight: '500',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  body: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPane: {
    width: 110,
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 6,
  },
  tabItemSelected: {
    backgroundColor: '#F0F0F0',
  },
  tabLabel: {
    fontSize: 14,
    color: '#000',
  },
  rightPane: {
    flex: 1,
    padding: 16,
  },
  rightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginLeft: 10,
  },
  rightHeader_cat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  selectedCount: {
    fontSize: 14,
    color: '#333',
  },
  brandItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brandItemSelected: {
    backgroundColor: '#222',
  },
  brandText: {
    fontSize: 15,
    color: '#000',
  },
  itemCount: {
    fontSize: 14,
    color: '#888',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetText: {
    color: '#000',
    fontWeight: '500',
  },
  applyBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  applyText: {
    color: '#fff',
    fontWeight: '500',
  },
  title_cat: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  grid_cat: {
    justifyContent: 'center',
  },
  gridRow_cat: {
    // justifyContent: 'space-between',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  card_cat: {
    width: '38%',
    aspectRatio: 1,
    backgroundColor: '#eee',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSelected_cat: {
    backgroundColor: '#333',
  },
  label_cat: {
    marginTop: 8,
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: '#333',
  },
  selectedRange: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  rail: {
    flex: 1,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  railSelected: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
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
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  labelText: {
    fontSize: 12,
    color: '#333',
  },
  headerRow_C: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title_c: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedCount_c: {
    fontSize: 14,
    color: '#000',
    marginLeft: 150,
    fontWeight: 'bold',
  },
  row_c: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  colorItem_c: {
    alignItems: 'center',
    width: '18%',
    marginHorizontal: 5,
    marginBottom: 15,
  },
  colorCircleWrapper_c: {
    padding: 0,
    borderRadius: 16,
  },
  selectedWrapper_c: {
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    marginBottom: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    width: '18%',
  },
  colorCircle_c: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorCircleSelected_c: {
    borderColor: '#000',
    borderWidth: 3,
  },
  colorLabel_c: {
    marginTop: 6,
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  gradeButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
  },
  gradeButtonSelected: {
    backgroundColor: '#222',
  },
  gradeText: {
    fontSize: 16,
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
    marginBottom: 10,
    width: '90%',
  },
  discountButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
  },
  discountButtonSelected: {
    backgroundColor: '#222',
  },
  discountTexts: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  discountTextSelected: {
    color: '#fff',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 10,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#333',
  },
  optionText: {
    color: '#000',
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
});

export default Cat_OS_Product;
