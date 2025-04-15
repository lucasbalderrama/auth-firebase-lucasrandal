// Lucas Randal N°18
import React, { useEffect, useState, useRef } from "react";
import { Pressable, View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Video } from "expo-av";
import s3 from "../../awsConfig";

import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function ListarVideo({ navigation }) {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const bucketName = "bucket-storage-senai-18";

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await s3
        .listObjectsV2({
          Bucket: bucketName,
          Prefix: "videos/",
          Delimiter: "/",
        })
        .promise();

      const folders = response.CommonPrefixes?.map((prefix) => {
        return prefix.Prefix.replace("videos/", "").replace("/", "");
      }) || [];

      setCategories(folders);

      if (folders.length > 0) {
        setCategory(folders[0]);
      }
    } catch (error) {
      console.error("Erro ao carregar categorias: ", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchVideos = async () => {
    if (!category) return;

    setLoading(true);
    const prefix = `videos/${category}/`;

    try {
      const response = await s3
        .listObjectsV2({
          Bucket: bucketName,
          Prefix: prefix,
        })
        .promise();

      const videoFiles = response.Contents?.filter(
        (file) => file.Size > 0 && !file.Key.endsWith("/")
      );

      const videoUrls = videoFiles?.map((file) => ({
        key: file.Key,
        name: file.Key.split("/").pop(),
        url: `https://${bucketName}.s3.amazonaws.com/${encodeURI(file.Key)}`,
      })) || [];

      setVideos(videoUrls);
    } catch (error) {
      console.error("Erro ao carregar vídeos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (category) {
      fetchVideos();
    }
  }, [category]);

  const videoRef = useRef(null);

  const redirecionarInicio = () => {
    navigation.navigate("PaginaPrincipal");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.barraSuperior}>
        <Pressable style={styles.voltarBotao} onPress={redirecionarInicio}>
          <Text style={styles.voltarTexto}>Voltar</Text>
        </Pressable>
        <Text style={styles.titulo}>Lista de Vídeos</Text>
      </View>

      {loadingCategories ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 30 }} />
      ) : (
        <>
          <Picker
            selectedValue={category}
            style={styles.picker2}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            {categories.map((cat, index) => (
              <Picker.Item label={cat} value={cat} key={index} />
            ))}
          </Picker>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 30 }} />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {videos.length === 0 ? (
                <Text style={{ marginTop: 20 }}>Nenhum vídeo encontrado.</Text>
              ) : (
                videos.map((video, index) => (
                  <View key={index} style={styles.videoWrapper}>
                    <Video
                      ref={videoRef}
                      source={{ uri: video.url }}
                      style={styles.video}
                      useNativeControls
                      resizeMode="contain"
                      shouldPlay={false}
                      isLooping={false}
                    />
                    <Text style={styles.videoName}>{video.name}</Text>
                  </View>
                ))
              )}
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  barraSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginRight: 5,
    marginTop: 15,
    color: 'black',
  },
  picker2: {
    marginHorizontal: 10,
    marginBottom: 10,
    height: 100,
    fontSize: 15,
    paddingLeft: 10,
    shadowColor: "#C1C1C1",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.8,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  videoWrapper: {
    marginBottom: 20,
    alignItems: "center",
  },
  video: {
    width: screenWidth - 20,
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: 'hidden',
  },
  videoName: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
});