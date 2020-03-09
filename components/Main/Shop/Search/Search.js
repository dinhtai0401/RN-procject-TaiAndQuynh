import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ProductDetail from '../ProductDetail/ProductDetail'
import SearchView from './SearchView'

const Stack = createStackNavigator();

export default class Search extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen options={{
                    headerShown: false,
                }}
                    name="SearchView">{props => <SearchView navigator={this.props.navigation} {...props}></SearchView>}
                </Stack.Screen>
                <Stack.Screen options={{
                    headerShown: false,
                }}
                    name="ProductDetail">{props => <ProductDetail  {...props}></ProductDetail>}
                </Stack.Screen>
            </Stack.Navigator>
        )
    }
}