import React, {useEffect, useState} from 'react';
import { StyleSheet, StatusBar, View, Text, AsyncStorage, Button, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {getExp, clearExp} from './../actions/expActions.js';
import _uniqueId from 'lodash/uniqueId';
import _ from 'lodash';
import { getRecurrExp } from '../actions/recurrExpActions.js';
import { PieChart, BarChart } from "react-native-chart-kit";

export default function Report() {

  const expR = useSelector(state => state.expR)
  const recurrExpR = useSelector(state => state.recurrExpR)

  /* State variables for our exp & recur exp charts */
  const [piePieces, setPiePieces] = useState([]);
  const [expSum, setExpSum] = useState(0)
  const [cat2Sum, setCat2Sum] = useState(0)
  const [recurrSum, setRecurrSum] = useState(0)
  const [recurrCat2Sum, setRecurrCat2Sum] = useState(0)
  const [recurrPiePieces, setRecurrPiePieces] = useState([]);
  const dispatch = useDispatch();

  /* Exp Pie Chart Props */
  const screenWidth = Dimensions.get("window").width
  const chartConfig ={
    backgroundGradientFrom: "#FAFAFA",
    backgroundGradientTo: "#ff1053",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 16, 83, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }

  /* Exp Bar Chart Props */
  const cat1Reducer = (accumulator, currentValue) => currentValue.category.localeCompare("cat1") ? accumulator + currentValue.amount : accumulator

  const getAllExps = () => {
    dispatch(getExp())
    dispatch(getRecurrExp())
  }


  useEffect(() => {
    getAllExps()

    /* Create our piePieces array for piechart's data prop */
    expR.catCounts.map(cat => {

        setPiePieces(piePieces => [...piePieces, {value: ((cat.count / expR.cat) * 100),
                                                  name: (cat.category.localeCompare("cat1") ? "Category 2" : "Category 1"),
                                                  color: (cat.category.localeCompare("cat1") ? "#FF1053" : "#a5ff60"),
                                                  legendFontColor: "black", legendFontSize: 15}
        ])
    })
    /* Create our piePieces array for piechart's data prop */
    recurrExpR.recurrCatCounts.map(cat => {

      setRecurrPiePieces(recurrPiePieces => [...recurrPiePieces, {value: ((cat.count / recurrExpR.cat) * 100),
                                                name: (cat.category.localeCompare("cat1") ? "Category 2" : "Category 1"),
                                                color: (cat.category.localeCompare("cat1") ? "#FF1053" : "#a5ff60"),
                                                legendFontColor: "black", legendFontSize: 15}
        ])
    })

    /* Sum the total spent on each category for our bar chart. */
    /* TODO: Implement this bar chart data setup */
    expR.exps.map(exp => {
      console.log(exp)
      setExpSum(expSum => exp.category.localeCompare("cat1") ? parseInt(expSum) : (parseInt(expSum) + parseInt(exp.amount)) )
      setCat2Sum(cat2Sum => exp.category.localeCompare("cat2") ? parseInt(cat2Sum) : (parseInt(cat2Sum) + parseInt(exp.amount)) )

    })

    recurrExpR.recurrExps.map(recurrExp => {
      setRecurrSum(recurrSum => recurrExp.category.localeCompare("cat1") ? parseInt(recurrSum) : (parseInt(recurrSum) + parseInt(recurrExp.amount)) )
      setRecurrCat2Sum(recurrCat2Sum => recurrExp.category.localeCompare("cat2") ? parseInt(recurrCat2Sum) : (parseInt(recurrCat2Sum) + parseInt(recurrExp.amount)) )
    })



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
          {piePieces.length < 2 ? null :
          (<PieChart
            data={piePieces}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent" 
          />)
          }

          <Text>Recurring expenditure breakdown</Text>
          {recurrPiePieces.length < 2 ? null : 
          (
          <PieChart
            data={recurrPiePieces}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent" 
          />
          )}

          <Text style={{marginTop:10, marginBottom:10}}>Expenditure itemization</Text>
          <BarChart
            data={{
              labels: ["Category 1", "Category 2"],
              datasets: [
                {
                  data: [expSum, cat2Sum]
                }
              ]
            }}
            width={screenWidth}
            height={200}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            fromZero={true}
          />

          <Text style={{marginTop:10, marginBottom:10}}>Recurring expenditure itemization</Text>
          <BarChart
            data={{
              labels: ["Category 1", "Category 2"],
              datasets: [
                {
                  data: [recurrSum, recurrCat2Sum]
                }
              ]
            }}
            width={screenWidth}
            height={200}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            fromZero={true}
          />

          {/* {expR.exps.map((exp) => (
            <View key={_uniqueId()}>
              <Text>{exp.category}</Text>
              <Text>{exp.amount}</Text>
            </View>
          ))} */}

          {console.log(piePieces)}
          {console.log(expSum)}
          {console.log(cat2Sum)}
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