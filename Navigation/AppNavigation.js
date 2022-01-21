import React from 'react';
import { StyleSheet, Button, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'
import Welcome from '../Screens/Welcome'
import menu from '../Screens/Menu'
import takeOrder from '../Screens/TakeOrder'
import addItem from '../Screens/AddItem'

const stack = createStackNavigator();
const tab = createBottomTabNavigator(); 

class MyCustomHeaderBackImage extends React.Component {
  render() {
    return (
        <Image
          source={require('../resource/back.png')}
          style={{width: 22, height: 22, tintColor: 'green'}}
        />
    );
  }
}

function myTabs(){
  return(
    // <NavigationContainer>
      <tab.Navigator
      screenOptions ={({route}) => ({
        // headerBackTitleVisible:false,
        tabBarIcon: ({focused,color,size}) => {
          let iconName;
          if (route.name == 'Welcome'){
              iconName = focused 
              ? 'ios-information-circle'
              : 'ios-information-circle';
          }else if (route.name == "Menu"){
            iconName = 'menu';
          }else if (route.name == "Add Item"){
            iconName = 'add-circle';
          }else if (route.name = "Take order"){
            iconName = "ios-book-sharp"
          }
          return <Ionicons name={iconName} size={size} color={color}/>
        }
      })}>
      <tab.Screen name='Welcome'
    component = {Welcome}
    options = {{
        headerBackImage:() =>  <MyCustomHeaderBackImage/>,
    }}/>
    <tab.Screen name='Menu'
    component = {menu}/>
    <tab.Screen name='Take order'
    component = {takeOrder}
    options = {{
        headerTitle : "Take Order"
    }}/>
    <tab.Screen name='Add Item'
    component = {addItem}
    options = {{
      headerTitle: "Add Item"
    }}/>
      </tab.Navigator>
    // </NavigationContainer>
  )
}

function myStack() {
    return(
    <NavigationContainer>
    <stack.Navigator
    screenOptions={{
        headerBackTitleVisible:false
    }}>
    <stack.Screen name='Login'
    component = {Login}
    options = {{
        headerShown:false
    }}/>
    <stack.Screen name='SignUp'
    component = {SignUp}/>
    <stack.Screen name='Welcome'
    component = {myTabs}/>
    {/* <stack.Screen name='Welcome'
    component = {Welcome}
    options = {{
        headerBackImage:() =>  <MyCustomHeaderBackImage/>,
    }}/>
    <stack.Screen name='Menu'
    component = {menu}/>
    <stack.Screen name='Take order'
    component = {takeOrder}
    options = {{
        headerTitle : "Take Order"
    }}/>
    <stack.Screen name='Add Item'
    component = {addItem}
    options = {{
      headerTitle: "Add Item"
    }}/> */}
    </stack.Navigator>
    </NavigationContainer>
    )
}

// const RootNavigator = createStackNavigator({
//   loginStack: { screen: myStack },
//   drawerStack: { screen: myTabs }
// })

export default myStack;