import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import { BaseRouter } from '@react-navigation/native';


const { height, width } = Dimensions.get('window');

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    gotoDetail(product) {
        const { navigator } = this.props;
        navigator.navigate('ProductDetail', product)
    }
    
    render() {
        const { productDate, container, iconStyle, body, productContainer, titleContainer, title, productName, productPrice } = styles
        return (
            <View style={container}>
                <View style={titleContainer}>
                    <Text style={title}>Top Product</Text>
                </View>
                <View style={body}>
                    {this.props.types.map(e => (
                        <View style={productContainer} >
                            <Swiper>
                                {e.image.map(image =>
                                    <Image style={iconStyle} source={{ uri: `${image}` }} />
                                )}
                            </Swiper>
                            <TouchableOpacity onPress={() => this.gotoDetail(e)} key={e.id}>
                                <Text style={productName} >{e.category}</Text>
                                <Text style={productPrice} >{e.location}</Text>
                                <Text style={productDate} >{e.dataOfPosting}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        paddingTop: 0,
    },
    titleContainer: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10
    },
    iconStyle: {
        width: 300,
        height: 200,

    },
    textStyle: {
        fontSize: 30,
        color: '#AFAEAF'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    productContainer: {
        width: 180,
        height: 250,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
    },
    title: {
        color: '#AFAEAF',
        fontSize: 30,
    },
    productName: {
        marginTop: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
    },
    productPrice: {
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#662F90',
        marginBottom: 5
    },
    productDate: {
        paddingLeft: 10,
        fontSize: 12,
        marginBottom: 5
    }
})