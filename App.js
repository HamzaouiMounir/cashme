import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Friends from "./screens/Friends";
import Report from "./screens/Report";
import Trade from "./screens/Trade";


const fetchFonts = () => {
  return Font.loadAsync({
    "sfpd-regular": require("./assets/fonts/SFPro/SFProDisplay-Regular.ttf"),
    "sfpd-heavy": require("./assets/fonts/SFPro/SFProDisplay-Heavy.ttf"),
    "sfpd-light": require("./assets/fonts/SFPro/SFProDisplay-Light.ttf"),
  });
};






const TabMenu = ({navigation}) => (
  <View style={styles.menuTab}>
    <TouchableOpacity style={styles.menuAction} onPress={()=>navigation.navigate('Profile')}>
      <Icon name="ios-home" color="#0074E3" size={25} />

      <Text style={styles.customFontRegular}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.menuAction}>
      <Icon name="ios-people" color="#000" size={25} />
      <Text style={styles.customFontRegular}>Friends</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.menuAction}>
      <Icon name="ios-analytics" color="#000" size={25} />
      <Text style={styles.customFontRegular}>Report</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.menuAction}>
      <Icon name="ios-send" color="#000" size={25} />
      <Text>Trade</Text>
    </TouchableOpacity>
  </View>
);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  const [downloaded, setDownload] = useState(false);
  
  if (!downloaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setDownload(true)} />
    );
  } else
    return (
        <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch(route.name){
              case 'Home': 
              iconName = focused
              ? 'ios-planet'
              : 'ios-planet'; break;
              case 'Settings': 
              iconName = focused
              ? 'ios-settings'
              : 'ios-settings'; break;
              case 'Friends': 
              iconName = focused
              ? 'ios-people'
              : 'ios-people'; break;
              case 'Report': 
              iconName = focused
              ? 'ios-stats'
              : 'ios-stats'; break;
             
            }
            return <TouchableOpacity style={styles.menuAction} onPress={()=> navigation.navigate(route.name)}>
            <Icon name={iconName} size={size} color={color} />
            <Text style={{ color: color}}>{route.name}</Text>
          </TouchableOpacity>
          },
        })}
        tabBarOptions={{
          activeTintColor: '#0074e3',
          inactiveTintColor: 'gray',
          showLabel: false
        }}>
            <Tab.Screen
              name="Home"
              component={Home}
            />
            <Tab.Screen
              name="Friends"
              component={Friends}
            />
            <Tab.Screen
              name="Report"
              component={Report}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
            />
          </Tab.Navigator>
          {/*<TabMenu />*/}
        </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    fontFamily: "sfpd-regular",
     paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  menuTab: {
    height: 70,
    flexDirection: "row",
    borderTopColor: "#F7F7F7",
    borderTopWidth: 1.9,
  },
  menuAction: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textGrey: {
    color: "#7D7C81",
  },
  textGreyWhite: {
    color: "#C0C0C0",
  },
  textBold: {
    fontWeight: "bold",
  },
  textGreen: {
    color: "#3E925F",
  },
  textRed: {
    color: "#DC4A4B",
  },
  timeAgo: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountText: {
    fontSize: 15,
    padding: 5,
  },
  customFontRegular: {
    fontFamily: "sfpd-regular",
  },
});
