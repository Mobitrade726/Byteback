import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

const filters = ['Grade', 'Size', 'Color', 'Brand'];

const products = [
  {
    id: '1',
    brand: 'Apple',
    name: 'iPhone 13 Pro',
    grade: 'Grade A2',
    specs: '8GB · 128GB',
    image: 'https://i.postimg.cc/4ymVG31w/Depth-4-Frame-1-3.png',
    price: '₹29,999',
  },
  {
    id: '2',
    brand: 'Apple',
    name: 'iPhone 13',
    grade: 'Grade A3',
    specs: '6GB · 256GB',
    image: 'https://i.postimg.cc/Pr23j6k5/Depth-4-Frame-1-4.png',
    price: '₹27,999',
  },
  {
    id: '3',
    brand: 'Apple',
    name: 'iPhone 13 Pro Max',
    grade: 'Grade A2',
    specs: '8GB · 128GB',
    image: 'https://i.postimg.cc/7ZjNHdtw/Depth-4-Frame-1-5.png',
    price: '₹33,999',
  },
  {
    id: '4',
    brand: 'Apple',
    name: 'iPhone 13 Mini',
    grade: 'Grade A3',
    specs: '6GB · 256GB',
    image: 'https://i.postimg.cc/wxbRYJGd/Depth-4-Frame-1-6.png',
    price: '₹23,999',
  },
];

const ProductCard = ({item}) => (
  <View style={styles.card}>
    <View style={styles.textContainer}>
      <Text style={styles.brand}>{item.brand}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.grade}>{item.grade}</Text>
      <Text style={styles.specs}>{item.specs}</Text>
      <View style={styles.priceTag}>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
    <View style={[styles.imageContainer, {backgroundColor: item.bgColor}]}>
      <Image
        source={{uri: item.image}}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  </View>
);

const SimilarProducts = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Similar Products</Text>
        <Ionicons name="search" size={20} color="#000" />
      </View>

      {/* Filters */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}>
          {filters.map(filter => (
            <TouchableOpacity key={filter} style={styles.filterPill}>
              <Text style={styles.filterText}>{filter}</Text>
              <Octicons name="chevron-down" size={18} color="#000" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={ProductCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SimilarProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  filterContainer: {
    paddingHorizontal: 10,
    height: 35,
  },
  filterPill: {
    flexDirection: 'row',
    backgroundColor: '#EAE6E5',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  brand: {
    color: '#2D9CDB',
    fontWeight: '500',
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  grade: {
    color: '#666',
    marginTop: 4,
  },
  specs: {
    color: '#666',
    marginBottom: 10,
  },
  priceTag: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  price: {
    fontWeight: '600',
    color: '#111',
    fontSize: 14,
  },
  imageContainer: {
    width: 110,
    height: 110,
    borderRadius: 12,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
  },
});
