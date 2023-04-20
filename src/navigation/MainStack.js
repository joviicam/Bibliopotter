import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import IndexScreen from '../screens/IndexScreen'
import LibrosViewScreen from '../screens/LibrosViewScreen'
import PrestamosViewScreen from '../screens/PrestamosViewScreen'
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
                <Stack.Screen name="LibrosViewS" component={LibrosViewScreen} options={{ title: "Libros" }} />
                <Stack.Screen name="PrestamosViewS" component={PrestamosViewScreen} options={{ title: "Prestamos" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}