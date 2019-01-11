const initialState = 
{
    loggedIn: false,
    cards: [],
    user: {
        id: '',
        photoUrl: '',
        name: '',
        aboutMe: '',
        chats: '',
        geocode: '',
        range: '',
        gender: '',
        preference: '', 
        images: [],
        notification:false,
        show: false,
        report: false,
        swipes: [],
        token: '',
        age: '',

    }
}


export default reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            //grab entire state, find user item, and update it with action.payload
            return {...state, user: action.user, loggedIn: action.loggedIn }
        }
        case 'LOGOUT': {
            return {...state, loggedIn: action.loggedIn }
        }
        case 'UPLOAD_IMAGES': {
            return {...state, user: {...state.user, images: action.payload } }
        }
        case 'UPDATE_ABOUT': {
            return {...state, user: {...state.user, aboutMe: action.payload } }
        }
        case 'GET_CARDS': {
            return {...state, cards: action.payload }
        }
        case 'GET_LOCATION': {
            return {...state, user: {...state.user, geocode: action.payload } }
        }
        case 'ALLOW_NOTIFICATIONS': {
            return {...state, user: {...state.user, token: action.payload } }
        }
        case 'UPDATE_RANGE': {
            return{ ...state, user: {...state.user, range: action.payload}} 
        }
        case 'CHANGE_PREFERENCE': {
            return{ ...state, user: {...state.user, preference: action.payload}} 
        }
       
    }
    return state;
}

