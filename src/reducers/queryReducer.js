export default function(state = {}, action) {
    //console.log(action);
    switch (action.type) {
        case "query_data":
            console.log(action.payload);
            return action.payload;
        default: 
            return state;
    }
}