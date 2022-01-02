import React, { useState } from 'react';
import dataStore from '../data/dataStore';
import SideBar from './sidebar/SideBar';
import TopBar from './topbar/TopBar';

function Layout({ children, currentUser }) {
    const menuState = dataStore(state => state.isMenuOpen);
    return (
        <div className='min-w-fit w-full h-[200vh] bg-gray-900'>
            <TopBar currentUser={currentUser} />
            <SideBar currentUser={currentUser} />

            <main className={'pt-12 transition-all transform duration-200 ' + ((menuState)?"pl-48 sm:pl-64":"pl-0")}>
                {children}
            </main>
        </div>
    );
}

export default Layout;
