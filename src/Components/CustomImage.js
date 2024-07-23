import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const CustomImage = ({ src }) => {
    return (
        <View style={[styles.imageContainer]}>
            <Image
                source={src}
                resizeMode="center"
            />
        </View>
    )
}

export default CustomImage

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "85%",
        height: "85%",
    }
})