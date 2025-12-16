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

const carousel3 = ({navigation}) => {
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
          <Text style={styles.headerTitle}>Shipping</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        {/* Banner Image */}
        <Image
          source={{
            uri: 'https://i.postimg.cc/TwzVfw17/Rectangle.png',
          }}
          style={styles.banner}
          resizeMode="cover"
        />

        {/* Title */}
        <Text style={styles.title}>Enjoy Free Shipping</Text>
        <Text style={styles.desc}>
          We’ll deliver your order to your doorstep at no extra cost.
        </Text>

        {/* Section - How It Works */}
        <Text style={styles.sectionTitle}>How It Works?</Text>
        <Text style={styles.desc}>Available on all orders.</Text>
        <Text style={styles.desc}>
          No coupon code required – applied automatically at checkout.
        </Text>
        <Text style={styles.desc}>
          Fast, safe, and reliable delivery partners ensure your order arrives
          promptly.
        </Text>

        {/* Section - Benefits */}
        <Text style={styles.sectionTitle}>Benefits</Text>
        <Text style={styles.desc}>
          Save money on every purchase, big or small.
        </Text>
        <Text style={styles.desc}>
          Transparent pricing – no hidden delivery charges.
        </Text>
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start Shopping</Text>
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
    height: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginHorizontal: 16,
    marginTop: 10,
  },
  desc: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 16,
    marginTop: 6,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 16,
    marginTop: 16,
  },
  button: {
    backgroundColor: '#11A5D7',
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

export default carousel3;
