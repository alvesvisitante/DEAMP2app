import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function IntimacaoForm({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [descricao, setDescricao] = useState('');

  async function save() {
    if (!destinatario) {
      Alert.alert('Erro', 'Preencha o destinatário');
      return;
    }
    try {
      await addDoc(collection(db, 'intimacoes'), {
        titulo,
        destinatario,
        descricao,
        criadoEm: Timestamp.now(),
      });
      navigation.navigate('Intimacoes');
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Título" />
      <Text style={styles.label}>Destinatário</Text>
      <TextInput style={styles.input} value={destinatario} onChangeText={setDestinatario} placeholder="Nome" />
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 120 }]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição"
        multiline
      />
      <Button title="Salvar Intimação" onPress={save} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: '600', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginTop: 6 }
});
