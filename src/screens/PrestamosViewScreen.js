import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import LogoutBtn from "../components/LogoutBtn";
import { useRoute } from "@react-navigation/core";
import { path } from "../utils/path";
import Prestamos from "../components/PrestamoDiv";

export default function PrestamosViewScreen(props) {
  const { navigation } = props;
  const route = useRoute();
  const [prestamos, setPrestamos] = useState([]);

  const getPrestamos = () => {
    fetch(`${path}/prestamos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPrestamos(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const Interval = setInterval(() => {
      getPrestamos();
    }, 500);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={true}>
      <View style={styles.Container}>
        <View style={styles.exitBtnContainer}>
          <LogoutBtn
            onPress={() => {
              navigation.navigate("LoginS");
            }}
          />
        </View>
        <View style={{ ...styles.btnCreateStyle }}>
          <Button
            buttonStyle={styles.btnCreate}
            title="Crear Prestamo"
            titleStyle={{ color: "black", fontWeight: "bold", fontSize: 16 }}
            onPress={() => {
              navigation.navigate("PrestamosCrudS", { mode: "null" });
            }}
          />
        </View>
        {/* Mostrar los datos de prestamos en un div */}
        <View style={styles.prestamosContainer}>
          {prestamos
            ? prestamos.map((prestamo) => (
                <Prestamos
                  cliente={prestamo.nombrePersona}
                  libro={prestamo.libro.titulo}
                  idLibro={prestamo.idLibro}
                  key={prestamo.idPrestamo}
                  onPress={() => {
                    navigation.navigate("PrestamosCrudS", {
                      idPrestamo: prestamo.idPrestamo,
                      nombrePersona: prestamo.nombrePersona,
                      idLibro: prestamo.idLibro,
                      mode: "edit",
                    });
                  }}
                />
              ))
            : null}
        </View>
      </View>
    </ScrollView>
  );
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
  prestamosContainer: {
    position: "absolute",
    top: 150,
  },
});
