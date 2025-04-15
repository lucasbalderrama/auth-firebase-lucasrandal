import React, { useEffect, useState } from "react";
import { Pressable, View, Text, StyleSheet, ScrollView, ActivityIndicator  } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Video } from "expo-av";
import s3 from "../../awsConfig"

export default function ListarVideosPorCategoria({ navigation }) {
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);
  
    // Função para buscar todas as categorias (pastas) do S3
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
  
        // Extrai os nomes das pastas (categorias)
        const folders = response.CommonPrefixes.map((prefix) => {
          const folderPath = prefix.Prefix;
          return folderPath.replace("videos/", "").replace("/", "");
        });
  
        setCategories(folders);
  
        // Seleciona a primeira categoria por padrão, se existir
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
  
        const videoUrls =
          videoFiles?.map((file) => ({
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
  }
  