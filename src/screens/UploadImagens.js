// Lucas Randal N°18
import React, { useState } from "react";
import { Pressable, Image, View, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import s3 from "../../awsConfig";

const S3_BUCKET = "bucket-storage-senai-18";

const UploadImagens = ({ navigation }) => {
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

  const redirecionarInicio = () => {
    navigation.navigate('PaginaPrincipal');
  };

  // Aqui está o retorno da interface
  return (
    <View style={styles.container}>
      <View style={styles.barraSuperior}>
        <Pressable style={styles.voltarBotao} onPress={redirecionarInicio}>
          <Text style={styles.voltarTexto}>Voltar</Text>
        </Pressable>

        <Text style={styles.titulo}>Lista de jogadores</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.titulo2}>Upload de Imagens</Text>

        <Pressable onPress={escolherImagem} style={styles.button}>
          <Text style={styles.buttonText}>Escolher Imagem</Text>
        </Pressable>

        <View style={styles.containerPreview}>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.preview} />
          )}
        </View>

        <Pressable onPress={uploadImage} style={styles.button}>
          <Text style={styles.buttonText}>Fazer Upload</Text>
        </Pressable>

      </View>
    </View >
  );
};

export default UploadImagens;

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
  titulo2: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  containerPreview: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  preview: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 25,
    borderColor: 'red',
    borderWidth: 4,
  },
});