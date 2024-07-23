import React from 'react'
import { StyleSheet, ActivityIndicator, Text, View } from 'react-native'

const Modal = () => {
    return (
        <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Loading...</Text>
            <ActivityIndicator size={"large"} color={"black"}>
            </ActivityIndicator>
        </View>
    )
}

export default Modal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        position: "absolute",
        zIndex: 10,
        width: "100%",
        height: "100%",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "goldenrod",
        alignItems: "center",
        justifyContent: "center"
    },
    modalText: {
        fontSize: 22,
        fontWeight: "900"
    }
})