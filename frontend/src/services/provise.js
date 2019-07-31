import firebase from "firebase/app";
import "@firebase/messaging";

// initialize Firebase
var config = {
  apiKey: "AIzaSyC38Q6st2D5nlzoosGxMuZMm_-dz9wDDBU",
  authDomain: "ssafy-2team-dc2b4.firebaseapp.com",
  databaseURL: "https://ssafy-2team-dc2b4.firebaseio.com",
  storageBucket: "gs://ssafy-2team-dc2b4.appspot.com",
  messagingSenderId: "72397315856"
};
export default !firebase.apps.length
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();

const messaging = firebase.messaging();

// messaging.usePublicVapidKey("BF3UbpIsaWU29cBm5bqTDcc6qVJbH_-_v5nx-AeaEye4CVfVzyuiR1ikx1-ZiPam4QyeN7UB3lleCMHJDIypMIo");

messaging.requestPermission()
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

// messaging.onMessage(function(payload) {
//   console.log("onMessage: ", payload);
// });
