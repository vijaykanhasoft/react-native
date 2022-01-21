/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
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
  TouchableOpacity
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
import AppNavigator from './Navigation/AppNavigation'
import firebase from '@react-native-firebase/app';
import * as Constant from './Constant';
import { Provider } from 'react-redux';
import {createStore} from 'redux';  
import itemReducers from './reducer/itemReducer';
// import Firebase from './firebase_config/firebase'

var firebaseConfig = {
  apiKey: Constant.apiKey,
  authDomain: Constant.authDomain,
  databaseURL: Constant.dbURL,
  projectId: Constant.projID,
  storageBucket: Constant.buckret,
  appId: Constant.appID,
  messagingSenderId: Constant.messagingSenderId
}

export const store = createStore(itemReducers);

export default class App extends React.Component{
  
componentDidMount(){
  // console.log('initializer app')
  if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
  }
} 

  render(){
    return(
      <Provider store = {store}>
      <AppNavigator />
      </Provider>
    )
  }
}

