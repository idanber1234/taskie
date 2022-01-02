import dataStore from '../data/dataStore';
import Head from 'next/head'
import Layout from '../components/Layout'
import { DotsHorizontalIcon, ChatIcon, PencilIcon } from '@heroicons/react/outline';
import Card from '../components/cards/Card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import Data from '../data/data.json'
import Group from '../components/group/Group';
import { getFirestoreData, groupRef, logout, useAuth, workspaceRef } from '../firebase/firebase-config';
import { useRouter } from 'next/router';
import { ScaleLoader } from 'react-spinners'
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/solid';


function Home() {
  const [ready, setReady] = useState(false);
  const [data, setData] = useState(Data);
  const [user, setUser] = useState();
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [showNewGroupTitleInput, setShowNewGroupTitleInput] = useState(false);
  const [newGroupTitle, setNewGroupTitle] = useState("");
  const router = useRouter()
  const currentUser = useAuth();
  const currentDataStore = dataStore(state => state.storeData);
  const currentAddGroup = dataStore(state => state.addGroup);
  const currentSwapItemsSameGroup = dataStore(state => state.swapItemsSameGroup);
  const currentSwapItemsDifferentGroup = dataStore(state => state.swapItemsDifferentGroup);


  useEffect(() => {
    if (currentUser != undefined && typeof window !== "undefined") {
      setUser(currentUser);
      setReady(true);
    }
  }, [currentUser != undefined])

  const handleOnDragEnd = (item) => {
    if (!item.destination) return;
    const sourceIndex = item.source.index;
    const sourceGroup = item.source.droppableId;
    const destinationIndex = item.destination.index;
    const destinationGroup = item.destination.droppableId;

    if (sourceGroup == destinationGroup) {
      if (sourceIndex != destinationIndex) {
        currentSwapItemsSameGroup(sourceIndex, destinationIndex, parseInt(sourceGroup));
      }
    } else {
      currentSwapItemsDifferentGroup(parseInt(sourceGroup), parseInt(destinationGroup), sourceIndex, destinationIndex);
    }
  }

  const handleAddGroup = (e) => {
    e.preventDefault();
    currentAddGroup(newGroupTitle);
    setNewGroupTitle("");
    toggleNewGroupInputTitle();
  }

  const toggleNewGroupInputTitle = () => {
    setShowNewGroupTitleInput(!showNewGroupTitleInput);
  }


  if (currentUser === null) {
    router.replace("/sign-in")
  }

  return (
    <div>
      {user ?
        <Layout currentUser={currentUser}>
          <Head>
            <title>Taskie</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="py-7 px-6 sm:px-8 md:px-10 ">
            <div className='flex z-0 gap-5 sm:gap-8 md:gap-10'>
              {ready && (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  {currentDataStore.map((group, groupIndex) => {
                    return (
                      <div key={groupIndex}>
                        <Droppable index={groupIndex} droppableId={group.id.toString()}>
                          {(provided, snapshot) => (
                            <div index={groupIndex} {...provided.droppableProps} ref={provided.innerRef}>
                              <Group index={groupIndex} title={group.title} snapshot={snapshot}>
                                {group.items.map((item, itemIndex) => (
                                  <Draggable key={item.id} index={itemIndex} draggableId={item.id.toString()}>
                                    {(provided) => (
                                      <div text={item.innerText} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <Card cardId={item.id} text={item.innerText} comments={item.comments} priority={item.priorityLevel} />
                                      </div>
                                    )
                                    }
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </Group>
                            </div>
                          )
                          }
                        </Droppable>
                      </div>
                    )
                  })}
                </DragDropContext>
              )}
              {showNewGroupTitleInput
                ?
                <form onSubmit={(e) => { handleAddGroup(e) }} className="flex-col gap-y-2 rounded-lg transition cursor-pointer p-2 sm:p-4 h-32 sm:h-24 bg-gray-200 w-32 sm:w-48 flex justify-center items-center">
                  <input required className="rounded bg-white text-black px-2 py-1 w-28 sm:w-40" type="text" placeholder="title" onChange={(e) => { setNewGroupTitle(e.target.value) }} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-2 w-full">
                    <button onClick={() => { toggleNewGroupInputTitle() }} className="rounded bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white px-2 py-1">Cancel</button>
                    <button type="submit" className="rounded bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-white px-2 py-1">Create</button>
                  </div>
                </form>
                :
                <div onClick={() => { toggleNewGroupInputTitle() }} className='rounded-lg hover:bg-gray-400 transition cursor-pointer p-2 bg-gray-200 px-8 h-10 w-32 sm:w-48 flex justify-center items-center'>
                  <PlusIcon className='h-6 w-6' />
                </div>}

            </div>
          </div>
        </Layout>
        :
        <div className='flex flex-col gap-y-4 justify-center items-center bg-gray-800 h-screen w-screen'>
          <h1 className='text-blue-400 text-5xl'>Taskie</h1>
          <ScaleLoader color='#0054a8' />
        </div>}
    </div>
  );
}
export default Home;