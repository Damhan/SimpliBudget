import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import {getStore, getPersistor} from './store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Expenditure from './screens/Expenditure';
import Report from './screens/Report';
import Settings from './screens/Settings';
import { PersistGate } from 'redux-persist/integration/react';
import RecurrExpenditure from './screens/RecurrExpenditure';


const Stack = createStackNavigator();

export default function App() {

  const navigationOptions = ({navigation}) => ({title: 'SimpliBudget', 
                              headerStyle: {
                              backgroundColor: '#FF1053',
                              },
                              headerRight: () => (
                              <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('Report')}
                              >
                                <Text style={{color:'#424242'}}> Reports </Text>
                              </TouchableOpacity>
                                ),
                              headerLeft: () => (
                                <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('Home')}
                              >
                                <Text style={{color:'#424242'}}> Home </Text>
                              </TouchableOpacity>
                                ),
                              headerTitleStyle: {
                                color: '#78FF10'
                              },
                              headerTitleAlign: 'center'
                              })
  const store = getStore();  
  const persistor = getPersistor();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={navigationOptions}
            />
            <Stack.Screen
              name="Expenditure"
              component={Expenditure}
              options={navigationOptions}
            />
            <Stack.Screen
              name="RecurrExpenditure"
              component={RecurrExpenditure}
              options={navigationOptions}
            />
            <Stack.Screen
              name="Report"
              component={Report}
              options={navigationOptions}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={navigationOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FF1053',
    padding: 10,
    borderRadius: 5,
  }
});