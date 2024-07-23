import React from 'react'
import { StyleSheet, View } from 'react-native'

import { CustomButton, Modal } from '../../Components/Index'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/odemeSlice'


const Logout = () => {

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.odeme)

  return (
    <View style={styles.container}>
      <CustomButton
        btnText={"Logout"}
        bgColor={"darkred"}
        textColor={"white"}
        pressedBgColor={"red"}
        pressedColor={"white"}
        width={"80%"}
        onPress={() => {
          dispatch(logout())
        }}
      />
      {
        isLoading ? <Modal /> : null
      }
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})