import React, {useState} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Button,
    SafeAreaView,
    StatusBar,
    Platform,
  } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { DATA, USERS } from '../data';
import { TextInput } from 'react-native-gesture-handler';

/*export default function Home({data}) {
    return (
        <FlatList
          style={styles.transactionList}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TransactionListItem transaction={item} />}
        />
    )
}*/
const headerMenu = {
    all: true,
    sent: false,
    received: false,
  };
const Header = ({menu, handleToggle}) => {
  
    return (
      <View style={styles.headerTab}>
        <View style={styles.headerTabTabs}>
          <TextInput style={styles.searchInput} placeholder="Search..."/>
        </View>
        <TouchableOpacity style={styles.searchIcon}>
          <Icon name="ios-search" color="#000" size={25} />
        </TouchableOpacity>
      </View>
    );
  };
  

export default function Friends() {
    const [menu, toggleMenu] = useState(headerMenu);

    const data = USERS;
    const onToggleMenu  = (activeMenu) => {
        const newMenu = {...menu};
        for(let k in newMenu){
            newMenu[k] = k === activeMenu
        }
        toggleMenu(newMenu);
    }
    return (
        <View style={styles.container}>

        <Header menu={menu} handleToggle={onToggleMenu} />
        <FlatList
        style={styles.userList}
        data={data}
        keyExtractor={(item) => item.uid.toString()}
        renderItem={({ item }) => <UserListItem user={item} />}
      />
      </View>
    );
  }
  

const UserListItemInfo = ({ user }) => (
    <TouchableOpacity style={styles.userListItemInfo}>
      <View style={styles.userMessageHeader}>
          <Text style={[styles.textGrey, styles.customFontRegular]}>
            <Text style={styles.textBold}>
              {user.firstName +
                " " +
                user.lastName}
            </Text>
          </Text>
        <Icon name="ios-send" color="#C0C0C0" size={20}/>

      </View>
      <View style={styles.timeAgo}>
        <Text style={[styles.textGreyWhite, styles.customFontRegular]}>@{user.username+ "  "}</Text>
        <Icon name="ios-lock" color="#C0C0C0" />
      </View>
    </TouchableOpacity>
  );
  const UserListItem = ({ user }) => (
    <View style={styles.userListItem} onPress={() => alert("pressed")}>
      <TouchableOpacity style={styles.userListItemAvatar}>
        <Image
          style={styles.userListItemAvatarImg}
          source={{
            uri:
              user.avatar
          }}
        />
      </TouchableOpacity>
      <UserListItemInfo user={user} />
    </View>
  );

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column",
        fontFamily: "sfpd-regular",
      },
    headerTab: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#F7F7F7",
        borderBottomWidth: .5,
      },
      headerTabTabs: {
        flex: 2,
        flexDirection: "row",
      },
      searchInput: {
        backgroundColor: "#F7F7F7",
        height:50,
        paddingLeft:5,
        paddingRight:5,
        flex:1
      },
      dimmedHeaderTab: {
        backgroundColor: "#FCFBFC",
      },
      dimmedHeaderTabText: {
        fontSize: 18,
        textTransform: "capitalize",
      },
      activeHeaderTab: {
        backgroundColor: "#0074E3",
      },
      activeHeaderTabText: {
        color: "white",
        fontSize: 18,
        textTransform: "capitalize",
      },
      tabsActions: {
        marginLeft: 10,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        minWidth: 50,
      },
      searchIcon: {
        backgroundColor: "#F7F7F7",
        height:50,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding:10
      },
    userList: {
      flex: 1,
      //backgroundColor: 'blue'
    },
    userListItem: {
      flex: 1,
      flexDirection: "row",
      padding:10
    },
    userListItemAvatar: {
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "row",
    },
    userListItemAvatarImg: {
      borderRadius: 40,
      width: 40,
      height: 40,
    },
    userListItemInfo: {
      flex: 4,
      borderBottomColor: "#F7F7F7",
      borderBottomWidth: 2,
      padding:5
    },
    userMessageHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    userIconButtons: {
      flexDirection: "row",
      height: 50,
      alignItems: "center",
    },
    userIconButton: {
      flexDirection: "row",
      marginLeft: 10,
      alignItems: "center",
    },
    userMessageBody: {},
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
  
