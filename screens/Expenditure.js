import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, Picker } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { addExp} from './../actions/expActions.js'
import { TextInput } from 'react-native-gesture-handler';


export default function Expenditure() {

    const [expValue, onChangeText] = useState('')
    const [catValue, onChangeCat] = useState('cat1')
    const dispatch = useDispatch();
  
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
            <Picker.Item label="cat1" value="Category 1" />
            <Picker.Item label="cat2" value="Category 2" />
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
    backgroundColor: '#ffffe6',
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
    backgroundColor: '#993399'
  }
});