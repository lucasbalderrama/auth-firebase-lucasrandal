import React, { useState } from "react";
import { Pressable, Image, View, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import s3 from "../../awsConfig";

const S3_BUCKET = "bucket-storage-senai-18";

const UploadFoto = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos da permissão para acessar suas fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert("Erro", "Nenhuma imagem selecionada.");
      return;
    }

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = `imagens/${Date.now()}.jpg`;

      const params = {
        Bucket: S3_BUCKET,
        Key: filename,
        Body: blob,
        ContentType: "image/jpeg",
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.error("Erro no upload:", err);
          Alert.alert("Erro", "Falha no envio da imagem.");
        } else {
          console.log("Imagem disponível em:", data.Location);
          Alert.alert("Sucesso", "Imagem salva com sucesso!");
          setImageUri(null);
        }
      });
    } catch (error) {
      console.error("Erro no upload:", error);
      Alert.alert("Erro", "Falha no envio da imagem.");
    }
  };

  // Aqui está o retorno da interface
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload de Imagens</Text>

      <Pressable onPress={escolherImagem} style={styles.button}>
        <Text style={styles.buttonText}>Escolher Imagem</Text>
      </Pressable>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.preview} />
      )}

      <Pressable onPress={uploadImage} style={styles.button}>
        <Text style={styles.buttonText}>Fazer Upload</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0080ff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
  },
  preview: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default UploadFoto;
