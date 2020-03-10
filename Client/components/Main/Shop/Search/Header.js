import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, TextInput, StyleSheet } from 'react-native';
import global from '../../../History/global'

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            txtSearch: ''
        }
    }

    onSearch(){
        const {txtSearch} = this.state;
        return fetch('http://localhost:4000/post/' + txtSearch)
            .then((response) => response.json())
            .then((responseJson) => {
                global.setArraySearch(responseJson)
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
    
   

    render() {
        const { wapper, row1, textInput, iconStyle, titleStyle, warpperSearch, selectBox } = styles
        return (
            <View style={wapper}>
                <View style={row1}>
                    <TouchableOpacity onPress={this.props.openMenu}>
                        <Image style={iconStyle} source={{ uri: 'http://icon-library.com/images/icon-menu-png/icon-menu-png-25.jpg' }} />
                    </TouchableOpacity>
                    <Text style={titleStyle}>Second Hand Shop</Text>
                    <Image style={iconStyle} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/pretty-office-part-11-shadow-style/512/shop.png' }} />
                </View>
                <View style={warpperSearch}>
                    <TextInput
                        placeholder="What do you want?"
                        style={textInput} 
                        onChangeText={text => this.setState({txtSearch: text})}
                        onSubmitEditing={this.onSearch.bind(this)}
                        />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    wapper: { height: height / 7, backgroundColor: '#FFA500', padding: 10 },
    row1: { flexDirection: 'row', justifyContent: 'space-between' },
    textInput: { height: height / 23, backgroundColor: '#FFF', paddingLeft: 10, width: width / 1.05 },
    iconStyle: { width: 50, height: 50 },
    titleStyle: { color: "#FFF", fontFamily: 'Avenir', fontSize: 25 },
    warpperSearch: { flexDirection: 'row' },
    selectBox: { backgroundColor: '#FFF', width: width / 4, padding: 10, borderRightWidth: 3, height: height / 23, }
})

