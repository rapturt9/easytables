import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import dataReducer from './dataReducer';
import rowReducer from './rowReducer';

export default combineReducers({
    data: dataReducer,
    row: rowReducer,
    form: reduxForm,
});