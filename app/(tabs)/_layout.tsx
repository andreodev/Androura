import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLoteContext } from '@/src/context/LoteContext';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { Home, PencilLine, User } from 'lucide-react-native';

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
          title: 'Início',
          headerTitle: nomeFazenda,
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          headerTitle: `Olá ${lote?.proprietario}`,
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cadastro"
        options={{
          title: 'Registro diário',
          headerTitle: 'Novo Registro',
          tabBarIcon: ({ color }) => <PencilLine size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
