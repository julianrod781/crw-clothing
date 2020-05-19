import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBjA292VaGKerZrnUd9_6alGJ1l64TrUig",
  authDomain: "crwn-db-a934b.firebaseapp.com",
  databaseURL: "https://crwn-db-a934b.firebaseio.com",
  projectId: "crwn-db-a934b",
  storageBucket: "crwn-db-a934b.appspot.com",
  messagingSenderId: "957651886406",
  appId: "1:957651886406:web:0df9f66de709d03b838547",
  measurementId: "G-39L5YZWLKJ",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshopToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

// Assumes that
export const addItemToFireStoreUserCart = async (currentUser, item) => {
  //if item set item using and get the whole collection
  const cartItemRef = firestore
    .collection("users")
    .doc(currentUser.id)
    .collection("cart")
    .doc(`${item.id}`);

  await cartItemRef.set(item);

  return getCurrentUserCart(currentUser);
};

export const removeItemFromFireStoreUserCart = async (currentUser, item) => {
  const cartItemRef = firestore
    .collection("users")
    .doc(currentUser.id)
    .collection("cart")
    .doc(`${item.id}`);
  if (item.quantity === 0) {
    const itemSnapshot = await cartItemRef.get();
    if (itemSnapshot) {
      await cartItemRef.delete();
    }
  } else {
    await cartItemRef.set(item);
  }

  return getCurrentUserCart(currentUser);
};

export const clearItemFromFireStoreUserCart = async (currentUser, item) => {
  const cartItemRef = firestore
    .collection("users")
    .doc(currentUser.id)
    .collection("cart")
    .doc(`${item.id}`);

  const itemSnapshot = await cartItemRef.get();
  if (itemSnapshot) {
    await cartItemRef.delete();
  }

  return getCurrentUserCart(currentUser);
};

export const getCurrentUserCart = async (currentUser) => {
  const cartRef = firestore
    .collection("users")
    .doc(currentUser.id)
    .collection("cart");
  const cartSnapshot = await cartRef.get();
  let cartItems = cartSnapshot.docs.map((doc) => doc.data());
  console.log(cartItems);
  cartItems = cartItems ? cartItems : [];
  console.log(cartItems);

  return cartItems;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
