import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

const CustomTextInput = ({
  text,
  type,
  keyboardType,
  isSecure,
  placeholder,
  tabIndex,
  value,
  onChangeText,
  onBlur,
}) => {
  return (
    <View style={styles.textInputContainer}>
      <Text style={[styles.text]}>{text}</Text>
      <TextInput
        style={[styles.textInput]}
        inputMode={type}
        keyboardType={keyboardType}
        secureTextEntry={isSecure}
        placeholder={placeholder}
        tabIndex={tabIndex}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInputContainer: {
    width: "80%",
    height: 50,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  textInput: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: "black",
    fontSize: 20,
    fontWeight: "500",
    outline: "none",
  },
});
