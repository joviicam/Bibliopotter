import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from "react-native-toast-message";


export default function ExitBtn(props) {
  const { onPress } = props;


  return (
    <View>
      <Button buttonStyle={styles.btn}
        icon={<Icon type="material-community" name="logout" iconStyle={styles.Icon} size={40} />}
        onPress={() => {     
          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Sesión cerrada",
          });
          onPress();
        }}>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    //boton color rojo
    backgroundColor: "#8B0000",
    borderRadius: 10,
    width: 50,
    height: 60,
  },
  Icon: {
    color: "#fff",
  }
})