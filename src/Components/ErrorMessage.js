import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrorMessage = ({ err }) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.text}>{err}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  errorContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "red",
    fontSize: 22,
    fontWeight: "bold",
    textAlign:"center"
  },
});
