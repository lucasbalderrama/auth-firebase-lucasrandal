// Lucas Randal N°18
import 'react-native-gesture-handler';
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
import ListarImagens from './src/screens/ListarImagens.js';
import UploadImagens from './src/screens/UploadImagens.js';
import ListarVideo from './src/screens/ListarVideo.js';
import UploadVideos from './src/screens/UploadVideos.js';
import AdicionarUsuario from './src/screens/AdicionarUsuario.js';
import EditarUsuario from './src/screens/EditarUsuario.js';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="PaginaPrincipal" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={RealizarLogin} />
      <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
      <Stack.Screen name="SobreNos" component={SobreNos} />
      <Stack.Screen name="ListarJogadores" component={ListarJogadores} />
      <Stack.Screen name="Lampada" component={Lampada} />
      <Stack.Screen name="CalcularIMC" component={CalcularIMC} />
      <Stack.Screen name="ListarImagens" component={ListarImagens} />
      <Stack.Screen name="UploadImagens" component={UploadImagens} />
      <Stack.Screen name="ListarVideo" component={ListarVideo} />
      <Stack.Screen name="UploadVideos" component={UploadVideos} />
      <Stack.Screen name="AdicionarUsuario" component={AdicionarUsuario} />
      <Stack.Screen name="EditarUsuario" component={EditarUsuario} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
