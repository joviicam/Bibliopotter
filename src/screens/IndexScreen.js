import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import colors from '../utils/colors';

export default function IndexScreen() {
    const navigator = useNavigation();

    const handlePressLibros = () => {
        navigator.navigate('LibrosViewS');
    };

    const handlePressPrestamos = () => {
        navigator.navigate('PrestamosViewS');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{'Presiona la opción \ndeseada'}</Text>
            <View style={styles.container2}>
                <TouchableOpacity style={styles.contenedor} onPress={() => {
                    navigator.navigate('LibrosViewS')
                }}>
                    <Image
                        source={require('../../assets/images/libro-magico.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigator.navigate('PrestamosViewS')
                }}>
                    <View style={styles.contenedor}>
                        <Image
                            source={require('../../assets/images/libro.png')} style={styles.icon}

                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.container3}>
                <Text style={styles.title2}>{'Gestionar \nlibros'}</Text>
                <Text style={styles.title2}>{'Gestionar \nprestamos'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.fondo
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 30,
        fontFamily: 'Roboto',
    },

    container2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: -600,
        marginTop: -200,
    },
    container3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',

    },
    icon: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    contenedor: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 130,
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        //Aqui se puede poner un shadow
        shadowColor: "#000",
        elevation: 10,

    },
    title2: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Roboto',
        alignSelf: 'center',
        fontWeight: 'bold',
    },

})