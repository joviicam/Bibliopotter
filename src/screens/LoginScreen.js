import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React from 'react'
import { BackHandler } from 'react-native';
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Icon, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";

export default function LoginScreen() {
    navigator = useNavigation();
    //datos de inicio de sesion
    const PASS = "elakim";
    const EMAIL = "akim@pirata.com";
    const login = () => {
        if (email == "" || password == "") {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "Error",
                text2: "Por favor, ingrese sus datos",
            });

        } else if (email != EMAIL && password != PASS) {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "Datos incorrectos",
            });
        } else {
            Toast.show({
                type: "success",
                position: "bottom",
                text1: "Sesión iniciada",
            });
            navigator.navigate("DefaultS");
        }
    };
    const handleBackButton = () => {
        // No hace nada
        return true;
    };

    useEffect(() => {
        // Suscribirse al evento de retroceso
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // Desuscribirse del evento de retroceso al desmontar el componente
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }, []);

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const showPass = () => {
        setShowPassword(!showPassword);
    };
    let count = 0;
    const istereg = () => {
        //Al dar click 3 veces en el titulo va a mandar un toast
        count++;
        if (count == 5) {
            Toast.show({
                type: "success",
                position: "bottom",
                text1: "email:akim@pirata.com",
                text2: "password:elakim",
            });
            count = 0;
        }
    }
    return (

        <View style={styles.Container1}>
            <KeyboardAwareScrollView>

                <Image
                    source={require('../../assets/images/pila-de-libros.png')} style={styles.icon}
                />
                <Text style={styles.title}
                    onPress={istereg}>{'Bienvenido a \nBiblioPotter'}</Text>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Correo Electrónico"
                        containerStyle={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        rightIcon={
                            <Icon
                                type="material-community"
                                name="at"
                            />
                        }
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        containerStyle={styles.input}
                        password={true}
                        secureTextEntry={showPassword ? false : true}
                        rightIcon={
                            <Icon
                                type="material-community"
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                iconStyle={styles.Icon}
                                onPress={showPass}
                            />
                        }
                    />
                </View>

                <Button
                    title={"Iniciar sesion"}
                    buttonStyle={styles.btn}
                    onPress={() => {
                        login();
                    }}
                ></Button>
            </KeyboardAwareScrollView>

        </View>

    )
}

const styles = StyleSheet.create({
    Container1: {
        flex: 1,//flex es para que ocupe todo el espacio disponible
        backgroundColor: "#D197FF",
        paddingTop: 100,
        alignItems: "center",
    },
    btn: {
        backgroundColor: "#885FCA",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 10,
        marginTop: 10,
        width: 200,
        height: 50,
        marginBottom: 140,
        alignSelf: "center",
    },
    icon: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginTop: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: "center",
        textAlign: "center",
        marginTop: 10,
        fontFamily: "Roboto",
        paddingBottom: 30,
    },
    inputContainer: {
        marginTop: 10,
        borderColor: "#A46CFF",
        borderWidth: 2,
        borderRadius: 10,
        height: 70,
        width: 300,
    },
})