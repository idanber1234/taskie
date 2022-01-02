import React, { useEffect, useState } from 'react';
import { ViewBoardsIcon, UsersIcon, MenuIcon } from '@heroicons/react/outline'
import { logout, useAuth } from '../../firebase/firebase-config'
import { useRouter } from 'next/router';
import dataStore from '../../data/dataStore';

function TopBar({ currentUser }) {
    const router = useRouter()
    const handleLogout = () => {
        router.push("/sign-in")
        logout();
    }
    const toggleMenu = dataStore(state => state.toggleMenu);
    const toggleMenuState = () => {
        toggleMenu();
    }

    return (
        <div className='h-12 z-50 fixed top-0 inset-0 bg-blue-500'>
            <div className='text-white grid grid-cols-3 px-4 justify-items-center items-center h-full font-semibold'>
                <div className='flex justify-start w-full items-center'>
                    <MenuIcon onClick={() => { toggleMenu() }} className='md:hidden h-8 w-8 rounded-full hover:bg-blue-600 p-1 cursor-pointer active:bg-blue-700' />
                    <div className='hidden md:inline text-sm'>{`Signed in as ${currentUser?.email}`}</div>
                </div>
                <div>
                    <h1 className='text-2xl upper'>Taskie</h1>
                </div>
                <div className='flex items-center justify-end w-full gap-x-2'>
                    <button onClick={handleLogout} className='disabled:bg-gray-400 hover:text-blue-400 transition text-xs flex justify-center items-center bg-white shadow-sm shadow-blue-500 text-blue-500 sm:text-sm md:text-base font-semibold w-20 sm:w-28 md:w-28 sm:px-0 px-2 py-2 md:py-1 rounded-lg'>
                        Sign Out
                    </button>
                </div>

            </div>
        </div>
    );
}

export default TopBar;