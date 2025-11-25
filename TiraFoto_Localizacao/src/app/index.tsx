import { GluestackUIProvider } from "@gluestack-ui/themed";

const config = {
  tokens: {},
  components: {},
} as any;

export const Provider = ({ children }: any) => {
  return <GluestackUIProvider config={config}>{children}</GluestackUIProvider>;
};
import { Button, Box, Text, VStack } from "@gluestack-ui/themed";
import { router } from "expo-router";

export default function Index() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" backgroundColor="$backgroundLight0">
      <VStack {...({ space: "lg" } as any)}>
        <Text fontSize={24} fontWeight="bold">
          Aplicativo de Fotos + Localização
        </Text>

        <Button onPress={() => router.push("/camera-preview")}>
          <Text color="white">Abrir Câmera</Text>
        </Button>

        <Button onPress={() => router.push("/photo-list")}>
          <Text>Ver Lista de Fotos</Text>
        </Button>
      </VStack>
    </Box>
  );
}
