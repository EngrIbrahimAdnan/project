import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useColorScheme } from "react-native";

export default function App() {
  // Get the current system theme (light or dark) using useColorScheme from React Native
  const colorScheme = useColorScheme();

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

  // Define light and dark map styles
  const darkModeStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#3e3e3e",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#373737",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#3c3c3c",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#2c2c2c",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d",
        },
      ],
    },
  ];

  const lightModeStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#e0e0e0",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#e0e0e0",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#a0a0a0",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
  ];

  // Styles for dark mode and light mode
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#121212" : "#ffffff",
    },
    map: {
      flex: 1,
    },
    button: {
      backgroundColor: colorScheme === "dark" ? "#6200ee" : "#6200ea",
      color: colorScheme === "dark" ? "#ffffff" : "#000000",
    },
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress} // Handle map press event
        provider={MapView.PROVIDER_GOOGLE}
        customMapStyle={colorScheme === "dark" ? darkModeStyle : lightModeStyle}
      >
        {/* Display user current location */}
        <Marker
          coordinate={currentLocation}
          title="Your Location"
          pinColor={colorScheme === "dark" ? "cyan" : "blue"}
        />

        {/* Display the pinned location */}
        {pinLocation && (
          <Marker
            coordinate={pinLocation}
            title="Pinned Location"
            pinColor={colorScheme === "dark" ? "red" : "green"}
          />
        )}
      </MapView>

      {/* Button to show alert with pinned location */}
      <Button
        title="Show Pinned Location"
        onPress={handleMarkLocation}
        color={styles.button.backgroundColor}
      />
    </View>
  );
}
