import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, Picker } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { addRecurrExp} from './../actions/recurrExpActions.js'
import { TextInput } from 'react-native-gesture-handler';


export default function RecurrExpenditure({navigation}) {

    const [recurrValue, onChangeText] = useState('')
    const [catValue, onChangeCat] = useState('house')
    const dispatch = useDispatch();
  
    const addRecurringExpenditure = () => {
        const recurr = {
          //uuid cannot currently be used with expo due to expo not being compatible with crypto.getRandomValues.
          //the new uuid cannot function without it, a polyfill, react-native-get-random-values does not work with expo as it requires native code.
          //See https://github.com/expo/expo/issues/7209
          //Math.random() used as temporary workaround.
          id: Math.random(),
          amount:recurrValue,
          category:catValue
        }
        dispatch(addRecurrExp(recurr))
        onChangeText("")
        navigation.navigate('Home')
    }


  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <StatusBar hidden />
        <TextInput
          style={{height:40, borderColor: 'gray', borderWidth:1}}
          value={recurrValue}
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
        <Button title="Add Recurring Expenditure" buttonStyle={styles.button} containerStyle={styles.buttonContainer} onPress={addRecurringExpenditure}/>
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
    backgroundColor: '#FF1053'
  }
});