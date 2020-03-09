import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import Swiper from 'react-native-swiper';
import { BaseRouter } from '@react-navigation/native';


const { height, width } = Dimensions.get('window');

export default class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: []
        }
    }

    componentDidMount() {
        console.log('getting todos');
        fetch('http://localhost:3000/post/' + this.props.todos, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + this.props.jwt
            }
        })
            .then(response => {
                if (response.ok == false) {
                    throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
                }
                return response.json();
            })
            .then(json => {
                console.log("Todos GET successful")
                console.log("Received following JSON");
                console.log(json);

                this.setState({ types: json })
            })
            .catch(error => {
                console.log("Error message:")
                console.log(error.message)
            });
    }

    onDelete(id) {
        console.log(id)
        fetch('http://localhost:3000/post/' + id, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + this.props.jwt
            }
        })
            .then(response => {
                if (response.ok == false) {
                    throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
                }
                return response.json();
            })
            .then(json => {
                console.log("Todos GET successful")
                console.log("Received following JSON");
                console.log(json);

                this.setState({ types: json })

            })
            .catch(error => {
                console.log("Error message:")
                console.log(error.message)
            });
        let deleted_array_of_post = this.state.types.filter(i => i.id != id);
        console.log(deleted_array_of_post);
        this.setState({ types: deleted_array_of_post });
    }

    gotoDetail(id) {

    }

    render() {
        console.log(this.props.todos)
        console.log(this.props.jwt)

        const { productDate, container, iconStyle, body, productContainer, titleContainer, title, productName, productPrice } = styles
        return (
            <View style={container}>
                <View style={titleContainer}>
                    <Text style={title}>My Product</Text>
                </View>
                <View style={body}>
                    {this.state.types.map(e => (
                        <View style={productContainer} >
                            <Swiper>
                                {e.image.map(image =>
                                    <Image style={iconStyle} source={{ uri: `${image}` }} />
                                )}
                            </Swiper>
                            <TouchableOpacity>
                                <Text style={productName} >{e.category}</Text>
                                <Text style={productPrice} >{e.location}</Text>
                                <Text style={productDate} >{e.dataOfPosting}</Text>
                            </TouchableOpacity>
                            <Button
                                onPress={() => this.onDelete(e.id)}

                                title="Delete"

                            />
                            <Button

                                title="Motify"
                                onPress={() => this.props.navigation.navigate('Motify', e.id)}
                            />

                        </View>
                    ))}
                </View>
                <Button

                    title="Go Back"
                    onPress={() => this.props.navigation.goBack()}
                />
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


/*  {this.props.types.map(e => (
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
))}*/