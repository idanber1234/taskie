import React from 'react';

function SideBarItem({title, icon}) {
    return (
        <div className='flex items-center gap-x-2 bg-gray-100 px-2 py-2 rounded hover:bg-gray-200 active:bg-gray-300 active:scale-95 transition cursor-pointer'>
            {icon}
            <p>{title}</p>
        </div>
    );
}

export default SideBarItem;