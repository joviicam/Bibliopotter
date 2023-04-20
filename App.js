import 'react-native-gesture-handler';
import React from "react";
import { LogBox } from 'react-native'; // sirve para quitar los warnings
import Toast from "react-native-toast-message";//Para mostrar los mensajes de error en el formulario
import MainStack from "./src/navigation/MainStack";
 
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <>
      <MainStack/>
    <Toast/> 
    </>
  );
}

