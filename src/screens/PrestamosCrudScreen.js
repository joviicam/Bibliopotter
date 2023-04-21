import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PrestamosCrudScreen() {
  const route = useRoute();
  const prestamo = route.params;
  const [selectedValue, setSelectedValue] = useState(null);
  const [libros, setLibros] = useState([
    { label: "Selecciona un libro", value: null },
  ]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`${}`)
    setLibros([
      { label: "Harry Potter", value: "Harry Potter" },
    ]);
  }, []);

  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.view }}>
        <View style={{height: "70%"}}>
          <View>
            <View>
              <Text style={{ ...styles.text }}>Nombre del cliente:</Text>
            </View>
            <View>
              <TextInput style={{ ...styles.input, ...styles.text }} />
            </View>
          </View>
          <View style={{ marginTop: 45 }}>
            <View>
              <Text style={{ ...styles.text }}>Libro:</Text>
            </View>
            <View>
              <View style={{ ...styles.picker, ...styles.text }}>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                  {libros
                    ? libros.map((libro) => (
                        <Picker.Item label={libro.label} value={libro.value} />
                      ))
                    : null}
                </Picker>
              </View>
            </View>
          </View>
        </View>
        <View style={{height: "30%"}}>
          <View style={{ width: "100%" }}>
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
    </View>
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
  },
  view: {
    width: "100%",
    height: "100%",
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
  picker: {
    marginTop: 15,
    width: "100%",
    height: 75,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
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
