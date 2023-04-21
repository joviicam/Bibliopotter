import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from 'react-native-elements'
import LogoutBtn from '../components/LogoutBtn'
import { useRoute } from '@react-navigation/core'
import { path } from "../utils/path";
import Libros from '../components/LibroDiv'

export default function LibrosViewScreen(props) {

  const { navigation } = props
  const route = useRoute();
  const [libros, setLibros] = useState([]);

  const getLibros = () => {
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

  useEffect(() => {
    getLibros();
  }, []);

  return (
   <ScrollView contentContainerStyle={{flexGrow: 1}} scrollEnabled={true}>
      <View style={styles.Container}>
            <View style={styles.exitBtnContainer}>
              <LogoutBtn 
                onPress={() => {
                  navigation.navigate("LoginS")
                }}
              />
            </View>
            <View style = {{...styles.btnCreateStyle}}>
            <Button
                buttonStyle={styles.btnCreate}
                title="Crear Libro"
                titleStyle={{ color: "black", fontWeight: "bold", fontSize: 16 }}
                onPress={() => {
                  navigation.navigate("LibrosCrudS", {mode: "null"})
                }}
              />
            </View>
            {/* Mostrar los datos de libros en un div */}
            <View style={styles.librosContainer}>
              {libros.map(libro => (
                <Libros autor={libro.autor} titulo={libro.titulo} descripcion={libro.descripcion} cantidad={libro.cantidad} 
                  key={libro.idLibro}
                  onPress={() => {
                    navigation.navigate("LibrosCrudS", {idLibro: libro.idLibro, autor: libro.autor, titulo: libro.titulo, descripcion: libro.descripcion, cantidad: libro.acantidad, mode: "view"})
                  }}
                />
              ))}
            </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#D197FF",
  },
  exitBtnContainer: {
    position: "absolute",
    top: 16,
    right: 5,
  },
  btnCreate: {
    backgroundColor: "#64C54B",
    borderRadius: 12,
    width: 150,
    height: 50,
  },
  btnCreateStyle: {
    top: 24,
    left: 5,
    position: "absolute",
  },
  librosContainer: {
    position: "absolute",
    top: 150,
  },
});