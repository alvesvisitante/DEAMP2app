import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('samuel');
  const [senha, setSenha] = useState('1234');

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (e) {
      Alert.alert('Erro', e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login - Sistema DEAM</Text>
      <TextInput style={styles.input} placeholder='E-mail' value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder='Senha' secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title='Entrar' onPress={handleLogin} />
      <Text style={{ marginTop: 16 }}>
        Não tem conta? <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Registrar')}>Cadastre-se</Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', padding: 20 }, title: { fontSize: 20, fontWeight: '700', marginBottom: 20 }, input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 12, padding: 10 }});
