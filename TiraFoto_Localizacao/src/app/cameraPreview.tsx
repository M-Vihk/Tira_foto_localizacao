import { Camera, CameraType } from "expo-camera";
import { Box, Button, Text, VStack } from "@gluestack-ui/themed";
import { useCameraViewModel } from "../viewModel/useCameraViewModel";

const CameraComp = Camera as any;

export default function CameraPreview() {
  const vm = useCameraViewModel();

  if (!vm.hasPermission)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Permissões necessárias</Text>
      </Box>
    );

  return (
    <VStack flex={1} style={{ backgroundColor: "$backgroundLight0" }}>
      <CameraComp
        style={{ flex: 1 }}
        type={vm.cameraType}
        ref={vm.setCameraRef}
      />

      <VStack style={{ backgroundColor: "$backgroundLight50", padding: 16 }}>
        <Button onPress={vm.capturePhoto} style={{ marginBottom: 8 }}>
          <Text color="white">Capturar Foto</Text>
        </Button>

        <Button onPress={vm.toggleCamera} style={{ borderWidth: 1, borderColor: "$borderColor" }}>
          <Text>Trocar Câmera</Text>
        </Button>
      </VStack>
    </VStack>
  );
}
