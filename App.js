// Lucas Randal N°18
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RealizarLogin from './src/screens/RealizarLogin.js';
import PaginaPrincipal from './src/screens/PaginaPrincipal.js';
import EditarPerfil from './src/screens/EditarPerfil.js';
import SobreNos from './src/screens/SobreNos.js';
import ListarJogadores from './src/screens/ListarJogadores.js';
import Lampada from './src/screens/Lampada.js';
import CalcularIMC from './src/screens/CalcularIMC.js';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="ListarJogadores" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={RealizarLogin} />
      <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
      <Stack.Screen name="SobreNos" component={SobreNos} />
      <Stack.Screen name="ListarJogadores" component={ListarJogadores} />
      <Stack.Screen name="Lampada" component={Lampada} />
      <Stack.Screen name="CalcularIMC" component={CalcularIMC} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
