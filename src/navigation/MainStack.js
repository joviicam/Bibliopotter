import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import IndexScreen from '../screens/IndexScreen'
import LibrosViewScreen from '../screens/LibrosViewScreen'
import PrestamosViewScreen from '../screens/PrestamosViewScreen'
import PrestamosCreateScreen from '../screens/PrestamosCreateScreen'
import LibrosCrudScreen from '../screens/LibrosCrudScreen'
import PrestamosCrudScreen from '../screens/PrestamosCrudScreen'
import LibrosCreateScreen from '../screens/LibrosCreateScreen'
import DefaultScreen from '../screens/DefaultScreen'
const Stack = createNativeStackNavigator()
export default function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
                <Stack.Screen name="LoginS" component={LoginScreen}
                    options={{
                        title: "Login",
                        headerShown: false
                    }} />
                <Stack.Screen name="IndexS" component={IndexScreen}
                    options={{
                        title: "Inicio principal",
                    }}
                />
                <Stack.Screen name="DefaultS" component={DefaultScreen} options={{ title: "Default" }} />
                <Stack.Screen name="LibrosViewS" component={LibrosViewScreen} options={{ title: "Libros" }} />
                <Stack.Screen name="PrestamosViewS" component={PrestamosViewScreen} options={{ title: "Prestamos" }} />
                <Stack.Screen name="PrestamosCreateS" component={PrestamosCreateScreen} options={{ title: "Crear prestamo" }} />
                <Stack.Screen name="LibrosCreateS" component={LibrosCreateScreen} options={{ title: "Crear libro" }} />
                <Stack.Screen name="LibrosCrudS" component={LibrosCrudScreen} options={{ title: "Gestion de libros" }} />
                <Stack.Screen name="PrestamosCrudS" component={PrestamosCrudScreen} options={{ title: "Gestion de prestamos" }} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}