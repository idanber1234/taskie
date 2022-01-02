import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { signUp, useAuth } from '../firebase/firebase-config';
import { HashLoader } from 'react-spinners'

function login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const currentUser = useAuth();
    const router = useRouter()

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { user, error } = await signUp(email, password);
        if (user) {
            console.log(`Signed up - ${user}`)
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
                    <form onSubmit={(event) => { handleSignUp(event) }} className='px-10 flex py-20 text-white justify-center flex-col items-center gap-y-4'>
                        <h1 className='text-blue-500 text-3xl lg:text-5xl font-semibold'>Taskie</h1>
                        <h2 className='font-bold lg:mb-10 text-xl'>By <a href="https://idanbernard.com" target="_blank" className='text-purple-400 hover:text-purple-300'>Idan Bernard</a></h2>
                        <input onChange={(event) => { setEmail(event.target.value) }} type="email" placeholder='Email' className='rounded bg-white text-black px-2 py-1' />
                        <input onChange={(event) => { setPassword(event.target.value) }} type="password" placeholder='Password' className='rounded bg-white text-black px-2 py-1' />
                        <button disabled={loading} type='submit' className='disabled:bg-gray-400 flex justify-center items-center h-10 bg-purple-500 text-white font-semibold w-32 px-6 py-2 rounded hover:bg-purple-600 active:bg-purple-700'>
                            {loading ?
                                <HashLoader loading={loading} size={30} color={"#ffffff"} />
                                :
                                "Sign Up"
                            }
                        </button>
                        <p className="text-red-500 mx-auto flex justify-center">{notifyMessage}</p>
                        <Link href={"/sign-in"}><a className='text-sm -mt-2'>Already have an account? <b>Sign In</b></a></Link>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default login;