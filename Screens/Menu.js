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
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {AppStyles} from '../Style/appStyle'

export default class Menu extends React.Component{

GetSectionListItem = item => { 
    Alert.alert(item);
  };

 FlatListItemSeparator = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };

    render(){
    var A = [{'id':'1','value':'Butter','value2':'Oil'},
             {'id':'2','value':'Plain Dosa','oilPrice':50,'butterPrice':60}, 
             {'id':'3','value':'Masala Dosa','oilPrice':60,'butterPrice':70},
             {'id':'4','value':'Lasniya plain dosa','oilPrice':70,'butterPrice':80}];
    var B = [{'id':'5','value':'Butter','value2':'Oil'},
            {'id':'6','value':'Maisur Plain Dosa','oilPrice':70,'butterPrice':80}, 
            {'id':'7','value':'Maisur Masala Dosa','oilPrice':80,'butterPrice':90}, 
             {'id':'8','value':'Maisur Lasaniya Plain Dosa','oilPrice':80,'butterPrice':90}, 
             {'id':'9','value':'Maisur Lasaniya Masala Dosa','oilPrice':90,'butterPrice':100}, 
             {'id':'10','value':'Special Dosa','oilPrice':100,'butterPrice':110}, 
             {'id':'11','value':'CHinese Dosa','oilPrice':90,'butterPrice':100}];
    var C = [{'id':'13','value':'Butter','value2':'Oil'},
            {'id':'14','value':'Maisur Plain Dosa','oilPrice':70,'butterPrice':80}, 
            {'id':'15','value':'Maisur Masala Dosa','oilPrice':80,'butterPrice':90}, 
             {'id':'16','value':'Maisur Lasaniya Plain Dosa','oilPrice':80,'butterPrice':90}];

  return(
      <View>
         <SectionList
        //   ItemSeparatorComponent={this.FlatListItemSeparator}
          sections={[
            { title: 'A', data: A },
            { title: 'B', data: B },
            { title: 'C', data: C },
          ]}
          renderSectionHeader={({ section }) => (
            <Text style={AppStyles.SectionHeaderTextStyle}> {section.title} </Text>
          )}
          renderItem={({ item,index}) => (
            // Single Comes here which will be repeatative for the FlatListItems
            index == 0 ?
            <View style={{flexDirection:'row',height:40,justifyContent:'flex-end',marginRight:8}}> 
               <Text
              style={AppStyles.sectionListRowText}>
             {item.value}
            </Text>
             <Text
              style={AppStyles.sectionListRowText}>
             {item.value2}
            </Text>
            </View> :
             <View style={{flexDirection:'row',height:50}}> 
             <View style={{flex:2.5,backgroundColor:'white',textAlign:'left'}}>
               <Text
              style={AppStyles.sectionListRowText}
              adjustsFontSizeToFit={true}
              numberOfLines={2}
              minimumFontScale={0.6}
              onPress={this.GetSectionListItem.bind(this, 
                     'Id: '+item.id+' Name: '+item.value)}
              >  
             {item.value}
            </Text>
            </View>
               {/* <Text>
             {item.value}
            </Text> */}
            <View style={{flexDirection:'row',height:40,justifyContent:'flex-end',flex:1,marginRight:8}}>
            <Text
               style={AppStyles.sectionListRowText}
              >
             {item.butterPrice}
            </Text>
            <Text
               style={AppStyles.sectionListRowText}
              >
             {item.oilPrice}
            </Text>
            </View>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
  )
}
}

// export default App;
