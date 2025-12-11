import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home";
import Create from "./src/screens/Create";

import BuscarCep from "./src/screens/BuscarCep";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ title: "Usuários" }} />
          <Stack.Screen name="Create" component={Create} options={{ title: "Novo Usuário" }} />
          <Stack.Screen name="BuscarCep" component={BuscarCep} options={{ title: "Buscar CEP" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
