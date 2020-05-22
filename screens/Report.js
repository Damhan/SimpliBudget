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
  const [recurrPiePieces, setRecurrPiePieces] = useState([]);
  const dispatch = useDispatch();

  /* Exp Pie Chart Props */
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

  const getAllExps = () => {
    dispatch(getExp())
    dispatch(getRecurrExp())
  }


  useEffect(() => {
    getAllExps()

    /* Create our piePieces array for piechart's data prop */
    expR.catCounts.map(cat => {

        setPiePieces(piePieces => [...piePieces, {value: ((cat.count / expR.cat) * 100),
                                                  name: cat.category,
                                                  color: (cat.category.localeCompare("cat1") ? "green" : "yellow"),
                                                  legendFontColor: "black", legendFontSize: 15}
        ])
    })
    /* Create our piePieces array for piechart's data prop */
    recurrExpR.recurrCatCounts.map(cat => {

      setRecurrPiePieces(recurrPiePieces => [...recurrPiePieces, {value: ((cat.count / recurrExpR.cat) * 100),
                                                name: cat.category,
                                                color: (cat.category.localeCompare("cat1") ? "green" : "yellow"),
                                                legendFontColor: "black", legendFontSize: 15}
        ])
    })
  }, [])

  // Used for dev-testing to clear the async storage.
  const clearAsyncStorage = async() => {
      AsyncStorage.clear()
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <StatusBar hidden />
          <Button title="Delete" onPress={clearAsyncStorage}></Button>
          <Text>Expenditure breakdown</Text>
          <PieChart
            data={piePieces}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent" 
          />

          <Text>Recurring expenditure breakdown</Text>
          <PieChart
            data={recurrPiePieces}
            width={screenWidth}
            height={200}
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