import firebase from "firebase/app";
import "@firebase/messaging";

var config = {
  apiKey: "AIzaSyC38Q6st2D5nlzoosGxMuZMm_-dz9wDDBU",
  authDomain: "ssafy-2team-dc2b4.firebaseapp.com",
  databaseURL: "https://ssafy-2team-dc2b4.firebaseio.com",
  storageBucket: "gs://ssafy-2team-dc2b4.appspot.com",
  messagingSenderId: "72397315856"
};
const messaging = firebase.messaging();

messaging
  .requestPermission()
  .then(function() {
    console.log("Have permission");
    return messaging.getToken();
  })
  .then(function(token) {
    console.log(token);
  })
  .catch(function(err) {
    console.log("Error Occured.");
  });
