import React, { Component } from 'react'
import { Text, View, Navigator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Main from './Main/Main'
import AuthDemo from './Authentication/AuthDemo'



const Stack = createStackNavigator();




export default class StackNavigation extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main">{props => <Main  {...props}></Main>}</Stack.Screen>
          <Stack.Screen name="AuthDemo">{props => <AuthDemo apiURI='http://localhost:4000' {...props}></AuthDemo>}</Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
