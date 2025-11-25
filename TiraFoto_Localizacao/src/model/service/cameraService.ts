import { CameraType, Camera } from "expo-camera";

export default class CameraService {
  cameraRef: any = null;

  setRef(ref: typeof Camera | null): void {
    this.cameraRef = ref;
  }

  async requestPermission() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === "granted";
  }

  async takePicture() {
    if (!this.cameraRef) return null;
    return await this.cameraRef.takePictureAsync();
  }
}
