import React, { useState } from 'react';
import { ViewBoardsIcon, UsersIcon, CogIcon, HeartIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import SideBarItem from './SideBarItem';
import dataStore from '../../data/dataStore';

const sideBarItems = [
    { title: "Boards", icon: <ViewBoardsIcon className='h-7 w-h-7 text-gray-500' /> },
    { title: "Users", icon: <UsersIcon className='h-7 w-h-7 text-gray-500' /> },
    { title: "Settings", icon: <CogIcon className='h-7 w-h-7 text-gray-500' /> }
]


function SideBar(props) {
    const menuState = dataStore(state => state.isMenuOpen);
    const toggleMenuState = dataStore(state => state.toggleMenu);
    const [heartAnimation, setHeartAnimation] = useState(true);

    const toggleShowMenu = () => {
        toggleMenuState();

    }

    const toggleHeartAnimation = () => {
        setHeartAnimation(!heartAnimation);
    }

    return (
        <div className={'md:inline inset-0 z-50 fixed left-0 bg-white transform duration-200 ease sm:w-64 w-48 mt-12 ' + ((menuState)?"":" sm:-translate-x-64 -translate-x-48")}>
            <div className='flex justify-center flex-col h-screen'>
                <div className='flex justify-center py-4 bg-blue-500 text-white rounded mx-2 my-4 font-medium text-lg'>
                    Workspace
                </div>
                <hr className='sb-hr' />
                <div className='flex flex-col py-4 mx-2 gap-y-2'>
                    {sideBarItems.map((item, index) => (
                        <SideBarItem key={index} icon={item.icon} title={item.title} />
                    ))}
                </div>
                <div onClick={toggleShowMenu} className='hidden absolute top-1/2 rounded-lg p-2 bg-white border-r-2 md:flex items-center justify-center cursor-pointer hover:text-blue-400 transition transform h-10 w-10 -right-8'>
                    {menuState
                        ?
                        <ArrowLeftIcon className='h-5 w-5' />
                        :
                        <ArrowRightIcon className='h-5 w-5' />}
                </div>
                <div className='flex flex-col px-4 sm:py-2 md:py-4 gap-y-4 font-medium flex-grow-0 overflow-y-auto sm:mb-1 md:mb-28 text-xs sm:text-sm md:text-base'>
                    <p>This app is just a POC, created to demonstrate working with Firebase + Firestore for authentication and authorization.</p>
                    <p>Zustand and Immer for inner state management.</p>
                    <p>Tailwind CSS for styling.</p>
                    <p>And React Beautiful DND for drag and drop logic.</p>
                    <p>If you enjoy this app, it will be much appriciated if you can star it on Github and see my other cool projects :)</p>
                </div>
                <div className='flex-grow'>

                </div>
            </div>
            <div className='bottom-0 pb-2 absolute sm:text-sm w-full z-50 bg-white text-xs'>
                <hr className='sb-hr' />
                <div className='flex pt-2 justify-center items-center gap-x-1'>
                    <h3>Made with </h3>
                    <HeartIcon onClick={toggleHeartAnimation} className={'cursor-pointer h-4 w-4 text-red-500 ' + ((heartAnimation) ? "animate-pulse" : "")} />
                    <p>by <a href='https://www.idanbernard.com' target={"_blank"} className='text-purple-400 font-bold'>Idan Bernard</a></p>
                </div>
            </div>
        </div>
    );
}

export default SideBar;