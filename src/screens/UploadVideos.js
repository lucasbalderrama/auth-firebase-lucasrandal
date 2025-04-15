import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  TextInput,
  Modal,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import s3 from "../../awsConfig";

const S3_BUCKET = "bucket-storage-senai-18";

export default function UploadVideo({ navigation }) {
  const [video, setVideo] = useState(null);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/*",
        copyToCacheDirectory: true,
      });

      const asset =
        result.assets && result.assets.length > 0 ? result.assets[0] : result;

      if (asset && asset.uri) {
        setVideo({
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType || "video/mp4",
        });
        setModalVisible(true); // Abrir modal para inserir categoria
      } else {
        Alert.alert("Erro", "Nenhum vídeo selecionado.");
      }
    } catch (error) {
      console.error("Erro ao selecionar vídeo: ", error);
      Alert.alert("Erro", "Não foi possível selecionar o vídeo.");
    }
  };

  const uploadVideo = async () => {
    if (!video) {
      Alert.alert("Erro", "Por favor, selecione um vídeo.");
      return;
    }

    if (!category.trim()) {
      Alert.alert("Erro", "Por favor, insira um nome de categoria.");
      return;
    }

    try {
      setUploading(true);
      console.log("Iniciando upload do vídeo...", video);

      const response = await fetch(video.uri);
      const blob = await response.blob();
      const filePath = `videos/${category}/${Date.now()}_${video.name}`;

      const uploadParams = {
        Bucket: S3_BUCKET,
        Key: filePath,
        Body: blob,
        ContentType: video.type,
      };

      s3.upload(uploadParams, (err, data) => {
        setUploading(false);
        if (err) {
          console.error("Erro no upload: ", err);
          Alert.alert("Erro", "Falha no envio do vídeo");
        } else {
          console.log("Vídeo enviado! URL: ", data.Location);
          Alert.alert("Sucesso", "Vídeo enviado com sucesso!");
          setVideo(null);
          setCategory("");
        }
      });
    } catch (error) {
      console.error("Erro no upload: ", error);
      Alert.alert("Erro", "Falha no envio do vídeo");
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Selecionar vídeo" onPress={pickVideo} />
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Digite a categoria do vídeo:</Text>
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={setCategory}
              placeholder="Categoria"
            />
            <Button
              title={uploading ? "Enviando..." : "Enviar vídeo"}
              onPress={uploadVideo}
              disabled={uploading}
            />
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    marginVertical: 12,
    borderRadius: 5,
  },
  cancel: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
