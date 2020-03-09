
import React from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'

const View1 = (props) => {
  //console.log(props.user.id)
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ color: '#FFF', fontFamily: 'Avenir', fontSize: 20 }}></Text>
        <View style={{ marginTop: 60 }}>
          <TouchableOpacity style={styles.btnStyleSignIn}>
            <Button
              title="Post View" style={styles.btnTextSignIn}
              onPress={() => props.navigation.navigate('AddPost')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyleSignIn}>
            <Button style={styles.btnTextSignIn}
              title="EditView"
              onPress={() => props.navigation.navigate('EditPost')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default View1


/*

      

*/

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