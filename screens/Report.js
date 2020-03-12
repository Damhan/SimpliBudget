import React, {useEffect} from 'react';
import { StyleSheet, StatusBar, View, Text, AsyncStorage, Button } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {getExp} from './../actions/expActions.js';
import _uniqueId from 'lodash/uniqueId';

export default function Report() {

  const expR = useSelector(state => state.expR)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExp())
  },[])

  clearAsyncStorage = async() => {
      AsyncStorage.clear()
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <StatusBar hidden />
        <Button title="Delete" onPress={clearAsyncStorage}></Button>
        {expR.exps.map(exp => (
            <View key={_uniqueId()}>
                <Text>{exp.id}</Text>
                <Text>{exp.amount}</Text>
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