import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DefaultScreen from '../screens/DefaultScreen';
const Stack = createNativeStackNavigator();// Crear un stack navigator

export default function IndexStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="DefaultS" component={DefaultScreen} />
        </Stack.Navigator>
    )
}
