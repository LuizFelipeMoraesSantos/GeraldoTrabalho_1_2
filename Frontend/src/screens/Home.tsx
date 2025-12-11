import React from "react";
import { View } from "react-native";
import { Button, Card } from "react-native-paper";
import api from "../services/api";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Edit: { usuario: Usuario };
  BuscarCep: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const [usuarios, setUsuarios] = React.useState<Usuario[]>([]);

  async function carregarUsuarios() {
    try {
      const response = await api.get("/usuarios");
      setUsuarios(response.data);
    } catch (e) {
      // alert("Erro ao carregar usuários");
    }
  }

  React.useEffect(() => {
    carregarUsuarios();
    const unsubscribe = navigation.addListener("focus", carregarUsuarios);
    return unsubscribe;
  }, [navigation]);

  async function deletar(id: number) {
    try {
      await api.delete(`/usuarios/${id}`);
      carregarUsuarios();
    } catch (e) {
      // alert("Erro ao deletar usuário");
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button mode="contained" onPress={() => navigation.navigate("Create")}>
        Novo Usuário
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("BuscarCep")}
        style={{ marginTop: 10 }}
      >
        Tela de Buscar CEP
      </Button>
      {usuarios.map((usuario) => (
        <Card key={usuario.id} style={{ marginTop: 20 }}>
          <Card.Title title={usuario.nome} subtitle={usuario.email} />
          <Card.Actions>
            <Button onPress={() => navigation.navigate("Edit", { usuario })}>
              Editar
            </Button>
            <Button textColor="red" onPress={() => deletar(usuario.id)}>
              Deletar
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
};

export default Home;