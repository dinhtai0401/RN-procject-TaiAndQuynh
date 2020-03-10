import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import global from '../../History/global'

export default class AddPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category: "",
      location: "",
      price: "",
      delivery: "",
      SellerOfName: "",
    }
  }


  openImagePickerAsync = async () => {
    var permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    var pickerResult = await ImagePicker.launchImageLibraryAsync();
    //console.log(pickerResult.uri);
    this.setState({ pickerResult: pickerResult })
    if (pickerResult.cancelled == true) {
      alert('Image picker cancelled or failed');
      return;
    }

  }



  onSubmit = () => {
    console.log('submit')
    var fileNameSplit = this.state.pickerResult.uri.split('/');
    var fileName = fileNameSplit[fileNameSplit.length - 1];
    console.log(fileName)
    let postForm = new FormData();
    postForm.append('imgCollection', {
      uri: this.state.pickerResult.uri,
      name: fileName,
      type: 'image/jpeg'
    });
    postForm.append('foo', 'bar');
    postForm.append('title', this.state.title);
    postForm.append('description', this.state.description);
    postForm.append('category', this.state.category);
    postForm.append('location', this.state.location);
    postForm.append('delivery', this.state.delivery);
    postForm.append('SellerOfName', this.state.SellerOfName)

    axios({
      method: 'post',
      url: 'http://localhost:4000/post',
      data: postForm,
      headers: { "Authorization": "Bearer " + this.props.jwt }
    })
      .then(function (response) {
        global.updateData();

      })
      .catch(function (response) {
        //handle error

      });
      
  }

  render() {
    const { buttonText, bigButton, input, container, row1, controlStyle, iconStyle, titleStyle, signInStyle, signupStyle, iconStyle1, inactiveStyle, activeStyle } = styles
    console.log(this.state.pickerResult)
    console.log(this.state.title)
    return (
      <View style={container}>
        <View style={row1}>
          <Text style={titleStyle}>Second Hand Shop</Text>
        </View>
        <View>
          <TextInput
            style={input}
            value={this.state.title}
            placeholder="Enter your title"
            onChangeText={(entry) => {
              this.setState({
                title: entry
              })
            }}
          />
          <TextInput
            style={input}
            value={this.state.description}
            placeholder="Enter your title"
            onChangeText={(entry) => {
              this.setState({
                description: entry
              })
            }}
          />
          <TextInput
            style={input}
            value={this.state.category}
            placeholder="Enter your title"
            onChangeText={(entry) => {
              this.setState({
                category: entry
              })
            }}
          />
          <TextInput
            style={input}
            value={this.state.location}
            placeholder="Enter your title"
            onChangeText={(entry) => {
              this.setState({
                location: entry
              })
            }}
          />
          <TextInput
            style={input}
            value={this.state.price}
            placeholder="Enter your title"
            onChangeText={(entry) => {
              this.setState({
                price: entry
              })
            }}
          />
          <TextInput
            style={input}
            value={this.state.delivery}
            placeholder="Enter your title"
            onChangeText={(entry) => {
              this.setState({
                delivery: entry
              })
            }}
          />
          <TextInput
            style={input}
            value={this.state.SellerOfName}
            placeholder="Enter your title"
            onChangeText={(entry) => {
              this.setState({
                SellerOfName: entry
              })
            }}
          />
          <TouchableOpacity style={bigButton} onPress={this.openImagePickerAsync}>
            <Text style={buttonText}>PICK A PHOTO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={bigButton} onPress={() => this.onSubmit()} >
            <Text style={buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
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
    marginBottom: 5,
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



/*<View>
<TouchableOpacity onPress={this.openImagePickerAsync} style={{ borderWidth: 1, borderColor: 'black'}}>
  <Text>Pick a photo</Text>
</TouchableOpacity>
</View>*/