// Lucas Randal N°18
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ImageBackground, ScrollView, Alert, Modal, TextInput } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { db } from "../../firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, doc, Timestamp, deleteDoc } from "firebase/firestore";
import { format } from "date-fns";
import { parse } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function ListarJogadores({ navigation }) {
    const redirecionarInicio = () => {
        navigation.navigate('PaginaPrincipal');
    };

    const [jogadores, setJogadores] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modoEdicao, setModalEdicao] = useState(false);
    const [jogadorAtual, setJogadorAtual] = useState(null);
    const [nome, setNome] = useState("");
    const [altura, setAltura] = useState("");
    const [camisa, setCamisa] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [confirmarModalVisible, setConfirmarModalVisible] = useState(false);
    const [jogadorParaExcluir, setJogadorParaExcluir] = useState(null);


    const carregarJogadores = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "real-madrid"));
            const listaJogadores = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setJogadores(listaJogadores);
        } catch (error) {
            console.error("Erro ao listar jogadores:", error);
        }
    };

    useEffect(() => {
        carregarJogadores();
    }, []);

    const modalAdicionarJogadores = () => {
        setModalEdicao(false);
        setNome("");
        setAltura("");
        setCamisa("");
        setNascimento("");
        setModalVisible(true);
    };

    const editarJogador = (jogador) => {
        setModalEdicao(true);
        setJogadorAtual(jogador);
        setNome(jogador.nome);
        setAltura(String(jogador.altura));
        setCamisa(jogador.camisa);
        setNascimento(format(jogador.nascimento.toDate(), "dd/MM/yyyy"));
        setModalVisible(true);
    };

    const addJogador = async () => {
        if (!nome || !altura || !camisa || !nascimento) {
            Alert.alert("Erro", "Por favor preencha todos os campos.");
            return;
        }
        try {
            const jogadoresCollection = collection(db, "real-madrid");

            const nascimentoDate = parse(nascimento, "dd/MM/yyyy", new Date());
            const nascimentoTimestamp = Timestamp.fromDate(nascimentoDate);


            await addDoc(jogadoresCollection, {
                nome,
                altura: parseFloat(altura),
                camisa,
                nascimento: nascimentoTimestamp,
            });

            await carregarJogadores();

            Alert.alert("Sucesso!", "Jogador adicionado com sucesso");
            setModalVisible(false);
            setNome("");
            setAltura("");
            setCamisa("");
            setNascimento("");
        } catch (error) {
            console.error("Erro ao adicionar jogador!", error);
            Alert.alert("Erro", "Houve um erro ao adicionar um jogador.");
        }
    };

    const salvarJogador = async () => {
        if (!nome || !altura || !camisa || !nascimento) {
            Alert.alert("Erro", "Por favor preencha todos os campos.");
            return;
        }

        try {

            if (!jogadorAtual || !jogadorAtual.id) {
                console.error("Jogador atual inválido:", jogadorAtual);
                Alert.alert("Erro", "Jogador inválido.");
                return;
            }

            const jogadorRef = doc(db, "real-madrid", jogadorAtual.id);
            console.log("Referência do jogador:", jogadorRef.path);

            const nascimentoDate = parse(nascimento, "dd/MM/yyyy", new Date());
            const nascimentoTimestamp = Timestamp.fromDate(nascimentoDate);


            const dadosAtualizados = {
                nome,
                altura: parseFloat(altura),
                camisa,
                nascimento: nascimentoTimestamp,
            };

            console.log("Enviando para updateDoc:", dadosAtualizados);

            await updateDoc(jogadorRef, dadosAtualizados);

            console.log("Update feito com sucesso.");

            await carregarJogadores();
            Alert.alert("Sucesso", "Jogador editado com sucesso!");
            setModalVisible(false);
            setModalEdicao(false);
            setJogadorAtual(null);

        } catch (error) {
            console.error("Erro ao salvar jogador:", error);
            Alert.alert("Erro", "Houve um erro ao salvar o jogador.");
        }
    };

    const deletarJogador = (id) => {
        setJogadorParaExcluir(id);
        setConfirmarModalVisible(true);
    };



    const confirmarExclusao = async () => {
        try {
            const jogadorRef = doc(db, "real-madrid", jogadorParaExcluir);
            await deleteDoc(jogadorRef);
            await carregarJogadores();
            setConfirmarModalVisible(false);
            Alert.alert("Sucesso", "Jogador excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir jogador:", error);
            Alert.alert("Erro", "Não foi possível excluir o jogador.");
        }
    };





    return (
        <ImageBackground source={require('../assets/fundo.jpg')} style={styles.background}>
            <Modal
                visible={confirmarModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setConfirmarModalVisible(false)}
            >
                <View style={styles.modalContainer2}>
                    <View style={styles.viewModal2}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Confirmar Exclusão</Text>
                        <Text style={{ marginBottom: 20 }}>Tem certeza que deseja excluir este jogador?</Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Pressable
                                onPress={() => setConfirmarModalVisible(false)}
                                style={styles.botaoCancelar2}
                            >
                                <Text style={styles.textoCancelar2}>Cancelar</Text>
                            </Pressable>

                            <Pressable
                                onPress={confirmarExclusao}
                                style={styles.botaoExcluir}
                            >
                                <Text style={styles.textoExcluir}>Excluir</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <ScrollView style={styles.container}>
                <View style={styles.barraSuperior}>
                    <Pressable style={styles.voltarBotao} onPress={redirecionarInicio}>
                        <Text style={styles.voltarTexto}>Voltar</Text>
                    </Pressable>

                    <Text style={styles.titulo}>Lista de jogadores</Text>
                </View>

                <View style={styles.viewBotaoAddJogadores}>
                    <Pressable style={styles.botaoAddJogador} onPress={modalAdicionarJogadores}>
                        <Text style={styles.textoViewBotaoAddJogador}>Adicionar Jogadores</Text>
                    </Pressable>
                </View>

                <Modal visible={modalVisible} animationType="slide">
                    <View style={styles.modalContainer}>
                        <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
                        <TextInput placeholder="Altura" value={altura} onChangeText={setAltura} style={styles.input} />
                        <TextInput placeholder="Número da Camisa" value={camisa} onChangeText={setCamisa} style={styles.input} />
                        <TextInput placeholder="Nascimento (dd/mm/yyyy)" value={nascimento} onChangeText={setNascimento} style={styles.input} />

                        <Pressable onPress={modoEdicao ? salvarJogador : addJogador} style={styles.botaoAddJogadorModal}>
                            <Text style={styles.textoBotaoAddJogadorModal}>
                                {modoEdicao ? "Salvar Alterações" : "Salvar Jogador"}
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)} style={styles.botaoCancelar}>
                            <Text style={styles.textoCancelar}>Cancelar</Text>
                        </Pressable>
                    </View>
                </Modal>

                <FlashList
                    extraData={jogadores}
                    data={jogadores}
                    style={styles.FlashList}
                    keyExtractor={(item) => item.id}
                    estimatedItemSize={50}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.titulo2}>Nome:</Text>
                            <Text style={styles.infos}>{item.nome}</Text>

                            <Text style={styles.titulo2}>Altura:</Text>
                            <Text style={styles.infos}>{item.altura}</Text>

                            <Text style={styles.titulo2}>Camisa:</Text>
                            <Text style={styles.infos}>{item.camisa}</Text>

                            <Text style={styles.titulo2}>Nascimento:</Text>
                            <Text style={styles.nascimento}>
                                {item.nascimento ? format(item.nascimento.toDate(), "dd/MM/yyyy") : "Data inválida"}
                            </Text>

                            <View style={styles.icons}>
                                <Pressable onPress={() => editarJogador(item)}>
                                    <FontAwesomeIcon icon={faPenToSquare} size={24} color="#000" />
                                </Pressable>

                                <Pressable onPress={() => deletarJogador(item.id)}>
                                    <FontAwesomeIcon icon={faTrash} size={24} color="#000" />
                                </Pressable>

                            </View>
                        </View>
                    )}
                />
            </ScrollView>
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
        marginTop: 15,
        color: 'black',
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
    },
    voltarTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    item: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginVertical: 8,
        elevation: 2,
        color: '#000',
    },
    titulo2: {
        fontSize: 18,
        fontWeight: "bold",
    },
    infos: {
        fontSize: 14,
        color: "#000",
        marginBottom: 5,
    },
    icons: {
        position: 'absolute',
        flexDirection: 'row',
        display: 'flex',
        left: '75%',
        gap: 15,
    },
    botaoAddJogador: {
        backgroundColor: "red",
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
        color: '#fff',
        textAlign: 'center',
        width: "60%",
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        fontFamily: 'Helvetica',
        shadowColor: "#fff",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
    },
    textoViewBotaoAddJogador: {
        fontFamily: 'Helvetica',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    botaoAddJogadorModal: {
        backgroundColor: "red",
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
        width: "60%",
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
    },
    textoBotaoAddJogadorModal: {
        fontFamily: 'Helvetica',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    botaoCancelar: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
        width: "60%",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
    },
    textoCancelar: {
        color: "#000",
        fontWeight: "bold",
    },
    botaoCancelar2: {
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 8,
        minWidth: 80,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
    },
    textoCancelar2: {
        fontWeight: 'bold',
    },
    viewBotaoAddJogadores: {
        alignItems: 'center',
        display: 'flex',
        marginBottom: 20,
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        width: 300,
    },
    botaoExcluir: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 8,
        minWidth: 80,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
    },
    textoExcluir: {
        color: '#fff',
        fontWeight: 'bold'
    },
    modalContainer2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    viewModal2: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center'
    },
});