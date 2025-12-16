import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const productData = [
  {
    id: '1',
    name: 'MacBook Pro',
    grade: 'A',
    purchaseDate: 'Jan 15, 2023',
    warranty: '6 months left',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S21',
    grade: 'B',
    purchaseDate: 'Feb 10, 2023',
    warranty: '3 months left',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM4',
    grade: 'A',
    purchaseDate: 'Mar 5, 2023',
    warranty: '1 month left',
  },
  {
    id: '4',
    name: 'Dell XPS 13',
    grade: 'A',
    purchaseDate: 'May 25, 2023',
    warranty: '8 months left',
  },
];

const WarrantyTrackingScreen = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => setSelectedId(item.id)}
        activeOpacity={0.8}>
        <View style={styles.row}>
          <Ionicons
            name={isSelected ? 'checkbox' : 'square-outline'}
            size={24}
            color="#333"
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemSubtitle}>
              Grade: {item.grade}, Purchase Date: {item.purchaseDate}, Warranty:{' '}
              {item.warranty}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Warranty Tracking</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Purchased Products</Text>

      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.claimButton}>
          <Text style={styles.claimText}>Claim Warranty</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>Add New Product</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WarrantyTrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    marginHorizontal: 12,
    fontWeight: 'semibold',
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'regular',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    fontWeight: 'regular',
    fontFamily: 'Source Serif 4',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom:20,
  },
  claimButton: {
    backgroundColor: '#eee',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  claimText: {
    fontSize: 17,
    fontWeight: 'medium',
    fontFamily: 'Source Serif 4',
  },
  addButton: {
    backgroundColor: '#00AEEF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'medium',
    fontFamily: 'Source Serif 4',
  },
});
