// Import necessary React Native components and custom utility
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { getSelectedCity } from '../../lib/SelectedCity'; // Custom helper to get the selected city from global state

const Forecast = () => {
  // Fetch selected city's data from state
  const city = getSelectedCity();
  const current = city.current;
  const hourly = city.hourly.list.slice(0, 12); // Show the next 12 hours of forecast
  const daily = city.daily.list; // 10-day forecast

  // Render each hourly forecast card
  const renderHour = ({ item }) => {
    const date = new Date(item.dt_txt);
    // Format time to AM/PM format
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return (
      <View style={styles.hourCard}>
        <Text style={styles.hourText}>{formattedTime}</Text>
        <Image
          style={styles.hourIcon}
          source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
        />
        <Text style={styles.hourTemp}>{Math.round(item.main.temp)}°</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Header with location and current weather */}
        <View style={styles.header}>
          <Text style={styles.city}>{city.name}, {city.state}</Text>
          <Text style={styles.description}>{current.weather[0].description}</Text>
          <Text style={styles.temp}>{Math.round(current.main.temp)}°</Text>
        </View>

        {/* Weather details: Feels Like, Humidity, Wind Speed */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Feels Like</Text>
            <Text style={styles.detailValue}>{Math.round(current.main.feels_like)}°</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>{current.main.humidity}%</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Wind</Text>
            <Text style={styles.detailValue}>{Math.round(current.wind.speed)} mph</Text>
          </View>
        </View>

        {/* Horizontal scrolling list of hourly forecasts */}
        <Text style={styles.sectionTitle}>Hourly Forecast</Text>
        <FlatList
          horizontal
          data={hourly}
          keyExtractor={(item) => item.dt.toString()}
          renderItem={renderHour}
          contentContainerStyle={styles.hourlyScroll}
          showsHorizontalScrollIndicator={false}
        />

        {/* List of next 10 days with high/low temperatures and icons */}
        <Text style={styles.sectionTitle}>10-Day Forecast</Text>
        {daily.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          return (
            <View key={index} style={styles.dayRow}>
              <Text style={styles.dayText}>{dayName}</Text>
              <Image
                style={styles.dailyIcon}
                source={{ uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png` }}
              />
              <Text style={styles.dayTemp}>
                {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styling for layout and components
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgb(22, 22, 22)',
  },
  container: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(22, 22, 22)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  city: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#d3d3d3',
    marginVertical: 5,
    textTransform: 'capitalize',
  },
  temp: {
    fontSize: 72,
    color: '#fff',
    fontWeight: '300',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 25,
  },
  detailBox: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    color: '#d3d3d3',
    fontSize: 14,
    fontWeight: '400',
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  hourlyScroll: {
    paddingVertical: 8,
    paddingRight: 8,
  },
  hourCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 15,
    alignItems: 'center',
    width: 80,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  hourText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
  },
  hourIcon: {
    width: 50,
    height: 50,
  },
  hourTemp: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 6,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  dayText: {
    color: '#fff',
    fontSize: 16,
    width: 60,
    fontWeight: '500',
  },
  dailyIcon: {
    width: 40,
    height: 40,
  },
  dayTemp: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Forecast;
