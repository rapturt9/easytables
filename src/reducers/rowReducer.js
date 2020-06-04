import { ROW_CLICK } from '../actions/types';

export default function(state = 0, action) {
    //console.log(action);
    switch (action.type) {
        case ROW_CLICK:
            console.log(action.payload);
            return action.payload;
        default: 
            return state;
    }
}