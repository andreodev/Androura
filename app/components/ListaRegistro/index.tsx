import React from 'react';
import { Button, SectionList, StyleSheet, Text, View } from 'react-native';
import Loading from '../../../components/Loading';
import type { Registro } from '../../../types/registro';
import FiltroData from '../FiltroData';
import RegistroItem from '../RegistroItem';
import CardsHome from '../cards';

type ListaRegistrosProps = {
  registros: Registro[];
  onExcluir: (id: string) => void;
  mesSelecionado: number;
  anoSelecionado: number;
  onChangeData: (mes: number, ano: number) => void;
  onAtualizar: () => void;
  nomeProprietario: string;
  loading: boolean;
  erro?: string;
};

export default function ListaRegistros({
  registros,
  onExcluir,
  mesSelecionado,
  anoSelecionado,
  onChangeData,
  onAtualizar,
  nomeProprietario,
  loading,
  erro,
}: ListaRegistrosProps) {
  if (loading) return <Loading />;
  if (erro) return <Text style={{ color: 'red', padding: 20 }}>{erro}</Text>;

  return (
    <View style={styles.container}>
      <SectionList
        sections={[{ title: 'Registros', data: registros }]}
        keyExtractor={(item, index) => item.id + '-' + index}
        renderItem={({ item }) => <RegistroItem registro={item} onExcluir={onExcluir} />}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        ListHeaderComponent={
          <View>
            <Text style={styles.sectionHeader}>🌾 Bem-vindo {nomeProprietario}</Text>

            <FiltroData
              mesSelecionado={mesSelecionado}
              anoSelecionado={anoSelecionado}
              onChange={onChangeData}
            />

            <View style={styles.button}>
              <Button
                title="🚜 Atualizar Registros"
                onPress={onAtualizar}
                color="#388E3C"
              />
            </View>

            <CardsHome
              registros={registros}
              mesSelecionado={mesSelecionado}
              anoSelecionado={anoSelecionado}
            />

            <Text style={[styles.sectionHeader, { marginTop: 16 }]}>📅 Registros Diários</Text>

            {registros.length === 0 && (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>
                Nenhum registro encontrado.
              </Text>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5DC' },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  button: {
    marginVertical: 10,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
