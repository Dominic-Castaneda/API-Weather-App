// Import necessary libraries
import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { getSelectedCity } from '../../lib/SelectedCity'; // Helper to get the currently selected city
import { OPENWEATHER_API_KEY } from '@env'; // API key from .env

// Conditionally import WebView for mobile platforms
let WebView;
if (Platform.OS !== 'web') {
  WebView = require('react-native-webview').WebView;
}

const Map = () => {
  const city = getSelectedCity(); // Retrieve selected city data

  // If no city is selected, show fallback message
  if (!city) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.text}>Please select a city to view the map.</Text>
      </View>
    );
  }

  // Construct the OpenWeather map URL using city coordinates
  const { lat, lon } = city;
  const mapURL = `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${lat}&lon=${lon}&zoom=8&appid=${OPENWEATHER_API_KEY}`;

  // Render an iframe for web platforms
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <iframe
          src={mapURL}
          width="100%"
          height="100%"
          style={{ borderWidth: 0 }}
          title="Weather Map"
        />
      </View>
    );
  }

  // Render a WebView for iOS and Android
  return <WebView source={{ uri: mapURL }} style={{ flex: 1 }} />;
};

// Define component styles
const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  webContainer: {
    flex: 1,
    height: '100vh', // Full viewport height for web
    width: '100vw',  // Full viewport width for web
  },
});

export default Map;
