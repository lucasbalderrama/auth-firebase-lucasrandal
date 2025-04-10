// Lucas Randal N°18
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ImageBackground} from 'react-native';

export default function PaginaPrincipal({ navigation }) {
    const redirecionarLogout = () => {
        navigation.navigate('Login');
    };

    const redirecionarEditarPerfil = () => {
        navigation.navigate('EditarPerfil');
    };
    const redirecionarSobreNos = () => {
        navigation.navigate('SobreNos');
    };
    const redirecionarListarJogadores = () => {
        navigation.navigate('ListarJogadores');
    };
    const redirecionarLampada = () => {
        navigation.navigate('Lampada');
    };
    const redirecionarCalcularIMC = () => {
        navigation.navigate('CalcularIMC');
    };

    return (
        <ImageBackground source={require('../assets/background2.jpg')} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.barraSuperior}>
                    <Pressable style={styles.logoutBotao} onPress={redirecionarLogout}>
                        <Text style={styles.logoutTexto}>Logout</Text>
                    </Pressable>
                    <Text style={styles.titulo}>Página Principal</Text>
                </View>

                <View style={styles.atalhosCentralizados}>
                    <Pressable style={styles.atalho} onPress={redirecionarEditarPerfil}>Editar Perfil</Pressable>
                    <Pressable style={styles.atalho} onPress={redirecionarSobreNos}>Sobre Nós</Pressable>
                    <Pressable style={styles.atalho} onPress={redirecionarListarJogadores}>Listar Jogadores</Pressable>
                    <Pressable style={styles.atalho} onPress={redirecionarLampada}>Lâmpada</Pressable>
                    <Pressable style={styles.atalho} onPress={redirecionarCalcularIMC}>Calcular IMC</Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    barraSuperior: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        marginRight: 5,
        marginTop: 5,
    },
    logoutBotao: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: 100,
        shadowColor: "#fff",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
    },
    logoutTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    atalho: {
        backgroundColor: "red",
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
        color: '#fff',
        textAlign: 'center',
        width: "50%",
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        fontFamily: 'Helvetica',
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
    },
    atalhosCentralizados: {
        alignItems: 'center',
        display: 'flex',
        flex: '1',
        justifyContent: 'center',
    }
});

