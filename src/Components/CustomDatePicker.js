import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';

import { CustomButton } from './Index'

const CustomDatePicker = ({ date, setDate }) => {
    
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
      };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    
    const showTimepicker = () => {
        showMode('time');
      };

    return (
        <View style={styles.container}>
            <Text style={[styles.text]}>Date/Time</Text>
            <CustomButton
                width={"100%"}
                btnText={"Pick date"}
                bgColor={"grey"}
                textColor={"white"}
                pressedBgColor={"black"}
                pressedColor={"white"}
                onPress={showDatepicker}
            />
            <CustomButton
                width={"100%"}
                btnText={"Pick Time"}
                bgColor={"darkgrey"}
                textColor={"white"}
                pressedBgColor={"black"}
                pressedColor={"white"}
                onPress={showTimepicker}
            />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </View>
    );
};
export default CustomDatePicker
const styles = StyleSheet.create({
    container: {
        width: "80%",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    }
})