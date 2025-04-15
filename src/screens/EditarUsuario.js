// Lucas Randal N°18
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  getAuth,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { View, TextInput, Text, Image, ScrollView, StyleSheet } from "react-native";

import s3 from "../../awsConfig";

const S3_BUCKET = "bucket-storage-senai-18";

const EditarPerfil = ({ navigation }) => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  const userDocRef = doc(db, "users", user.uid);

  const [nome, setNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [fotoAtual, setFotoAtual] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setNome(userDoc.data().nome);
        setNovoEmail(userDoc.data().email);
        setFotoAtual(userDoc.data().photoURL); // A URL da imagem
      }
    };
    fetchUserData();
  }, []);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const filePath = `profile_images/${user.uid}/${filename}`;

      const response = await fetch(uri);
      const blob = await response.blob();

      const uploadParams = {
        Bucket: "bucket-storage-senai-18",
        Key: filePath,
        Body: blob,
        ContentType: "image/jpeg",
      };

      const uploadResult = await s3.upload(uploadParams).promise();
      const photoURL = uploadResult.Location;

      await updateDoc(userDocRef, { photoURL });
      setFotoAtual(photoURL);

      Alert.alert("Sucesso", "Foto de perfil atualizada!");
    } catch (error) {
      console.error("Erro ao enviar imagem: ", error);
      Alert.alert("Erro", "Não foi possível atualizar a foto.");
    }
  };

  const handleUpdateProfile = async () => {
    const credential = EmailAuthProvider.credential(user.email, senhaAtual);

    try {
      await reauthenticateWithCredential(user, credential);
      await updateDoc(userDocRef, { nome });

      if (novoEmail !== user.email) {
        await updateEmail(user, novoEmail);
      }

      if (novaSenha) {
        await updatePassword(user, novaSenha);
      }

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao atualizar perfil: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao atualizar o perfil.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {fotoAtual ? (
        <Image
          source={{ uri: fotoAtual }}
          style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginBottom: 20 }}
        />
      ) : null}
      <Button title="Alterar Foto de Perfil" onPress={handlePickImage} />

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Novo Email"
        value={novoEmail}
        onChangeText={setNovoEmail}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Nova Senha"
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Senha Atual"
        value={senhaAtual}
        onChangeText={setSenhaAtual}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Salvar Alterações" onPress={handleUpdateProfile} />
    </View>
  );
};

export default EditarPerfil;

const styles = StyleSheet.create({
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
});