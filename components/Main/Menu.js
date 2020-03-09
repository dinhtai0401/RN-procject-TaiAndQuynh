import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'

import global from '../History/global';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogedIn: false,
        }
        global.loginClick = this.loginClick.bind(this);

    }

    loginClick() {
        this.setState({ isLogedIn: true })
        console.log('hello')
    }

    logoutClick() {
        global.onLogout();
        this.setState({ isLogedIn: false })
    }


    render() {
        const { container, profile, btnStyle, btnText, btnStyleSignIn, btnTextSignIn } = styles;
        const logout = (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={btnStyleSignIn} onPress={this.props.gotoAuthentication}>
                    <Text style={btnTextSignIn}>Sign In</Text>
                </TouchableOpacity>
            </View>
        )
        const login = (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: '#FFF', fontFamily: 'Avenir', fontSize: 20 }}></Text>
                <View style={{ marginTop: 60 }}>
                    <TouchableOpacity style={btnStyleSignIn} onPress={this.props.gotoAuthentication}>
                        <Text style={btnTextSignIn}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btnStyleSignIn} onPress={this.logoutClick.bind(this)}>
                        <Text style={btnTextSignIn}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
        const mainView = this.state.isLogedIn ? login : logout
        return (
            <View style={container}>
                <Image style={profile} source={{ uri: 'data:image/png;base64,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' }} />
                {mainView}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFA500',
        borderRightWidth: 4,
        borderColor: "#FFF",
        alignItems: 'center'
    },
    profile: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 30
    },
    btnStyle: {
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 220
    },
    btnText: {
        color: '#FFA500',
        fontSize: 20
    },
    btnStyleSignIn: {
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 220,
        marginBottom: 10,
        paddingLeft: 10,
    },
    btnTextSignIn: {
        fontSize: 15,
        color: '#FFA500',
    }
})