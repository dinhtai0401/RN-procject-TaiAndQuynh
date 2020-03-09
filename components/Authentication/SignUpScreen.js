import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native'
import axios from 'axios';

const SignUpScreen = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function signupPressed() {
    fetch(props.apiURI + '/registerBasic', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => {
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(json => {
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'SignupCompleted' }],
        })
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
          value={username}
          placeholder="Enter your username"
          onChangeText={value => setUsername(value)}
        />
        <TextInput
          style={input}
          value={email}
          placeholder="Enter your email"
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          style={input}
          value={password}
          placeholder="Enter your password"
          onChangeText={value => setPassword(value)}
        />
        <TouchableOpacity style={bigButton} onPress={() => signupPressed()} >
          <Text style={buttonText}>SIGN UP NOW</Text>
        </TouchableOpacity>
      </View>
      <View style={controlStyle}  >
        <TouchableOpacity style={signInStyle} onPress={
          () => props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        }>
          <Text style={inactiveStyle}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={signupStyle} >
          <Text style={activeStyle}>SIGN UP</Text>
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
  titleStyle: { color: "#FFF", fontFamily: 'Avenir', fontSize: 30 },
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


export default SignUpScreen
