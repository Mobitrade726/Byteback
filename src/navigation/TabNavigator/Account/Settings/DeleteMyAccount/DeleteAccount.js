import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const DeleteAccount = ({navigation}) => {
  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to permanently delete your account?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => {
            navigation.navigate('LoginScreen');
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
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
          <Text style={styles.headerTitle}>Delete my account</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Warning Text */}
      <View style={styles.warningContainer}>
        <Text style={styles.warningTitle}>Warning</Text>
        <Text style={styles.warningText}>
          Account deletion is permanent and irreversible.
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}>
          <Feather name="alert-triangle" size={18} color="#fff" />
          <Text style={styles.deleteButtonText}>
            {' '}
            Permanently Delete My Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}>
          <Feather name="corner-up-left" size={18} color="#fff" />
          <Text style={styles.cancelButtonText}> Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF9',
    padding: 16,
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
  warningContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  warningTitle: {
    fontSize: 16,
    color: '#B00020',
    fontWeight: 'semibold',
    fontFamily: 'Source Serif 4',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Source Serif 4',
    fontWeight: 'semibold',
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#C84040',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'medium',
    fontFamily: 'Source Serif 4',
    marginHorizontal: 10,
  },
  cancelButton: {
    flexDirection: 'row',
    backgroundColor: '#28A745',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'medium',
    fontFamily: 'Source Serif 4',
    marginHorizontal: 10,
  },
});

export default DeleteAccount;
