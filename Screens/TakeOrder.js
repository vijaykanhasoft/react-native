import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  SectionList,
  Alert,
  Button,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {AppStyles} from '../Style/appStyle';
import * as Constants from '../Constant'
import {connect} from 'react-redux'
import {store} from '../App'

// import {createStore} from 'redux';  
// import itemReducers from '../reducer/itemReducer';

let menuItems = [];

class TakeOrder extends React.Component{
  state = {
    count :0,
    tableNo:0,
    total:0,
    a:0,
    currentMenu:[],//this.props.items
    // Data: [
    //   {
    //     title:'A',
    //     data:
    //     [{'id':'1','value':'Plain dosa','price':50,count:0}, {'id':'2','value':'Masala dosa','price':60,count:0},
    //          {'id':'3','value':'Plain butter dosa','price':60,count:0}]
    //   },
    //   {
    //     title:'B',
    //     data:[{'id':'4','value':'Maisur plain dosa','price':70,count:0}, {'id':'5','value':'Maisur masala dosa','price':80,count:0}, 
    //          {'id':'6','value':'Scchezwan planin dosa','price':70,count:0}, {'id':'7','value':'Schezwan masala dosa','price':80,count:0}, 
    //          {'id':'8','value':'Schezwan masala dosa butter','price':90,count:0}, {'id':'9','value':'Chinese dosa','price':90,count:0}, 
    //          {'id':'10','value':'Paneer dosa','price':90,count:0},]
    //   },
    //   {
    //     title:'C',
    //     data:[{'id':'11','value':'Veg utappa','price':70,count:0}, {'id':'12','value':'Plain utappa','price':80,count:0}, 
    //          {'id':'13','value':'Mix utappa','price':'90',count:0}, {'id':'14','value':'Onion utappa','price':80,count:0}]
    //   }
    // ],
  }

  componentDidMount(){
    console.log(store.getState());
    menuItems = this.props.items;
     // console.log(this.props.items);
    this.setState({currentMenu:this.props.items,a:this.state.total});
  }

getHandler = key => val => {
  this.setState({[key]:val});
}

GetSectionListItem = item => {
    // Alert.alert(item);
  };

 FlatListItemSeparator = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };

  onDecrease = (id,index) =>{
    // console.log(id,index);
    if (id <= this.state.currentMenu.menu[0].data.length){// this.state.Data[0].data.length
      if (this.state.currentMenu.menu[0].data[index].count > 0){
        // console.log(this.state.currentMenu.menu[0].data[index]);
       this.setState({state:this.state.currentMenu.menu[0].data[index].count -= 1,state:this.state.total -=  this.state.currentMenu.menu[0].data[index].price})
      }
   }else if (id <= this.state.currentMenu.menu[0].data.length+this.state.currentMenu.menu[1].data.length){
     if (this.state.currentMenu.menu[1].data[index].count > 0){
      //  console.log(this.state.currentMenu.menu[1].data[index]);
       this.setState({state:this.state.currentMenu.menu[1].data[index].count -= 1,state:this.state.total -=  this.state.currentMenu.menu[1].data[index].price})
     }
   }else{
    //  console.log(this.state.currentMenu.menu[2].data[index].count);
     if (this.state.currentMenu.menu[2].data[index].count > 0){
        //  console.log(this.state.currentMenu.menu[2].data[index]);
         this.setState({state:this.state.currentMenu.menu[2].data[index].count -= 1,state:this.state.total -=  this.state.currentMenu.menu[2].data[index].price})
     }
   }
  }

  onIncrease = (id,index) =>{
  //  console.log(index,id);
   if (id <= menuItems.menu[0].data.length){
        menuItems.menu[0].data[index].count += 1
        this.setState({state:this.state.total +=  menuItems.menu[0].data[index].price})
        // console.log(this.props.items.menu[0].data[index].count);
        // console.log(this.state.currentMenu.menu[0].data[index].count);
   }else if (id <= this.state.currentMenu.menu[0].data.length+this.state.currentMenu.menu[1].data.length){
      //  console.log(this.state.Data[1].data[index]);
       this.setState({state:this.state.currentMenu.menu[1].data[index].count += 1,state:this.state.total +=  this.state.currentMenu.menu[1].data[index].price})
   }else{
      //  console.log(this.state.Data[2].data[index]);
       this.setState({state:this.state.currentMenu.menu[2].data[index].count += 1,state:this.state.total +=  this.state.currentMenu.menu[2].data[index].price})
   }
  }

    render(){
      // console.log(this.state.currentMenu.menu);
      // console.log(this.state.currentMenu.menu[0].data.length);
  return(
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style = {{marginLeft:12,marginTop:12,flexDirection:'row'}}>
      <Text>Enter the table no:</Text>
      <TextInput style= {{marginLeft:12,marginRight:20,borderWidth:1,
        borderColor:'black',
        borderRadius: 3,
        width:120,
        height:20}}
      placeholder = 'Enter table no'
      value = {String(this.state.tableNo)}
      onChangeText = {this.getHandler('tableNo')}
      keyboardType = 'number-pad'
      />
      <View style = {{justifyContent:'flex-end',flex:1}}>
        <Text style = {{textAlign:'right',fontWeight:'bold',marginRight:12}}>Total:{this.state.total} </Text>
      </View>
      </View>
            <SectionList style={{marginTop:16}}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          sections= {menuItems.menu}//this.state.currentMenu
          renderSectionHeader={({ section }) => (
            <Text style={AppStyles.SectionHeaderTextStyle}> {section.title} </Text>
          )}
          renderItem={({ item,index,Section}) => (
             <View style={{flex:1,flexDirection:'row',height:Constants.row_height,justifyContent:'center',alignItems:'center'}}> 
             <View style={{backgroundColor:'white',textAlign:'left',height:Constants.row_height,flex:2.5}}>
             <Text
                style={AppStyles.sectionListRowText}
                numberOfLines = {2} 
                adjustsFontSizeToFit={true}
                minimumFontScale = {0.5}
                onPress={this.GetSectionListItem.bind(this, 
                      'Id: '+item.id+' Name: '+item.value)}
                >
              {item.value}
              </Text>
              <Text style = {AppStyles.itemPriceText}>Price:{item.price}</Text>
              </View>
            <View style={{justifyContent:'center',alignItems:'center',marginRight:8,marginLeft:8,flexDirection:'row',height:Constants.btnSetHeight,borderWidth: 1,backgroundColor:'white'}}>
          {/* <View style={AppStyles.buttonSet}> */}
          <TouchableOpacity style={AppStyles.btnMinus}
          onPress = {this.onDecrease.bind(this,item.id,index)}>
            <Text style={{color:'black'}}>  -  </Text>
          </TouchableOpacity>
            <Text style={AppStyles.countText}>{item.count}</Text>
            <TouchableOpacity style={AppStyles.btnPlus}
          onPress = {this.onIncrease.bind(this,item.id,index)}>
            <Text style={{color:'black'}}>  +  </Text>
          </TouchableOpacity>
            {/* <Button containerStyle={styles.buttonContainer} style={{backgroundColor:'#1E6738',color:'#1E6738'}}
              onPress={this.onIncrease} title='+'/> */}
          </View>
          {/* </View> */}
          </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
  )
}
}

const mapStateToProps = (state) => {
  const {items} = state
  console.log(items.menu[0].data[0].count);
  return {items}
}

export default connect(mapStateToProps)(TakeOrder);