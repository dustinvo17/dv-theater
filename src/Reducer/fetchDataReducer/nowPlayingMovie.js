export default (state={},action) =>{
    switch(action.type){
        case "FETCH_MOVIE_NOW_PLAYING":
            return action.payload
        default:
        return state;
        
    }
}