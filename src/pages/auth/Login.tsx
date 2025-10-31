import React, { useState } from 'react'
import { supabase } from '../../auth/supabaseClient';

const Login = () => {
    const[email,setEmail] = useState(' ');
    const[password,setPassword] = useState(' ');

    const handleSignUp = async () => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options:{
                data:{role : 'STUDENT'}
            }
        })
        if(error){
            alert(error.message);
        }else{
            alert('Check your email for the confirmation link');
        }
    }

    const handleSignIn = async() => {
        const {data,error} = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if(error){
            alert(error.message);
        }else{
            console.log("User signed in:",data.user);
        }
    }
    

  return (
    <div>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
    </div>
  )
}

export default Login