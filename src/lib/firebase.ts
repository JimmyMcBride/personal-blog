// import { FirebaseApp } from "sveltefire"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getAnalytics, isSupported } from "firebase/analytics"

// Initialize Firebase
export const app = initializeApp({
	apiKey: "AIzaSyCs4tX6nVa1yPRi9ZiuyGCiqcIQshXzdi0",
	authDomain: "blog-ed382.firebaseapp.com",
	projectId: "blog-ed382",
	storageBucket: "blog-ed382.appspot.com",
	messagingSenderId: "396963456507",
	appId: "1:396963456507:web:33b8a0ee5c066984fe975e",
	measurementId: "G-1JDCB3KQD2",
})
export const firestore = getFirestore(app)
export const auth = getAuth(app)

export async function getFirebaseAnalytics() {
	if (await isSupported()) {
		console.log("Firebase analytics is supported")
		return getAnalytics(app)
	} else {
		console.log("Firebase analytics is NOT supported")
		return null
	}
}
