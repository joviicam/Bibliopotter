import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BackHandler } from 'react-native';
import { useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {
    navigator=useNavigation();
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
               <Button 
               title={"login"} 
               buttonStyle={styles.btn}
               onPress={()=>{
                     navigator.replace("DefaultS")
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
        paddingTop: 200,
    },
    btn: {
        backgroundColor: "#A46CFF",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 10,
        marginTop: 10,
    },
})