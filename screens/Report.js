import React, {useEffect, useState} from 'react';
import { StyleSheet, StatusBar, View, Text, AsyncStorage, Button, Dimensions } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {getExp, clearExp} from './../actions/expActions.js';
import _uniqueId from 'lodash/uniqueId';
import { getRecurrExp } from '../actions/recurrExpActions.js';
import { PieChart } from "react-native-chart-kit";

export default function Report() {

  const expR = useSelector(state => state.expR)
  const recurrExpR = useSelector(state => state.recurrExpR)
  const [piePieces, setPiePieces] = useState([]);
  const dispatch = useDispatch();

  const getAllExps = async () => {
    await dispatch(getExp())
    await dispatch(getRecurrExp())
  }

  const screenWidth = Dimensions.get("window").width

  const chartConfig ={
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
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
  }

  useEffect(() => {
    getAllExps()
    console.log(expR.cat)
    expR.catCounts.map(cat => {
        // console.log("For each")
        // console.log(cat)
        // console.log(expR.cat)
        // console.log(piePieces)
        console.log(cat.category, typeof cat.category)
        setPiePieces(piePieces => [...piePieces, {value: ((cat.count / expR.cat) * 100),
                                                  name: cat.category,
                                                  color: (cat.category.localeCompare("cat1") ? "green" : "yellow"),
                                                  legendFontColor: "black", legendFontSize: 15}
        ])
        //setPiePieces([...piePieces, {value: ((cat.count / expR.cat) * 100), name: cat.category, legendFontColor: "black", legendFontSize: 15}])
    })
  }, [])

  // Deprecated, saving for 
  const clearAsyncStorage = async() => {
      AsyncStorage.clear()
  }

  const clearExpTest = () => {
    dispatch(clearExp())
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <StatusBar hidden />
        <Text>CatCounts</Text>
        {
          expR.catCounts.map(cat => (
            <View key={_uniqueId()}>
                <Text>{cat.category}</Text>
                <Text>{cat.count}</Text>
            </View>
        ))
        }     
          <Button title="Delete" onPress={clearAsyncStorage}></Button>
          <PieChart
            //data={[{value: 50, name: "cat1", color: "green", legendFontColor: "red", legendFontSize: 15}, {value: 50, name: "cat2", color: "yellow",  legendFontColor: "blue", legendFontSize: 15}]}
            data={piePieces}
            width={220}
            height={screenWidth}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            
            
          />
          {console.log(piePieces)}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffe6',
  },
  main: {
    flex: 1,
  }
});