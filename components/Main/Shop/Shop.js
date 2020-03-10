import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Home from './Home/Home'
import AddToCart from './AddToCart/AddToCart'
import Contact from './Contact/Contact'
import Search from './Search/Search'
import Header from './Search/Header'
import { Ionicons } from 'react-native-vector-icons';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import global from '../../History/global';

const Tab = createBottomTabNavigator();

export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: []
        }
        global.updateData = this.updateData.bind(this);
    }

    componentDidMount() {
        return fetch('http://localhost:4000/post')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    types: responseJson,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }
    updateData = () => {
        fetch('http://localhost:4000/post', {
            method: 'GET',
        })
            .then(response => {
                if (response.ok == false) {
                    throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
                }
                //console.log(response);
                return response.json();

            })
            .then(json => {
                console.log("product in app")
                console.log(json)
                this.setState({ types: json });
                //console.log(this.state.products);
            })
            .catch(error => {
                console.log("Error message:")
                console.log(error.message)
            });
    }

    openMenu() {
        const { open } = this.props;
        open();
    }

    

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header openMenu={this.openMenu.bind(this)} />
                <Tab.Navigator>
                    <Tab.Screen
                        name="Home"
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="ios-home" color={color} size={size} />)
                        }}
                    >
                        {props => <Home types={this.state.types}{...props} />}
                    </Tab.Screen>
                    <Tab.Screen
                        name="AddToCart"
                        component={AddToCart}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="ios-cart" color={color} size={size} />)
                        }}
                    />
                    <Tab.Screen
                        name="Search"
                        component={Search}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="ios-pricetag" color={color} size={size} />)
                        }}
                    />
                    <Tab.Screen
                        name="Contact"
                        component={Contact}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="ios-pin" color={color} size={size} />)
                        }}
                    />
                </Tab.Navigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    iconStyle: { fontSize: 20 }
})