import {StyleSheet} from 'react-native';

import * as Constants from '../Constant';

export const AppStyles = {
    fullScreenContainer:{
        flex:1,
        justifyContent:'center', 
        alignItems:'center'
    },
    titleText:{
        fontSize:20,
        fontWeight:'bold'
    },
     input:{
        borderWidth:1,
        borderColor:'black',
        borderRadius: 3,
        marginTop: 15,
        width:300,
        height:30
      },
      btn:{
           justifyContent:'center',
           alignItems: 'center',
           backgroundColor:'blue',
           marginTop:20,
           width:100,   
           height:30,
           borderRadius:15
      },
      margin_left:{
          marginLeft:20,
      },
      btn_signUp:{
        justifyContent:'center',
        alignItems: 'center',
        bottom:28,
        position: 'absolute',
        width:100,
        height:30,
      },
      loader:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center' ,
        backgroundColor:'black',
        opacity:0.7
      },
    SectionHeaderTextStyle: {
        backgroundColor: '#CDDC89',
        fontSize: 15,
        padding: 5,
        color: 'red',
  },
  sectionListRowText:{
    fontSize: 15,
    marginLeft: 8, 
    color: '#000',
    alignItems: 'flex-start',
  },
  buttonSet: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  btnMinus:{
      backgroundColor:'#1E6738',
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center',
      height:Constants.btnSetHeight
    //   position: 'absolute',
    //   left:0,
    //   top: 0,
    //   bottom: 0,
    //   width:20
  },
  btnPlus:{
      backgroundColor:'#1E6738',
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center',
      height:Constants.btnSetHeight
    //   position: 'absolute',
    //   right:0,
    //   top: 0,
    //   bottom: 0,
    //   width:20
  },
  countText: {
    fontWeight: 'bold',
    textAlign: "center",
    width:30,
    justifyContent:'center',
    alignItems:'center'
  },
  itemPriceText:{
    fontSize: 15,
    marginLeft: 8,
    marginTop:12,
    color: 'grey',
    alignItems:'flex-start'
  },
}



// export const btn_horizontal = StyleSheet.compose(AppStyles.btn,AppStyles.btn_horizontal);