import React from "react";
import { StyleSheet, View,Text } from "react-native";

import { editPayment, setState } from "../Redux/odemeSlice";
import { useDispatch } from "react-redux";

import { CustomButton, CustomImage } from "./Index";


const EditModal = ({navigation,route}) => {

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(
      editPayment({
        id: route.params.id,
      })
    );
    dispatch(setState());
    navigation.navigate("BottomTabBar");
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <CustomImage src={require("../../assets/images/warn.png")} />
      </View>
      <View>
        <Text style={styles.text}>Are you want to edit it ?</Text>
      </View>
      <View style={styles.buttons}>
        <CustomButton
          btnText={"Cancel"}
          bgColor={"red"}
          textColor={"white"}
          pressedBgColor={"darkred"}
          pressedColor={"grey"}
          width={"50%"}
          onPress={() => navigation.navigate("BottomTabBar")}
        />
        <CustomButton
          btnText={"Yes"}
          bgColor={"green"}
          textColor={"white"}
          pressedBgColor={"darkgreen"}
          pressedColor={"grey"}
          width={"50%"}
          onPress={() => handleEdit()}
        />
      </View>
    </View>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
  imageContainer: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    fontSize: 32,
    fontWeight: "700",
    color:"white"
  },
});
