import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Drawer from 'react-native-drawer'


import Menu from './Menu'
import Shop from './Shop/Shop'



export default class Main extends Component {
    state = {}
    static router = Menu.router;

    closeControlPanel = () => {
        this.drawer.close()
    };
    openControlPanel = () => {
        this.drawer.open()
    };

    gotoAuthentication = () => {
        this.props.navigation.navigate("AuthDemo")
    }

    gotoAddProduct = () => {
        this.props.navigation.navigate("AddProduct")
    }

    gotoEditProduct = () => {
        this.props.navigation.navigate("EditProduct")
    }


    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref }}
                content={<Menu
                    gotoAuthentication={this.gotoAuthentication.bind(this)}
                    gotoAddProduct={this.gotoAddProduct.bind(this)}
                    gotoEditProduct={this.gotoEditProduct.bind(this)}
                />}
                openDrawerOffset={0.4}
                tapToClose={true}
            >
                <Shop open={this.openControlPanel.bind(this)} />
            </Drawer>
        )
    }
}