import React, { useState } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { setBal} from './../actions/balActions.js'
import { TextInput } from 'react-native-gesture-handler';


export default function Settings({navigation}) {

    const [balValue , onChangeText] = useState('')
    const dispatch = useDispatch();
  
    const addExpenditure = () => {
        dispatch(setBal(balValue))
        onChangeText("")
        navigation.navigate('Home')
    }


  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <StatusBar hidden />
        <TextInput
          style={{height:40, borderColor: 'gray', borderWidth:1}}
          value={balValue}
          onChangeText={text => onChangeText(text)}
        />
        <Button title="Update monthly balance" buttonStyle={styles.button} containerStyle={styles.buttonContainer} onPress={addExpenditure}/>
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