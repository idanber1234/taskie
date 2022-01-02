import Head from 'next/head';
import Link from 'next/link'
import React, { useState } from 'react';
import { signIn, useAuth } from '../firebase/firebase-config';
import {useRouter} from 'next/router'
import { HashLoader } from 'react-spinners';


function login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const currentUser = useAuth();
    const router = useRouter()

    const handleSignIn = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { user, error } = await signIn(email, password);
        if (user) {
          console.log(`Signed in - ${user}`)
        } else {
          setNotifyMessage(error);
        }
        setLoading(false);
      }

    if (currentUser) {
        router.replace("/")
    }

    return (
        <div>
            <Head>
                <title>Taskie</title>
            </Head>
            <main>
                <div className='h-screen w-screen bg-gray-800 flex justify-center'>
                    <form onSubmit={(event) => {handleSignIn(event)}} className='px-10 flex py-20 text-white justify-center flex-col items-center gap-y-4'>
                        <h1 className='text-blue-500 text-3xl lg:text-5xl font-semibold'>Taskie</h1>
                        <h2 className='font-bold lg:mb-10 text-xl'>By <a href="https://idanbernard.com" target="_blank" className='text-purple-400 hover:text-purple-300'>Idan Bernard</a></h2>
                            <input onChange={(event) => {setEmail(event.target.value)}} type="email" placeholder='Email' className='rounded bg-white text-black px-2 py-1' />
                            <input onChange={(event) => {setPassword(event.target.value)}} type="password" placeholder='Password' className='rounded bg-white text-black px-2 py-1' />
                            <button disabled={loading} type='submit' className='disabled:bg-gray-400 flex justify-center items-center h-10 bg-blue-500 text-white font-semibold w-32 px-6 py-2 rounded hover:bg-blue-600 active:bg-blue-700'>
                            {loading ?
                                <HashLoader loading={loading} size={30} color={"#ffffff"} />
                                :
                                "Sign In"
                            }
                        </button>
                        <p className="text-red-500 mx-auto flex justify-center">{notifyMessage}</p>
                        <Link href={"/sign-up"}><a className='text-sm -mt-2'>Don't have an account yet? <b>Sign Up</b></a></Link>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default login;