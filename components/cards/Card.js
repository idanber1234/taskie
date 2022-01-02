import React, { useState } from 'react';
import { DotsHorizontalIcon, ChatIcon, PencilIcon, CheckIcon } from '@heroicons/react/outline';

function Card({ text, comments, priority, cardId }) {
    const getPriorityColor = () => {
        switch (priority) {
            case 1:
                return "border-green-500 hover:border-green-300";
            case 2:
                return "border-orange-400 hover:border-orange-300";
            case 3:
                return "border-red-500 hover:border-red-300";
            default:
                return "";
        }
    }
    return (
        <div className={'z-0 h-28 group cursor-pointer border-t-[3px] bg-white p-2 rounded relative justify-start shadow-lg flex flex-col gap-y-2 hover:bg-gray-50 ' + (getPriorityColor())}>
            <div className='flex flex-grow items-start h-full'>
                <p className='text-sm sm:text-base'>{text}</p>
            </div>
            {(comments > 0) ? <div className='flex items-center gap-x-0.5 text-xs font-bold'>
                <ChatIcon className='h-4 w-4' />
                <p>{comments}</p>
            </div> : ""}
        </div>
    );
}

export default Card;