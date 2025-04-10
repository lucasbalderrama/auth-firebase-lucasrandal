// Lucas Randal N°18
import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, Pressable } from 'react-native';

export default function EditarPerfil() {
    const redirecionarInicio = () => {
        navigation.navigate('PaginaPrincipal');
    };
    return (
        <View style={styles.container}>
            <View style={styles.barraTopo}>
                <Pressable style={styles.voltarBotao} onPress={redirecionarInicio}>
                    <Text style={styles.voltarTexto}>Voltar</Text>
                </Pressable>
            </View>
            <Text style={styles.titulo}>Suas informações:</Text>

            <Image
                source={require('../assets//lucas.jpg')}
                style={styles.avatar}
            />

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value="Admin"
                editable={false}
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                value="admin@email.com"
                editable={false}
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInput
                style={styles.input}
                value="(12) 99567-2395"
                editable={false}
            />

            <Text style={styles.label}>Cidade</Text>
            <TextInput
                style={styles.input}
                value="São Paulo, SP"
                editable={false}
            />

            <Image
                style={styles.logo}
                source={require('../assets/logo-realmadrid.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 80,
        marginBottom: 20,
        marginTop: 60,
        borderWidth: 3,
        borderColor: 'red',
    },
    barraTopo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 10,
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
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 30,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 20,
        marginTop: 30,
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
        textAlign: 'center',
        fontSize: 16,
    },
});