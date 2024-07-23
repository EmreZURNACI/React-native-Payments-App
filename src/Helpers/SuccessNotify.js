import React from "react";

import Toast from "react-native-toast-message";

export  const showToast = () => {
    Toast.show({
      type: "success",
      text1: `Ödeme başarıyla gerçekleşti.`.toUpperCase(),
    });
  };