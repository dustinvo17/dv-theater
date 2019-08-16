export default (state={},action) =>{
    switch(action.type){
        case "FETCH_TV_LATEST":
            return action.payload
        default:
        return state;
        
    }
}