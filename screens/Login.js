import React from "react";
import styles from "../styles";
import RootNavigator from "../navigation/RootNavigator";
import { connect } from "react-redux";
import { login } from "../redux/actions";
import * as firebase from "firebase";
import firebaseConfig from "../config/firebase.js";
firebase.initializeApp(firebaseConfig);

import { Text, View, Alert, TouchableOpacity } from "react-native";
// console.disableYellowBox = true; 
class Login extends React.Component {
  state = {}
  
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.dispatch(login(user));
      } else {
        console.log('try something else here')
      }
    });

    // this.props.dispatch(login())//input here will become my payload in actions.js
    // this.login()
  }

  login = async () => {
    const {
      type,
      token,
    } = await Expo.Facebook.logInWithReadPermissionsAsync("636098266793076", {
      permissions: ["public_profile"]
    });
    console.log(type)
    if (type === "success") {
      //Build firebase credential with facebook access token
      const credential = await firebase.auth.FacebookAuthProvider.credential(
        token
      );

      //Sign in with credential from the Facebook User.
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .catch(error => {
          //Error handling here
          Alert.alert("There was a problem signing you in");
          
        });
    }
  };
  render() {
    if (this.props.loggedIn) {
      return <RootNavigator />;
    } else {
      return (
        <View style={[styles.container, styles.center]}>
            <TouchableOpacity style={styles.button} onPress={this.login.bind(this)}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps)(Login);
