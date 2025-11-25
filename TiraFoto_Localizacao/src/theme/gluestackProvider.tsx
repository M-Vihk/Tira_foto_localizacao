import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

export const Provider = ({ children }: any) => {
  return <GluestackUIProvider config={config}>{children}</GluestackUIProvider>;
};
