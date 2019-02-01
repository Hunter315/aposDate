import React from 'react';
import styles from './styles.js';
import Login from './screens/Login.js'; 
import reducers from './redux/reducers.js';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
const middleware = applyMiddleware(thunkMiddleware);

export const store = createStore(reducers, middleware);
console.disableYellowBox = true; 
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Login/>
      </Provider>
        
    );
  }
}
