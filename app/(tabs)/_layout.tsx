import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLoteContext } from '@/src/context/LoteContext';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { lote, loading } = useLoteContext();

  const nomeFazenda = loading ? 'Carregando...' : lote?.propriedade ?? 'Fazenda';

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: { position: 'absolute' },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Inicio',
            headerTitle: `${nomeFazenda}`,
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        {/* outras abas */}
      </Tabs>
  );
}