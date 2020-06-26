import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import dataReducer from './dataReducer';
import rowReducer from './rowReducer';
import queryReducer from './queryReducer';

export default combineReducers({
    data: dataReducer,
    row: rowReducer,
    query:queryReducer,
    form: reduxForm,
});