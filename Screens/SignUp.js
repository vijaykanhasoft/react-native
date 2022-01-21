import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,  
  TouchableOpacity,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
  KeyboardAvoidingView
} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin,GoogleSigninButton,statusCodes} from 'react-native-google-signin';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database'
import {NavigationContainer} from '@react-navigation/native'
import {AppStyles} from '../Style/appStyle'

export default class SignUp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
     email: '',
     password: '',
     isEmailCorrect: false,
     isFormValid: false,
    };
  }

 getHandler = key => val => {
  //  console.log(val)
   this.setState({[key]: val})
  }

  validate = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    // console.log("Email is Not Correct");
    this.setState({ isEmailCorrect: false })
    return false;
  }
  else {
      // console.log("Email is Correct");
      this.setState({ isEmailCorrect: true})
      return true;
  }
}

  validateForm = () => {
    // console.log(this.state)
    this.validate(this.state.email)
    if (this.state.password.length == 6 && this.state.isEmailCorrect){
        this.setState({isFormValid: true})
    }
  } 

createUser = () =>{
  const { email, password} = this.state;
  auth().createUserWithEmailAndPassword(email,password)
  .then((userData) => {
    const uid = userData.user.uid
    // console.log(userData.user.uid)
    firebase.database().ref('Users/'+uid).set({
        email,
        isVarified:false
    })
    userData.user.sendEmailVerification().then(function() {
         Alert.alert('SIGN UP',
                  'We have sent you a confirmation email. Please confirm your email address and login with it.',
                    { cancelable: false })
    })
  }).catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      alert('That email address is already in use!');
    }
    if (error.code === 'auth/invalid-email') {
      alert('That email address is invalid!');
    }
    console.error(error);
  })
  }

 componentDidUpdate(prevProps, prevState) {
    if (this.state.email != prevState.email || this.state.password != prevState.password){
        // console.log("Validate called")
        this.validateForm()
    }
  }

 render() {
    return (
        <View style={AppStyles.fullScreenContainer}>
        <TextInput
          style={AppStyles.input}
          value={this.state.email}
          onChangeText={this.getHandler('email')}
          placeholder="Email"
        />
        <TextInput
          style={AppStyles.input}
          value={this.state.password}
          secureTextEntry
          onChangeText={this.getHandler('password')}
          placeholder="password"
        />
         <TouchableOpacity
         style={AppStyles.btn}
         onPress={this.createUser}
       >
         <Text style={{color:'white'}}>  SUBMIT  </Text>
        </TouchableOpacity>
        {/* <Button style = {{marginTop:25,backgroundColor:'red'}} title="Submit" onPress={this.createUser} disabled={!this.state.isFormValid} /> */}
        </View>
    )
  }
}