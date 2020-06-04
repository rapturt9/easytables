import { FETCH_DATA } from '../actions/types';

export default function(state = [], action) {
    //console.log(action);
    switch (action.type) {
        case FETCH_DATA:
            console.log(action.payload);
            return action.payload || false;
        default: 
            return state;
    }
}