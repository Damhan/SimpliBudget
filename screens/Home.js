import React, {useEffect} from 'react';
import { Text, StyleSheet, StatusBar, View } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import { Button } from 'react-native-elements';
import {getBal} from './../actions/balActions.js';
import { getExp, clearExp, setClear } from '../actions/expActions.js';
import { getRecurrExp } from '../actions/recurrExpActions.js';


export default function Home({navigation}) {

  const balR = useSelector(state => state.bal)
  const expR = useSelector(state => state.expR)
  const recurrExpR = useSelector(state => state.recurrExpR)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBal())
    dispatch(getExp())
    dispatch(getRecurrExp())
    var d = new Date();
    var n = d.getMonth() + 1;
    if (expR.lastClear < n) {
      dispatch(clearExp())
      dispatch(setClear(n))
    }
  },[])

  const expTotal =  expR.exps.reduce(function (sum, exp) {
    return sum + parseInt(exp.amount);
  }, 0);

  const recurrExpTotal = recurrExpR.recurrExps.reduce(function (sum, recurr) {
    console.log(recurr)
    return sum + parseInt(recurr.amount)
  }, 0);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.balance}>${balR.balance - expTotal - recurrExpTotal}</Text>
        <Button title="Add expense" buttonStyle={styles.button} containerStyle={styles.buttonContainer} onPress={() => navigation.navigate('Expenditure')}/>
        <Button title="Add recurring expense" buttonStyle={styles.button} containerStyle={styles.buttonContainer} onPress={() => navigation.navigate('RecurrExpenditure')}/>
        <Button title="View monthly report" buttonStyle={styles.button} containerStyle={styles.buttonContainer} onPress={() => navigation.navigate('Report')}/>
        <Button title="Settings" buttonStyle={styles.button} containerStyle={styles.buttonContainer} onPress={() => navigation.navigate('Settings')}/>

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
  },
  navbar: {
    flex:1,
  },
  balance: {
    textAlign: 'center',
    color: '#732673',
    fontSize: 50,
    paddingBottom: '20%'
  },
  buttonContainer: {
    paddingTop: '5%',
  },
  button: {
    backgroundColor: '#993399'
  }
});