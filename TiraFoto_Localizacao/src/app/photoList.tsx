import { ScrollView, Image } from "react-native";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { useCameraViewModel } from "../viewModel/useCameraViewModel";

export default function PhotoList() {
  const vm = useCameraViewModel();

  return (
    <ScrollView>
      <VStack style={{ padding: 16 }}>
        {vm.photos.map((p) => (
          <Box
            key={p.id}
            style={{
              padding: 12,
              borderRadius: 10,
              backgroundColor: "#F7F7F7", 
              borderWidth: 1,
              borderColor: "#E5E5E5" 
            }}
          >
            <Image
              source={{ uri: p.uri }}
              style={{ width: "100%", height: 220, borderRadius: 10 }}
            />
            <Text style={{ marginTop: 8 }}>Latitude: {p.latitude}</Text>
            <Text>Longitude: {p.longitude}</Text>
            <Text style={{ marginTop: 4, color: "#6B7280" }}>
              {new Date(p.createdAt).toLocaleString()}
            </Text>
          </Box>
        ))}
      </VStack>
    </ScrollView>
  );
}
