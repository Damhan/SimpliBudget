import React, {useEffect, useState} from 'react';
import { StyleSheet, StatusBar, View, Text, AsyncStorage, Button, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {getExp, clearExp} from './../actions/expActions.js';
import _uniqueId from 'lodash/uniqueId';
import _ from 'Lodash';
import { getRecurrExp } from '../actions/recurrExpActions.js';
import { PieChart, BarChart } from "react-native-chart-kit";

export default function Report() {

  const expR = useSelector(state => state.expR)
  const recurrExpR = useSelector(state => state.recurrExpR)

  /* State variables for our exp & recur exp charts */
  const [piePieces, setPiePieces] = useState([]);
  const [expSums, setExpSums] = useState({
    labels: [],
    datasets: [ { data: [] } ] })
  const [recurrPiePieces, setRecurrPiePieces] = useState([]);
  const dispatch = useDispatch();

  /* Exp Pie Chart Props */
  const screenWidth = Dimensions.get("window").width
  const chartConfig ={
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "sandybrown",
    backgroundGradientTo: "#98FF3D",
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
                                                  color: (cat.category.localeCompare("cat1") ? "salmon" : "sandybrown"),
                                                  legendFontColor: "black", legendFontSize: 15}
        ])
    })
    /* Create our piePieces array for piechart's data prop */
    recurrExpR.recurrCatCounts.map(cat => {

      setRecurrPiePieces(recurrPiePieces => [...recurrPiePieces, {value: ((cat.count / recurrExpR.cat) * 100),
                                                name: cat.category,
                                                color: (cat.category.localeCompare("cat1") ? "salmon" : "sandybrown"),
                                                legendFontColor: "black", legendFontSize: 15}
        ])
    })

    /* Sum the total spent on each category for our bar chart. */
    /* TODO: Implement this bar chart data setup */

  }, [])

  // Used for dev-testing to clear the async storage.
  const clearAsyncStorage = async() => {
      AsyncStorage.clear()
  }

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={styles.container}>
        <StatusBar hidden />
          {/* <Button title="Delete" onPress={clearAsyncStorage}></Button> */}
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

          <Text>Expenditure itemization:</Text>

          <BarChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43]
                }
              ]
            }}
            width={screenWidth}
            height={220}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />

          {expR.exps.map((exp) => (
            <View key={_uniqueId()}>
              <Text>{exp.category}</Text>
              <Text>{exp.amount}</Text>
            </View>
          ))}

          {console.log(piePieces)}
          {console.log(expR.exps)}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  }
});