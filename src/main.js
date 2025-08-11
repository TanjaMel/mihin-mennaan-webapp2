/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDkRyWYRwJ-bQYSCPneXrvirFNdNjFs-nQ",
  authDomain: "mihin-mennaan-webapp2.firebaseapp.com",
  projectId: "mihin-mennaan-webapp2",
  storageBucket: "mihin-mennaan-webapp2.firebasestorage.app",
  messagingSenderId: "820966655919",
  appId: "1:820966655919:web:506e4323172b350b0a515a",
  measurementId: "G-HE7KT14SMC"
};


const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
