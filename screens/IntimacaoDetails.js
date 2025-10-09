import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function IntimacaoDetails({ route, navigation }) {
  const { intimacao } = route.params;

  async function remove() {
    try {
      await deleteDoc(doc(db, 'intimacoes', intimacao.id));
      navigation.navigate('Intimacoes');
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{intimacao.titulo}</Text>
      <Text style={styles.meta}>Destinatário: {intimacao.destinatario}</Text>
      <Text style={{ marginTop: 12 }}>{intimacao.descricao}</Text>
      <View style={{ marginTop: 20 }}>
        <Button
          title="Remover"
          onPress={() =>
            Alert.alert('Confirmar', 'Remover esta intimação?', [
              { text: 'Cancelar' },
              { text: 'Remover', onPress: remove },
            ])
          }
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  meta: { marginTop: 8, color: '#444' },
});
