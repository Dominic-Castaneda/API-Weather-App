import { View, Text, StyleSheet, TextInput, FlatList, Pressable, Image } from 'react-native'
import React from 'react'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';


import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';






const OPENWEATHER_API_KEY = "ead8f43fc6c805853f240f2d3c3ed63b";




const data = [
  {
    "id": 0,
    "title": "Macomb",
  },
  {
    "id": 1,
    "title": "Shelby",
  }
];



const WeatherApp = () => {


  const [search, onChangeSearch] = useState('');

  const handleTextUpdate = (newText) => {
    onChangeSearch(newText);

  };

  useEffect (() => {
    const timeout = setTimeout(() => {
      if (search.length >= 1) {
        WeatherGeoCode();
      } else {
        onChangeResult([]);
      };
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);




  


  const [result, onChangeResult] = useState([]);

  const WeatherGeoCode = async () => {

    try {
      const CityGEO = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${OPENWEATHER_API_KEY}`);
      onChangeResult(CityGEO.data);
    } catch (error) {
      console.error('Error');
    }

  };





  const [save, onSave] = useState([]);
  const [saveCurrent, onSaveCurrent] = useState([]);

  useEffect (() => {

    
    const fetchCurrentCity = async () => {
      try {
        const CityCurrent = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${save.lat}&lon=${save.lon}&appid=${OPENWEATHER_API_KEY}`);
        console.log(CityCurrent.data);
      } catch (error) {
        console.error('Error');
      }
    };

    if (save.lat && save.lon) {
      fetchCurrentCity();
    }

  }, [save]);




  return (
    <View style={styles.container}> 

      <Text style={styles.title}>Weather</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="search-outline" size={24} color="white" style={styles.searchIcon}/>
        <TextInput style={styles.input} placeholder='Search for a city' value={search} onChangeText={handleTextUpdate}/>
      </View>


      {/* If 'someCondition' is true (like searchResults.length > 0), the component is rendered. If not, nothing is rendered - not even empty space. */}
      {result.length > 0 && (
        <View style={styles.searchContainer}>
          <FlatList
            data={result}
            keyExtractor={(item) => item.lat && item.lon}
            renderItem={({item}) => (
              <Pressable onPress={() => {onSave(item), onChangeSearch('')}}>
                <View style={styles.searchItem}>
                    <Text style={styles.searchTitle}>{item.name}, {item.state}, {item.country}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      )}


      <SafeAreaProvider>
        <SafeAreaView>

          <View style={styles.listContainer}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <Pressable>
                  <View style={styles.listItem}>
                    <Text style={styles.listTitle}>{item.title}</Text>
                    <Text style={styles.listDegree}>--</Text>
                  </View>
                  </Pressable>
              )}
            />
          </View>

        </SafeAreaView>
      </SafeAreaProvider>

    </View>
  )
}






// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(22, 22, 22)',
  },
  title: {
    color: 'rgb(207, 207, 207)',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '60',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "auto",
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
  },
  searchIcon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: 'rgb(207, 207, 207)',
    fontSize: 16,
  },
  listContainer: {
  },
  listItem: {
    flexDirection: 'row',
    width: 'auto',
    height: 100,
    borderRadius: 8,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 15,
    backgroundColor: 'rgba(0, 122, 192, 0.85)',
  },
  listTitle: {
    marginRight: 'auto',
    paddingLeft:10,
    paddingTop: 15,
    color: 'rgb(230, 230, 230)',
    fontSize: 30,
  },
  listDegree: {
    paddingRight: 20,
    paddingTop: 15,
    maxWidth: 'auto',
    color: 'rgb(230, 230, 230)',
    fontSize: 50,
  },
  searchContainer: {
    zIndex: 1,
  },
  searchItem: {
    marginTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  searchTitle: {
    color: 'white',
    fontSize: 25,
  },
  
})




export default WeatherApp