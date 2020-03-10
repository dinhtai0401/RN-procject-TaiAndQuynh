import React, { Component } from 'react';
import { ScrollView } from 'react-native';


import TopProduct from './TopProduct';

export default class HomeView extends Component {
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#DBDBD8' }}>
                <TopProduct navigator={this.props.navigation} updateData={this.props.updateData} types={this.props.types} />
            </ScrollView>
        )
    }
}