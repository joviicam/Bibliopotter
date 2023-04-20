import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PrestamosCrudScreen from '../screens/PrestamosCrudScreen';

const Stack = createNativeStackNavigator();// Crear un stack navigator

export default function IndexStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PrestamosCrudS" component={PrestamosCrudScreen} />
        </Stack.Navigator>
    )
}
