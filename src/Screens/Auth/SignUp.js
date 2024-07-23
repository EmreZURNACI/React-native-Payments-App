import React from 'react'
import { StyleSheet, View } from 'react-native'

import { CustomTextInput, CustomButton, CustomImage, Modal, ErrorMessage } from '../../../src/Components/Index';


import { useDispatch, useSelector } from 'react-redux';
import { signUp } from "../../Redux/odemeSlice"


import { Formik } from 'formik';
import { registerValidationSchema } from '../../Validations/RegisterVal'


const SignUp = ({ navigation }) => {

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.odeme)

  return (
    <View style={[styles.flex1, styles.container]}>
      <View style={[styles.container, styles.flex3]}>
        <CustomImage src={require("../../../assets/images/signUp.png")} />
      </View>
      <Formik
        validationSchema={registerValidationSchema}
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={(values) => dispatch(signUp({
          email: values.email,
          password: values.password
        }))}
      >
        {({ handleBlur, handleChange, errors, isValid, handleSubmit, values }) => (
          <>
            <View style={[styles.container, styles.flex2]}>

              <>
                <CustomTextInput
                  text={"Full name"}
                  type={"text"}
                  keyboardType={"default"}
                  isSecure={false}
                  placeholder={"Enter your name..."}
                  tabIndex={1}
                  value={values.name}
                  onBlur={handleBlur("name")}
                  onChangeText={handleChange("name")}
                />
                {
                  errors.name &&
                  <ErrorMessage err={errors.name} />
                }
              </>
              <>
                <CustomTextInput
                  text={"Email"}
                  type={"email"}
                  keyboardType={"email-address"}
                  isSecure={false}
                  value={values.email}
                  placeholder={"Enter your mail address..."}
                  tabIndex={2}
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                />
                {
                  errors.email &&
                  <ErrorMessage err={errors.email} />
                }
              </>
              <>
                <CustomTextInput
                  text={"Password"}
                  type={"text"}
                  keyboardType={"default"}
                  isSecure={true}
                  value={values.password}
                  placeholder={"Enter your password..."}
                  tabIndex={3}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                />
                {
                  errors.password &&
                  <ErrorMessage err={errors.password} />
                }
              </>

            </View>
            <View style={[styles.container, styles.flex1]}>
              <CustomButton
                disabled={!isValid}
                btnText={"Sign Up"}
                bgColor={"red"}
                textColor={"white"}
                pressedBgColor={"tomato"}
                pressedColor={"black"}
                width={"80%"}
                onPress={() => handleSubmit()}
                tabIndex={3} />

              <CustomButton
                btnText={"Have you got an account?"}
                bgColor={"white"}
                textColor={"black"}
                pressedBgColor={"black"}
                width={"60%"}
                pressedColor={"white"}
                onPress={() => navigation.navigate("login")}
                tabIndex={4} />

            </View>
          </>
        )}
      </Formik>
      {
        isLoading === true ?
          <Modal />
          : null
      }
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2
  },
  flex3: {
    flex: 3
  }
});
