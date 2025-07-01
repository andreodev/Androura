import { useLoteContext } from "@/src/context/LoteContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PerfilScreen() {
  const { lote, loading: loadingLote } = useLoteContext();
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const savedUri = await AsyncStorage.getItem("@foto_fazenda");
      if (savedUri) setImageUri(savedUri);
    })();
  }, []);

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: 'Images' as unknown as ImagePicker.MediaType,
  quality: 0.7,
});

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await AsyncStorage.setItem("@foto_fazenda", uri);
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
  };

  if (loadingLote || !lote) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.rusticText}>Carregando...</Text>
      </View>
    );
  }

  const handleRemoverImagem = async () => {
  Alert.alert(
    'Remover imagem',
    'Tem certeza que deseja remover a imagem da fazenda?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('@foto_fazenda');
          setImageUri(null);
        },
      },
    ]
  );
};
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Olá {lote.proprietario}</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              Toque para adicionar foto
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {imageUri && (
  <TouchableOpacity onPress={handleRemoverImagem}>
    <Text style={{ color: 'red', marginTop: 8, textDecorationLine: 'underline' }}>
      Remover imagem
    </Text>
  </TouchableOpacity>
)}

      <Text style={styles.name}>{lote.proprietario}</Text>
      <Text style={styles.subtitle} numberOfLines={1} adjustsFontSizeToFit>
  Proprietário
</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Fazenda:</Text>
        <Text style={styles.value}>{lote.propriedade}</Text>

        <Text style={styles.label}>Raça:</Text>
        <Text style={styles.value}>{lote.raca}</Text>

        <Text style={styles.label}>Procedência:</Text>
        <Text style={styles.value}>{lote.procedencia}</Text>

        <Text style={styles.label}>Nascimento:</Text>
        <Text style={styles.value}>{formatDate(lote.nascimento)}</Text>

        <Text style={styles.label}>Núcleo:</Text>
        <Text style={styles.value}>{lote.nucleo}</Text>

        <Text style={styles.label}>Galpão:</Text>
        <Text style={styles.value}>{lote.galpao}</Text>

        <Text style={styles.label}>Aves (início do mês):</Text>
        <Text style={styles.value}>{lote.numeroAvesInicioMes}</Text>

        <Text style={styles.label}>Aves atuais:</Text>
        <Text style={styles.value}>{lote.avesAtuais}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FAF3E0", // tom de palha
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rusticText: {
    fontSize: 18,
    fontFamily: "serif",
    color: "#6B4F2B",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4E3620",
    marginBottom: 12,
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#DDD",
    borderColor: "#8B5E3C",
    borderWidth: 2,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B240B",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B4F2B",
    marginBottom: 16,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#FFF9F0",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    borderColor: "#D9C3A2",
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    color: "#6B4F2B",
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: "#4E3620",
    fontWeight: "500",
  },
});
