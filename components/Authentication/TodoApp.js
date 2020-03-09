import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import View1 from './todoApp/View1'
import AddPost from './todoApp/AddPost'
import EditPost from './todoApp/EditPost'
import Motify from './todoApp/Motify'


const Stack = createStackNavigator();

export default class TodoApp extends Component {

  constructor(props) {

    super(props);
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    console.log('getting todos');
    fetch(this.props.apiURI + '/jwtProtectedResource', {
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
        console.log(json.user.email);

        this.setState({ todos: json.user.email })
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
  }


  onTodoAdd = (description, dueDate) => {
    fetch(this.props.apiURI + '/post', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + this.props.jwt,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ description, dueDate })
    })
      .then(response => {
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(json => {
        console.log("Todos POST successful")
        console.log("Received following JSON");
        console.log(json);
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
  }



  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{
          headerShown: false,
        }} name="View1">
          {props => <View1 {...props} onLogout={this.props.onLogout} user={this.props.user}/>}
        </Stack.Screen>
        <Stack.Screen name="AddPost" 
          options={{
            headerShown: false,
          }} >
          {props => <AddPost {...props} todos={this.state.todos} onTodoAdd={this.onTodoAdd} />}
        </Stack.Screen>
        <Stack.Screen name="EditPost" 
          options={{
            headerShown: false,
          }} >
          {props => <EditPost {...props} todos={this.state.todos} todos={this.state.todos} onTodoAdd={this.EditPost} jwt={this.props.jwt} />}
        </Stack.Screen>
        <Stack.Screen name="Motify" 
          options={{
            headerShown: false,
          }} >
          {props => <Motify {...props} todos={this.state.todos} todos={this.state.todos} onTodoAdd={this.EditPost} jwt={this.props.jwt} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }
}
