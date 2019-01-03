//===========BASIC LOGIN FUNCTION==========
import * as firebase from "firebase";
import aws from "../config/cloud.js";
import { ImagePicker } from "expo";
import { RNS3 } from "react-native-aws3";
import { Alert } from 'react-native';

export function login(user) {
  return function(dispatch) {
    let params = {
      id: user.uid,
      photoUrl: user.photoURL,
      name: user.displayName,
      aboutMe: " ",
      chats: " ",
      geocode: " ",
      images: [user.photoURL],
      notification: false,
      show: false,
      report: false,
      swipes: {
        [user.uid]: false
      },
      token: " "
    };

    firebase
      .database()
      .ref("cards/")
      .child(user.uid)
      .once("value", function(snapshot) {
        if (snapshot.val() !== null) {
          dispatch({ type: "LOGIN", user: snapshot.val(), loggedIn: true });
        } else {
          firebase
            .database()
            .ref("cards/" + user.uid)
            .update(params);
          dispatch({ type: "LOGIN", user: params, loggedIn: true });
        }
      });
  };
}
export function logout() {
    return function(dispatch){
        firebase.auth().signOut()
        dispatch({ type: 'LOGOUT', loggedIn: false });
    }
}

export function uploadImages(images) {
  return function(dispatch) {
    ImagePicker.launchImageLibraryAsync({ allowsEditing: false })
      .then(function(result) {
        console.log("========MY RESULT=====" + JSON.stringify(result));
      var array = images;
      if (result.uri != undefined) {
        const file = {
          uri: result.uri,
          name: result.uri,
          type: "image/png"
        };
        console.log("This is file:  ")
        console.log(JSON.stringify(file))
        const options = {
          keyPrefix: "images/",
          bucket: "aposdate",
          region: "us-west-1", //this may be incorrect
          accessKey: aws.accessKey,
          secretKey: aws.secretKey,
          successActionStatus: 201
        };

        RNS3.put(file, options).then(response => {
          // console.log(response);
          if (response.status !== 201) { 
            console.log("===========MY RNS3 RESPONSE======= ");
            console.log(JSON.stringify(response));

            
            
          } else{
            
            array.push(response.body.postResponse.location);
            firebase
              .database()
              .ref("cards/" + firebase.auth().currentUser.uid + "/images")
              .set(array);
            dispatch({ type: "UPLOAD_IMAGES", payload: array });
          }
        })
        
      } else {
        console.log("=====RESULT.URI=====" + result.uri);
        console.log("result.uri may be undefined");
      }
    });
  };
}

export function deleteImage(images, key){
    return function(dispatch){
       Alert.alert(
           'Are you sure you want to delete?',
           '',
           [
               {text:'Delete', onPress: () => {
                   var array = images
                   array.splice(key,1)
                   dispatch({ type: 'UPLOAD_IMAGES', payload: array});
                   firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/images').set(array); //set will make sure that everything is an object
               }},
               {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
           ],
           { cancelable: true }
       ) 
    }
}

export function updateAbout(value){
    return function(dispatch){
        dispatch({ type: 'UPDATE_ABOUT', payload: value });
        setTimeout(function(){
            firebase.database().ref('cards/' + firebase.auth().currentUser.uid).update({ aboutMe: value});
        }, 3000);
    }
}

export function getCards(){
  return function(dispatch){
    firebase.database().ref('cards').once('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        item = child.val();
        item.id = child.key;
        items.push(item);
      });
      dispatch({ type: 'GET_CARDS', payload: items });
    })
  }
}