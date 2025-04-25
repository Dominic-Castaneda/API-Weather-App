import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { getSelectedCity } from '../../lib/SelectedCity';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // This state will track whether a city is selected.
  // Using !! converts the value to a boolean.
  const [citySelected, setCitySelected] = useState(!!getSelectedCity());

  useEffect(() => {
    // A simple polling mechanism to update our state.
    // In a more robust app, consider using React Context or another state management solution.
    const interval = setInterval(() => {
      setCitySelected(!!getSelectedCity());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        // Conditionally hide the nav bar by setting display to 'none'
        tabBarStyle: Platform.select({
          ios: {
            // iOS: setting position for transparency plus our conditional display
            position: 'absolute',
            display: citySelected ? 'flex' : 'none',
          },
          default: {
            // For Android and web use the same conditional display.
            display: citySelected ? 'flex' : 'none',
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Ionicons name="earth" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="forecast"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Ionicons name="cloud" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Ionicons name="map" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
