import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyBcQ3DHk3rO5ilekQ36mQPXl8W9SZxLQxk',
  authDomain: 'esp32-9c24f.firebaseapp.com',
  databaseURL: 'https://esp32-9c24f-default-rtdb.firebaseio.com',
  projectId: 'esp32-9c24f',
  storageBucket: 'esp32-9c24f.appspot.com',
  messagingSenderId: '1085337735962',
  appId: '1:1085337735962:web:f65dff1d518fb89889d2a3',
  measurementId: 'G-F93P45E8Z8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app)

export { database }
