import React, {useEffect, useState} from 'react';
import { StyleSheet, StatusBar, View, Text, AsyncStorage, Button, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {getExp, clearExp} from './../actions/expActions.js';
import _uniqueId from 'lodash/uniqueId';
import _ from 'lodash';
import { getRecurrExp } from '../actions/recurrExpActions.js';
import { PieChart, BarChart } from "react-native-chart-kit";

export default function Report() {

  /* State variables for our reducers */
  const expR = useSelector(state => state.expR)
  const recurrExpR = useSelector(state => state.recurrExpR)

  /* State variables for our exp & recur exp charts */
  const [piePieces, setPiePieces] = useState([]);
  const [expChartSum, setExpChartSum] = useState([]);
  const [recurrChartSum, setRecurrChartSum] = useState([]);
  const [recurrPiePieces, setRecurrPiePieces] = useState([]);

  /* State variables for ensuring categories initialized before trying to plot chart */
  const[categoriesInitialized, setCategoriesInitialized] = useState(false);
  const[recurrCategoriesInitialized, setRecurrCategoriesInitialized] = useState(false);

  /* State variables for dispatcher */
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

  const categories = {
    "house": {
      name: "Housing",
      color: "hotpink"
    },
    "transport": {
      name: "Transportation",
      color: "gainsboro"
    },
    "food": {
      name: "Food",
      color: "deepskyblue"
    },
    "utilities": {
      name: "Utilities",
      color: "blanchedalmond"
    },
    "clothing": {
      name: "Clothing",
      color: "lightsalmon"
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
        var category = cat.category
        setPiePieces(piePieces => [...piePieces, {value: ((cat.count / expR.cat) * 100),
                                                  //  name: (cat.category.localeCompare("cat1") ? "Category 2" : "Category 1"),
                                                  name: categories[category].name,
                                                  color: categories[category].color,
                                                  legendFontColor: "black", legendFontSize: 15}
        ])
        var total = 0
        expR.exps.map(exp => {
          if (exp.category === cat.category) {
            total += exp.amount
          }
        })
        setExpChartSum(expChartSum => [...expChartSum, total])
    })
    /* Create our piePieces array for piechart's data prop */
    recurrExpR.recurrCatCounts.map(cat => {
      var category = cat.category
      setRecurrPiePieces(recurrPiePieces => [...recurrPiePieces, {value: ((cat.count / recurrExpR.cat) * 100),
                                                                  name: categories[category].name,
                                                                  color: categories[category].color,
                                                                  legendFontColor: "black", legendFontSize: 15}
        ])
        var total = 0
        recurrExpR.recurrExps.map(recurrExp => {
          if (recurrExp.category === cat.category) {
            total += recurrExp.amount
          }
        })
        setRecurrChartSum(recurrChartSum => [...recurrChartSum, total])
    })

    /* Update state variables with value from reducer. */
    setCategoriesInitialized(expR.catsInitialized)
    setRecurrCategoriesInitialized(recurrExpR.recurrCatsInitialized)



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

          {/* EXPENDITURE AND RECURRING EXPENDITURE PIE CHART JSX*/}
          <Text style={styles.heading}>Expenditure breakdown</Text>
          {
          !(categoriesInitialized == true) ? <Text style={styles.warning}>Add some expenses to view statistics</Text> :
          (<PieChart
            data={piePieces}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent" 
          />)
          }

          <Text style={styles.heading}>Recurring expenditure breakdown</Text>
          { 
          !(recurrCategoriesInitialized == true) ? (<Text style={styles.warning}>Add some expenses to view statistics</Text>) : 
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


          {/* EXPENDITURE AND RECURRING EXPENDITURE BAR CHART JSX */}
          <Text style={styles.heading}>Expenditure itemization</Text>
          {expChartSum.reduce((a,b) => a+b,0) === 0 ? (<Text style={styles.warning}>Add some expenses to view statistics</Text>) : 
          (
          <BarChart
            data={{
              labels: ["Housing", "Transportation", "Food", "Utilities", "Clothing"],
              datasets: [
                {
                  data: expChartSum
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
          )}
          
          <Text style={styles.heading}>Recurring expenditure itemization</Text>
          {recurrChartSum.reduce((a,b) => a+b,0) === 0 ? (<Text style={styles.warning}>Add some expenses to view statistics</Text>) : 
          (
          <BarChart
            data={{
              labels: ["Housing", "Transportation", "Food", "Utilities", "Clothing"],
              datasets: [
                {
                  data: recurrChartSum
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
          )}
          
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
  },
  heading: {
    color: "#FF1053",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  },
  warning: {
    color: "#acacac",
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 10
  }
});