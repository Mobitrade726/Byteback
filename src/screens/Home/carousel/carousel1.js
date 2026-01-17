import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
  Modal,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Feather';
// import RangeSlider from 'rn-range-slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../../redux/slices/wishlistSlice';

const { width } = Dimensions.get('window');

const FILTER_TABS = [
  { key: 'category', label: 'Category', icon: 'apps-outline' },
  { key: 'brands', label: 'Brands', icon: 'pricetags-outline' },
  { key: 'price', label: 'Price', icon: 'cash-outline' },
  { key: 'color', label: 'Color', icon: 'color-palette-outline' },
  { key: 'grade', label: 'Grade', icon: 'shield-checkmark-outline' },
  { key: 'discount', label: 'Discount', icon: 'ticket-outline' },
  { key: 'specs', label: 'Specific', icon: 'document-text-outline' },
];

const BRANDS = [
  { name: 'Apple', count: 128 },
  { name: 'Samsung', count: 40 },
  { name: 'Xiomi', count: 36 },
  { name: 'Motorola', count: 36 },
  { name: 'Oppo', count: 36 },
  { name: 'Vivo', count: 12 },
  { name: 'Lava', count: 9 },
];

const CATEGORIESFILTER = [
  { key: 'windows', label: 'Windows pc', icon: 'laptop-outline' },
  { key: 'macbook', label: 'Macbook', icon: 'laptop-outline' },
  { key: 'smartphones', label: 'Smartphones', icon: 'phone-portrait-outline' },
  { key: 'accessories', label: 'Accessories', icon: 'watch-outline' },
];

const COLORS = [
  { name: 'Red', hex: '#E74C3C' },
  { name: 'Orange', hex: '#D35400' },
  { name: 'Black', hex: '#1C1C1C' },
  { name: 'Grey', hex: '#566573' },
  { name: 'Light Grey', hex: '#B2BABB' },
  { name: 'Maroon', hex: '#784212' },
  { name: 'Pink', hex: '#F5B7B1' },
  { name: 'Deep Blue', hex: '#004D61' },
];

const grades = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'];
const discount = [
  '50% off',
  '40% off',
  '30% off',
  '20% off',
  'Upto 20% off',
  'Flat ₹500 off',
  'Buy more, save more',
];

const ramOptions = ['4GB', '6GB', '8GB', '12GB', '16GB', '32GB'];
const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];

const Carousel1 = ({ navigation, visible, onClose, item }) => {
  const [search, setSearch] = useState('');
  const [showSortModal, setShowSortModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('lowToHigh');
  const [showFilterModal, setFilterSortModal] = useState(false);
  const [selectedOptionFilter, setSelectedOptionFilter] = useState('lowToHigh');

  const sortOptions = [
    { key: 'lowToHigh', label: 'Price (Low to High)' },
    { key: 'highToLow', label: 'Price (High to Low)' },
    { key: 'grade', label: 'Grade (A1–A9)' },
  ];
  const sortFilter = [
    { key: 'lowToHigh', label: 'Price (Low to High)' },
    { key: 'highToLow', label: 'Price (High to Low)' },
    { key: 'grade', label: 'Grade (A1–A9)' },
  ];

  const handleApply = () => {
    setShowSortModal(false);
    setFilterSortModal(false);
    // Perform sorting logic here if needed
  };
  const CATEGORIES = ['Smartphones', 'Macbook', 'Accessories'];

  const PRODUCTS = [
    {
      id: '1',
      image: 'https://i.postimg.cc/KYYyFcgy/Depth-5-Frame-0-14.png',
      name: 'Samsung Galaxy S21',
      subtitle: 'PRE-OWNED',
      specs: '8GB 128GB ⚫ Black',
      color: 'Black',
      price: '₹20,999',
      originalPrice: '₹24,999',
      grade: 'A1',
      refurbished: true,
      warranty: '15-day warranty',
    },
    {
      id: '2',
      image: 'https://i.postimg.cc/KYYyFcgy/Depth-5-Frame-0-14.png',
      name: 'Apple iPhone 13',
      subtitle: 'PRE-OWNED',
      specs: '8GB 128GB ⚫ Black',
      color: 'Black',
      price: '₹20,999',
      originalPrice: '₹24,999',
      grade: 'A1',
      refurbished: true,
      warranty: '15-day warranty',
    },
    {
      id: '3',
      image: 'https://i.postimg.cc/KYYyFcgy/Depth-5-Frame-0-14.png',
      name: 'OnePlus 9',
      subtitle: 'PRE-OWNED',
      specs: '8GB 128GB ⚫ Black',
      color: 'Black',
      originalPrice: '₹24,999',
      grade: 'A1',
      refurbished: true,
      warranty: '15-day warranty',
    },
    {
      id: '4',
      image: 'https://i.postimg.cc/KYYyFcgy/Depth-5-Frame-0-14.png',
      name: 'OnePlus 9',
      subtitle: 'PRE-OWNED',
      specs: '8GB 128GB ⚫ Black',
      color: 'Black',
      price: '₹20,999',
      originalPrice: '₹24,999',
      grade: 'A1',
      refurbished: true,
      warranty: '15-day warranty',
    },
  ];

  const [activeTab, setActiveTab] = useState('Smartphones');

  // Tabs
  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {CATEGORIES.map(category => (
        <TouchableOpacity key={category} onPress={() => setActiveTab(category)}>
          <Text
            style={[
              styles.tabText,
              activeTab === category && styles.activeTabText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const ProductCard = ({ item }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist);
    const isInWishlist = wishlist.some(w => w.id === item.id);

    if (!item) return null; // ✅ safety check

    return (
      <View style={styles.cardD}>
        <View style={styles.imageContainerD}>
          <Image source={{ uri: item.image }} style={styles.imageD} />
          {item.refurbished && (
            <Text style={styles.refurbishedLabelD}>PRE-OWNED</Text>
          )}
          <TouchableOpacity
            style={styles.heartIconD}
            onPress={() => dispatch(toggleWishlist(item))}
          >
            <Ionicons
              name={isInWishlist ? 'heart' : 'heart-outline'}
              size={20}
              color={isInWishlist ? 'red' : '#333'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.gradeBoxD}>
          <Text style={styles.gradeTextD}>Grade {item.grade}</Text>
        </View>
        <Text style={styles.productNameD}>{item.name}</Text>
        <Text style={styles.colorTextD}>● {item.color}</Text>
        <View style={styles.priceRowD}>
          <Text style={styles.priceD}>{item.price}</Text>
          <Text style={styles.originalPriceD}>{item.originalPrice}</Text>
        </View>{' '}
      </View>
    );
  };

  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);

  const getTotalSelected = () => {
    return [selectedRam, selectedStorage].filter(Boolean).length;
  };

  const renderOption = (item, selectedItem, setSelectedItem) => (
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
        {item}
      </Text>
    </TouchableOpacity>
  );

  const [numCols, setNumCols] = useState(2);
  const toggleCols = () => setNumCols(prev => (prev === 2 ? 1 : 2));

  const [low, setLow] = useState(4499);
  const [high, setHigh] = useState(49999);

  const renderThumb = () => <View style={styles.thumb} />;
  const renderRail = () => <View style={styles.rail} />;
  const renderRailSelected = () => <View style={styles.railSelected} />;
  const renderLabel = value => (
    <View style={styles.label}>
      <Text style={styles.labelText}>₹ {value.toLocaleString()}</Text>
    </View>
  );

  const [selectedColors, setSelectedColors] = useState([]);

  const toggleColor = name => {
    setSelectedColors(prev =>
      prev.includes(name)
        ? prev.filter(color => color !== name)
        : [...prev, name],
    );
  };

  const renderItemColor = ({ item }) => {
    const isSelected = selectedColors.includes(item.name);
    return (
      <TouchableOpacity
        style={[styles.colorItem_c, isSelected && styles.selectedWrapper_c]}
        onPress={() => toggleColor(item.name)}
      >
        <View style={styles.colorCircleWrapper_c}>
          <View
            style={[
              styles.colorCircle_c,
              { backgroundColor: item.hex },
              isSelected && styles.colorCircleSelected_c,
            ]}
          />
        </View>
        <Text style={styles.colorLabel_c}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const [selectedTab, setSelectedTab] = useState('brands');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('windows');

  const toggleBrand = brand => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand],
    );
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedCategory === item.key;
    return (
      <TouchableOpacity
        style={[styles.card_cat, isSelected && styles.cardSelected_cat]}
        onPress={() => setSelectedCategory(item.key)}
      >
        <Ionicons
          name={item.icon}
          size={28}
          color={isSelected ? '#fff' : '#000'}
        />
        <Text style={[styles.label_cat, isSelected && { color: '#fff' }]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRightPane = () => {
    switch (selectedTab) {
      case 'category':
        return (
          <View>
            <View style={styles.rightHeader}>
              <Text style={styles.rightTitle}>Categories</Text>
              <TouchableOpacity onPress={toggleCols}>
                <Ionicons
                  name={numCols === 2 ? 'list-outline' : 'grid-outline'}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            <FlatList
              key={`cols-${numCols}`} // ✅ Force re-render on column count change
              data={CATEGORIESFILTER}
              numColumns={numCols}
              keyExtractor={item => item.key}
              renderItem={renderItem}
              columnWrapperStyle={numCols > 1 ? styles.gridRow_cat : null}
              contentContainerStyle={styles.grid_cat}
            />
          </View>
        );

      case 'brands':
        return (
          <View style={styles.rightPane}>
            <View style={styles.rightHeader}>
              <Text style={styles.rightTitle}>Brands</Text>
              <Text style={styles.selectedCount}>
                {selectedBrands.length} selected
              </Text>
            </View>
            <FlatList
              key={`cat-brands`}
              data={BRANDS}
              keyExtractor={item => item.name}
              renderItem={({ item }) => {
                const selected = selectedBrands.includes(item.name);
                return (
                  <TouchableOpacity
                    onPress={() => toggleBrand(item.name)}
                    style={[
                      styles.brandItem,
                      selected && styles.brandItemSelected,
                    ]}
                  >
                    <Text
                      style={[styles.brandText, selected && { color: '#fff' }]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[styles.itemCount, selected && { color: '#fff' }]}
                    >
                      {item.count} Items
                    </Text>
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        );

      case 'price':
        return (
          <View style={styles.rightPane}>
            <Text style={styles.rightTitle}>Price</Text>

            <MultiSlider
              values={[low, high]}
              sliderLength={280}
              onValueChanged={(min, max) => {
                setLow(min);
                setHigh(max);
              }}
            />

            {/* <RangeSlider
              min={4499}
              max={69999}
              step={1}
              low={low}
              high={high}
              floatingLabel
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              onValueChanged={(min, max) => {
                setLow(min);
                setHigh(max);
              }}
            /> */}

            <View style={styles.priceLabels}>
              <Text style={styles.price}>₹ {'4499'.toLocaleString()}</Text>
              <Text style={styles.price}>₹ {'69999'.toLocaleString()}</Text>
            </View>

            <Text style={styles.selectedRange}>
              ₹ {low.toLocaleString()} - ₹ {high.toLocaleString()}
            </Text>
          </View>
        );

      case 'color':
        return (
          <View>
            <View style={styles.headerRow_C}>
              <Text style={styles.title_c}>Color</Text>
              <Text style={styles.selectedCount_c}>
                {selectedColors.length} selected
              </Text>
            </View>

            <FlatList
              key={`cat-color`}
              data={COLORS}
              keyExtractor={item => item.name}
              numColumns={4}
              columnWrapperStyle={styles.row}
              contentContainerStyle={{ paddingTop: 10 }}
              renderItem={renderItemColor}
            />
          </View>
        );

      case 'grade':
        return (
          <View style={styles.rightPane}>
            <View style={styles.header_panel}>
              <Text style={styles.title_c}>Grade</Text>
              <Text style={styles.title_c}>
                {selectedGrade ? '1 selected' : 'None selected'}
              </Text>
            </View>
            <FlatList
              key={`cat-grade`}
              data={grades}
              keyExtractor={item => item}
              renderItem={renderItemGrade}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        );

      case 'discount':
        return (
          <View style={styles.rightPane}>
            <View style={styles.header_panel}>
              <Text style={styles.title_c}>Discount</Text>
              <Text style={styles.title_c}>
                {selectedDiscount ? '1 selected' : 'None selected'}
              </Text>
            </View>
            <FlatList
              key={`cat-discount`}
              data={discount}
              keyExtractor={item => item}
              renderItem={renderItemDiscount}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        );

      case 'specs':
        return (
          <View style={styles.rightPane}>
            <View style={styles.header_panel}>
              <Text style={styles.title_c}>Specification</Text>
              <Text style={styles.title_c}>{getTotalSelected()} selected</Text>
            </View>

            <Text style={styles.subHeading}>RAM</Text>
            <View style={styles.optionContainer}>
              {ramOptions.map(item =>
                renderOption(item, selectedRam, setSelectedRam),
              )}
            </View>

            <Text style={styles.subHeading}>Storage</Text>
            <View style={styles.optionContainer}>
              {storageOptions.map(item =>
                renderOption(item, selectedStorage, setSelectedStorage),
              )}
            </View>
          </View>
        );

      default:
        return (
          <View style={styles.rightPane}>
            <Text>No filter selected</Text>
          </View>
        );
    }
  };

  const handleReset = () => {
    setSelectedCategory([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedGrade([]);
    setSelectedDiscount([]);
    setSelectedRam([]);
    setSelectedStorage([]);
  };

  const [selectedGrade, setSelectedGrade] = useState(null);

  const handleSelect = grade => {
    setSelectedGrade(grade === selectedGrade ? null : grade);
  };

  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const handleSelectDiscount = discount => {
    setSelectedDiscount(discount === selectedDiscount ? null : discount);
  };

  const renderItemGrade = ({ item }) => {
    const isSelected = selectedGrade === item;
    return (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={[styles.gradeButton, isSelected && styles.gradeButtonSelected]}
      >
        <Text
          style={[styles.gradeText, isSelected && styles.gradeTextSelected]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderItemDiscount = ({ item }) => {
    const isSelected = selectedDiscount === item;
    return (
      <TouchableOpacity
        onPress={() => handleSelectDiscount(item)}
        style={[
          styles.discountButton,
          isSelected && styles.discountButtonSelected,
        ]}
      >
        <Text
          style={[
            styles.discountTexts,
            isSelected && styles.discountTextSelected,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Scrollable content starts here */}
      <ScrollView>
        <View style={{ margin: 10 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={22} color="#000" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Apple</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Ionicons name="search" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardBrand}>
            <View style={styles.textContainerBrand}>
              <Text style={styles.brandNameBrand}>Apple</Text>
              <Text style={styles.descriptionBrand}>
                Discover the cutting-edge advancements from Apple.
              </Text>
            </View>
            <Image
              source={{
                uri: 'https://i.postimg.cc/xTd8xQtB/Depth-4-Frame-1-13.png',
              }}
              style={styles.logoBrand}
              resizeMode="contain"
            />
          </View>

          {renderTabs()}
          {activeTab === 'Smartphones' && (
            <>
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
              <FlatList
                data={PRODUCTS}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <ProductCard item={item} />}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={styles.row}
              />
            </>
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
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={handleApply}
                >
                  <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Filter Modal */}
          <Modal visible={showFilterModal} animationType="slide" transparent>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setFilterSortModal(false)}>
                  <Ionicons name="close" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Filter</Text>
                <Ionicons name="options-outline" size={20} />
              </View>

              <View style={styles.body}>
                <View style={styles.leftPane}>
                  {FILTER_TABS.map(tab => (
                    <TouchableOpacity
                      key={tab.key}
                      style={[
                        styles.tabItem,
                        selectedTab === tab.key && styles.tabItemSelected,
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
                          styles.tabLabel,
                          selectedTab === tab.key && { fontWeight: '600' },
                        ]}
                      >
                        {tab.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Right Pane */}
                {renderRightPane()}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                  <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                  <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={{
              backgroundColor: '#EAE6E5',
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
            }}
          >
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 6,
    left: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  cardContainer: {
    width: (width - 36) / 2, // 2 cards per row with spacing
    marginBottom: 6,
    marginTop: 10,
  },

  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },

  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  micIcon: { marginLeft: 'auto' },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  imageIcon: { fontSize: 20 },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginTop: 10,
  },
  tabText: { fontWeight: '600', color: 'gray', fontSize: 16 },
  activeTabText: { color: 'black', borderBottomWidth: 2, borderColor: 'black' },
  productList: { padding: 10 },
  productCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  productName: { fontWeight: 'bold', fontSize: 14 },
  productPrice: { fontSize: 14, color: 'gray' },
  timerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  timeContainer: {
    alignItems: 'center',
  },
  timeBox: {
    backgroundColor: '#E8F5E8',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 5,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  timeLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },

  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    marginTop: 20,
    marginBottom: 5,
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
  cardD: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  cardM: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainerD: {
    position: 'relative',
    backgroundColor: '#f4f4f4',
  },
  imageD: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
  },
  imageM: {
    width: '90%',
    height: 200,
    resizeMode: 'stretch',
  },
  refurbishedLabelD: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 12,
    color: '#000',
    backgroundColor: '#EAE6E5',
    width: '98%',
    textAlign: 'center',
    padding: 5,
  },
  heartIconD: {
    position: 'absolute',
    top: 25,
    right: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  badge: {
    position: 'absolute',
    left: -8,
    top: 10,
    backgroundColor: '#FF3C3C',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeTextD: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gradeBoxD: {
    paddingVertical: 2,
    position: 'absolute',
    marginTop: 225,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '92%',
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
  priceD: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 6,
  },
  originalPriceD: {
    fontSize: 13,
    color: '#888',
    textDecorationLine: 'line-through',
  },

  cardr: {
    width: width * 0.4,
    height: 180,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imager: {
    borderRadius: 16,
  },
  overlayr: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    // backgroundColor: 'rgba(0,0,0,0.4)',
  },
  titler: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  specsr: {
    color: '#ddd',
    fontSize: 12,
    marginTop: 2,
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
  header_panel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#eee',
    marginBottom: 10,
    width: '90%',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
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

  cardBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textContainerBrand: {
    flex: 1,
    marginRight: 15,
  },
  brandNameBrand: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  descriptionBrand: {
    fontSize: 14,
    color: '#6b7280', // Tailwind gray-500 equivalent
    marginTop: 5,
  },
  logoBrand: {
    width: 90,
    height: 70,
    borderRadius: 10,
  },

  containersearch: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  inputsearch: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  iconsearch: {
    marginLeft: 8,
  },
});

export default Carousel1;
