import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LibrosViewScreen from '../screens/LibrosViewScreen';

const Stack = createNativeStackNavigator();// Crear un stack navigator

export default function IndexStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LibrosViewS" component={LibrosViewScreen} options={{title:"Libros"}} />
        </Stack.Navigator>
    )
}
