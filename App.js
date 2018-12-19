import React from 'react';
import styles from './styles.js';
import RootNavigator from './navigation/RootNavigator';
import reducers from './redux/reducers.js';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducers, middleware);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
        
    );
  }
}
