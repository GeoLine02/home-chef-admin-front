import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../configs/firebaseConfigs.ts";

export const uploadImageToFirebase = async (
  file: File,
  location: string
): Promise<string> => {
  try {
    const storageRef = ref(storage, `restaurants/${location}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};
