import React, { Component } from 'react';
import { View, Navigator } from 'react-native';
import { NavigationContainer, BaseRouter } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ProductDetail from '../ProductDetail/ProductDetail'

import HomeView from './HomeView'


const Stack = createStackNavigator();


export default class Home extends Component {
    render() {
        return (
            <Stack.Navigator >
                <Stack.Screen options={{
                    headerShown: false,
                }} name="HomeView">{props => <HomeView navigator={this.props.navigation} types={this.props.types} updateData={this.props.updateData} {...props}></HomeView>}
                </Stack.Screen>
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="ProductDetail">{props => <ProductDetail  navigator={this.props.navigation} product={this.props.navigation.product} {...props}></ProductDetail>}
                </Stack.Screen>
            </Stack.Navigator>
        )
    }
}