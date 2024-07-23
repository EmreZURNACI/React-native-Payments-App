import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView, Text } from "react-native";

import { Modal } from "../../Components/Index";
import PaymentListItem from "../../Components/PaymentListItem";

import { useSelector, useDispatch } from "react-redux";
import { autoLogin, getPayments } from "../../Redux/odemeSlice";

import Toast from "react-native-toast-message";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, payments, state } = useSelector((state) => state.odeme);

  useEffect(() => {
    dispatch(getPayments());
  }, []);

  useEffect(() => {
    dispatch(getPayments());
  }, [state]);

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.notify}>
          <Toast />
        </View>
        <Text style={styles.headerText}>All Payments</Text>
        <FlatList
          style={styles.flatlist}
          data={payments}
          renderItem={(payment) => (
            <PaymentListItem
              navigation={navigation}
              odenen={payment.item.content}
              sonTarih={payment.item.payment_due_date}
              tutar={payment.item.price}
              id={payment.item.id}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
      {isLoading ? <Modal /> : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    marginTop: 45,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  notify: {
    backgroundColor: "white",
    width: "100%",
    position: "absolute",
    zIndex: 2,
  },
});
