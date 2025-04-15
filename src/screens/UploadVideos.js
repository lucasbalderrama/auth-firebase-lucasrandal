// Lucas Randal N°18
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  TextInput,
  Modal
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import s3 from '../../awsConfig';

const S3_BUCKET = "bucket-storage-senai-18";

export default function UploadVideo({ navigation }) {
  const [video, setVideo] = useState(null);
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['video/*'],
        copyToCacheDirectory: true,
      });

      const asset = result.assets && result.assets.length > 0 ? result.assets[0] : result;

      if (asset && asset.uri) {
        setVideo({
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType || 'video/mp4',
        });
        setModalVisible(true);
      } else {
        alert('Erro', 'Nenhum vídeo selecionado.');
      }
    } catch (error) {
      console.error('Erro ao selecionar vídeo: ', error);
      alert('Erro', 'Não foi possível selecionar o vídeo.');
    }
  };

  const uploadVideo = async () => {
    if (!video) {
      alert('Erro', 'Por favor, selecione um vídeo.');
      return;
    }

    if (!category.trim()) {
      alert('Erro', 'Por favor, insira um nome de categoria.');
      return;
    }

    try {
      setUploading(true);
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
          console.error('Erro no upload: ', err);
          alert('Erro', 'Falha no envio do vídeo');
        } else {
          console.log('Vídeo enviado! URL: ', data.Location);
          alert('Vídeo enviado com sucesso!');
          setVideo(null);
          setCategory('');
        }
      });
    } catch (error) {
      console.error('Erro no upload: ', error);
      alert('Erro', 'Falha no envio do vídeo');
      setUploading(false);
    }
  };

  const redirecionarInicio = () => {
    navigation.navigate("PaginaPrincipal");
  };

  return (
    <View style={styles.container}>
      <View style={styles.barraSuperior}>
        <Pressable style={styles.voltarBotao} onPress={redirecionarInicio}>
          <Text style={styles.voltarTexto}>Voltar</Text>
        </Pressable>
        <Text style={styles.titulo}>Upload de Vídeos</Text>
      </View>

      <View style={styles.viewSelecVideo}>
        <Pressable style={styles.botao} onPress={pickVideo}>
          <Text style={styles.botaoTexto}>Selecionar Vídeo</Text>
        </Pressable>
      </View>

      {video && (
        <View style={styles.videoInfo}>
          <Text style={styles.videoText}>Vídeo selecionado: {video.name}</Text>
        </View>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Digite a categoria do vídeo:</Text>
            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="Categoria"
              style={styles.input}
            />
            <Pressable
              style={styles.botao}
              onPress={() => {
                setModalVisible(false);
                uploadVideo();
              }}
            >
              <Text style={styles.botaoTexto}>Enviar Vídeo</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {uploading && (
        <View style={styles.uploadingContainer}>
          <Text style={styles.uploadingTexto}>Enviando vídeo...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  viewSelecVideo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  botao: {
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
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  videoInfo: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  videoText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Gotham, sans-serif',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitulo: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Gotham, sans-serif',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadingContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  uploadingTexto: {
    fontSize: 16,
    color: '#666',
  },
});