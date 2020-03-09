import React, { useState } from 'react'
import { View, Text, TextInput, TouchableHighlight, Button, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Base64 } from 'js-base64'

import global from '../History/global'

const LoginScreen = (props) => {
  const [userName, setUserName] = useState("tester");
  const [password, setPassword] = useState("testerpassword");

  function loginClick() {
    fetch(props.apiURI + '/loginForJWT', {
      method: 'GET',
      headers: {
        "Authorization": "Basic " + Base64.encode(userName + ":" + password)
      }
    })
      .then(response => {
       
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.json();
       
      })
      .then(json => {
        console.log("Login successful")
        console.log("Received following JSON");
        console.log(json);

        props.onLoginReceiveJWT(json.token);
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
  }

  

  const { buttonText, bigButton, input, container, row1, controlStyle, iconStyle, titleStyle, signInStyle, signupStyle, iconStyle1, inactiveStyle, activeStyle } = styles

  return (
    <View style={container}>
      <View style={row1}>
        <Text style={titleStyle}>Second Hand Shop</Text>
      </View>
      <View>
        <TextInput
          style={input}
          value={userName}
          placeholder="Enter your username"
          onChangeText={value => setUserName(value)}
        />
        <TextInput
          style={input}
          value={password}
          placeholder="Enter your password"
          onChangeText={value => setPassword(value)}
        />
        <TouchableOpacity style={bigButton} onPress={() => loginClick()} >
          <Text style={buttonText}>SIGN IN NOW</Text>
        </TouchableOpacity>
      </View>
      <View style={controlStyle}  >
        <TouchableOpacity style={signInStyle}>
          <Text style={activeStyle}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={signupStyle} onPress={() => props.navigation.navigate('Signup')}>
          <Text style={inactiveStyle}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
    padding: 20,
    justifyContent: 'space-between'
  },
  inactiveStyle: {

  },
  activeStyle: {
    color: '#FFA500'
  },
  iconStyle: { width: 50, height: 50 },
  row1: { flexDirection: 'row', justifyContent: 'center' },
  titleStyle: { color: "#FFF", fontFamily: 'Avenir', fontSize: 30,  },
  iconStyle1: { width: 40, height: 40 },
  controlStyle: {
    flexDirection: 'row',
    width: 300,
  },
  signInStyle: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginRight: 1,
    marginLeft: 60
  },
  signupStyle: {
    backgroundColor: '#FFF',
    flex: 1,
    marginLeft: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 20,
    paddingLeft: 30
  },
  bigButton: {
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'Avenir',
    color: '#FFF',
    fontWeight: '400'
  }
});

export default LoginScreen
