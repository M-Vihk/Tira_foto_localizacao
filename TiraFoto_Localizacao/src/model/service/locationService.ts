import * as Location from "expo-location";

export default class LocationService {
  async requestPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted";
  }

  async getLocation() {
    return await Location.getCurrentPositionAsync({});
  }
}
