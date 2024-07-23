import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import {
  CustomTextInput,
  CustomButton,
  CustomImage,
  Modal,
  ErrorMessage,
} from "../../../src/Components/Index";

import CustomDatePicker from "../../Components/CustomDatePicker";

import { useDispatch, useSelector } from "react-redux";
import { newPayment, setState } from "../../Redux/odemeSlice";

import { Formik } from "formik";
import { newPaymentValidationSchema } from "../../Validations/NewPaymentVal";

const Payment = () => {

  const { isLoading } = useSelector((state) => state.odeme);

  const [pickerDate, setPickerDate] = useState(new Date());

  const dispatch = useDispatch();

  const clearValues = (values) => {
    values.content = null;
    values.price = null;
    setPickerDate(new Date());
  };
  
  return (
    <View style={[styles.flex1, styles.container]}>
      <View style={[styles.container, styles.flex3]}>
        <CustomImage src={require("../../../assets/images/payment.png")} />
      </View>

      <Formik
        validationSchema={newPaymentValidationSchema}
        initialValues={{ content: "", price: null }}
        onSubmit={(values) => {
          dispatch(
            newPayment({
              title: values.content,
              cost: values.price,
              lastDate: pickerDate,
            })
          );
          clearValues(values);
          dispatch(setState());
        }}
      >
        {({
          handleBlur,
          handleChange,
          errors,
          isValid,
          handleSubmit,
          values,
        }) => (
          <>
            <View style={[styles.container, styles.flex2]}>
              <>
                <CustomTextInput
                  text={"New Payment"}
                  type={"text"}
                  keyboardType={"default"}
                  isSecure={false}
                  placeholder={"Enter new payment name.."}
                  tabIndex={1}
                  value={values.content}
                  onChangeText={handleChange("content")}
                  onBlur={handleBlur("content")}
                />
                {errors.content && <ErrorMessage err={errors.content} />}
              </>

              <>
                <CustomTextInput
                  text={"Price"}
                  type={"numeric"}
                  keyboardType={"number-pad"}
                  isSecure={false}
                  placeholder={"Enter price.."}
                  tabIndex={2}
                  value={values.price}
                  onChangeText={handleChange("price")}
                  onBlur={handleBlur("price")}
                />
                {errors.price && <ErrorMessage err={errors.price} />}
              </>

              <CustomDatePicker date={pickerDate} setDate={setPickerDate} />
            </View>

            <View style={[styles.container, styles.flex1]}>
              <CustomButton
                disabled={!isValid}
                btnText={"Add payment"}
                bgColor={"red"}
                textColor={"white"}
                pressedBgColor={"tomato"}
                pressedColor={"black"}
                width={"80%"}
                onPress={() => handleSubmit()}
                tabIndex={3}
              />
            </View>
          </>
        )}
      </Formik>

      {isLoading === true ? <Modal /> : null}
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
});
