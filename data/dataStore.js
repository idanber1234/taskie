import create from 'zustand';
import produce from 'immer';

const dataStore = create(set => ({
    lastIndex: 3,
    isMenuOpen: false,
    toggleMenu: () => set(
        produce((draft) => {
            (draft.isMenuOpen) = !(draft.isMenuOpen)
        })
    ),
    storeData: [
        {
            title: "Todo", id: 0, items: [
                {
                    id: 1,
                    priorityLevel: 1,
                    innerText: "Bake a cake",
                    comments: 2
                },
                {
                    id: 2,
                    priorityLevel: 2,
                    innerText: "Fix the laptop",
                    comments: 2
                },
            ]
        },
        {
            title: "Done", id: 1, items: [
                {
                    id: 3,
                    priorityLevel: 3,
                    innerText: "Finish all homework",
                    comments: 2
                },
            ]
        }
    ],
    addItem: (groupIndex, item) => set(
        produce((draft) => {
            draft.lastIndex = draft.lastIndex + 1;
            const newItem = Object.assign(item, { id: draft.lastIndex })
            draft.storeData[groupIndex].items.splice(draft.storeData[groupIndex].items.length, 0, newItem);
        })
    ),
    swapItemsSameGroup: (sourceIndex, destinationIndex, groupIndex) => set(
        produce((draft) => {
            const currentGroup = draft.storeData[groupIndex];
            const item = currentGroup.items[sourceIndex];
            currentGroup.items.splice(sourceIndex, 1);
            currentGroup.items.splice(destinationIndex, 0, item);

        })
    ),
    swapItemsDifferentGroup: (sourceGroupIndex, destinationGroupIndex, sourceIndex, destinationIndex) => set(
        produce((draft) => {
            const sourceGroup = draft.storeData[sourceGroupIndex];
            const destinationGroup = draft.storeData[destinationGroupIndex];
            const item = sourceGroup.items[sourceIndex];
            sourceGroup.items.splice(sourceIndex, 1);
            destinationGroup.items.splice(destinationIndex, 0, item);
        })
    ),
    addGroup: (groupTitle) => set(
        produce((draft) => {
            const nextGroupIndex = draft.storeData.length;
            draft.storeData.splice(nextGroupIndex, 0, { title: groupTitle, id: nextGroupIndex, items: [] })
        })
    ),
    changeGroupTitle: (groupIndex, groupTitle) => set(
        produce((draft) => {
            draft.storeData[groupIndex].title = groupTitle;
        })
    )
}))


export default dataStore