import React from "react";
import { StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home, Payment, Logout } from "../Screens/Index";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import EditModal from "../Components/EditModal";
import DeleteModal from "../Components/DeleteModal";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const homeScreen = "Home";
const paymentScreen = "Payment";
const logoutScreen = "Logout";

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let rn = route.name;
          if (rn === homeScreen) {
            iconName = "format-list-bulleted";
          } else if (rn === paymentScreen) {
            iconName = "format-list-bulleted-add";
          } else if (rn === logoutScreen) {
            iconName = "logout";
          }
          return (
            <MaterialIcons
              name={iconName}
              size={30}
              color={focused ? "blue" : "black"}
            />
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.bottomBar,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  );
};

const UserNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={"BottomTabBar"}
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={"Edit"} component={EditModal} />
      <Stack.Screen name={"Delete"} component={DeleteModal} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    width: "100%",
    borderTopWidth: 0.25,
    borderColor: "#646D74",
  },
});

export default UserNavigation;
