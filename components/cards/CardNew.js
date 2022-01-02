import React, { useState } from 'react';
import { DotsHorizontalIcon, ChatIcon, PencilIcon, CheckIcon } from '@heroicons/react/outline';

function Card({ text, comments, priority, cardId }) {
    const [cardText, setCardText] = useState(text);
    const [enableEditing, setEnableEditing] = useState(false);

    const toggleEnableEditing = () => {
        setEnableEditing(!enableEditing);
    }


    const getPriorityColor = () => {
        switch (priority) {
            case 1:
                return "border-green-500 hover:border-green-300";
            case 2:
                return "border-orange-500 hover:border-orange-300";
            case 3:
                return "border-red-500 hover:border-red-300";
            default:
                return "";
        }
    }
    return (
        <div className={'z-0 h-28 group cursor-pointer border-t-[3px] bg-white p-1 rounded relative justify-start shadow-lg flex flex-col gap-y-2 hover:bg-gray-50 ' + (getPriorityColor())}>
            <div className='flex flex-grow items-start h-full'>
                <input className={'outline-none rounded py-1 px-1 w-full ' + ((enableEditing)?"bg-gray-100":"bg-transparent")} disabled={!enableEditing} onChange={(e) => { setCardText(e.target.value) }} value={cardText} />
                {enableEditing ?
                    <CheckIcon onClick={toggleEnableEditing} className='hidden group-hover:flex h-8 w-8 p-2 absolute top-1 right-1 hover:bg-gray-200 hover:rounded cursor-pointer' />
                    :
                    <PencilIcon onClick={toggleEnableEditing} className='hidden group-hover:flex h-8 w-8 p-2 absolute top-1 right-1 hover:bg-gray-200 hover:rounded cursor-pointer' />}
            </div>
            {(comments > 0) ? <div className='flex items-center gap-x-0.5 text-xs font-bold'>
                <ChatIcon className='h-4 w-4' />
                <p>{comments}</p>
            </div> : ""}
        </div>
    );
}

export default Card;