import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import colors from '../utils/colors';
import MapView, { Marker } from 'react-native-maps';


export default function IndexScreen() {
    const navigator = useNavigation();

    const handlePressLibros = () => {
        navigator.navigate('LibrosViewS');
    };

    const handlePressPrestamos = () => {
        navigator.navigate('PrestamosViewS');
    };

    const [mapRegion, setMapRegion] = useState({
        latitude: 4.60971,
        longitude: -74.08175,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

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
                    <Text style={styles.title2}>{'Gestionar \nlibros'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigator.navigate('PrestamosViewS')
                }}>
                    <View style={styles.contenedor}>
                        <Image
                            source={require('../../assets/images/prestamo.png')} style={styles.icon}

                        />
                        <Text style={styles.title2}>{'Gestionar \nprestamos'}</Text>
                    </View>
                </TouchableOpacity>

            </View>
            
            <View style={styles.containerMap}>
            <Text style={styles.title3}>{'Ubicacion de BiblioPotter:'}</Text>
                <MapView style={styles.map}
                    region={mapRegion}>
                    <Marker coordinate={mapRegion} title='Marker' />
                </MapView>
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
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },

    container2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 300,
    },
    container3: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',

    },
    icon: {
        width: 70,
        height: 70,
        alignSelf: 'center',
    },
    contenedor: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 120,
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        //Aqui se puede poner un shadow
        shadowColor: "#000",
        elevation: 10,
    },
    title2: {
        marginTop: 10,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Roboto',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    containerMap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    title3: {
        fontSize: 15,
        marginTop: 130,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 10,

    },

})