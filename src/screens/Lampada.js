// Lucas Randal N°18
import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useState } from 'react';

export default function Lampada() {
    const redirecionarInicio = () => {
        navigation.navigate('PaginaPrincipal');
    };
    const [acesa, setAcesa] = useState(false);

    return (
        <View style={[styles.container, { backgroundColor: acesa ? '#fff' : '#000' }]}>
            <View style={styles.barraTopo}>
                <Pressable style={styles.voltarBotao} onPress={redirecionarInicio}>
                    <Text style={styles.voltarTexto}>Voltar</Text>
                </Pressable>
            </View>
            <Image
                source={acesa ? require('../../src/assets/lampada-acesa.png') : require('../../src/assets/lampada-apagada.png')}
                style={styles.imagem}
            />

            <Pressable style={styles.botaoAcender} onPress={() => setAcesa(!acesa)}>
                <Text style={styles.textoBotao}>
                    {acesa ? 'Apagar' : 'Acender'}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagem: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    botaoAcender: {
        backgroundColor: '#FFD700',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "orange",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
    },
    voltarBotao: {
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
        marginBottom: 200,
    },
    voltarTexto: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    barraTopo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});