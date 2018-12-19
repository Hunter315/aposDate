export default reducers = (state = {
    user: '',
}, action) => {
    switch (action.type) {
        case 'LOGIN': {
            //grab entire state, find user item, and update it with action.payload
            return {...state, user: action.payload }
        }
    }
    return state;
}