import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

const CustomButton = ({
  disabled = false,
  btnText,
  bgColor,
  textColor,
  pressedBgColor,
  pressedColor,
  width,
  onPress,
  tabIndex,
  customStyle,
}) => {
    
  return (
    <Pressable
      disabled={disabled}
      tabIndex={tabIndex}
      onPress={onPress}
      style={({ pressed }) => [
        { backgroundColor: pressed ? pressedBgColor : bgColor },
        { width: width },
        styles.buttonContainer,
        customStyle,
      ]}
    >
      {({ pressed }) => (
        <Text
          style={[
            { color: pressed ? pressedColor : textColor },
            styles.buttonText,
          ]}
        >
          {btnText}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    cursor: "pointer",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
