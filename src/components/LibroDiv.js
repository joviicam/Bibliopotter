import { StyleSheet, Text, View } from 'react-native'
import { Button} from 'react-native-elements'
import React from 'react'

export default function LibrosDiv(props) {
    const { onPress, titulo, autor, descripcion, cantidad } = props;

    return (
        <View style={styles.container}>
            <Button title={<Text style={styles.textStyle} >
            {"Titulo: "}{titulo}{'\nAutor: '}{autor}{'\nCantidad: '}{cantidad}</Text>}
                onPress={onPress}
                buttonStyle={[styles.btn]}>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    btn: {
        width: 300,
        height: 150,
        borderRadius: 10,
        justifyContent: "center",
        backgroundColor: "#885FCA",
    },
    textStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        fontStyle: "italic",
        fontFamily: "Roboto",
        textAlign: "left",
        lineHeight: 30,
    },
})