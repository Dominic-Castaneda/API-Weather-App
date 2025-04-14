import { View, Text, StyleSheet, FlatList, SectionList } from 'react-native'
import React from 'react';

const forecast = () => {

const dailyData = [
  {
    city: "Macomb",
    temperature: "50°F",
    condition: "Cloudy",
    forecast: [
      {day: "Mon", temp: "55°F"},
      {day: "Tue", temp: "53°F"},
      {day: "Wed", temp: "54°F"},
      {day: "Thurs", temp: "57°F"},
      {day: "Fri", temp: "45°F"},
      {day: "Sat", temp: "49°F"},
      {day: "Sun", temp: "35°F"},
      {day: "Mon", temp: "43°F"},
      {day: "Tues", temp: "58°F"},
      {day: "Wed", temp: "54°F"},
    ],
  }
];
const hourlyData = [
  {
    hourly: [
      { time: "8am", temp: "30°F"},
      { time: "9am", temp: "32°F"},
      { time: "10am", temp: "35°F"},
      { time: "11am", temp: "37°F"},
      { time: "12pm", temp: "45°F"},
      { time: "1pm", temp: "50°F"},
      { time: "2pm", temp: "50°F"},
      { time: "3pm", temp: "52°F"},
      { time: "4pm", temp: "53°F"},
      { time: "5pm", temp: "55°F"},
      { time: "6pm", temp: "43°F"},
    ]
  }
]

  return (
    <View style={styles.container}>
      <Text style ={styles.title}>Forecast</Text>
    
    <SectionList style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.temp}>{temperature}</Text>
      </View>
    </SectionList>

    <View style={styles.section}>
    <Text style={styles.sectionTitle}>Hourly Forecast</Text>
    <FlatList 
      data={hourlyData}
      keyExtractor={(item, index) => `${item.time}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.temp}>{item.temp}</Text>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      />
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>10-Day Forecast</Text>
      <FlatList
        data={dailyData}
        horizontal
        keyExtractor={(item) => item.day}
        renderItem={({ item }) => (
          <View style={day.card}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.temp}>{item.temp}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
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
  city: {
    fontSize: 24,
    fontWeight: "600",
  },
  day: {
    fontSize: 16,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 16,
    color: '#666'
  },
  temp: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 10,
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