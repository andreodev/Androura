import type { Lote } from '@/types/lote';
import { StyleSheet, Text, View } from 'react-native';


interface Registro {
  id: string;
  data: string;
  totalOvos: number;
  mortas: number;
  eliminadas: number;
  racaoKg: number;
}

interface CardsHomeProps {
  registros: Registro[];
  mesSelecionado: number;
  anoSelecionado: number;
  lote: Lote | null;
}

export default function CardsHome({ registros, mesSelecionado, anoSelecionado, lote }: CardsHomeProps) {
  const registrosDoMes = registros.filter(reg => {
    const data = new Date(reg.data);
    return data.getMonth() === mesSelecionado && data.getFullYear() === anoSelecionado;
  });
  
  const totalOvos = registrosDoMes.reduce((acc, r) => acc + r.totalOvos, 0);
  const totalMortas = registrosDoMes.reduce((acc, r) => acc + r.mortas, 0);
  const totalEliminadas = registrosDoMes.reduce((acc, r) => acc + r.eliminadas, 0);
  const totalRacao = registrosDoMes.reduce((acc, r) => acc + r.racaoKg, 0);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Resumo do Mês</Text>

      <Text style={styles.subtitle}>
  {`${new Date(2025, mesSelecionado, 1).toLocaleDateString('pt-BR', { month: 'long' })} / ${anoSelecionado}`}
</Text>

      <View style={styles.cardsContainer}>
        <Card emoji="🐓" label="Galinhas" value={lote ? lote.avesAtuais : 0} color="#E3F2FD" />
        <Card emoji="🥚" label="Total Ovos" value={totalOvos} color="#E3F2FD" />
        <Card emoji="💀" label="Mortas" value={totalMortas} color="#FFEBEE" />
        <Card emoji="🍗" label="Eliminadas" value={totalEliminadas} color="#FFF3E0" />
        <Card emoji="🌾" label="Ração (kg)" value={totalRacao} color="#E8F5E9" />
      </View>
    </View>
  );
}

function Card({ emoji, label, value, color }: { emoji: string; label: string; value: number; color: string }) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5DC',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 4,
    color: '#4E342E',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6D4C41',
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '47%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    color: '#4E342E',
    marginBottom: 4,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#388E3C',
  },
});
