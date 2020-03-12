import React, { useState } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { subBal} from './../actions/balActions.js';
import { addExp} from './../actions/expActions.js'
import { TextInput } from 'react-native-gesture-handler';


export default function Expenditure() {

    const [expValue, onChangeText] = useState('')
    const dispatch = useDispatch();
  
    const addExpenditure = () => {
        dispatch(subBal(expValue))
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