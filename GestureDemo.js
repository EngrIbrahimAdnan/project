import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

const GestureDemo = () => {
  const [message, setMessage] = useState("");

  // Define the tap gesture
  const tapGesture = Gesture.Tap().onEnd(() => {
    console.log("Tap Gesture Ended");
    setMessage("Tapped!");
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={tapGesture}>
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, color: "blue" }}>
            {message || "Tap anywhere!"}
          </Text>
        </SafeAreaView>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default GestureDemo;
