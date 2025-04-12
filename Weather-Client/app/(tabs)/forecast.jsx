import { View, Text, StyleSheet, FlatList, SectionList } from 'react-native'
import React, { useState } from 'react'

const forecast = () => {

const [cityName, setCityName ] = useState('');
const [weather, setWeather] = useState({
  current: { temp: 0 },
  hourlyData:[],
  dailyData: []
});

  return (
    <View style={styles.container}>
      <Text style ={styles.title}>Forecast</Text>
    
    <SectionList style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.cityName}>{cityName}</Text>
        <Text style={styles.temp}>{Math.round(weather.current.temp)}°F</Text>
      </View>
    </SectionList>

    <View style={styles.section}>
    <Text style={styles.sectionTitle}>Hourly Forecast</Text>
    <FlatList 
      data={hourlyData}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text>{item.time}</Text>
          <Text>{item.temp}</Text>
        </View>
      )}
      />
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>10-Day Forecast</Text>
      <FlatList
        data={dailyData}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.date}</Text>
            <Text>{item.highTemp}°F / {item.lowTemp}°F</Text>
          </View>
        )}
        />
    </View>
      
    </View>
  )
}

export default forecast

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(22, 22, 22)',
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  temp: {
    fontSize: 16,
    color: '#666'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  section: { 
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 5,
    borderRadius: 8,
  },

})