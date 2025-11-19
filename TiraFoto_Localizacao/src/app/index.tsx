import { useEffect, useRef, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { Image } from 'expo-image';

type MyPhoto = {
  uri: string;
  latitude: number | null;
  longitude: number | null;
  timestamp: number;
}

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<Camera | null>(null);
  const [locationGranted, setLocationGranted] = useState(false);
  const [photos, setPhotos] = useState<MyPhoto[]>([]);

  function toggleCameraFancing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function requestLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationGranted(status === 'granted');
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nós precisamos de permissão para obter sua localização.</Text>
        <Button onPress={requestLocationPermission} title='conceder permissão'/>
      </View>
    );
  }

  async function capturePhoto() {
    const result = await cameraRef.current?.takePictureAsync({ quality: 1 });
    if (!result?.uri) return;

    let latitude: number | null = null;
    let longitude: number | null = null;

    try {
      if (locationGranted) {
        const loc = await Location.getCurrentPositionAsync({});
        latitude = loc.coords.latitude;
        longitude = loc.coords.longitude;
      }
    } catch {}
    setPhotos(prev => [{uri: result.uri, latitude: null, longitude: null, timestamp: Date.now()}, ...prev]);
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={facing}
        ref={cameraRef}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleCameraFancing} style={styles.button}>
          <Text>Toggle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={capturePhoto} style={styles.button}>
          <Text>Capture</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <View style={styles.photoItem}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
            <Text style={styles.photoMeta}>
              {item.latitude != null && item.longitude != null
                ? `Lat: ${item.latitude.toFixed(6)}, Lon: ${item.longitude.toFixed(6)}`
                : 'Sem Localização'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  message: { fontSize: 16, textAlign: 'center', marginBottom: 8 },
  camera: { width: '100%', height: 300, backgroundColor: '#000' },
  controls: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 },
  button: { padding: 12, backgroundColor: '#eee', borderRadius: 6 },
  photoItem: { marginBottom: 12 },
  photo: { width: '100%', height: 200, borderRadius: 6 },
  photoMeta: { marginTop: 6, fontSize: 12, color: '#666' },
});
