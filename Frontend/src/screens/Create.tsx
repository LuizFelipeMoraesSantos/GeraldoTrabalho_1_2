import * as React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import api from "../services/api";
import { useNavigation } from '@react-navigation/native';

export default function Create() {
  const navigation = useNavigation();
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");

  async function salvar() {
    await api.post("/usuarios", { nome, email });
    navigation.goBack();
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        label="Nome"
        mode="outlined"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={{ marginTop: 20 }}
      />

      <Button
        mode="contained"
        onPress={salvar}
        style={{ marginTop: 20 }}
      >
        Salvar
      </Button>
    </View>
  );
}
