import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, AsyncStorage, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { setBal} from './../actions/balActions.js'
import { TextInput } from 'react-native-gesture-handler';


export default function Settings({navigation}) {

    const [balValue , onChangeText] = useState('')
    const dispatch = useDispatch();
  
    const addExpenditure = () => {
        if (!isNaN(balValue) && balValue) {
          dispatch(setBal(balValue))
          onChangeText("")
          navigation.navigate('Home')
        }
        else {
          Alert.alert("Invalid Value!", "Balance must be a numerical value only. \nEG: 2000")
        }

    }

      // Used for dev-testing to clear the async storage.
    const clearAsyncStorage = async() => {
      AsyncStorage.clear()
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
        <Button title="Update Monthly Balance" buttonStyle={styles.button} containerStyle={styles.buttonContainer} onPress={addExpenditure}/>
        <Button title="Clear All App Data" buttonStyle={styles.button}  containerStyle={styles.delButtonContainer} onPress={clearAsyncStorage}></Button>
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
    paddingTop: '3%',
  },
  delButtonContainer: {
    paddingTop: '10%',
  },
  button: {
    backgroundColor: '#FF1053'
  }
});