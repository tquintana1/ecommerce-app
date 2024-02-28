import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBeIKx4ALCvSyorgJTjyRdBU-UQoqGWOYY",
    authDomain: "modular-oven-390712.firebaseapp.com",
    projectId: "modular-oven-390712",
    storageBucket: "modular-oven-390712.appspot.com",
    messagingSenderId: "748008404230",
    appId: "1:748008404230:web:7568155cbb091435909a87",
    measurementId: "G-N65MV8FR68"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;