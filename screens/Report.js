import React from 'react'
import { Text, View,StyleSheet, Dimensions } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native-gesture-handler';

  const headerMenu = {
    daily: true,
    weekly: false,
    monthly: false,
  };
const Header = ({menu, handleToggle}) => {
  
    return (
      <View style={styles.headerTab}>
          
          <View style={styles.headerTabTitle}>
          <Icon name="ios-analytics" color="#f1c40f" size={25} />
          <Text style={[styles.textLight, styles.textGrey]}> Recent transactions</Text>
        </View>
        <View style={styles.headerTabTabs}>
          {Object.keys(menu).map((k) => {
            return  (
              <TouchableOpacity
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


export default function Report() {
    return (
        <View style={styles.container}>
            <Header menu={headerMenu}/>
        <View style={styles.chartView}>
        <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={Dimensions.get("window").height/2.5}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#0074E3",
      backgroundGradientTo: "#000",
      backgroundGradientFrom: "#0074E3",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      //borderRadius: 16,
    }}
  />
        </View>

        <View style={styles.payment}>
            <View style={styles.paymentBalance}>
                <Text style={[styles.paymentH1, styles.textBlue]}>Your wallet</Text>
                <Text style={[styles.paymentH2,styles.textGreen]}>$ 5250.2</Text>
                
            </View>
            <View style={styles.paymentBalance}>
                <Text style={[styles.paymentH1, styles.textBlue]}>Transactions</Text>
                <Text style={[styles.paymentH2,styles.textGreen]}>20</Text>
            </View>
            
        </View>
        <View style={styles.payment}>
            <View style={styles.paymentBalance}>
                <Text style={[styles.paymentH1, styles.textBlue]}>Expenses</Text>
                <Text style={[styles.paymentH2,styles.textGreen]}>$ 250.2</Text>
            </View>
            <View style={styles.paymentBalance}>
                <Text style={[styles.paymentH1, styles.textBlue]}>Upcoming</Text>
                <Text style={[styles.paymentH2,styles.textGreen]}>$ 50.2</Text>
            </View>
            
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column",
        fontFamily: "sfpd-regular",
      },
      payment: {
        flexDirection: "row",
        padding: 10,
        flex:1
              
      
        
    },
    paymentBalance:{
        flex:1,
        borderWidth: 0.25,
        justifyContent: "center",
        borderRadius: 16,
        marginLeft: 5,
        backgroundColor: "white",
        
    },
    paymentInfo:{
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 10
    },
    paymentActions:{
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        marginRight: 5,
        height: 100,
        elevation: 2

    },
    paymentActionsText: {
        fontFamily: "sfpd-light",
        fontSize: 12,
        fontWeight: "100"
    },
    paymentH1:{
        fontSize: 18,
        fontFamily: "sfpd-heavy",
        textAlign: "center"
    },
    paymentH2:{
        fontSize: 14,
        fontFamily: "sfpd-light",
        textAlign: "center"
    },
    chartView: {
        backgroundColor: "yellow",
        width:Dimensions.get("window").width,

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
});
