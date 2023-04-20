import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function DefaultScreen() {
    navigator = useNavigation();
    return (
        <View>
            <Button
                title={"da click para ir a la pantalla de IndexScreen"}
                onPress={() => {
                    navigator.navigate("IndexS")
                }}></Button>
            <Button
                title={"da click para ir a la pantalla de librosViewScreen"}
                onPress={() => {
                    navigator.navigate("LibrosViewS")
                }}></Button>
            <Button
                title={"da click para ir a la pantalla de PrestamosViewScreen"}
                onPress={() => {
                    navigator.navigate("PrestamosViewS")
                }}></Button>
            <Button
                title={"da click para ir a la pantalla de PrestamosCrudScreen"}
                onPress={() => {
                    navigator.navigate("PrestamosCrudS")
                }}></Button>
            <Button
                title={"da click para ir a la pantalla de LibrosCrudScreen"}
                onPress={() => {
                    navigator.navigate("LibrosCrudS")
                }}></Button>
        </View>
    )
}

const styles = StyleSheet.create({})