import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { CustomButton } from "./Index";
import { showToast } from "../Helpers/SuccessNotify";

import { paid, setState } from "../Redux/odemeSlice";
import { useDispatch } from "react-redux";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const PaymentListItem = ({ navigation, tutar, sonTarih, odenen, id }) => {
  const dispatch = useDispatch();

  const handleAck = () => {
    showToast();
    dispatch(
      paid({
        id: id,
      })
    );
    dispatch(setState());
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.textCenter]}>{odenen}</Text>
        <Text style={[styles.text, styles.textCenter]}>{tutar}</Text>
        <Text style={[styles.text, styles.textCenter]}>{sonTarih}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          btnText={<MaterialIcons name="delete" size={36} />}
          bgColor={"#fff"}
          textColor={"red"}
          pressedBgColor={"#fff"}
          pressedColor={"darkred"}
          width={"40%"}
          onPress={() => navigation.navigate("Delete", { id: id })}
        />
        <CustomButton
          btnText={<MaterialIcons name="edit" size={36} />}
          bgColor={"#fff"}
          textColor={"orange"}
          pressedBgColor={"#fff"}
          pressedColor={"darkorange"}
          width={"40%"}
          onPress={() => navigation.navigate("Edit", { id: id })}
        />
        <CustomButton
          btnText={<MaterialIcons name="task-alt" size={36} />}
          bgColor={"#fff"}
          textColor={"green"}
          pressedBgColor={"#fff"}
          pressedColor={"darkgreen"}
          width={"40%"}
          onPress={() => handleAck()}
        />
      </View>
    </View>
  );
};

export default PaymentListItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    marginBottom: 10,
    columnGap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  textContainer: {
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
  },
  textCenter: {
    textAlign: "center",
  },
});
