import React from 'react';
import{
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import {AppStyles} from '../Style/appStyle'
import * as Constants from '../Constant'
import {connect} from 'react-redux'
import {store} from '../App'

class Welcome extends React.Component{

    menuTapped = () =>{
        this.props.navigation.navigate('Menu')
    }

    takeOrderTapped = () =>{
        this.props.navigation.navigate('Take order')
    }

    addItemTapped = () =>{
        this.props.navigation.navigate('Add Item')
    }

    render(){
        return(
            <View style={{flex:1}}>
            <Text style = {{marginLeft:12,marginTop:12,fontSize:20}}>Welcome,{this.props.userName}</Text>
            <View style = {{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style = {AppStyles.btn}
                onPress={this.menuTapped}>
                    <Text style = {{color:'white'}  }>  Menu  </Text>
                </TouchableOpacity>
                 <TouchableOpacity style = {[AppStyles.btn,AppStyles.margin_left]}
                onPress={this.takeOrderTapped}>
                    <Text style={{color:'white'}}>  Take Orders  </Text>
                    </TouchableOpacity>
                <TouchableOpacity style = {[AppStyles.btn,AppStyles.margin_left]}
                onPress={this.addItemTapped}>
                    <Text style={{color:'white'}}>  Add Item  </Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const mapStateToProps =  (state) =>{
//    console.log(state.items);
   const userName = state.items
   console.log(userName);
   return {userName}
}

export default connect(mapStateToProps)(Welcome)