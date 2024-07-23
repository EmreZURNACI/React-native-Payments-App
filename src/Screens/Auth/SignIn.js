import React from "react";
import { StyleSheet, View } from "react-native";

import {
  CustomTextInput,
  CustomButton,
  CustomImage,
  Modal,
  ErrorMessage,
} from "../../../src/Components/Index";

import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../Redux/odemeSlice";

import { Formik } from "formik";
import { loginValidationSchema } from "../../Validations/LoginVal";

const SignIn = ({ navigation }) => {
  const { isLoading } = useSelector((state) => state.odeme);
  const dispatch = useDispatch();

  return (
    <View style={[styles.flex1, styles.container]}>
      <View style={[styles.container, styles.flex3]}>
        <CustomImage src={require("../../../assets/images/signIn.png")} />
      </View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          dispatch(
            signIn({
              email: values.email,
              password: values.password,
            })
          );
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
                  text={"Email"}
                  type={"email"}
                  keyboardType={"email-address"}
                  isSecure={false}
                  placeholder={"Enter your mail address..."}
                  tabIndex={1}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {errors.email && <ErrorMessage err={errors.email} />}
              </>
              <>
                <CustomTextInput
                  text={"Password"}
                  type={"text"}
                  keyboardType={"default"}
                  isSecure={true}
                  placeholder={"Enter your password..."}
                  tabIndex={2}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                {errors.password && <ErrorMessage err={errors.password} />}
              </>
            </View>
            <View style={[styles.container, styles.flex1]}>
              <CustomButton
                disabled={!isValid}
                btnText={"Sign In"}
                bgColor={"red"}
                textColor={"white"}
                pressedBgColor={"tomato"}
                width={"80%"}
                pressedColor={"black"}
                onPress={() => handleSubmit()}
                tabIndex={3}
              />

              <CustomButton
                btnText={"Don't you have an account?"}
                bgColor={"white"}
                textColor={"black"}
                pressedBgColor={"black"}
                width={"50%"}
                pressedColor={"white"}
                onPress={() => navigation.navigate("register")}
                tabIndex={4}
              />
            </View>
          </>
        )}
      </Formik>
      {isLoading === true ? <Modal /> : null}
    </View>
  );
};

export default SignIn;

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
