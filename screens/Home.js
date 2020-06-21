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
import { DATA } from '../data';

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
          
          <View style={styles.headerTabTitle}>
          <Icon name="ios-flash" color="#f1c40f" size={25} />
          <Text style={[styles.textLight, styles.textGrey]}> Recent transactions</Text>
        </View>
        <View style={styles.headerTabTabs}>
          {Object.keys(menu).map((k) => {
            return  (
              <TouchableOpacity
                onPress={()=>handleToggle(k)}
                key={k}
                style={[styles.tabsActions, menu[k] ?  styles.activeHeaderTab:styles.dimmedHeaderTab ]}
              >
                <Text
                  style={[menu[k] ? styles.activeHeaderTabText: [styles.dimmedHeaderTabText, styles.textGrey], styles.customFontRegular]}
                >
                  {k}
                </Text>
              </TouchableOpacity>
            ) 
          })}
        </View>
        
      </View>
    );
  };
  

export default function Home({ navigation }) {
    const [menu, toggleMenu] = useState(headerMenu);

    const data = menu.all ? DATA : (menu.sent ? DATA.filter(t=>t.type === 'SENT') : DATA.filter(t=>t.type === 'RECEIVED'));
    const onToggleMenu  = (activeMenu) => {
        const newMenu = {...menu};
        for(let k in newMenu){
            newMenu[k] = k === activeMenu
        }
        toggleMenu(newMenu);
    }
    return (
        <View style={styles.container}>
        <View style={styles.payment}>
            <View style={styles.paymentBalance}>
                <Text style={[styles.paymentH1, styles.textBlue]}>Your balance</Text>
                <Text style={[styles.paymentH2,styles.textGreen]}>$ 5250.2</Text>
            </View>
            <View style={styles.paymentInfo}>
                <TouchableOpacity style={styles.paymentActions}>
                    <Icon name="ios-paper" color="black" size={25} />

                    <Text style={[styles.paymentActionsText]}>Withdrawal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentActions}>
                    <Icon name="ios-share" color="#000" size={25} />
                    <Text style={[styles.paymentActionsText]}>Deposit</Text>
                </TouchableOpacity>
            </View>
            
        </View>
        <Header menu={menu} handleToggle={onToggleMenu} />
        
        <FlatList
        style={styles.transactionList}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TransactionListItem transaction={item} />}
      />
      </View>
    );
  }
  

const TransactionListItemInfo = ({ transaction }) => (
    <TouchableOpacity style={styles.transactionListItemInfo}>
      <View style={styles.transactionMessageHeader}>
        {transaction.type === "SENT" ? (
          <Text style={[styles.textGrey, styles.customFontRegular]}>
            You paid{" "}
            <Text style={styles.textBold}>
              {transaction.receiver.firstName +
                " " +
                transaction.receiver.lastName}
            </Text>
          </Text>
        ) : (
          <Text style={[styles.textGrey, styles.customFontRegular]}>
            <Text style={[styles.textBold, styles.customFontRegular]}>
              {transaction.sender.firstName + " " + transaction.sender.lastName}
            </Text>{" "}
            paid you
          </Text>
        )}
        <Text
          style={[
            transaction.type === "SENT" ? styles.textRed : styles.textGreen,
            styles.amountText,
            styles.customFontRegular,
          ]}
        >
          {" "}
          {transaction.type === "RECEIVED" ? "+ " : "- "}${transaction.amount}{" "}
        </Text>
      </View>
      <View style={styles.timeAgo}>
        <Text style={[styles.textGreyWhite, styles.customFontRegular]}>11m  </Text>
        <Icon name="ios-lock" color="#C0C0C0" />
      </View>
      {transaction.type === "RECEIVED" && (
        <View style={styles.transactionMessageBody}>
          <Text style={styles.customFontRegular}>{transaction.message}</Text>
        </View>
      )}
      <View style={styles.transactionIconButtons}>
        <TouchableOpacity style={styles.transactionIconButton}>
          <Icon name="ios-heart" color="#C93D57" size={15} />
  
          <Text style={styles.customFontRegular}> {transaction.likeCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.transactionIconButton}>
          <Icon name="ios-chatbubbles" color="#000" size={15} />
          <Text style={styles.customFontRegular}>
            {" "}
            {transaction.commentCount}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  const TransactionListItem = ({ transaction }) => (
    <View style={styles.transactionListItem} onPress={() => alert("pressed")}>
      <TouchableOpacity style={styles.transactionListItemAvatar}>
        <Image
          style={styles.transactionListItemAvatarImg}
          source={{
            uri:
              transaction.type === "SENT"
                ? transaction.sender.avatar
                : transaction.sender.avatar,
          }}
        />
      </TouchableOpacity>
      <TransactionListItemInfo transaction={transaction} />
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
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#F7F7F7",
        borderBottomWidth: 2,

      },
      headerTabTabs: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "flex-end"
      },
      dimmedHeaderTab: {
        backgroundColor: "#FCFBFC",
      },
      dimmedHeaderTabText: {
        fontSize: 14,
        textTransform: "capitalize",
      },
      activeHeaderTab: {
        backgroundColor: "#0074E3",
      },
      activeHeaderTabText: {
        color: "white",
        fontSize: 14,
        textTransform: "capitalize",
      },
      tabsActions: {
        marginLeft: 10,
        borderRadius: 20,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2.5,
        paddingBottom: 2.5,
      },
      headerTabTitle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      },
    transactionList: {
      flex: 1,
      //backgroundColor: 'blue'
    },
    transactionListItem: {
      flex: 1,
      flexDirection: "row",
    },
    transactionListItemAvatar: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    transactionListItemAvatarImg: {
      borderRadius: 50,
      width: 50,
      height: 50,
    },
    transactionListItemInfo: {
      flex: 4,
      borderBottomColor: "#F7F7F7",
      borderBottomWidth: 2,
    },
    transactionMessageHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    transactionIconButtons: {
      flexDirection: "row",
      height: 25,
      alignItems: "center",
    },
    transactionIconButton: {
      flexDirection: "row",
      marginLeft: 10,
      alignItems: "center",
    },
    transactionMessageBody: {},
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
    textBlue: {
        color: "#0074E3"
    },
    textWhite: {
        color: "#fff"
    },
    textLight: {
        fontFamily: "sfpd-light",
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
    payment: {
        padding:30,
        backgroundColor: "#f5f6fa",
    },
    paymentBalance:{
    },
    paymentInfo:{
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 10
    },
    paymentActions:{
        justifyContent: "center",
        alignItems: "center",
        borderWidth: .2,
        marginRight: 5,
        height: 100,
        width:100,
        elevation: 2

    },
    paymentActionsText: {
        fontFamily: "sfpd-light",
        fontSize: 12,
        fontWeight: "100"
    },
    paymentH1:{
        fontSize: 34,
        fontFamily: "sfpd-heavy",
        textAlign: "center"
    },
    paymentH2:{
        fontSize: 26,
        fontFamily: "sfpd-light",
        textAlign: "center"
    }
  });
  
