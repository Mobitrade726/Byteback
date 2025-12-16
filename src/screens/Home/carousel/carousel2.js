import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const carousel2 = ({navigation}) => {
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
          <Text style={styles.headerTitle}>Shopping</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        {/* Image Section */}
        <Image
          source={{
            uri: 'https://i.postimg.cc/76GhHnTD/Shopping-bag-card-payment-visual-make-it-into-a-2d-illustration.png',
          }}
          style={styles.banner}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>Get 5% Off on Prepaid Orders</Text>
        <Text style={styles.desc}>
          Pay online and enjoy instant savings on your total order value.
        </Text>

        {/* Section - How It Works */}
        <Text style={styles.sectionTitle}>How It Works?</Text>
        <Text style={styles.desc}>
          Pay using any UPI, credit, or debit card at checkout.
        </Text>
        <Text style={styles.desc}>
          Discount is automatically applied to your cart total.
        </Text>
        <Text style={styles.desc}>Offer valid on all products.</Text>

        {/* Section - Why Prepaid */}
        <Text style={styles.sectionTitle}>Why Prepaid?</Text>
        <Text style={styles.desc}>Faster processing & dispatch.</Text>
        <Text style={styles.desc}>No cash handling at delivery.</Text>
        <Text style={styles.desc}>Safer and more convenient.</Text>
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Shop Prepaid Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  banner: {
    width: '100%',
    height: 180,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginHorizontal: 16,
    marginTop: 20,
    marginVertical: 15,
  },
  desc: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 16,
    marginTop: 6,
    lineHeight: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 16,
    marginTop: 26,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#1EA64B',
    margin: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default carousel2;
