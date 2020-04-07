import React, {useEffect} from 'react';
import { StyleSheet, StatusBar, View, Text, AsyncStorage, Button } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {getExp, clearExp} from './../actions/expActions.js';
import _uniqueId from 'lodash/uniqueId';
import { getRecurrExp } from '../actions/recurrExpActions.js';

export default function Report() {

  const expR = useSelector(state => state.expR)
  const recurrExpR = useSelector(state => state.recurrExpR)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExp())
    dispatch(getRecurrExp())
  },[])

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
        <Button title="Delete" onPress={clearAsyncStorage}></Button>
        <Text>Expenditures</Text>
        {expR.exps.map(exp => (
            <View key={_uniqueId()}>
                <Text>{exp.id}</Text>
                <Text>{exp.amount}</Text>
                <Text>{exp.category}</Text>
            </View>
        ))}
        <Text>Recurring Expenditures</Text>
        {recurrExpR.recurrExps.map(recurr => (
            <View key={_uniqueId()}>
                <Text>{recurr.id}</Text>
                <Text>{recurr.amount}</Text>
                <Text>{recurr.category}</Text>
            </View>
        ))}
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