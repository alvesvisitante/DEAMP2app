import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleRegister() {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (e) {
      Alert.alert('Erro', e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput style={styles.input} placeholder='E-mail' value={email} onChangeText={setEmail} keyboardType='email-address' />
      <TextInput style={styles.input} placeholder='Senha' secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title='Cadastrar' onPress={handleRegister} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', padding: 20 }, title: { fontSize: 20, fontWeight: '700', marginBottom: 20 }, input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 12, padding: 10 }});
