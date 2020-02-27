import React from 'react';
import { Text, StyleSheet, StatusBar, View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';


export default function App() {
  return (
    <View style={styles.main}>
    <Header 
      leftComponent={{ icon: 'home', color: '#fff' }}
      centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
      rightComponent={{ icon: 'info', color: '#fff' }}
      containerStyle={{backgroundColor: '#732673'}}
    />
      <View style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.balance}>$4250</Text>
        <Button title="Add expense" buttonStyle={styles.button} containerStyle={styles.buttonContainer}/>
        <Button title="Add recurring expense" buttonStyle={styles.button} containerStyle={styles.buttonContainer}/>
        <Button title="View monthly report" buttonStyle={styles.button} containerStyle={styles.buttonContainer}/>
      </View>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
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

const rightButtonConfig = {
  title: 'Review',
  handler: () => alert('rightBut!'),
};

const leftButtonConfig = {
  title: '$$$',
  handler: () => alert('leftBut!'),
};
