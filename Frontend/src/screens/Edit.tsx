import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type Usuario = {
  id: string;
  nome: string;
  email: string;
};

type RootStackParamList = {
  Edit: { usuario: Usuario };
  // ... outras rotas
};

type Props = StackScreenProps<RootStackParamList, 'Edit'>;

export default function Edit({ route, navigation }: Props) {
  const { usuario } = route.params;
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);

  const handleSalvar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Salvar" onPress={handleSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: 'bold', marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
  },
});