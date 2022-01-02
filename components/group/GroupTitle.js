import { CheckIcon, PencilIcon } from '@heroicons/react/outline';
import React from 'react';

function GroupTitle({title, toggleShowTitleInput, showTitleInput,  }) {
    return (
        <div className='flex justify-between items-center px-2'>
            {!showTitleInput
                ?
                <h4 className='font-semibold text-sm sm:text-base'>{title}</h4>
                :
                <input className="input w-14 sm:w-28" placeholder="title" value={groupTitle} onChange={(e) => { setGroupTitle(e.target.value) }} />}
            {!showTitleInput
                ?
                <PencilIcon onClick={toggleShowTitleInput} className='h-8 w-8 hover:bg-gray-300 hover:rounded cursor-pointer p-2' />
                :
                <CheckIcon onClick={() => { toggleShowTitleInput(); changeTitle(groupTitle) }} className='h-8 w-8 hover:bg-gray-300 hover:rounded cursor-pointer p-2' />}
        </div>
    );
}

export default GroupTitle;