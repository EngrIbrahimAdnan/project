import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  // State to store the user's current location
  const [currentLocation, setCurrentLocation] = useState(null);

  // State to store the location where the user pins
  const [pinLocation, setPinLocation] = useState(null);

  // Request permission and get current location
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is required to access your current location."
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    };

    getLocation();
  }, []);

  // Handle map press (to drop a pin)
  const handleMapPress = (e) => {
    const coordinate = e.nativeEvent.coordinate;
    setPinLocation(coordinate);
  };

  // Handle button press for alert
  const handleMarkLocation = () => {
    if (pinLocation) {
      Alert.alert(
        "Pinned Location",
        `Latitude: ${pinLocation.latitude}, Longitude: ${pinLocation.longitude}`
      );
    } else {
      Alert.alert("No pin dropped", "Please drop a pin on the map first.");
    }
  };

  if (!currentLocation) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress} // Handle map press event
      >
        {/* Display user current location */}
        <Marker
          coordinate={currentLocation}
          title="Your Location"
          pinColor="blue"
        />

        {/* Display the pinned location */}
        {pinLocation && (
          <Marker
            coordinate={pinLocation}
            title="Pinned Location"
            pinColor="red"
          />
        )}
      </MapView>

      {/* Button to show alert with pinned location */}
      <Button title="Show Pinned Location" onPress={handleMarkLocation} />
    </View>
  );
}
