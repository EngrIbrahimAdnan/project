import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export const saveToFile = async (base64Data) => {
  try {
    // Create a file URI
    const fileUri = FileSystem.documentDirectory + "drawing.png";
    // Write the base64 data to the file
    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Save the file to media library (photos)
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync("Drawings", asset, false);
    alert("Image saved!");
  } catch (error) {
    console.error("Error saving drawing", error);
  }
};
