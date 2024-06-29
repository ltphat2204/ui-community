import { initializeApp } from "firebase/app"
import { defineStore } from 'pinia'

const firebaseConfig = {
  apiKey: "AIzaSyBOaLey5c9qk-QS6ZPxJbCSp72RW3wXFws",
  authDomain: "ui-snippet.firebaseapp.com",
  projectId: "ui-snippet",
  storageBucket: "ui-snippet.appspot.com",
  messagingSenderId: "782313528779",
  appId: "1:782313528779:web:02d24e4c5356908190ea4e"
}

const app = initializeApp(firebaseConfig)

export const useDatabaseStore = defineStore('database', {
    state: () => ({ db: app })
})