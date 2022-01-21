import {ADD_ITEM,USER_NAME} from '../Constant'

export const addItem = (item) => (
    {
        type:ADD_ITEM,
        payload:item
    }
);

export const userName = (name) => (
    {
        type:USER_NAME,
        payload:name
    }
);
