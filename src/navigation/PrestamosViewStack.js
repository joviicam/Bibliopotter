import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PrestamosViewScreen from '../screens/PrestamosViewScreen';

const Stack = createNativeStackNavigator();// Crear un stack navigator

export default function IndexStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PrestamosViewS" component={PrestamosViewScreen} options={{title:"Prestamos"}} />
        </Stack.Navigator>
    )
}
