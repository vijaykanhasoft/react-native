import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';
// import {AppStyles} from '../Style/appStyle'
import{AppStyles} from '../Style/appStyle'
import {connect} from 'react-redux'
import {addItem} from '../actions/addItemAction'
import {bindActionCreators} from 'redux';

class AddItem extends React.Component{

state = {
    itemName:"",
    price:0,
    isLoading:false,
    menu:this.props.items
}

getHandler = key => val =>{
    this.setState({[key]:val})
}

addItemPressed = () =>{
    // console.log(this.props.items.menu[0].data.length);
    let item = {'id':this.props.items.menu[0].data.length+1,
    'value':this.state.itemName,
    'price':Number(this.state.price),
    'count':0}
    // console.log(this.state.menu.menu[0].data);
    //  this.state.menu.menu[0].data.push(item);
    this.props.addItem(item);
}

    render(){
        return(
                <View style={AppStyles.fullScreenContainer}>
                    <TextInput 
                     style={AppStyles.input}
                     placeholder='Enter Item name'
                     onChangeText = {this.getHandler('itemName')}
                     />
                     <TextInput
                     style={AppStyles.input}
                     placeholder = "Enter price"
                     keyboardType = 'numeric'  
                     onChangeText =  {this.getHandler('price')}
                     />
                    <TouchableOpacity
                    style={AppStyles.btn}
                    onPress={this.addItemPressed}>
                    <Text style={{color:'white'}}>  ADD </Text>
                    </TouchableOpacity>
                    {
                        this.state.isLoading && (
                            <ActivityIndicator style={AppStyles.loader}
                            animating = {this.state.isLoading}
                            size='large'
                            color='blue'
                            hideWhenStopped='true'/>
                         )
                    }
                </View>
        )
    }
}

const mapStateToProps = (state) => {
    const {items} = state
    return {items}
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addItem,
    },dispatch)
);

export default connect(mapStateToProps,mapDispatchToProps)(AddItem);