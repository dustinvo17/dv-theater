export default (state={},action) =>{
    switch(action.type){
        case "FETCH_MOVIE_POPULAR":
            return action.payload
        default:
        return state;
        
    }
}