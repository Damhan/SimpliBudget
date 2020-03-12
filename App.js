import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, Button } from 'react-native';
import {getStore, getPersistor} from './store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Expenditure from './screens/Expenditure';
import Report from './screens/Report';
import Settings from './screens/Settings';
import { PersistGate } from 'redux-persist/integration/react';


const Stack = createStackNavigator();

export default function App() {

  const navigationOptions = ({navigation}) => ({title: 'SimpliBudget', 
                              headerStyle: {
                              backgroundColor: '#732673',
                              },
                              headerRight: () => (
                              <Button
                                onPress={() => navigation.navigate('Report')}
                                title="Reports"
                                color="#993399"
                              />),
                              headerLeft: () => (
                              <Button
                                onPress={() => navigation.navigate('Home')}
                                title="Home"
                                color="#993399"
                              />),
                              headerTitleStyle: {
                                color: 'white'
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
});