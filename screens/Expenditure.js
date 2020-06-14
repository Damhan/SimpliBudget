import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Picker, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {getExp} from './../actions/expActions.js';
import { Button } from 'react-native-elements';
import { addExp} from './../actions/expActions.js'
import { TextInput } from 'react-native-gesture-handler';


export default function Expenditure() {

    const [expValue, onChangeText] = useState('')
    const [catValue, onChangeCat] = useState('house')
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getExp())
    },[])
  
    const addExpenditure = () => {
        const exp = {
          //uuid cannot currently be used with expo due to expo not being compatible with crypto.getRandomValues.
          //the new uuid cannot function without it, a polyfill, react-native-get-random-values does not work with expo as it requires native code.
          //See https://github.com/expo/expo/issues/7209
          //Math.random() used as temporary workaround.
          id: Math.random(),
          amount:expValue,
          category:catValue
        }
        dispatch(addExp(exp))
        onChangeText("")
    }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <StatusBar hidden />
        <TextInput
          style={{height:40, borderColor: 'gray', borderWidth:1}}
          value={expValue}
          onChangeText={text => onChangeText(text)}
        />
        <Picker
          selectedValue={catValue}
          style={{height:40, borderColor: 'gray', borderWidth:1}}
          value={catValue}
          onValueChange={cat => onChangeCat(cat)}>
            <Picker.Item label="Housing" value="house" />
            <Picker.Item label="Transport" value="transport" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Utilities" value="utilities" />
            <Picker.Item label="Clothing" value="clothing" />

        </Picker>
        <Button title="Add" buttonStyle={styles.button} containerStyle={styles.buttonContainer} onPress={addExpenditure}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  main: {
    flex: 1,
  },
  navbar: {
    flex:1,
  },
  buttonContainer: {
    paddingTop: '5%',
  },
  button: {
    backgroundColor: '#FF1053',
  }
});