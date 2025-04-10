// Lucas Randal N°18
import React from 'react';
import { StyleSheet, Text, Pressable, ScrollView, Image, View } from 'react-native';

export default function SobreNos() {
    const redirecionarInicio = () => {
        navigation.navigate('PaginaPrincipal');
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.barraTopo}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logo-realmadrid.png')}
                />

                <Pressable style={styles.voltarBotao} onPress={redirecionarInicio}>
                    <Text style={styles.voltarTexto}>Voltar</Text>
                </Pressable>
            </View>
            <Image
                style={styles.fotoEmpresa}
                source={require('../assets/real-madrid-banner.jpg')}
            />
            <Text style={styles.titulo}>Real Madrid: Seu Guia Completo!</Text>
            <Text style={styles.subTitulo}>Explore as informações sobre os jogadores, personalize seu perfil e utilize ferramentas úteis no seu dia a dia!</Text>

            <View style={styles.viewConteudo}>
                <Text style={styles.conteudo}>
                    {`Descubra tudo sobre os jogadores do Real Madrid, gerencie seu perfil e aproveite funcionalidades extras como o cálculo de IMC e a troca de tema do app.
\n`}
                </Text>

                <Text style={[styles.conteudo, styles.subTitulo2]}>👥 Lista de Jogadores</Text>
                <Text style={styles.conteudo}>
                    {`Confira informações detalhadas sobre cada jogador do elenco, incluindo altura, peso e data de nascimento.
\n`}
                </Text>

                <Text style={[styles.conteudo, styles.subTitulo2]}>👤 Editar Perfil</Text>
                <Text style={styles.conteudo}>
                    {`Personalize seu perfil no app, alterando seu nome, foto e outras informações de cadastro.
\n`}
                </Text>

                <Text style={[styles.conteudo, styles.subTitulo2]}>⚖️ Cálculo de IMC</Text>
                <Text style={styles.conteudo}>
                    {`Calcule seu Índice de Massa Corporal (IMC) de forma rápida e prática, com base no seu peso e altura.
\n`}
                </Text>

                <Text style={[styles.conteudo, styles.subTitulo2]}>💡 Alternar Tema</Text>
                <Text style={styles.conteudo}>
                    {`Clique na lâmpada para alternar entre os modos claro e escuro, deixando o app do jeito que você prefere.
\n`}
                </Text>
            </View>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    barraTopo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'red',
    },
    fotoEmpresa: {
        width: 340,
        height: 200,
        marginBottom: 20,
        marginLeft: 4,
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
    subTitulo: {
        fontSize: 18,
        marginBottom: 30,
        color: '#494949',
    },
    viewConteudo: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    conteudo: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        color: '#000',
        fontWeight: 'medium',
    },
    subTitulo2: {
        fontWeight: 'bold',
        color: 'red',
    },
});