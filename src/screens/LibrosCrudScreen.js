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

export default function LibrosCrudScreen({ mode }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [imagen, setImagen] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const route = useRoute();
  const libro = route.params;
  const navigation = useNavigation();
  const firebaseConfig = {
    apiKey: "AIzaSyC_jYYWMhj-2csXBwOmqLpcUsQr0Tju7QI",
    authDomain: "recu-bibliopotter.firebaseapp.com",
    projectId: "recu-bibliopotter",
    storageBucket: "recu-bibliopotter.appspot.com",
    messagingSenderId: "820063868228",
    appId: "1:820063868228:web:63068c46f15e11c8917311"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
    const storage = firebase.storage();

  const uploadImage = async (uri, imageName) => {
    console.log({uri: uri, imageName: imageName})
    const reference = storage.ref(`/${imageName}`);
    const task = reference.put(uri, { contentType: "image/jpeg" });
    await task
    const url = await reference.getDownloadURL();
    console.log(url)
    return url;
  }

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
        setCantidad(data.cantidad);
        setImagen(data.imagen);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      console.log({imageName: imageName})
      if(selectedImage) {
        const url = await uploadImage(selectedImage, imageName);
        if(url){
          console.log({url: url})
          if (mode === "edit") {
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
                imagen: url,
              }),
            })
              .then((response) => {
                console.log(response);
                return response.json();
              })
              .then((data) => {
                console.log(data);
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
                imagen: url,
              }),
            })
              .then((response) => {
                console.log(response);
                return response.json();
              })
              .then((data) => {
                console.log(data);
                navigation.goBack();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error, imagen no definida",
        })
      }
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error, todos los campos son obligatorios",
      })
    }
  };

  useEffect(() => {
    if (mode === "edit" || mode === "view") {
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

    console.log({result: result})

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      setImageName(result.uri.split("/").pop());
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
                onChangeText={(number) => setCantidad(number)}
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
                source={{ uri: selectedImage ? selectedImage : null }}
              />
            </View>
            <View style={{ marginTop: 25 }}>
              <Button
                onPress={handleSelectImage}
                buttonStyle={{ ...styles.btnImg }}
                title={"Seleccionar desde galería"}
              />
            </View>
          </View>
          <View style={{ width: "100%" }}>
            { mode !== 'view' ? <View style={{ marginTop: 45 }}>
              <Button
                onPress={handleSubmit}
                buttonStyle={{ ...styles.btnSave }}
                title={"Guardar"}
              />
            </View>:null}
            <View style={{ marginTop: 25, ...styles.containerBtn }}>
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
                buttonStyle={{ ...styles.btnCancel }}
                title={"Atrás"}
              />
              {mode === "edit" || mode === "view" ? (
                <Button
                  //onPress={}
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
