export default (state = {}, action) => {
    switch (action.type){
        case "DISCOVER":
            return action.payload
        default:
            return state

    }
}