import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function SplashScreen() {
  const router = useRouter();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [animating, setAnimating] = useState(false);

  const handlePress = () => {
    if (animating) return;
    setAnimating(true);

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      router.replace('/home');
    });
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {!animating ? (
        <Text style={styles.title}>🐓Androura</Text> // Estático
      ) : (
        <Animated.Text style={[styles.title]}>
          🐓Androura
        </Animated.Text>
      )}

      <Text style={styles.subtitle}>
        Gerenciando sua granja com carinho e tecnologia 🌾
      </Text>

      <Pressable onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Começar</Text>
      </Pressable>

      {animating && (
  <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 30 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginTop: 12,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#81C784',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
