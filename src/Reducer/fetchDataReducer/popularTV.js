export default (state={},action) =>{
    switch(action.type){
        case "FETCH_TV_POPULAR":
            return action.payload
        default:
        return state;
        
    }
}