import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { path } from "../utils/path";
import colors from "../utils/colors";
import Toast from "react-native-toast-message";

export default function PrestamosCrudScreen({ mode }) {
  const route = useRoute();
  const prestamo = route.params;
  const [selectedValue, setSelectedValue] = useState(prestamo ? prestamo.idLibro : "");
  const [libros, setLibros] = useState([]);
  const [nombrePersona, setNombrePersona] = useState(prestamo ? prestamo.nombrePersona : "");
  const navigation = useNavigation();

  const fetchLibros = () => {
    fetch(`${path}/libros`, {
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
        setLibros(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateLibro = (idLibro, prestamo) => {
    const libro = libros.find(libro => libro.idLibro === selectedValue)
    fetch(`${path}/libros/${idLibro}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cantidad: prestamo ? parseInt(libro.cantidad) - 1 : parseInt(libro.cantidad) + 1,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const areFieldsValidated = () => {
    if (nombrePersona === "" || selectedValue === null) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if(areFieldsValidated()){
      const libro = libros.find(libro => libro.idLibro === selectedValue)
      if(mode !== 'edit'){
        if(libro.cantidad > 0){
          fetch(`${path}/prestamos`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombrePersona: nombrePersona,
              idLibro: selectedValue,
            }),
          })
            .then((response) => {
              console.log(response);
              return response.json();
            })
            .then((data) => {
              updateLibro(selectedValue, true);
              Toast.show({
                type: "success",
                position: "bottom",
                text1: "Prestamo creado",
              });
              navigation.goBack();
            })
        } else {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Error, no hay libros disponibles",
          })
        }
      } else {
        fetch(`${path}/prestamos/${prestamo.idPrestamo}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombrePersona: nombrePersona,
            idLibro: selectedValue,
          }),
        })
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((data) => {
            console.log(data);
            Toast.show({
              type: "success",
              position: "bottom",
              text1: "Prestamo actualizado",
            });
            navigation.goBack();
          })
      }
    }
  }

  const handleDelete = () => {
    fetch(`${path}/prestamos/${prestamo.idPrestamo}`, {
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
        updateLibro(prestamo.idLibro, false);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Libro regresado",
        });
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (mode === "edit" || mode === "view") {
      fetch(`${path}/prestamos/${prestamo.idPrestamo}`, {
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
          fetchLibros();
          setSelectedValue(data.libro.idLibro);
          setNombrePersona(data.nombrePersona);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetchLibros();
    }
  }, []);

  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.view }}>
        <View style={{ height: "70%" }}>
          <View>
            <View>
              <Text style={{ ...styles.text }}>Nombre del cliente:</Text>
            </View>
            <View>
              <TextInput
                style={{ ...styles.input, ...styles.text }}
                value={nombrePersona}
                onChangeText={(text) => setNombrePersona(text)}
              />
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
                  enabled={mode === "edit" || mode === "view" ? false : true}
                >
                  <Picker.Item
                    label={
                      mode === "edit" || mode === "view"
                        ? libros[0].titulo
                        : "Selecciona un libro"
                    }
                    value={
                      mode === "edit" || mode === "view"
                        ? libros[0].idLibro
                        : null
                    }
                  />
                  {libros
                    ? libros.map((libro, index) =>
                        libro.cantidad > 0 ? (
                          <Picker.Item
                            label={libro.titulo}
                            value={libro.idLibro}
                            key={index}
                          />
                        ) : null
                      )
                    : null}
                </Picker>
              </View>
            </View>
          </View>
        </View>
        <View style={{ height: "30%" }}>
          <View style={{ width: "100%" }}>
            {mode === "view" ? null : (
              <View style={{ marginTop: 45 }}>
                <Button
                  onPress={handleSubmit}
                  buttonStyle={{ ...styles.btnSave }}
                  title={mode === "edit" ? "Guardar" : "Prestar"}
                />
              </View>
            )}
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
              {mode === 'edit' ?
                <View>
                <Button
                  onPress={handleDelete}
                  buttonStyle={{ ...styles.btnDelete }}
                  title={"Devolver"}
                />
              </View>: null}
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
    backgroundColor: colors.fondo,
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
    backgroundColor: colors.input,
  },
  picker: {
    marginTop: 15,
    width: "100%",
    height: 75,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    backgroundColor: colors.input,
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
