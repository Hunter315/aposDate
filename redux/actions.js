//===========BASIC LOGIN FUNCTION==========
import * as firebase from "firebase";
import aws from "../config/cloud.js";
import { ImagePicker, Notifications } from "expo";
import { RNS3 } from "react-native-aws3";
import { Alert } from "react-native";
import Geohash from "latlon-geohash";
import { Location, Permissions } from "expo";
import store from "../App.js";

export function login(user) {
  return function(dispatch) {
    let params = {
      id: user.uid,
      photoUrl: user.photoURL,
      name: user.displayName,
      aboutMe: " ",
      chats: " ",
      geocode: " ",
      range: 4,
      gender: " ",
      preference: " ",
      images: [user.photoURL],
      notification: false,
      show: false,
      report: false,
      swipes: {
        [user.uid]: false
      },
      token: " ",
      age: " ",
    };

    firebase
      .database()
      .ref("cards/")
      .child(user.uid)
      .once("value", function(snapshot) {
        if (snapshot.val() !== null) {
          dispatch({ type: "LOGIN", user: snapshot.val(), loggedIn: true });
          dispatch(allowNotifications());
        } else {
          firebase
            .database()
            .ref("cards/" + user.uid)
            .update(params);
          dispatch({ type: "LOGIN", user: params, loggedIn: true });
        }
        dispatch(getLocation());
      });
  };
}
export function logout() {
  return function(dispatch) {
    firebase.auth().signOut();
    dispatch({ type: "LOGOUT", loggedIn: false });
  };
}

export function uploadImages(images) {
  return function(dispatch) {
    ImagePicker.launchImageLibraryAsync({ allowsEditing: true })
      .then(function(result) {
        console.log("========MY RESULT=====" + JSON.stringify(result));
        var array = images;
        if (result.uri != undefined) {
          const file = {
            uri: result.uri,
            name: result.uri,
            type: "image/png"
          };
          console.log("This is file:  ");
          console.log(JSON.stringify(file));
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
            } else {
              array.push(response.body.postResponse.location);
              firebase
                .database()
                .ref("cards/" + firebase.auth().currentUser.uid + "/images")
                .set(array);
              dispatch({ type: "UPLOAD_IMAGES", payload: array });
            }
          });
        } else {
          console.log("=====RESULT.URI=====" + result.uri);
          console.log("result.uri may be undefined");
        }
      })
      .catch(err => {
        console.log("my error", err);
      });
  };
}

export function deleteImage(images, key) {
  return function(dispatch) {
    Alert.alert(
      "Are you sure you want to delete?",
      "",
      [
        {
          text: "Delete",
          onPress: () => {
            var array = images;
            array.splice(key, 1);
            dispatch({ type: "UPLOAD_IMAGES", payload: array });
            firebase
              .database()
              .ref("cards/" + firebase.auth().currentUser.uid + "/images")
              .set(array); //set will make sure that everything is an object
          }
        },
        { text: "Cancel", onPress: () => console.log("Cancel Pressed") }
      ],
      { cancelable: true }
    );
  };
}

export function updateAbout(value) {
  return function(dispatch) {
    dispatch({ type: "UPDATE_ABOUT", payload: value });
    setTimeout(function() {
      firebase
        .database()
        .ref("cards/" + firebase.auth().currentUser.uid)
        .update({ aboutMe: value });
    }, 3000);
  };
}

export function getCards(geocode) {
  return async function(dispatch) {
   let myPref = await firebase.database().ref("cards/" + firebase.auth().currentUser.uid).child('preference').on("value", snap => {
     preference = snap.val()
     
   });

   let mySex = await firebase.database().ref("cards/" + firebase.auth().currentUser.uid).child("gender").on("value", snap => {
     sex = snap.val()
   })

   console.log("myPref", myPref)
   console.log("mySex", mySex)


    firebase
      .database()
      .ref("cards")
      .orderByChild("geocode")
      .equalTo(geocode)
      .once("value", snap => {
        var items = [];
        snap.forEach(child => {
          console.log("this is my child.val()", child.val())
          //put interest filtering here

          item = child.val();
          item.id = child.key;
          items.push(item);
        
        });
        dispatch({ type: "GET_CARDS", payload: items });
      });
  };
}

export function getLocation(range) {
  return function(dispatch) {
    Permissions.askAsync(Permissions.LOCATION).then(function(result) {
      if (result) {
        Location.getCurrentPositionAsync({}).then(function(location) {
          // Put store.getItem of range here

          if (range != undefined) {
            var geocode = Geohash.encode(
              location.coords.latitude,
              location.coords.longitude,
              range
            );
          } else {
            var geocode = Geohash.encode(
              location.coords.latitude,
              location.coords.longitude,
              4
            );
          }
          firebase
            .database()
            .ref("cards/" + firebase.auth().currentUser.uid)
            .update({ geocode: geocode });
          dispatch({ type: "GET_LOCATION", payload: geocode });
        });
      } else {
        console.log("result not true");
      }
    });
  };
}

export function allowNotifications() {
  return function(dispatch) {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(function(result) {
      if (result.status === "granted") {
        Notifications.getExpoPushTokenAsync().then(function(token) {
          firebase
            .database()
            .ref("cards/" + firebase.auth().currentUser.uid)
            .update({ token: token });
          dispatch({ type: "ALLOW_NOTIFICATIONS", payload: token });
        });
      }
    });
  };
}

export function sendNotification(id, name, text) {
  return function(dispatch) {
    firebase
      .database()
      .ref("cards/" + id)
      .once("value", snap => {
        if (snap.val().token != null) {
          return fetch("https://exp.host/--api/v2/push/send", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              to: snap.val().token,
              title: name,
              body: text
            })
          });
        }
      });
  };
}
export  function updateRange(range) {
  return async function(dispatch) {
    //create variable for my range value
    firebase
      .database()
      .ref("cards/" + firebase.auth().currentUser.uid)
      .update({ range: range });
    dispatch({ type: "UPDATE_RANGE", payload: range });

    let test = await firebase
      .database()
      .ref("cards/" + firebase.auth().currentUser.uid + "/range").on(
      "value",
      snapshot => {
        snapshot.val();
        console.log("my snapshot.val()", snapshot.val());
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
      
      dispatch(getLocation(range));
  };//end dispatch
}

export function changePreference(pref) {
  return function(dispatch) {
    firebase.database().ref('cards/' + firebase.auth().currentUser.uid).update({preference: pref})
    dispatch({ type: 'CHANGE_PREFERENCE', payload: pref})
  };
}

export function changeMyGender(gender){
  return function(dispatch){
    firebase.database().ref('cards/' + firebase.auth().currentUser.uid).update({gender: gender})
    dispatch({ type: 'CHANGE_GENDER', payload: gender})
  }
}

export function changeMyAge(age){
  return function(dispatch){

  }
}