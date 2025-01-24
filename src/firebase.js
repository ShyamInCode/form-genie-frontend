import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDvQIRG_tq3Imn1ebV6ldvfE72DAqYXS6E",
    authDomain: "formdata-bee81.firebaseapp.com",
    projectId: "formdata-bee81",
    storageBucket: "formdata-bee81.appspot.com",
    messagingSenderId: "865075264704",
    appId: "1:865075264704:web:3e4c144f4472c2179f4125",
    measurementId: "G-6ZTFSD426D"
  };

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);