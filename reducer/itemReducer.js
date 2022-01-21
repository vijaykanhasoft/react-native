import {combineReducers} from 'redux';
import * as constant from '../Constant';

const INITIAL_STATE = {
    menu    :  [
      {
        title:'A',
        data:
        [{'id':'1','value':'Plain dosa','price':50,count:0}, {'id':'2','value':'Masala dosa','price':60,count:0},
             {'id':'3','value':'Plain butter dosa','price':60,count:0}]
      },
      {
        title:'B',
        data:[{'id':'4','value':'Maisur plain dosa','price':70,count:0}, {'id':'5','value':'Maisur masala dosa','price':80,count:0}, 
             {'id':'6','value':'Scchezwan planin dosa','price':70,count:0}, {'id':'7','value':'Schezwan masala dosa','price':80,count:0}, 
             {'id':'8','value':'Schezwan masala dosa butter','price':90,count:0}, {'id':'9','value':'Chinese dosa','price':90,count:0}, 
             {'id':'10','value':'Paneer dosa','price':90,count:0},]
      },
      {
        title:'C',
        data:[{'id':'11','value':'Veg utappa','price':70,count:0}, {'id':'12','value':'Plain utappa','price':80,count:0}, 
             {'id':'13','value':'Mix utappa','price':90,count:0}, {'id':'14','value':'Onion utappa','price':80,count:0}]
      }
    ] ,
    userName:" "
};

const userNameReducer = (state = INITIAL_STATE,action) => {
   switch (action.type) {
    case constant.ADD_ITEM:
     const {user} = state;
     // user = action.payload;
    const newState = action.payload
    return newState
    default:
    return INITIAL_STATE;
    break;
   }
}

const itemReducers = (state = INITIAL_STATE,action) => {
  switch (action.type) {
    case constant.ADD_ITEM:
    console.log(action.payload);
        const { 
          menu
        } = state
        menu[0].data.push(action.payload);
        const newState = {menu};//menuItem
        return newState;
      // return state;
      break;
    case constant.USER_NAME:
      const {user} = state;
      // user = action.payload;
      console.log(action.payload)
      const newUser = action.payload
      return newUser
    default:
    return state;
      break;
  }
};

export default combineReducers({
  items:itemReducers
})