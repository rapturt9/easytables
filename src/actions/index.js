import { FETCH_DATA, ROW_CLICK, CHANGE_DATA } from "./types";
import ids from '../ids';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

export const fetchData = (key = "", val = "") => async (dispatch) => {
  //const res = await axios.get("/api/current_user");
  const socket = socketIOClient(ENDPOINT);

  socket.emit("data", {
    key: key,
    val: val
  });

  await socket.on("FromAPI", (data) => {
    console.log(data);
    dispatch({ type: FETCH_DATA, payload: data });
  });
};

export const changeData = (obj={}) => async (dispatch) => {
  const socket = socketIOClient(ENDPOINT);

  console.log(obj);
  socket.emit("change", obj);
  socket.emit("data", {
    key: "",
    val: ""
  });

  let bool=false;
  await socket.on("changed", data => {
    bool=true;
  });

  await socket.on("FromAPI", (data) => {
    if(bool){
      console.log(data);
      dispatch({ type: ROW_CLICK, payload: {link:"/table", num:"adq"} });
      dispatch({ type: FETCH_DATA, payload: data });
    }
  });

}

export const deleteData = (obj="") => async (dispatch) => {
  const socket = socketIOClient(ENDPOINT);

  console.log(obj);

  socket.emit("delete", obj);
  socket.emit("data", {
    key: "",
    val: ""
  });

  let bool=false;
  await socket.on("changed", data => {
    bool=true;
  });

  await socket.on("FromAPI", (data) => {
    if(bool){
      console.log(data);
      dispatch({ type: ROW_CLICK, payload: {link:"/table", num:"adq"} });
      dispatch({ type: FETCH_DATA, payload: data });
    }
  });

}

export const addData = (obj={}) => async (dispatch) => {
  const socket = socketIOClient(ENDPOINT);

  console.log(obj);
  socket.emit("add", obj);
  socket.emit("data", {
    key: "",
    val: ""
  });

  await socket.on("FromAPI", (data) => {
    console.log(data);
    dispatch({ type: ROW_CLICK, payload: {link:"/table", num:"adq"} });
    dispatch({ type: FETCH_DATA, payload: data });
  });
}

export const rowClick = (obj = {link:"/table", num:""}) => async(dispatch) =>{
  console.log(obj);
  const socket = socketIOClient(ENDPOINT);
  if(obj.num){
    socket.emit("dataExact", {
      key: ids[0],
      val: obj.num
    });
  

  await socket.on("FromAPI", (data) => {
    let arr =[];
    arr.push(data);
    console.log(data);
    console.log(obj);
    dispatch({ type: FETCH_DATA, payload: arr });
    dispatch({type: ROW_CLICK, payload: obj});
  });
} else {
  socket.emit("data", {
    key: "",
    val: ""
  });

  await socket.on("FromAPI", (data) => {
    console.log(data);
    dispatch({ type: FETCH_DATA, payload: data });
    dispatch({type: ROW_CLICK, payload: obj});
  });
}
};
