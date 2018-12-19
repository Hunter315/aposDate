//===========BASIC LOGIN FUNCTION==========
export function login(){
    return function(dispatch){
        dispatch({ type: 'LOGIN', payload: 'test' });
    }
}