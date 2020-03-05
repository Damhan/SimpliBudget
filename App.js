import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, Button } from 'react-native';
import Home from './screens/Home';
import store from './store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Home"
              component={Home}
              options={{title: 'SimpliBudget', 
                        headerStyle: {
                        backgroundColor: '#732673',
                        },
                        headerRight: () => (
                        <Button
                          onPress={() => alert('This is a button!')}
                          title="Reports"
                          color="#993399"
                        />),
                        headerLeft: () => (
                        <Button
                          onPress={() => alert('This is a button!')}
                          title="Home"
                          color="#993399"
                        />),
                        headerTitleStyle: {
                          color: 'white'
                        },
                        headerTitleAlign: 'center'
                        }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>


  );
}


const styles = StyleSheet.create({

  app: {
    flex: 1,
  },
});