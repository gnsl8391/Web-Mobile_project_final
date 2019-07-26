import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import store from "../store.js";
const POSTS = "posts";
const PORTFOLIOS = "portfolios";
const AUTHS = "auths";

// Setup Firebase
const config = {
  projectId: "ssafy-2team-dc2b4",
  authDomain: "ssafy-2team-dc2b4.firebaseapp.com",
  apiKey: "AIzaSyC38Q6st2D5nlzoosGxMuZMm_-dz9wDDBU",
  databaseURL: "https://ssafy-2team-dc2b4.firebaseio.com",
  storageBucket: "gs://ssafy-2team-dc2b4.appspot.com",
  messagingSenderId: "72397315856",
  appId: "1:72397315856:web:736285db27f695e9"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();

export default {
  getOneMembers(uid) {
    var cityRef = firestore.collection(AUTHS).doc(uid);
    var getDoc = "";
    return cityRef.get().then(doc => {
      if (!doc.exists) {
        return null;
      } else {
        getDoc = doc.data();
        return getDoc;
      }
    });
  },
  getAllMembers() {
    const usersCollection = firestore.collection(AUTHS);
    return usersCollection.get().then(docSnapshots => {
      return docSnapshots.docs.map(doc => {
        let data = doc.data();
        return data;
      });
    });
  },
  postAuth(uid, myauth, id, root) {
    const docRef = firestore.doc("auths/" + uid);
    docRef.set({
      uid: uid,
      myauth: myauth,
      id: id,
      root: root
    });
  },
  getPosts() {
    const postsCollection = firestore.collection(POSTS);
    return postsCollection
      .orderBy("created_at", "desc")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          return data;
        });
      });
  },
  postPost(title, body) {
    return firestore.collection(POSTS).add({
      title,
      body,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  getPortfolios() {
    const postsCollection = firestore.collection(PORTFOLIOS);
    return postsCollection
      .orderBy("created_at", "desc")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          var tmp = {
            id: doc.id,
            dataMap: data
          };
          return tmp;
        });
      });
  },
  postPortfolio(title, body, img) {
    return firestore.collection(PORTFOLIOS).add({
      title,
      body,
      img,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        return result;
      });
  },
  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        return result;
      });
  },
  createAccount(email, password) {
    if (email.length < 4) {
      alert("Please enter an email address.");
      return;
    }
    if (password.length < 4) {
      alert("Please enter a password.");
      return;
    }
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        alert("회원가입을 축하드립니다");
        return user;
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
      });
  },
  loginWithEmail(email, password) {
    if (email.length < 4) {
      alert("Please enter an email address.");
      return;
    }
    if (password.length < 4) {
      alert("Please enter a password.");
      return;
    }
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(user) {
        store.state.accessToken = email;
        alert("반갑습니다 ^~^");
        return user;
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
      });
  },
  logout() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        alert("안녕히가세요 ^~^");
      })
      .catch(function() {
        // An error happened.
        alert("로그아웃 실패");
      });
  },
  authChk() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        store.state.user = user;
        store.state.accessToken = user.email;
        store.state.uid = user.uid;
      } else {
        // User is signed out.
        // ...
      }
    });
  }
};
