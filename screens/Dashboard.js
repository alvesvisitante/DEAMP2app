import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';

export default function Dashboard({ navigation }) {
  const [count, setCount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => { if (isFocused) loadCount(); }, [isFocused]);

  async function loadCount() {
    try {
      const snapshot = await getDocs(collection(db, 'intimacoes'));
      setCount(snapshot.size);
    } catch (e) {
      console.warn(e);
    }
  }

  function logout() { signOut(auth); }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Sistema DEAM - Pedro II</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Intimações armazenadas</Text>
        <Text style={styles.large}>{count}</Text>
      </View>
      <View style={styles.buttons}>
        <Button title='Ver Intimações' onPress={() => navigation.navigate('Intimacoes')} />
        <Button title='Nova Intimação' onPress={() => navigation.navigate('Nova Intimacao')} />
      </View>
      <View style={{ marginTop: 30 }}>
        <Button title='Sair' color='red' onPress={logout} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({ container: { padding: 20 }, title: { fontSize: 20, fontWeight: '700', marginBottom: 12 }, card: { padding: 16, borderRadius: 8, backgroundColor: '#f2f2f2', marginBottom: 12 }, cardTitle: { fontSize: 16 }, large: { fontSize: 36, fontWeight: '700', marginTop: 8 }, buttons: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 }});
