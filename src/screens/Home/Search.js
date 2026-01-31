import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductList,
  fetchFilterDataNoCartId,
} from '../../redux/slices/productSlice';
import {
  addToWishlistAPI,
  removeFromWishlistAPI,
} from '../../redux/slices/wishlistSlice';
import { fetchCatList } from '../../redux/slices/homeSlice';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../constants/Header';
import { ProductCardStyles } from '../../constants/ProductCardStyles';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import FilterModalStyles_Search from '../../constants/FilterModalStyles_Search';
import responsive from '../../constants/responsive';

const PER_PAGE = 6; // frontend pagination: 6 items per page

// ------------ icon renderer (pure) ------------
const renderIcon = (iconData, size = moderateScale(12), color = '#333') => {
  if (!iconData || !iconData.icon || !iconData.icon_set) return null;
  switch (iconData.icon_set) {
    case 'FontAwesome':
      return <FontAwesome name={iconData.icon} size={size} color={color} />;
    case 'MaterialDesignIcons':
      return (
        <MaterialCommunityIcons
          name={iconData.icon}
          size={size}
          color={color}
        />
      );
    case 'Fontisto':
      return <Fontisto name={iconData.icon} size={size} color={color} />;
    case 'Ionicons':
      return <Ionicons name={iconData.icon} size={size} color={color} />;
    default:
      return null;
  }
};

// ------------ memoized product card (prevents re-renders) ------------
const ProductCard = React.memo(
  ({ item, onToggleWishlist, isInWishlist, onPress }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => onPress(item)}
          style={ProductCardStyles.cardD}
        >
          <View style={ProductCardStyles.imageContainerD}>
            {item && (
              <Text style={ProductCardStyles.refurbishedLabelD}>PRE-OWNED</Text>
            )}
            <Image
              source={{ uri: item.feature_image }}
              style={ProductCardStyles.imageD}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={ProductCardStyles.heartIconD}
              onPress={() => onToggleWishlist(item)}
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
        <Text style={ProductCardStyles.productName}>{item.model_name}</Text>
        <Text style={ProductCardStyles.colorText}>● {item.color_name}</Text>
        <View style={ProductCardStyles.priceRowD}>
          <Text style={ProductCardStyles.price}>₹ {item.price}</Text>
        </View>
      </View>
    );
  },
);

const SearchRefactored = ({ navigation }) => {
  const dispatch = useDispatch();
  // productData expected shape: array of product objects
  const {
    productData = [],
    nocartidfilterdata = [],
    loading: productLoading,
  } = useSelector(state => state.product || {});
  const wishlistItems = useSelector(state => state.wishlist.items || []);
  const { catList = [] } = useSelector(state => state.home || {});

  console.log('nocartidfilterdata---------------->', nocartidfilterdata?.grades);

  // UI state
  const [searchText, setSearchText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchIcon, setSearchIcon] = useState({
    icon: 'search',
    icon_set: 'Ionicons',
  });

  // filtering & pagination state (front-end)
  const [filteredData, setFilteredData] = useState([]); // result of search / category filter
  const [visibleData, setVisibleData] = useState([]); // sliced for pagination
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // filter modal state simplified to avoid heavy re-renders
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('brands');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);

  // debounce ref
  const searchDebounceRef = useRef(null);

  // initial fetch
  useEffect(() => {
    dispatch(fetchProductList());
    dispatch(fetchFilterDataNoCartId());
    dispatch(fetchCatList());
  }, [dispatch]);

  // when productData arrives, reset filtered & visible state
  useEffect(() => {
    if (Array.isArray(productData) && productData.length > 0) {
      setFilteredData(productData);
      setPage(1);
      setVisibleData(productData.slice(0, PER_PAGE));
    } else {
      setFilteredData([]);
      setVisibleData([]);
    }
  }, [productData]);

  // derive "finalList" depending on filters applied (simple front-end filter)
  const finalFilteredList = useMemo(() => {
    // If no advanced filters selected, return filteredData (which is search/category result)
    const anyFilters =
      selectedBrands.length ||
      selectedColors.length ||
      selectedGrade ||
      selectedRam ||
      selectedStorage;
    if (!anyFilters) return filteredData;

    console.log(
      'filteredDatatesting--------------------------------->',
      filteredData,
    );
    console.log(
      'selectedGrade--------------------------------->',
      selectedGrade,
    );

    return filteredData.filter(item => {
      if (selectedBrands.length && !selectedBrands.includes(item.brand_name))
        return false;
      if (selectedColors.length && !selectedColors.includes(item.color_name))
        return false;
      if (selectedGrade && item.grade_number !== selectedGrade) return false;
      if (selectedRam && item.ram_id !== selectedRam.id) return false;
      if (selectedStorage && item.rom_id !== selectedStorage.id) return false;
      return true;
    });
  }, [
    filteredData,
    selectedBrands,
    selectedColors,
    selectedGrade,
    selectedRam,
    selectedStorage,
  ]);

  // whenever finalFilteredList changes, reset pagination
  useEffect(() => {
    setPage(1);
    setVisibleData(finalFilteredList.slice(0, PER_PAGE));
  }, [finalFilteredList]);

  // load more handler - append next slice
  const loadMore = useCallback(() => {
    if (loadingMore) return;
    const total = finalFilteredList.length;
    const nextStart = page * PER_PAGE;
    if (nextStart >= total) return; // nothing more

    setLoadingMore(true);
    // small timeout to show spinner UX
    setTimeout(() => {
      const nextPage = page + 1;
      const newSlice = finalFilteredList.slice(nextStart, nextStart + PER_PAGE);
      setVisibleData(prev => [...prev, ...newSlice]);
      setPage(nextPage);
      setLoadingMore(false);
    }, 250);
  }, [finalFilteredList, page, loadingMore]);

  // search handler (debounced) — accepts text param
  const handleSearch = useCallback(
    text => {
      setSearchText(text);

      // debounce quick typing
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = setTimeout(() => {
        const lower = (text || '').toLowerCase().trim();

        // If empty → show all products
        if (!lower) {
          setFilteredData(productData);
          setSearchIcon({ icon: 'search', icon_set: 'Ionicons' });
          return;
        }

        // check if matches a category name (partial)
        const matchCategory = catList.find(c =>
          (c.category_name || '').toLowerCase().includes(lower),
        );

        let matchedProducts = [];
        if (matchCategory) {
          setSearchIcon({
            icon: matchCategory.icon,
            icon_set: matchCategory.icon_set,
          });
          matchedProducts = productData.filter(
            p =>
              (p.category_name || '').toLowerCase().trim() ===
              (matchCategory.category_name || '').toLowerCase().trim(),
          );
        } else {
          setSearchIcon({ icon: 'search', icon_set: 'Ionicons' });
          matchedProducts = productData.filter(
            p =>
              (p.model_name || '').toLowerCase().includes(lower) ||
              (p.category_name || '').toLowerCase().includes(lower) ||
              (p.category || '').toLowerCase().includes(lower),
          );
        }

        setFilteredData(matchedProducts);
      }, 250);
    },
    [productData, catList],
  );

  // dropdown select (category)
  const onSelectCategory = useCallback(
    cat => {
      if (!cat) {
        setFilteredData(productData);
        setDisplayText('');
        setSearchIcon({ icon: 'search', icon_set: 'Ionicons' });
        return;
      }
      setDisplayText(cat.category_name);
      setSearchIcon({ icon: cat.icon, icon_set: cat.icon_set });
      setShowDropdown(false);
      // filter by category (includes OS)
      const matched = productData.filter(
        p =>
          (p.category || '')
            .toLowerCase()
            .includes((cat.category_name || '').toLowerCase()) ||
          (p.operating_systems || '')
            .toLowerCase()
            .includes((cat.category_name || '').toLowerCase()),
      );
      setFilteredData(matched);
    },
    [productData],
  );

  // wishlist toggle
  const onToggleWishlist = useCallback(
    item => {
      // optimistic: check if present
      const isIn = wishlistItems.some(w => w.barcode_id === item.barcode_id);
      if (isIn) dispatch(removeFromWishlistAPI(item));
      else dispatch(addToWishlistAPI(item));
    },
    [dispatch, wishlistItems],
  );

  // navigate to product detail
  const onOpenProduct = useCallback(
    item => {
      navigation.navigate('ProductList', {
        product_barcode_id: item.barcode_id,
      });
    },
    [navigation],
  );

  // helpers for filter modal toggles
  const toggleBrand = brand => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand],
    );
  };
  const toggleColor = color => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color],
    );
  };
  const handleApplyFilters = () => {
    // simply closing modal -- finalFilteredList will update because selected* changed
    setShowFilterModal(false);
  };
  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedGrade(null);
    setSelectedRam(null);
    setSelectedStorage(null);
    setShowFilterModal(false);
  };

  // derive render data used by FlatList
  const listData = visibleData;

  // show global loader until we have fetched productData at least once (or productLoading true)
  const initialLoading =
    productLoading ||
    (!productLoading && (!productData || productData.length === 0));

  return (
    <View style={styles.container}>
      <Header
        title="Search"
        navigation={navigation}
        showBack
        showSearch={false}
      />

      {/* Search box */}
      <View
        style={{
          marginHorizontal: moderateScale(10),
          marginTop: moderateScale(8),
        }}
      >
        <View
          style={[
            styles.searchBox,
            showDropdown && {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          ]}
        >
          {renderIcon(searchIcon, moderateScale(18), '#333')}
          <TouchableOpacity
            onPress={() => setShowDropdown(prev => !prev)}
            style={{ marginLeft: moderateScale(5) }}
          >
            <Ionicons
              name={
                showDropdown ? 'chevron-up-outline' : 'chevron-down-outline'
              }
              size={moderateScale(20)}
              color="#000"
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Search devices..."
            placeholderTextColor="#888"
            value={displayText || searchText}
            onChangeText={t => {
              setDisplayText(t);
              handleSearch(t);
              setShowDropdown(true);
            }}
          />
          <TouchableOpacity>
            <Ionicons
              name="mic-outline"
              size={moderateScale(20)}
              color="#11A5D7"
            />
          </TouchableOpacity>
        </View>

        {/* Dropdown */}
        {showDropdown && (
          <View style={styles.dropdown}>
            {catList.map(cat => (
              <TouchableOpacity
                key={(cat.category_id || cat.id || Math.random()).toString()}
                onPress={() => onSelectCategory(cat)}
                style={styles.dropdownItem}
              >
                {renderIcon(cat)}
                <Text
                  style={{ fontSize: responsive.fontSize(12), color: '#333' }}
                >
                  {cat.category_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Filter button */}
      <View
        style={{
          alignItems: 'flex-end',
          marginRight: moderateScale(10),
          marginTop: moderateScale(8),
        }}
      >
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Icon name="sliders" size={moderateScale(12)} color="#000" />
          <Text style={styles.sortText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Modal (kept simple) */}
      <Modal visible={showFilterModal} animationType="slide">
        <View style={FilterModalStyles_Search.modalContainer}>
          <View style={FilterModalStyles_Search.header1}>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Ionicons name="close" size={moderateScale(20)} />
            </TouchableOpacity>
            <Text style={FilterModalStyles_Search.headerTitle1}>Filters</Text>
            <Ionicons name="options-outline" size={moderateScale(20)} />
          </View>

          <View style={FilterModalStyles_Search.body}>
            <View style={FilterModalStyles_Search.leftPane}>
              {[
                { key: 'brands', label: 'Brands', icon: 'pricetags-outline' },
                { key: 'color', label: 'Color', icon: 'color-palette-outline' },
                {
                  key: 'grade',
                  label: 'Grade',
                  icon: 'shield-checkmark-outline',
                },
                {
                  key: 'specs',
                  label: 'Specific',
                  icon: 'document-text-outline',
                },
              ].map(tab => (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    FilterModalStyles_Search.tabItem,
                    selectedTab === tab.key &&
                      FilterModalStyles_Search.tabItemSelected,
                  ]}
                  onPress={() => setSelectedTab(tab.key)}
                >
                  <Ionicons
                    name={tab.icon}
                    size={moderateScale(12)}
                    color={selectedTab === tab.key ? '#000' : '#555'}
                  />
                  <Text
                    style={[
                      FilterModalStyles_Search.tabLabel,
                      selectedTab === tab.key && { fontWeight: '600' },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <ScrollView
              style={FilterModalStyles_Search.rightPane}
              showsVerticalScrollIndicator={false}
            >
              {selectedTab === 'brands' &&
                (nocartidfilterdata.brands || []).map((b, index) => (
                  <TouchableOpacity
                    key={b.brand_id ? String(b.brand_id) : `brand-${index}`}
                    style={[
                      FilterModalStyles_Search.brandItem,
                      selectedBrands.includes(b.brand_name) &&
                        FilterModalStyles_Search.brandItemSelected,
                    ]}
                    onPress={() => toggleBrand(b.brand_name)}
                  >
                    <Text
                      style={[
                        FilterModalStyles_Search.brandText,
                        selectedBrands.includes(b.brand_name) && {
                          color: '#fff',
                        },
                      ]}
                    >
                      {b.brand_name}
                    </Text>
                  </TouchableOpacity>
                ))}

              {selectedTab === 'color' && (
                <FlatList
                  data={nocartidfilterdata.colors || []}
                  keyExtractor={(item, index) =>
                    item?.color_id
                      ? `color-${item.color_id}`
                      : `color-index-${index}`
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
                    marginBottom: responsiveHeight(3),
                  }}
                  renderItem={({ item }) => {
                    const selected = selectedColors.includes(item.color_name);
                    return (
                      <TouchableOpacity
                        onPress={() => toggleColor(item.color_name)}
                        style={[
                          FilterModalStyles_Search.colorBox,
                          selected &&
                            FilterModalStyles_Search.selectedWrapper_c,
                        ]}
                      >
                        <View
                          style={[
                            FilterModalStyles_Search.colorCircle_c,
                            { backgroundColor: item.hex },
                            selected &&
                              FilterModalStyles_Search.colorCircleSelected_c,
                          ]}
                        />
                        <Text
                          style={FilterModalStyles_Search.colorLabel_c}
                          numberOfLines={1}
                        >
                          {item.color_name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              )}

              {selectedTab === 'grade' &&
                (nocartidfilterdata.grades || []).map((g, index) => (
                  <TouchableOpacity
                    key={g.id ? String(g.id) : `grade-${index}`}
                    onPress={() => setSelectedGrade(g?.grade)}
                    style={[
                      FilterModalStyles_Search.gradeButton,
                      selectedGrade === g?.grade &&
                        FilterModalStyles_Search.gradeButtonSelected,
                    ]}
                  >
                    <Text
                      style={[
                        FilterModalStyles_Search.gradeText,
                        selectedGrade === g?.grade &&
                          FilterModalStyles_Search.gradeTextSelected,
                      ]}
                    >
                      {g.grade}
                    </Text>
                  </TouchableOpacity>
                ))}
              {selectedTab === 'specs' && (
                <>
                  <Text style={FilterModalStyles_Search.subHeading}>RAM</Text>
                  <View style={FilterModalStyles_Search.optionContainer}>
                    {(nocartidfilterdata.rams || []).map((r, index) => (
                      <TouchableOpacity
                        key={r.ram_id ? String(r.ram_id) : `ram-${index}`}
                        style={[
                          FilterModalStyles_Search.optionButton,
                          selectedRam === r &&
                            FilterModalStyles_Search.selectedButton,
                        ]}
                        onPress={() => setSelectedRam(r)}
                      >
                        <Text
                          style={[
                            FilterModalStyles_Search.optionText,
                            selectedRam === r &&
                              FilterModalStyles_Search.selectedText,
                          ]}
                        >
                          {r.ram_name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={FilterModalStyles_Search.subHeading}>
                    Storage
                  </Text>
                  <View style={FilterModalStyles_Search.optionContainer}>
                    {(nocartidfilterdata.roms || []).map((s, index) => (
                      <TouchableOpacity
                        key={s.rom_id ? String(s.rom_id) : `rom-${index}`}
                        style={[
                          FilterModalStyles_Search.optionButton,
                          selectedStorage === s &&
                            FilterModalStyles_Search.selectedButton,
                        ]}
                        onPress={() => setSelectedStorage(s)}
                      >
                        <Text
                          style={[
                            FilterModalStyles_Search.optionText,
                            selectedStorage === s &&
                              FilterModalStyles_Search.selectedText,
                          ]}
                        >
                          {s.rom_name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>
          </View>

          <View style={FilterModalStyles_Search.footer}>
            <TouchableOpacity
              style={FilterModalStyles_Search.resetBtn}
              onPress={handleResetFilters}
            >
              <Text style={FilterModalStyles_Search.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={FilterModalStyles_Search.applyBtn}
              onPress={handleApplyFilters}
            >
              <Text style={FilterModalStyles_Search.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Main content: show loading spinner until we have initial data */}
      {initialLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#11A5D7" />
          <Text style={{ marginTop: 12, color: '#555' }}>
            Loading products...
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listData}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlistItems.some(
                w => w.barcode_id === item.barcode_id,
              )}
              onPress={onOpenProduct}
            />
          )}
          keyExtractor={(item, index) =>
            item?.barcode_id || `${item?.model_name}-${index}`
          }
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginHorizontal: moderateScale(10),
          }}
          contentContainerStyle={styles.listContainerD}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                style={{ margin: 10 }}
                size="small"
                color="#11A5D7"
              />
            ) : null
          }
          ListEmptyComponent={() => (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Image
                source={require('../../../assets/images/emptyproduct.png')}
                style={{ alignSelf: 'center', marginTop: moderateScale(10) }}
              />
              <Text
                style={{
                  marginTop: 12,
                  fontSize: moderateScale(18),
                  fontWeight: 'bold',
                }}
              >
                Oops
              </Text>
              <Text style={{ marginTop: 8 }}>
                Can’t find what you’re looking for?
              </Text>
              <Text style={{ marginTop: 8, color: '#777' }}>
                Try adjusting your filters or browsing all products.
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SearchRefactored;

/* ------------------------ STYLES (keep your existing styles or replace) ------------------------ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(50),
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },

  selectedWrapper_c: {
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    marginBottom: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    width: '18%',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: scale(1),
    borderRadius: scale(12),
    backgroundColor: '#fff',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
  },
  input: {
    flex: 1,
    padding: scale(3),
    fontSize: responsive.fontSize(14),
    color: '#000',
  },

  dropdown: {
    backgroundColor: '#fff',
    borderWidth: scale(1),
    borderColor: 'green',
    borderTopWidth: 0,
    paddingVertical: verticalScale(5),
    width: '100%',
    alignSelf: 'center',
    borderBottomRightRadius: scale(12),
    borderBottomLeftRadius: scale(12),
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    paddingLeft: scale(15),
    gap: scale(10),
  },

  filterButton: {
    borderWidth: scale(1),
    borderColor: '#bbb',
    borderRadius: scale(25),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  sortText: { fontSize: responsive.fontSize(14) },

  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: moderateScale(10),
  },
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
  },
  headerTitle1: { fontSize: RF(2), fontWeight: '500' },

  body: { flex: 1, flexDirection: 'row' },
  leftPane: {
    width: scale(110),
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingVertical: verticalScale(10),
  },
  tabItem: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    gap: scale(6),
    alignItems: 'center',
  },
  tabItemSelected: { backgroundColor: '#F0F0F0' },
  tabLabel: { fontSize: moderateScale(14), color: '#000' },

  rightPane: { flex: 1, padding: moderateScale(12) },
  rightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
    marginLeft: scale(10),
    width: '75%',
  },

  brandItem: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    borderRadius: moderateScale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  brandItemSelected: { backgroundColor: '#222' },
  brandText: { fontSize: moderateScale(15), color: '#000' },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(10),
  },
  resetBtn: {
    borderWidth: moderateScale(1),
    borderColor: '#000',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },
  resetText: { color: '#000', fontWeight: '500' },
  applyBtn: {
    backgroundColor: '#000',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },
  applyText: { color: '#fff', fontWeight: '500' },

  listContainerD: { paddingBottom: verticalScale(20) },

  // color, grade, specs styles (kept small)
  colorItem_c: {
    alignItems: 'center',
    width: '18%',
    marginHorizontal: scale(5),
    marginBottom: verticalScale(15),
  },
  colorItemGrid: {
    width: '25%', // ← 4 items per row
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCircleWrapper_c: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorBox: {
    width: responsiveWidth(18), // 🔥 4 items per row (100/4 = 25 → minus spacing)
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1),
  },

  colorCircle_c: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: responsiveHeight(0.5),
  },

  colorLabel_c: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    width: '100%',
  },

  colorCircleSelected_c: {
    borderWidth: 3,
    borderColor: '#000',
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
  gradeButtonSelected: { backgroundColor: '#222' },
  gradeText: { fontSize: moderateScale(16), color: '#000', fontWeight: '500' },
  gradeTextSelected: { color: '#fff' },

  optionContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: scale(10) },
  optionButton: {
    borderWidth: moderateScale(1),
    borderColor: '#000',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(10),
  },
  selectedButton: { backgroundColor: '#333' },
  optionText: { fontSize: moderateScale(14), color: '#000' },
  selectedText: { color: '#fff' },
});
