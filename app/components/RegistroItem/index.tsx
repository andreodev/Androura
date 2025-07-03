import { Trash2 } from 'lucide-react-native';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { Registro } from '@/types/registro';

type RegistroItemProps = {
  registro: Registro;
  onExcluir: (id: string) => void;
};

export default function RegistroItem({ registro, onExcluir }: RegistroItemProps) {
  const confirmarExclusao = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setTimeout(() => onExcluir(id), 100);
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.card, { backgroundColor: '#FFF3E0', position: 'relative' }]}>
      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => confirmarExclusao(registro.id)}
      >
        <Trash2 size={22} color="#D32F2F" />
      </TouchableOpacity>

      <Text style={[styles.title, { color: '#FB8C00' }]}>
        📅 {new Date(registro.data).toLocaleDateString()}
      </Text>
      <Text style={styles.label}>
        🥚 Ovos: <Text style={styles.value}>{registro.totalOvos}</Text>
      </Text>
      <Text style={styles.label}>
        💀 Mortas: <Text style={styles.value}>{registro.mortas}</Text>
      </Text>
      <Text style={styles.label}>
        🌽 Ração: <Text style={styles.value}>{registro.racaoKg} kg</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF8DC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  label: { fontSize: 14, color: '#4E342E', marginTop: 4, fontWeight: '500' },
  value: { fontWeight: 'bold', color: '#388E3C' },
});
