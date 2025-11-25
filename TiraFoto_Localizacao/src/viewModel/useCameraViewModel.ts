import { useState, useEffect } from "react";
import CameraService from "../model/service/cameraService";
import LocationService from "../model/service/locationService";
import { MyPhoto } from "../model/entities/myPhoto";
import type { CameraType } from "expo-camera";

export function useCameraViewModel() {
  const cameraService = new CameraService();
  const locationService = new LocationService();

  const [cameraType, setCameraType] = useState<CameraType>("back");
  const [hasPermission, setHasPermission] = useState(false);
  const [photos, setPhotos] = useState<MyPhoto[]>([]);

  async function requestPermissions() {
    const cam = await cameraService.requestPermission();
    const loc = await locationService.requestPermission();
    setHasPermission(cam && loc);
  }

  useEffect(() => {
    requestPermissions();
  }, []);

  function toggleCamera() {
    setCameraType((prev: CameraType) => (prev === "back" ? "front" : "back"));
  }

  async function capturePhoto() {
    const photo = await cameraService.takePicture();
    if (!photo) return;

    const location = await locationService.getLocation();

    const newPhoto: MyPhoto = {
      id: Date.now().toString(),
      uri: photo.uri,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      createdAt: Date.now(),
    };

    setPhotos((prev) => [newPhoto, ...prev]);
  }

  return {
    cameraType,
    photos,
    hasPermission,
    toggleCamera,
    capturePhoto,
    setCameraRef: cameraService.setRef.bind(cameraService),
  };
}
