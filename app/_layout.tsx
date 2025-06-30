import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { LoteProvider } from '@/src/context/LoteContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <LoteProvider>
        <Stack>
          {/* Splash vem primeiro */}
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          
          {/* Tabs com as telas principais */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Página de erro */}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </LoteProvider>
    </ThemeProvider>
  );
}
