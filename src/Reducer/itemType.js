export default (state='movie',action) =>{
    switch(action.type){
        case "SEE_MOVIELIST":
            return 'movie'
        case "SEE_TVLIST":
            return 'tv'
        default:
        return state;
        
    }
}