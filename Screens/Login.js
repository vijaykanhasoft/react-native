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
  ActivityIndicator,
  Platform
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin,GoogleSigninButton,statusCodes} from 'react-native-google-signin';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { AccessToken } from 'react-native-fbsdk';
import { LoginManager } from "react-native-fbsdk";
import appleAuth,
{  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState} from '@invertase/react-native-apple-authentication';
  import { appleAuthAndroid, AppleButton } from '@invertase/react-native-apple-authentication';
import database from '@react-native-firebase/database'
import AsyncStorage from '@react-native-community/async-storage'
import {AppStyles} from '../Style/appStyle'
import * as Constant from '../Constant';
import {connect} from 'react-redux'
import {store} from '../App'
import {userName} from '../actions/addItemAction'
import {bindActionCreators} from 'redux';
import { v4 as uuid } from 'uuid'

class Login extends React.Component{

  state = {
    email: '',
    password: '',
    userInfo: {},
    isEmailCorrect: false,
    isFormValid: false,
    isVerified:false,
    isLoading:false  
  }

componentDidMount(){
  try{
    GoogleSignin.configure({
      scopes: ['email'], 
      webClientId:
        Constant.webClientID,
      offlineAccess: true, 
    });
  }catch(error) {
    console.log(error); 
  }
    // this.getCurrentUserInfo();
     this.isUserLoggedIn();
}

componentDidUpdate(prevProps, prevState){
  if (this.state.email != prevState.email || this.state.password != prevState.password){
        // console.log("Validate called")
        this.validateForm()
    }
}

isUserLoggedIn = async () => {
  try {
            const value = await AsyncStorage.getItem('isLoggedIn');
            if (value !== null && value == 'true') {
                // console.log(value);
                const name = await AsyncStorage.getItem('name');
                if (name != null){
                  this.props.userName(name)
                  this.props.navigation.navigate('Welcome',{name:name});
                }
            }
        } catch (error) {
            // Error retrieving data
        }
}

logInuser = async (name) => {
  // console.log('login user called');
   try {
            await AsyncStorage.setItem('name',name);
            await AsyncStorage.setItem('isLoggedIn','true')
            // console.log('Item set succesfully');
            //  this.setState({isLoading:false});
             this.props.userName(name)
            this.props.navigation.navigate('Welcome',{name:name});
        } catch (error) {
            this.setState({isLoading:false});
            // console.log(error);
        }
}

//TextInput change text handler
  getHandler = key => val => {
    this.setState({[key]:val})
  }

  signUpPressed(){
      this.props.navigation.navigate('SignUp')
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

logIn = () =>{
  this.setState({isLoading:true});
  const {email,password} = this.state
  firebase.auth().signInWithEmailAndPassword(email,password).then((userData)=>{
    if (userData.user.emailVerified){
      // console.log(userData)
      const isVerified = userData.user.emailVerified;
       firebase.database().ref('Users/'+ userData.user.uid + '/isVerified').set({
          isVerified
        })
        // console.log('log in with email');
        this.logInuser(this.state.email);
    }else{
      this.setState({isLoading:false});
      alert('Please verify email first')
    }
  }).catch(error =>{
    this.setState({isLoading:false});
    alert(error.message)
  })
}

googleSignIn = async () =>{
   this.setState({isLoading:true});
  try{
    await GoogleSignin.hasPlayServices();
    const  data = await GoogleSignin.signIn()
    const googleCredential =  auth.GoogleAuthProvider.credential(
    data.idToken, 
    data.accessToken
    );
    await auth().signInWithCredential(googleCredential);
    const email = data.user.email
    // console.log(data)
    alert('Login successfully')
     firebase.database().ref('Users/'+ data.user.id).set({
        email
    })
    this.logInuser(data.user.email);
    // this.props.navigation.navigate('Welcome',{name:data.user.email});
  }catch(error){
     this.setState({isLoading:false});
    // alert(error.code);
    if (error.code == statusCodes.SIGN_IN_CANCELED){
       alert('Cancel'); 
    }else if (error.code === statusCodes.IN_PROGRESS) {
      alert('Signin in progress')
    }else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      alert('PLAY_SERVICES_NOT_AVAILABLE');
    } else { 
      alert(error.code);
    }
  }
}

fbSignIn = async () => {
   this.setState({isLoading:true});
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
   if (result.isCancelled) {
      this.setState({isLoading:false});
    throw 'User cancelled the login process';
  } 
  AccessToken.getCurrentAccessToken().then((data) => {
          const { accessToken } = data
          this.getuserInfoFromFb(accessToken);
        })
    // const data = await AccessToken.getCurrentAccessToken();
    alert('LOGIN SUCCESSFULLY');
  // if (!data) {
  //    this.setState({isLoading:false});
  //   throw 'Something went wrong obtaining access token';
  // }
  // console.log(result)
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
   auth().signInWithCredential(facebookCredential);
}

appleLogIn () {
  console.log(Platform.OS);
  if (Platform.OS == 'android'){// && appleAuthAndroid.isSupported
    alert('android OS'); 
  //    const rawNonce = uuid();
  //    const state = uuid();
  // // Configure the request
  // appleAuthAndroid.configure({
  //   // The Service ID you registered with Apple
  //   clientId: 'com.example.client-android',

  //   // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
  //   // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
  //   redirectUri: 'https://example.com/auth/callback',

  //   // The type of response requested - code, id_token, or both.
  //   responseType: appleAuthAndroid.ResponseType.ALL,

  //   // The amount of user information requested from Apple.
  //   scope: appleAuthAndroid.Scope.ALL,

  //   // Random nonce value that will be SHA256 hashed before sending to Apple.
  //   nonce: rawNonce,

  //   // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
  //   state,
  // });
  //  // Open the browser window for user sign in
  //   const response = appleAuthAndroid.signIn();
  //   console.log(response);
  }else if (Platform.OS == 'ios'){
      this.setState({isLoading:true});  
  const appleAuthRequestResponse = appleAuth.performRequest({
    requestedOperation:AppleAuthRequestOperation.LOGIN,
    requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
  })
  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw 'Apple Sign-In failed - no identify token returned';
  }
   // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

  // Sign the user in with the credential
  auth().signInWithCredential(appleCredential);

  const credentialState = appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

  if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
    alert("log in with apple")
  }
  }else{
   alert('not supported')
  }
}

getuserInfoFromFb (token) {
  fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
  .then((response) => response.json())
  .then((json) => {
    // Some user object has been set up somewhere, build that user here
    console.log(json);
    const name = json.name
    this.logInuser(json.name);
    // user.id = json.id
    // user.user_friends = json.friends
    // user.email = json.email
    // user.username = json.name
    // user.loading = false
    // user.loggedIn = true
    // user.avatar = setAvatar(json.id)      
  })
  .catch(() => {
     this.setState({isLoading:false});
    reject('ERROR GETTING DATA FROM FACEBOOK')
  })
}

getCurrentUserInfo = async () => {
  try {
    const {user} = await GoogleSignin.signInSilently();
    // this.setState({ userInfo });
    // console.log(this.state.userInfo);
    // alert("already log in")  
    this.props.userName(user.givenName)
    this.props.navigation.navigate('Welcome',{name:user.givenName});
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // user has not signed in yet
      // alert("Not signed in yet")
    } else {
      // alert("something went wrong")
      // some other error
    }
  }
};

googleSignOut = async () =>{
  try{
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    setloggedIn(false);
    setUserInfo([]);
  }catch(error){
    console.error(error);
  }
}

  render(){
    return(
      <View style = {AppStyles.fullScreenContainer}>
      <Text style={AppStyles.titleText}>Sign in</Text>
        <TextInput
        style = {AppStyles.input}
        placeholder = "Enter email address"
        value = {this.state.email}  
        autoCapitalize = 'none'
        onChangeText = {this.getHandler('email')}                                                                                                                                                                                                                                                                  
        />
        <TextInput
        style = {AppStyles.input}
        placeholder = 'Enter password'
        value = {this.state.password}
        secureTextEntry
        onChangeText = {this.getHandler('password')}
        />
       <TouchableOpacity
         style={AppStyles.btn}
         onPress={this.logIn}
       >
         <Text style={{color:'white'}}> sign in </Text>
        </TouchableOpacity>
        <Text style = {{marginTop:20,fontWeight:'bold',fontSize:20}}>OR</Text>
        <Text style = {{marginTop:5,fontSize:20}}>Sign in with</Text>
        <View style={{ flexDirection:"row" }}>
        <TouchableOpacity
         style={AppStyles.btn}
         onPress={this.googleSignIn}
       >
         <Text style={{color:'white'}}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={[AppStyles.btn,AppStyles.margin_left]}
         onPress={this.fbSignIn}
       >
         <Text style={{color:'white'}}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={[AppStyles.btn,AppStyles.margin_left]}
         onPress={this.appleLogIn.bind(this)}
       >
         <Text style={{color:'white'}}>Apple</Text>
        </TouchableOpacity>
        </View>
      {/* <GoogleSigninButton
          style={{ width: 192, height: 48 , marginTop:15}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.googleSignIn} /> */}
        <TouchableOpacity
         style={AppStyles.btn_signUp}
         onPress={() => {
            this.props.navigation.navigate('SignUp');
          }}
       >
         <Text style={{color:'blue'}}>Sign Up</Text>
        </TouchableOpacity>
      {
      this.state.isLoading && (
        <ActivityIndicator style={AppStyles.loader} animating = {this.state.isLoading} size = "large" color = 'blue' hidesWhenStopped = 'true'/>
      )}
      </View>
    )
  }
}

const mapDispatchToProps  = dispatch => {
  return bindActionCreators({
    userName,
  },dispatch)
}

export default connect(null,mapDispatchToProps)(Login);


