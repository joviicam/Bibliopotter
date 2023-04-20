import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function IndexScreen() {
    navigator = useNavigation();
    return (
        <View>
            <Text>IndexScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({})