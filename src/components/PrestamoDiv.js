import { StyleSheet, Text, View } from 'react-native'
import { Button} from 'react-native-elements'
import React from 'react'

export default function PrestamoDiv(props) {
  const { onPress, cliente, libro, idLibro} = props;

  return (
        <View style={styles.container}>
            <Button title={<Text style={styles.textStyle} >
            {"Cliente: "}{cliente}{'\nLibro: '}{libro}</Text>}
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