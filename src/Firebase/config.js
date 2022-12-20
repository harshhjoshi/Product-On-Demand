import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCxieUjJSG6fwZ-8gBBkTa-zNNS0PXPWNM",
    authDomain: "productondemand-c62bf.firebaseapp.com",
    databaseURL: "https://productondemand-c62bf-default-rtdb.firebaseio.com",
    projectId: "productondemand-c62bf",
    storageBucket: "productondemand-c62bf.appspot.com",
    messagingSenderId: "332937348569",
    appId: "1:332937348569:web:69c97be87157b1ddb8c5c8",
    measurementId: "G-868MQ25VLT"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);