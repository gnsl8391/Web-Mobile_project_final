const functions = require("firebase-functions");
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.createPortfolioNotif = functions.firestore
  .document("portfolios/{portfolio}")
  .onCreate(async snap => {
    var message = snap.data().title;
    return pushMessage(message);
  });

exports.createPostNotif = functions.firestore
  .document("posts/{post}")
  .onCreate(async snap => {
    var message = snap.data().title;
    return pushMessage(message);
  });

function pushMessage(message) {
  var payload = {
    notification: {
      title: message
    }
  };
  const users = admin.firestore().collection("auths");
  users
    .get()
    .then(user => {
      user.forEach(info => {
        if (info.data().myauth === "admin" || info.data().myauth === "member") {
          const token = info.data().userToken;
          admin.messaging().sendToDevice(token, payload);
        } else {
          console.log(info.data().myauth);
        }
      });
      return "push message sent complete !";
    })
    .catch(err => {
      console.log("Error occured", err);
    });
}
