import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  SectionList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SETTINGS_SECTION = [
  {
    title: "Preferences",
    data: [
      { icon: "ios-person", label: "Edit profile" },
      { icon: "ios-home", label: "Payment Methods" },
      { icon: "ios-lock", label: "Privacy" },
      { icon: "ios-notifications", label: "Notifications" },
      { icon: "ios-people", label: "Friends and socials" },
      { icon: "ios-call", label: "Change Phone Number" },
      { icon: "ios-finger-print", label: "Enable/Disable Fingerprint" },
    ],
  },
  {
    title: "Buying",
    data: [
      { icon: "ios-card", label: "Venmo Card" },
      { icon: "ios-infinite", label: "Enable Mobile Web Purchases" },
      { icon: "ios-refresh", label: "Backup Payment" },
      { icon: "ios-basket", label: "Connected Merchants" },
      { icon: "ios-people", label: "Friends and socials" },
    ],
  },
  {
    title: "Application",
    data: [
      { icon: "ios-log-out", label: "Log out" },
    ],
  },
];

const Item = ({ label, icon }) => (
  <TouchableOpacity style={styles.item}>
    <Icon name={icon} color="#7D7C81" size={25} style={styles.listItemIcon} />
    <Text style={styles.listItemText}>{label}</Text>
    <Icon name={"ios-arrow-forward"} color="#7D7C81" size={15} style={styles.listItemIcon} />

  </TouchableOpacity>
);

export default function Settings() {
  return (
    <View style={styles.container}>
      <SectionList
        sections={SETTINGS_SECTION}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item {...item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    borderBottomWidth: 0.25,
    borderBottomColor: "#C0C0C0",
    flexDirection: "row",
    alignItems: "center",
    height:40
  },
  listItemIcon:{
      flex:1,
      padding:5
  },
  listItemText:{
    flex:10,
    fontSize: 12,
    fontFamily: "sfpd-regular",
 },
  header: {
    fontSize: 12,
    padding:5,
    color: "#C0C0C0",
    textTransform: "uppercase"
  },
});
