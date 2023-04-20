import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LibrosCreateScreen from '../screens/LibrosCreateScreen';

const Stack = createNativeStackNavigator();// Crear un stack navigator

export default function IndexStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LibrosCreateS" component={LibrosCreateScreen} />
        </Stack.Navigator>
    )
}
