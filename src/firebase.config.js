import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyDEnjjmO8Fs0OzYrZl9eJcY4YftPSxhv2M",
	authDomain: "chat-fece6.firebaseapp.com",
	databaseURL:
		"https://chat-fece6-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "chat-fece6",
	storageBucket: "chat-fece6.appspot.com",
	messagingSenderId: "147275293278",
	appId: "1:147275293278:web:b228ff32ee3e574d35cacf",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const dbRef = firebase.database().ref();

export { dbRef };
export default db;
