import firebase from "firebase/app";
import "@firebase/messaging";
import "firebase/firestore";
import "firebase/auth";
import store from "../store.js";
const POSTS = "posts";
const PORTFOLIOS = "portfolios";
const AUTHS = "auths";
const CHKADMIN = "chkAdmin";
const COMPLETE = "complete";
const PROGRESS = "progress";
const TODO = "todo";
const adminDoc = "Msyvl7pA8HhIYNvhTfWH";

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
const messaging = firebase.messaging();
const firestore = firebase.firestore();

firebase.firestore().enablePersistence()
  .catch(function(err) {
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

export default {
  discardTodo(uid) {
    return firestore.collection(TODO).doc(uid).delete();
  },
  discardProgress(uid) {
    return firestore.collection(PROGRESS).doc(uid).delete();
  },
  discardComplete(uid) {
    return firestore.collection(COMPLETE).doc(uid).delete();
  },
  postTodo(body) {
    return firestore.collection(TODO).add({
      body,
      user: store.state.user.uid,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  postProgress(body) {
    return firestore.collection(PROGRESS).add({
      body,
      user: store.state.user.uid,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  postComplete(body) {
    return firestore.collection(COMPLETE).add({
      body,
      user: store.state.user.uid,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  getTodo() {
    const usersCollection = firestore.collection(TODO);
    return usersCollection.get().then(docSnapshots => {
      return docSnapshots.docs.map(doc => {
        let data = doc.data();
        var tmp = {
          id: doc.id,
          dataMap: data
        };
        return tmp;
      });
    });
  },
  getProgress() {
    const usersCollection = firestore.collection(PROGRESS);
    return usersCollection.get().then(docSnapshots => {
      return docSnapshots.docs.map(doc => {
        let data = doc.data();
        var tmp = {
          id: doc.id,
          dataMap: data
        };
        return tmp;
      });
    });
  },
  getComplete() {
    const usersCollection = firestore.collection(COMPLETE);
    return usersCollection.get().then(docSnapshots => {
      return docSnapshots.docs.map(doc => {
        let data = doc.data();
        var tmp = {
          id: doc.id,
          dataMap: data
        };
        return tmp;
      });
    });
  },
  cngAdminCnt(cnt, pm) {
    const docRef = firestore.doc(CHKADMIN + "/" + adminDoc);
    const cal = "";
    if (pm == "+") {
      this.cal = cnt + 1;
    } else {
      this.cal = cnt - 1;
    }
    docRef.set({
      adminCnt: this.cal
    });
  },
  getAdminCnt() {
    const admin = firestore.collection(CHKADMIN);
    return admin.get().then(docSnapshots => {
      return docSnapshots.docs.map(doc => {
        let data = doc.data();
        return data;
      });
    });
  },
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
          var tmp = {
            id: doc.id,
            dataMap: data
          };
          return tmp;
        });
      });
  },
  getOnePost(uid) {
    const postsCollection = firestore.collection(POSTS);
    return postsCollection
      .orderBy("created_at", "desc")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          if (data.uid == uid) {
            var tmp = {
              id: doc.id,
              dataMap: data
            };
            return tmp;
          }
          else return null;
        });
      });
  },
  postPost(title, body, uid, writer) {
    return firestore.collection(POSTS).add({
      title,
      body,
      uid: uid,
      writer: writer,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  deletePost(pid) {
    var res = firestore.collection(POSTS).doc(pid).delete();
  },
  updatePost(pid, title, body) {
    var setDoc = firestore.collection(POSTS).doc(pid);
    setDoc.set({
      title: title,
      body: body
    }, {merge: true});
  },
  // getOnePf(uid) {
  //   var pf = firestore.collection(PORTFOLIOS).doc(uid);
  //   var getDoc = "";
  //   return pf.get().then(doc => {
  //     if (!doc.exists) {
  //       return null;
  //     } else {
  //       getDoc = doc.data();
  //       return getDoc;
  //     }
  //   });
  // },
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
  getOnePortfolio(uid) {
    const postsCollection = firestore.collection(PORTFOLIOS);
    return postsCollection
      .orderBy("created_at", "desc")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          if (data.uid === uid) {
            var tmp = {
              id: doc.id,
              dataMap: data
            };
            return tmp;
          }
          else {
            return null;
          }
        });
      });
  },
  postPortfolio(title, body, img, uid, writer) {
    return firestore.collection(PORTFOLIOS).add({
      title: title,
      body: body,
      img: img,
      uid: uid,
      writer: writer,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(err) {
      console.log(err);
    });
  },
  deletePortfolio(pfid) {
    var res = firestore.collection(PORTFOLIOS).doc(pfid).delete();
  },
  updatePortfoilio(pfid, title, body, imgSrc) {
    var setDoc = firestore.collection(PORTFOLIOS).doc(pfid);
    setDoc.set({
      title: title,
      body: body,
      img: imgSrc
    }, {merge: true});
  },
  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log(result);
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
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        return user;
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == "auth/weak-password") {
          var alertMsg = "비밀번호를 다시 입력하세요.";
          return alertMsg;
        } else {
          alertMsg = "이미 가입한 회원입니다.";
          return alertMsg;
        }
      });
  },
  updatePassword(newPassword) {
    var user = firebase.auth().currentUser;
    user.updatePassword(newPassword).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
  },
  deleteAccount() {
    var user = firebase.auth().currentUser;
    user.delete().then(function() {
      // User deleted.
      firestore.collection(AUTHS).doc(user.uid).delete();
    }).catch(function(error) {
      // An error happened.
    });
  },
  updateProfile(user, name) {
    user.updateProfile({
      displayName: name
    });
  },
  loginWithEmail(email, password) {
    if (email.length < 4) {
      return "이메일을 입력해주세요.";
    }
    if (password.length < 4) {
      return "비밀번호를 입력해주세요.";
    }
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(user) {
        store.state.accessToken = email;
        return user;
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          return "잘못된 비밀번호입니다.";
        } else if (errorCode === "auth/email-already-in-use") {
          return "이미 사용중인 이메일입니다.";
        }
      });
  },
  logout() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function() {
        // An error happened.
      });
    store.dispatch("logout");
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
  },
  getUserState() {
    return firebase.auth().currentUser;
  },
  getToken() {
    return store.state.accessToken;
  },
  updateUserDeviceToken(uid) {
    var idDetail = firestore.collection("auths").doc(uid);
    var userToken = "";
    messaging.requestPermission().then(function() {
      console.log("Have permission");
      return messaging
        .getToken()
        .then(function(token) {
          userToken = token;
          return idDetail
            .update({ userToken: userToken })
            .then(console.log(userToken))
            .catch(function(error) {
              console.error("Error Occured", error);
            });
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  },
  postComment(body) {
    return firestore.collection("comments").add({
      body: body
    });
  }
};
