import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Language = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'Hindi'];

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
          <Text style={styles.headerTitle}>Choose Your Language</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={{marginHorizontal: 10}}>
        {/* Language Options */}
        {languages.map(language => (
          <TouchableOpacity
            key={language}
            onPress={() => setSelectedLanguage(language)}
            style={[
              styles.languageOption,
              selectedLanguage === language && styles.selectedOption,
            ]}>
            <Text
              style={[
                styles.languageText,
                selectedLanguage === language && styles.selectedText,
              ]}>
              {language}
            </Text>
            <View
              style={[
                styles.radioOuter,
                selectedLanguage === language && styles.radioSelectedOuter,
              ]}>
              {selectedLanguage === language && (
                <View style={styles.radioInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F6',
    paddingHorizontal: 20,
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
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 6,
    borderWidth: 1.2,
    borderColor: 'transparent',
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderColor: '#139945',
  },
  languageText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
  },
  selectedText: {
    fontWeight: 'bold',
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#139945',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelectedOuter: {
    borderColor: '#139945',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#139945',
  },
  saveButton: {
    backgroundColor: '#139945',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 'auto',
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
