importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js");

var config = {
  apiKey: "AIzaSyC38Q6st2D5nlzoosGxMuZMm_-dz9wDDBU",
  authDomain: "ssafy-2team-dc2b4.firebaseapp.com",
  databaseURL: "https://ssafy-2team-dc2b4.firebaseio.com",
  storageBucket: "gs://ssafy-2team-dc2b4.appspot.com",
  messagingSenderId: "72397315856"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  const title = "글이 작성되었습니다.";
  const options = {
    body: payload.data.status
  };
  return self.registration.showNotification(title, options);
});
