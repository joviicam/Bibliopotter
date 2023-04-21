import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import Textarea from "react-native-textarea";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import colors from "../utils/colors";
import { path } from "../utils/path";
import Toast from "react-native-toast-message";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function LibrosCrudScreen() {
  const route = useRoute();
  const libro = route.params;
  console.log(libro)
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [imagen, setImagen] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const navigation = useNavigation();
  const firebaseConfig = {
    apiKey: "AIzaSyC_jYYWMhj-2csXBwOmqLpcUsQr0Tju7QI",
    authDomain: "recu-bibliopotter.firebaseapp.com",
    projectId: "recu-bibliopotter",
    storageBucket: "recu-bibliopotter.appspot.com",
    messagingSenderId: "820063868228",
    appId: "1:820063868228:web:63068c46f15e11c8917311",
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const storage = firebase.storage();

  useEffect(() => {
    setTimeout(() => {
  if(libro.mode === 'view' || libro.mode === 'edit'){
    setAutor(libro.autor)
    setTitulo(libro.titulo)
    setDescripcion(libro.descripcion)
    setCantidad(libro.cantidad)
    setImagen(libro.imagen)
    setSelectedImage(libro.imagen)
  }
    }, 300);
  }, [])

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(getStorage(), `books/${imageName}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      const storage = getStorage();
      const refImg = ref(storage, snapshot.metadata.fullPath);
      const url = getDownloadURL(refImg);
      setImagen(url);
      console.log({ url2: url });
      return url;
    });
  };

  const fetchLibroId = (idLibro) => {
    fetch(`${path}/libros/${idLibro}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTitulo(data.titulo);
        setAutor(data.autor);
        setDescripcion(data.descripcion);
        setCantidad(parseInt(data.cantidad));
        setImagen(data.imagen);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    fetch(`${path}/libros/${libro.idLibro}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Libro eliminado"
        })
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const areFieldsValidated = () => {
    if (
      titulo === "" ||
      autor === "" ||
      descripcion === "" ||
      cantidad === 0 ||
      selectedImage === null
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (areFieldsValidated()) {
      console.log({ imageName: imageName });
      if (selectedImage) {
        await uploadImage(selectedImage, imageName).then(() => {
          console.log({imagen: imagen})
          console.log({imagenUrl: imagen._j})
          if (imagen) {
            if (libro.mode === "edit") {
              fetch(`${path}/libros/${libro.idLibro}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  titulo: titulo,
                  autor: autor,
                  descripcion: descripcion,
                  cantidad: cantidad,
                  imagen: imagen._j,
                }),
              })
                .then((response) => {
                  console.log(response);
                  return response.json();
                })
                .then((data) => {
                  Toast.show({
                    type: "success",
                    position: "bottom",
                    text1: "Libro actualizado"
                  })
                  navigation.goBack();
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              fetch(`${path}/libros`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  titulo: titulo,
                  autor: autor,
                  descripcion: descripcion,
                  cantidad: cantidad,
                  imagen: imagen._j,
                }),
              })
                .then((response) => {
                  console.log(response);
                  return response.json();
                })
                .then((data) => {
                  if(!data.error){
                    Toast.show({
                      type: "success",
                      position: "bottom",
                      text1: "Libro creado"
                    })
                    navigation.goBack();
                  } else {
                    Toast.show({
                      type: "error",
                      position: "bottom",
                      text1: "Libro no creado",
                      text2: data.error
                    })
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        });
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error, imagen no definida",
        });
      }
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error, todos los campos son obligatorios",
      });
    }
  };

  useEffect(() => {
    if (libro.mode === "edit" || libro.mode === "view") {
      fetchLibroId(libro.idLibro);
    }
  }, []);

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 12],
      quality: 1,
    });

    console.log({ result: result });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      uploadImage(result.uri, result.uri.split("/").pop());
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <ScrollView scrollEnabled={true}>
      <View style={styles.container}>
        <View style={{ ...styles.view }}>
          <View>
            <View>
              <Text style={{ ...styles.text }}>Título:</Text>
            </View>
            <View>
              <TextInput
                style={{ ...styles.input, ...styles.text }}
                onChangeText={(text) => setTitulo(text)}
                value={titulo}
                editable={libro.mode !== 'view'}
              />
            </View>
          </View>
          <View style={{ marginTop: 45 }}>
            <View>
              <Text style={{ ...styles.text }}>Autor:</Text>
            </View>
            <View>
              <TextInput
                style={{ ...styles.input, ...styles.text }}
                onChangeText={(text) => setAutor(text)}
                value={autor}
                editable={libro.mode !== 'view'}
              />
            </View>
          </View>
          <View style={{ marginTop: 45 }}>
            <View>
              <Text style={{ ...styles.text }}>Descripción:</Text>
            </View>
            <View>
              <Textarea
                style={{ ...styles.textArea, ...styles.text }}
                onChangeText={(text) => setDescripcion(text)}
                value={descripcion}
                editable={libro.mode !== 'view'}
              />
            </View>
          </View>
          <View style={{ marginTop: 65 }}>
            <View>
              <Text style={{ ...styles.text }}>Cantidad:</Text>
            </View>
            <View>
              <TextInput
                keyboardType="number-pad"
                style={{ ...styles.input, ...styles.text }}
                onChangeText={(number) => setCantidad(parseInt(number ? number : 0))}
                value={libro ? cantidad.toFixed(0): ""}
                editable={libro.mode !== 'view'}
              />
            </View>
          </View>
          <View style={{ marginTop: 45 }}>
            <View>
              <Text style={{ ...styles.text }}>Imagen:</Text>
            </View>
            <View>
              <Image
                style={{ ...styles.image }}
                source={{ uri: selectedImage }}
              />
            </View>
            <View style={{ marginTop: 25 }}>
              <Button
                disabled={libro.mode === 'view'}
                onPress={handleSelectImage}
                buttonStyle={{ ...styles.btnImg }}
                title={"Seleccionar desde galería"}
              />
            </View>
          </View>
          <View style={{ width: "100%" }}>
            {libro.mode !== "view" ? (
              <View style={{ marginTop: 45 }}>
                <Button
                  onPress={handleSubmit}
                  buttonStyle={{ ...styles.btnSave }}
                  title={"Guardar"}
                />
              </View>
            ) : null}
            <View style={{ marginTop: 25, ...styles.containerBtn }}>
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
                buttonStyle={{ ...styles.btnCancel }}
                title={"Atrás"}
              />
              {libro.mode === "edit" ? (
                <Button
                  onPress={handleDelete}
                  buttonStyle={{ ...styles.btnDelete }}
                  title={"Eliminar"}
                />
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
    flex: 1,
    backgroundColor: colors.fondo,
  },
  text: {
    fontSize: 20,
  },
  input: {
    marginTop: 15,
    width: "100%",
    height: 60,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    backgroundColor: colors.input,
    fontWeight: "bold",
  },
  textArea: {
    marginTop: 15,
    width: "100%",
    height: 180,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: colors.input,
    fontWeight: "bold",
  },
  view: {
    width: "100%",
    height: "100%",
  },
  image: {
    marginTop: 15,
    width: "100%",
    height: 450,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    backgroundColor: colors.input,
  },
  btnImg: {
    backgroundColor: "#A46CFF",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 50,
    borderRadius: 12,
    marginTop: 10,
  },
  btnSave: {
    backgroundColor: "#64C54B",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 50,
    borderRadius: 12,
    marginTop: 10,
  },
  btnCancel: {
    width: "100%",
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 50,
    borderRadius: 12,
  },
  btnDelete: {
    width: "100%",
    backgroundColor: "#F00E0E",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 50,
    borderRadius: 12,
  },
  containerBtn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingLeft: 35,
    paddingRight: 35,
  },
});
