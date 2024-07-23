import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { UserNavigation, AuthNavigation } from "./Index";

import { useSelector } from "react-redux";

import app from "../../firebaseConfig";

const RootNavigation = () => {
  const { isAuth } = useSelector((state) => state.odeme);
  return (
    <NavigationContainer>
      {isAuth ? <UserNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
