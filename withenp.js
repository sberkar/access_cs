import { useState } from "react";
import { auth } from "./firebase_init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

function WithEnP() {
        const [user, setUser] = useState({})

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const [lEmail, setLEmail] = useState("")
    const [lPass, setLPass] = useState("")

    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser) {
            setUser(currentUser)
        }
    })

    async function Register() {
        try{
            const user = await createUserWithEmailAndPassword(auth, email, pass)
            alert("success")
            console.log(user);

        }catch(err){
            console.log(err);
        }
    }
    async function Login() {
        try {
            const user = await signInWithEmailAndPassword(auth, lEmail, lPass)
            console.log(user);
        }catch(err){
            console.log(err);
        }
    }
    async function logout() {
        try{
            await signOut(auth)
            setUser({})
            alert("logged out")
        }catch(err){
            console.log(err);
        }
    }
    
    return<div>
            <p>Register:</p>
            <input type="email" placeholder='enter email' onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="enter password" onChange={e => setPass(e.target.value)} />
            <button onClick={Register()}>Register</button>

            <p>{email}</p>
            <p>{pass}</p>

            <p>Login: </p>
            <input type="email" placeholder='enter email' onChange={e => setLEmail(e.target.value)} />
            <input type="password" placeholder="enter password" onChange={e => setLPass(e.target.value)} />
            <button onClick={Login()}>Login</button>

            <p>{user?.uid}<br/>Logged in as : {user?.email} </p>
            <button onClick={logout}>logout</button>
        </div>
}

export default WithEnP;