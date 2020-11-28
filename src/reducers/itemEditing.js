import * as types from './../constants/ActionTypes';

var initialState = {
    id: '',
    name: '',
    status: false
};

var myReducer = (state = initialState,action) =>{
    switch(action.type){
        case types.EDIT_ITEM:
            //console.log(action);
            return action.item;
        default : return state;
    }
   
}

export default myReducer;