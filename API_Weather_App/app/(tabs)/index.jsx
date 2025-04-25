// Import necessary React Native and external libraries
import { View, Text, StyleSheet, TextInput, FlatList, Pressable, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

// Import utility functions and keys
import { setSelectedCity } from '../../lib/SelectedCity';
import { supabase } from '../../lib/supabase';
import { OPENWEATHER_API_KEY } from '@env';
import { useRouter } from 'expo-router';

// Main component for weather client screen
const WeatherClient = () => {
  const router = useRouter();

  // State management
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch and update all saved cities from the database
  const loadAndUpdateCities = async () => {
    try {
      const { data, error } = await supabase.from('cities').select('*');
      if (error) throw error;

      // Fetch current, hourly, and daily weather for each city
      const updateCityData = async (city) => {
        try {
          const now = new Date();
          const date = now.toLocaleTimeString();
          const time = now.toLocaleDateString();

          const current = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${city.lat}&lon=${city.lon}&appid=${OPENWEATHER_API_KEY}`
          );
          const hourly = await axios.get(
            `https://pro.openweathermap.org/data/2.5/forecast/hourly?units=imperial&lat=${city.lat}&lon=${city.lon}&appid=${OPENWEATHER_API_KEY}`
          );
          const daily = await axios.get(
            `https://pro.openweathermap.org/data/2.5/forecast/daily?units=imperial&cnt=10&lat=${city.lat}&lon=${city.lon}&appid=${OPENWEATHER_API_KEY}`
          );

          await supabase
            .from('cities')
            .update({
              date,
              time,
              current: current.data,
              hourly: hourly.data,
              daily: daily.data,
            })
            .eq('id', city.id);
        } catch (err) {
          console.error('Error updating city:', err.message);
        }
      };

      // Update all cities in parallel
      await Promise.all(data.map((city) => updateCityData(city)));

      // Sort by ID before displaying
      const sortedCities = data.sort((a, b) => a.id - b.id);
      setCities(sortedCities);
    } catch (err) {
      console.error('Failed to load and update cities:', err.message);
    }
  };

  // Initial load and auto-refresh every 60 seconds
  useEffect(() => {
    loadAndUpdateCities();
    const interval = setInterval(() => {
      loadAndUpdateCities();
      console.log('Updated');
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Handles real-time input updates
  const handleTextUpdate = (newText) => {
    setSearch(newText);
  };

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.length >= 1) {
        WeatherGeoCode();
      } else {
        setResult([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  // Get city geo data from OpenWeather Geocoding API
  const WeatherGeoCode = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${OPENWEATHER_API_KEY}`
      );
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching geo data');
    }
  };

  // When user selects a city from search results
  const handleCitySelect = async (item) => {
    const cityExists = cities.some(
      (c) =>
        c.name === item.name &&
        c.state === item.state &&
        c.country === item.country
    );
    if (cityExists) return;

    fetchAndSaveCityData(item);
    setSearch('');
  };

  // Save new city to Supabase and fetch its weather data
  const fetchAndSaveCityData = async (city) => {
    try {
      const now = new Date();
      const date = now.toLocaleTimeString();
      const time = now.toLocaleDateString();

      const { lat, lon } = city;
      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
      );
      const hourly = await axios.get(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?units=imperial&lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
      );
      const daily = await axios.get(
        `https://pro.openweathermap.org/data/2.5/forecast/daily?units=imperial&cnt=10&lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
      );

      const { error } = await supabase.from('cities').insert([
        {
          name: city.name,
          state: city.state,
          country: city.country,
          date,
          time,
          lat,
          lon,
          current: current.data,
          hourly: hourly.data,
          daily: daily.data,
        },
      ]);

      if (error) throw error;
      console.log('City saved!');
      loadAndUpdateCities();
    } catch (err) {
      console.error('Error saving city:', err.message);
    }
  };

  // Delete city from Supabase
  const handleDeleteCity = async (cityId) => {
    try {
      const { error } = await supabase.from('cities').delete().eq('id', cityId);
      if (error) throw error;
      console.log('City deleted');
      loadAndUpdateCities();
    } catch (err) {
      console.error('Error deleting city:', err.message);
    }
  };

  // UI Rendering
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Weather</Text>

      {/* Search Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="search-outline" size={24} color="white" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search for a city"
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={handleTextUpdate}
        />
      </View>

      {/* Show Search Results */}
      {result.length > 0 && (
        <View style={styles.searchContainer}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={result}
            keyExtractor={(item) => `${item.lat}-${item.lon}`}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleCitySelect(item)}>
                <View style={styles.searchItem}>
                  <Text style={styles.searchTitle}>
                    {item.name}
                    {item.state ? `, ${item.state}` : ''}, {item.country}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      )}

      {/* Saved Cities List */}
      <View style={styles.listContainer}>
        <FlatList
          data={cities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Pressable
                style={styles.cityContainer}
                onPress={() => {
                  setSelectedCity(item);
                  router.push('/forecast');
                }}
              >
                <View style={styles.cityTextContainer}>
                  <Text style={styles.listTitle}>{item.name}</Text>
                  <Text style={styles.listSubTitle}>
                    {item.state ? `${item.state}, ` : ''}
                    {item.country}
                  </Text>
                </View>
                <Text style={styles.listDegree}>
                  {item.current?.main?.temp ? `${Math.round(item.current.main.temp)}°F` : '--'}
                </Text>
              </Pressable>

              {/* Delete Button */}
              <Pressable onPress={() => handleDeleteCity(item.id)} style={styles.deleteButton}>
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

// Styling for all UI components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(22, 22, 22)',
  },
  title: {
    color: 'rgb(207, 207, 207)',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: 'rgb(207, 207, 207)',
    fontSize: 16,
  },
  searchContainer: {
    backgroundColor: '#222',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 10,
    maxHeight: 200,
    zIndex: 10,
  },
  searchItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#444',
  },
  searchTitle: {
    color: 'white',
    fontSize: 18,
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 122, 192, 0.85)',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  cityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityTextContainer: {
    flexShrink: 1,
  },  
  listTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  listSubTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  listDegree: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 12,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
});

export default WeatherClient;
