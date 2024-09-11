import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [safeRoute, setSafeRoute] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const getSafeRoute = async () => {
    try {
      const response = await axios.post('https://your-backend-api.com/safe-route', {
        origin: { lat: location.latitude, lng: location.longitude },
        destination: { lat: 13.0827, lng: 80.2707 } // Example destination (Chennai)
      });
      setSafeRoute(response.data.route);
    } catch (error) {
      console.log('Error fetching safe route:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location ? location.latitude : 13.0827,
          longitude: location ? location.longitude : 80.2707,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        {location && (
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        )}
        {safeRoute.length > 0 && (
          <Polyline coordinates={safeRoute.map(p => ({ latitude: p.lat, longitude: p.lng }))} />
        )}
      </MapView>
      <Button title="Get Safe Route" onPress={getSafeRoute} />
    </View>
  );
}

//panicButton
<Button
  title="Panic Button"
  onPress={() => {
    Alert.alert('Emergency Alert Sent!');
    // Call backend or emergency services API
    axios.post('https://your-backend-api.com/emergency-alert', {
      location: {
        lat: location.latitude,
        lng: location.longitude
      }
    });
  }}
/>
