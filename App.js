import React, { useState, useRef } from "react";
import {
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Svg, Polyline } from "react-native-svg";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [lines, setLines] = useState([]);
  const [drawingColor, setDrawingColor] = useState("black");
  const [eraser, setEraser] = useState(false);

  const svgRef = useRef(null); // Reference to the SVG element

  const handleStartDraw = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    setLines((prevLines) => [
      ...prevLines,
      { points: [{ x: locationX, y: locationY }], color: drawingColor },
    ]);
  };

  const handleMoveDraw = (e) => {
    if (lines.length > 0) {
      const { locationX, locationY } = e.nativeEvent;
      const newLines = [...lines];
      const currentLine = newLines[newLines.length - 1];
      currentLine.points.push({ x: locationX, y: locationY });
      setLines(newLines);
    }
  };

  const handleEndDraw = () => {
    setLines((prevLines) => [...prevLines]);
  };

  const handleClearCanvas = () => {
    setLines([]);
  };

  const handleSaveCanvas = async () => {
    if (!svgRef.current) {
      Alert.alert("Error", "SVG component is not available.");
      return;
    }

    try {
      // Capture the SVG and convert to PNG
      const uri = await captureRef(svgRef, {
        format: "png",
        quality: 1.0,
      });

      if (!uri) {
        throw new Error("Failed to generate PNG from SVG.");
      }

      // Write the captured PNG to the file system
      const fileUri = FileSystem.documentDirectory + "drawing.png";
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      // Save to the media library
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Drawings", asset, false);

      Alert.alert("Success", "Drawing saved to gallery!");
    } catch (error) {
      console.error("Failed to save drawing", error);
      Alert.alert("Error", "Failed to save drawing.");
    }
  };

  // Function to change the drawing color
  const handleColorChange = (color) => {
    setDrawingColor(color);
  };

  return (
    <View style={styles.container}>
      <Svg
        ref={svgRef} // Attach the ref to the Svg component
        style={styles.canvas}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={handleStartDraw}
        onResponderMove={handleMoveDraw}
        onResponderRelease={handleEndDraw}
      >
        {lines.map((line, index) => (
          <Polyline
            key={index}
            points={line.points.map((p) => `${p.x},${p.y}`).join(" ")}
            stroke={eraser ? "white" : line.color}
            strokeWidth={5}
            fill="none"
          />
        ))}
      </Svg>

      {/* Color Palette */}
      <View style={styles.colorPalette}>
        {["black", "red", "green", "blue", "yellow", "purple"].map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorButton, { backgroundColor: color }]}
            onPress={() => handleColorChange(color)}
          />
        ))}
      </View>

      {/* Control buttons */}
      <View style={styles.buttons}>
        <Button
          title={eraser ? "Eraser ON" : "Eraser OFF"}
          onPress={() => setEraser(!eraser)}
        />
        <Button title="Clear Canvas" onPress={handleClearCanvas} />
        <Button title="Save Drawing" onPress={handleSaveCanvas} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  canvas: {
    width: "90%",
    height: "70%",
    borderWidth: 1,
    borderColor: "black",
  },
  buttons: {
    marginTop: 20,
    width: "80%",
  },
  colorPalette: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
});
