import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { Svg, Polyline } from "react-native-svg";

export default function App() {
  const [lines, setLines] = useState([]);

  const handleStartDraw = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    setLines((prevLines) => [
      ...prevLines,
      { points: [{ x: locationX, y: locationY }] },
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

  return (
    <View style={styles.container}>
      <Svg
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
            stroke="black"
            strokeWidth={5}
            fill="none"
          />
        ))}
      </Svg>
      <Button title="Clear Canvas" onPress={handleClearCanvas} />
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
});
