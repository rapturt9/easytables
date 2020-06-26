import { FETCH_DATA, ROW_CLICK, CHANGE_DATA } from "./types";
import axios from 'axios';

const URL = axios.create({
  baseURL: "https://XXXXX.execute-api.us-east-1.amazonaws.com/dev/todos",
});
export const queryData = (key = "", val = "") => async (dispatch) => {
  dispatch({ type: "query_data", payload: {[key]: val} });
};

export const fetchData = (key = "", val = "") => async (dispatch) => {

  const res = await URL.get('');
  dispatch({ type: FETCH_DATA, payload: res });
};

export const changeData = (obj={}) => async (dispatch) => {
  console.log(obj);
  const appkey=obj.appci;
  delete obj.appci;
  const res = await URL.put(appkey,obj);
  console.log(res);
  const resp = await URL.get('');
  dispatch({ type: ROW_CLICK, payload: res });
  dispatch({ type: FETCH_DATA, payload: resp });

}

export const deleteData = (obj="") => async (dispatch) => {
  const res = await URL.delete(obj);
  console.log(res);
  const resp = await URL.get('');
  dispatch({ type: ROW_CLICK, payload: res });
  dispatch({ type: FETCH_DATA, payload: resp });

}

export const addData = (obj={}) => async (dispatch) => {
  console.log(obj);
  const res = await URL.post('',obj);
  console.log(res);
  const resp = await URL.get('');
  dispatch({ type: ROW_CLICK, payload: {link:"/table", num:""} });
  dispatch({ type: FETCH_DATA, payload: resp });
}

export const rowClick = (obj = {link:"/table", num:""}) => async(dispatch) =>{
  console.log(obj.num);
  const res = await URL.get(obj.num);
  console.log(res);
  dispatch({ type: FETCH_DATA, payload: res });
  dispatch({ type: ROW_CLICK, payload: obj });
};
