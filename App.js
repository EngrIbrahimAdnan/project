import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";

export default function App() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(false); // New state to manage camera visibility
  const [photo, setPhoto] = useState(null); // State to store the captured photo

  const [scanned, setScanned] = useState(false); // State to store the captured photo
  const handleOK = () => {
    console.log("OK button pressed.");
    setScanned(false); // You can update the state or perform other actions
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log("barcode scanned");
    setScanned(true);
    const message = `Bar code with type ${type} and data ${data} has been scanned!`; // Make sure the message is a string

    await Alert.alert(
      "Scan Complete",
      message, // This is now explicitly a string

      [
        {
          text: "Cancel", // This button triggers handleCancel
          onPress: handleOK,
          style: "cancel", // Optional styling
        },
        {
          text: "OK", // This button triggers handleOK
          onPress: handleOK,
        },
      ]
    );
  };
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleCameraVisibility() {
    setIsCameraVisible((prev) => !prev); // Toggle the camera visibility
  }

  // Function to capture a photo
  const takePhoto = async () => {
    console.log("photo taken");
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri); // Store the photo URI in the state

      takePicture = () => {
        if (this.camera) {
          this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
        }
      };

      onPictureSaved = (photo) => {
        console.log(photo);
      };
    }
  };

  return (
    <CameraView
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: [
          "qr",
          "pdf417",
          "codabar",
          "aztec",
          "datamatrix",
          "code39",
        ],
      }}
      style={StyleSheet.absoluteFillObject}
    />

    //   <View style={styles.container}>
    //     {!isCameraVisible ? (
    //       // Display a button to open the camera
    //       <Button onPress={toggleCameraVisibility} title="Open Camera" />
    //     ) : (
    //       // Camera view
    //       <CameraView style={styles.camera} facing={facing}>
    //         <View style={styles.buttonContainer}>
    //           <TouchableOpacity
    //             style={styles.button}
    //             onPress={toggleCameraFacing}
    //           >
    //             <Text style={styles.text}>Flip Camera</Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity style={styles.button} onPress={takePhoto}>
    //             <Text style={styles.text}>Take Photo</Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity
    //             style={styles.button}
    //             onPress={toggleCameraVisibility}
    //           >
    //             <Text style={styles.text}>Close Camera</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </CameraView>
    //     )}

    //     {/* Display the captured photo */}
    //     {photo && (
    //       <View style={styles.photoContainer}>
    //         <Text style={styles.text}>Captured Photo:</Text>
    //         <Image source={{ uri: photo }} style={styles.photo} />
    //       </View>
    //     )}
    //   </View>
    // );
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    backgroundColor: "transparent",
  },
  button: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  photoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  photo: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});
