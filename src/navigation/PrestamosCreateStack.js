import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PrestamosCreateScreen from '../screens/PrestamosCreateScreen';

const Stack = createNativeStackNavigator();// Crear un stack navigator

export default function IndexStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PrestamosCreateS" component={PrestamosCreateScreen} />
        </Stack.Navigator>
    )
}
