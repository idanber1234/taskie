import { CheckIcon, PencilIcon, PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import dataStore from "../../data/dataStore";
import Select from 'react-select'

function Group({ children, title, snapshot, index }) {
    const [showInput, setShowInput] = useState(false);
    const [itemTitle, setItemTitle] = useState("");
    const [itemPriority, setItemPriority] = useState();
    const currentDataStore = dataStore(state => state.storeData);
    const currentAddItem = dataStore(state => state.addItem);
    const currentChangeGroupTitle = dataStore(state => state.changeGroupTitle);
    const [showTitleInput, setShowTitleInput] = useState(false);
    const [groupTitle, setGroupTitle] = useState(title);

    const priorityOptions = [
        { value: 'None', label: 'None', level: 0 },
        { value: 'Low', label: 'low', level: 1 },
        { value: 'Medium', label: 'Medium', level: 2 },
        { value: 'High', label: 'High', level: 3 }
    ]

    const addItem = (e) => {
        e.preventDefault();
        let newItem = {
            priorityLevel: itemPriority,
            innerText: itemTitle,
            comments: 0
        }
        currentAddItem(index, newItem);
        setItemTitle("");
        setItemPriority();
        setShowInput(false);
    }

    const changeTitle = (newTitle) => {
        if (newTitle != title) {
            currentChangeGroupTitle(index, newTitle);
        }

    }

    const toggleShowTitleInput = () => {
        setShowTitleInput(!showTitleInput);
    }

    return (
        <div className={'rounded-lg flex flex-col w-32 sm:w-48 px-2 py-2 gap-y-2 ' + ((snapshot.isDraggingOver) ? "bg-green-300 min-w-full" : "bg-gray-200 min-w-full")}>
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
            {children}
            {showInput
                ?
                <div>
                    <form onSubmit={(e) => { addItem(e) }} className="flex flex-col gap-y-3 sm:p-2 rounded">
                        <input required className="input" type="text" placeholder="title" onChange={(e) => { setItemTitle(e.target.value) }} />
                        <Select options={priorityOptions} placeholder="priority" onChange={(selectedOption) => {setItemPriority(selectedOption.level)}}  />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-2 w-full">
                            <button onClick={(e) => { setShowInput(false) }} className="rounded bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white px-2 py-1">Cancel</button>
                            <button type="submit" className="rounded bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-white px-2 py-1">Create</button>
                        </div>
                    </form>
                </div>
                :
                <div onClick={() => { setShowInput(true) }} className="flex justify-center items-center w-full h-full bg-white cursor-pointer py-2 rounded-lg transition hover:bg-gray-400">
                    <PlusIcon className="h-6 w-6" />
                </div>}
        </div>
    );
}

export default Group;