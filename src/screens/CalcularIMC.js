// Lucas Randal N°18
import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, TextInput, Image } from 'react-native';

export default function IMCCalculadora() {
    const redirecionarInicio = () => {
        navigation.navigate('PaginaPrincipal');
    };
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(null);

    const calcularImc = () => {
        if (peso && altura) {
            const alturaMetros = parseFloat(altura) / 100;
            const resultado = parseFloat(peso) / (alturaMetros * alturaMetros);
            setImc(resultado.toFixed(2));
        } else {
            alert('Preencha todos os campos');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.barraSuperior}>
                <Pressable style={styles.voltarBotao} onPress={redirecionarInicio}>
                    <Text style={styles.voltarTexto}>Voltar</Text>
                </Pressable>
                <Text style={styles.titulo}>Calcular IMC</Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Peso (kg)"
                    value={peso}
                    onChangeText={setPeso}
                />

                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Altura (cm)"
                    value={altura}
                    onChangeText={setAltura}
                />

                <Pressable style={styles.calcularBotao} onPress={calcularImc}>
                    <Text style={styles.calcularTexto}>Calcular</Text>
                </Pressable>

                <Text style={styles.resultado}>Resultado: {imc ? `IMC: ${imc}` : ''}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
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
        color: 'black',
    },
    voltarBotao: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
    },
    voltarTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    form: {
        marginTop: 300,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    calcularBotao: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
    },
    calcularTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    resultadoTexto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        marginTop: 10,
    },
    resultado: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 50,
    },
});
