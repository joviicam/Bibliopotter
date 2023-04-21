import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import Textarea from "react-native-textarea";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import colors from "../utils/colors";

export default function LibrosCrudScreen() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [imagen, setImagen] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const route = useRoute();
  const libro = route.params;
  const navigation = useNavigation();

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 12],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
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
              <TextInput style={{ ...styles.input, ...styles.text }} />
            </View>
          </View>
          <View style={{ marginTop: 45 }}>
            <View>
              <Text style={{ ...styles.text }}>Autor:</Text>
            </View>
            <View>
              <TextInput style={{ ...styles.input, ...styles.text }} />
            </View>
          </View>
          <View style={{ marginTop: 45 }}>
            <View>
              <Text style={{ ...styles.text }}>Descripción:</Text>
            </View>
            <View>
              <Textarea style={{ ...styles.textArea, ...styles.text }} />
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
          <View style={{width: "100%"}}>
            <View style={{ marginTop: 45 }}>
              <Button
                //onPress={}
                buttonStyle={{ ...styles.btnSave }}
                title={"Guardar"}
              />
            </View>
            <View style={{ marginTop: 25, ...styles.containerBtn }}>
              <View>
                <Button
                  onPress={() => {
                    navigation.goBack();
                  }}
                  buttonStyle={{ ...styles.btnCancel }}
                  title={"Atrás"}
                />
              </View>
              <View>
                <Button
                  //onPress={}
                  buttonStyle={{ ...styles.btnDelete }}
                  title={"Eliminar"}
                />
              </View>
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
    backgroundColor: colors.fondo
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
    width: "80%",
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 50,
    borderRadius: 12,
  },
  btnDelete: {
    width: "80%",
    backgroundColor: "#F00E0E",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 20,
    height: 50,
    borderRadius: 12,
  },
  containerBtn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
});
