import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BackHandler } from 'react-native';
import { useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function LoginScreen() {
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
    return (
        <View style={styles.Container1}>
            <KeyboardAwareScrollView>
                <Text>IndexScreen</Text>
            </KeyboardAwareScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    Container1: {
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        alignContent: "center",
        marginTop: 40,
        backgroundColor: "#D197FF",
    },
})