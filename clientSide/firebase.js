// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDigT77hR1UDYsDXp_ecQpaIbpdbTEw1Vs",
  authDomain: "chatgpt3-6bb76.firebaseapp.com",
  projectId: "chatgpt3-6bb76",
  storageBucket: "chatgpt3-6bb76.appspot.com",
  messagingSenderId: "361929359114",
  appId: "1:361929359114:web:061081593642b45a7804f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const LoginFunction = async()=>{
    const email = document.getElementsByName('emailLg')
    const pass = document.getElementsByName('passLg')

    signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}
btnLogin.addEventListener('click', LoginFunction)

const SignUpFunction = ()=>{
    const email = document.getElementsByName('emailLg')
    const pass = document.getElementsByName('passLg')


    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    
}

btnSignUp.addEventListener('click', SignUpFunction)

  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });