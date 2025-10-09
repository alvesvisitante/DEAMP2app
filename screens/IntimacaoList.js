import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function IntimacaoList({ navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => load());
    return unsubscribe;
  }, [navigation]);

  async function load() {
    try {
      const snapshot = await getDocs(collection(db, 'intimacoes'));
      const arr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(arr.reverse());
    } catch (e) {
      console.warn(e);
    }
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Detalhes', { intimacao: item })}>
        <Text style={styles.title}>{item.titulo || 'Intimação sem título'}</Text>
        <Text numberOfLines={1}>{item.destinatario || ''}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma intimação encontrada.</Text>
      ) : (
        <FlatList data={items} keyExtractor={(i) => i.id} renderItem={renderItem} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 12 }, item: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }, title: { fontWeight: '700' }});
