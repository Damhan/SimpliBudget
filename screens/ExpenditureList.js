import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, View, Picker, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {getExp, delExp} from './../actions/expActions.js';
import {getRecurrExp, delRecurrExp} from './../actions/recurrExpActions.js'
import { AntDesign } from '@expo/vector-icons';


export default function ExpenditureList() {

    const expR = useSelector(state => state.expR)
    const recurrExpR = useSelector(state => state.recurrExpR)

    const categories = {
        "house": {
          name: "Housing",
        },
        "transport": {
          name: "Transportation",
        },
        "food": {
          name: "Food",
        },
        "utilities": {
          name: "Utilities",
        },
        "clothing": {
          name: "Clothing",
        }
      }

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getExp())
      dispatch(getRecurrExp())
    },[])

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.title}>Expenditure:</Text>
        { expR.exps.length > 0 ? (
            expR.exps.map(exp => (
                <View key={exp.id} style={styles.exp}>
                    <Text style={styles.expItem}>Amount: {exp.amount}</Text>
                    <Text style={styles.expItem}>Category: {categories[exp.category].name}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {dispatch(delExp(exp))}}>
                        <AntDesign name="delete" size={24} color="#424242" />
                    </TouchableOpacity>
                </View>
            ))) : <Text style={styles.warning}>You haven't spent anything!</Text>
        }
        <Text style={styles.title}>Recurring Expenditure:</Text>
        { recurrExpR.recurrExps.length > 0 ? (
            recurrExpR.recurrExps.map(recurrExp => (
                <View key={recurrExp.id} style={styles.exp}>
                    <Text style={styles.expItem}>Amount: {recurrExp.amount}</Text>
                    <Text style={styles.expItem}>Category: {categories[recurrExp.category].name}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {dispatch(delRecurrExp(recurrExp))}}>
                        <AntDesign name="delete" size={24} color="#424242" />
                    </TouchableOpacity>
                </View>
            ))) : <Text style={styles.warning}>You haven't added any recurring expenses!</Text>
        }
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    alignItems:"center"
  },
  exp: {
    flexDirection:"row",
    backgroundColor: "#FF1053",
    borderTopColor: '#FAFAFA',
    borderTopWidth: 1,
    borderRadius:1,
    width:"95%",
    justifyContent:"center"
    
  },
  expItem: {
      padding:13,
      color: "#424242",
      fontSize:12,
      width:"45%"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FF1053',
    padding: 10,
  },
  title:{
      width:"100%",
      color: "#FF1053",
      paddingTop: 10,
      paddingBottom:10,
      textAlign:"center",
      borderWidth:1,
      borderColor:"#FAFAFA"
  },
  warning: {
    color: "#acacac",
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 13,
    padding:10
  }
});