import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    ActivityIndicator,
    Pressable
} from "react-native";
import s3 from '../../awsConfig';

const BUCKET_NAME = "bucket-storage-senai-18";
const FOLDER = "imagens/";

export default function ListarImagens({ navigation }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await s3
                    .listObjectsV2({ Bucket: BUCKET_NAME, Prefix: FOLDER })
                    .promise();

                const imageFiles = response.Contents.filter((file) =>
                    file.Key.match(/\.(jpg|jpeg|png)$/)
                );

                const imageURLs = imageFiles.map((file) => ({
                    name: file.Key.split("/").pop(),
                    url: `https://${BUCKET_NAME}.s3.amazonaws.com/${file.Key}`,
                }));

                setImages(imageURLs);
            } catch (error) {
                console.error("Erro ao listar imagens:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const fetchImages = async () => {
                try {
                    const response = await s3
                        .listObjectsV2({ Bucket: BUCKET_NAME, Prefix: FOLDER })
                        .promise();

                    const imageFiles = response.Contents.filter((file) =>
                        file.Key.match(/\.(jpg|jpeg|png)$/)
                    );

                    const imageURLs = imageFiles.map((file) => ({
                        name: file.Key.split("/").pop(),
                        url: `https://${BUCKET_NAME}.s3.amazonaws.com/${file.Key}`,
                    }));

                    setImages(imageURLs);
                } catch (error) {
                    console.error("Erro ao listar imagens:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchImages();
        }, [])
    );


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

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 30 }} />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {images.length === 0 ? (
                        <Text style={{ marginTop: 20 }}>Nenhuma imagem encontrada.</Text>
                    ) : (
                        images.map((img, index) => (
                            <View key={index} style={styles.imageWrapper}>
                                <Image source={{ uri: img.url }} style={styles.image} />
                                <Text style={styles.imageName}>{img.name}</Text>
                            </View>
                        ))
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    barraTopo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
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
    scrollContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    imageWrapper: {
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    imageName: {
        marginTop: 8,
        fontSize: 14,
        color: '#333',
    },
});
