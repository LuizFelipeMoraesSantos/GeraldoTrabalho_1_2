import * as React from "react";
import { ScrollView, View, Text } from "react-native";
import axios from "axios";

export default function BuscarCep() {
  const [cep, setCep] = React.useState("");
  const [logradouro, setLogradouro] = React.useState("");
  const [bairro, setBairro] = React.useState("");
  const [localidade, setLocalidade] = React.useState("");
  const [uf, setUf] = React.useState("");

  async function buscarCep() {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setLocalidade(response.data.localidade);
      setUf(response.data.uf);
    } catch (e) {
      alert("Erro ao buscar cep");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <TextInput label="CEP" mode="outlined" value={cep} onChangeText={setCep} style={{ flex: 1, marginRight: 10 }} />
        <Button mode="contained" onPress={buscarCep}>Buscar</Button>
      </View>

      <TextInput label="Logradouro" mode="outlined" value={logradouro} style={styles.input} />
      <TextInput label="Bairro" mode="outlined" value={bairro} style={styles.input} />
      <TextInput label="Localidade" mode="outlined" value={localidade} style={styles.input} />
      <TextInput label="UF" mode="outlined" value={uf} style={{ width: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  row: { flexDirection: "row", marginBottom: 20 },
  input: { marginBottom: 20 },
});
