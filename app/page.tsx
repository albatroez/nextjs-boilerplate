"use client";

import EmptyMenu from "@/components/EmptyMenu";
import { useState } from "react";
import ItemList from "@/components/ItemList";
import MenuItemForm, { FormData } from "@/components/MenuItemForm";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import DndProvider from "@/components/DndProvider";

export type MenuItem = FormData & { id: number };
//
// type Item = {
//     isEditing: boolean;
//     isAdding: boolean;
//     subItems?: Item[]
// } & MenuItem
// type State = {
//     items: Item[]
// }
//
// function itemsReducer(state: State, action) {
//     switch (action.type) {
//         case 'edit': {
//             return state.items.
//         }
//     }
// }

export default function Home() {
    const [isAdding, setIsAdding] = useState(false);
    const [items, setItems] = useState<MenuItem[]>([]);
    const { sensors, handleDragEnd } = useDragAndDrop(setItems);
    const addItem = (item: FormData, id: number) => {
        setItems((prevState) => [...prevState, { ...item, id }]);
        setIsAdding(false);
    };
    const removeItem = (id: number) =>
        setItems((prevState) => prevState.filter((item) => item.id !== id));

    const editItem = (updatedItem: MenuItem) => {
        setItems((items) =>
            items.map((item) => {
                if (updatedItem.id === item.id) {
                    return updatedItem;
                }
                return item;
            })
        );
    };

    return items.length > 0 ?
            <div className={"bg-zinc-100 rounded-lg border"}>
                <DndProvider
                    sensors={sensors}
                    handleDragEnd={handleDragEnd}
                    items={items}
                >
                    <ItemList
                        items={items}
                        // addItem={addItem}
                        removeItem={removeItem}
                        editItem={editItem}
                        isRoot={true}
                    />
                    <button
                        className={"border rounded-lg p-2 m-2 bg-white"}
                        onClick={() => setIsAdding((prevState) => !prevState)}
                    >
                        Dodaj pozycję menu
                    </button>
                    {isAdding && (
                        <div className={"m-2"}>
                        <MenuItemForm
                            onCancel={() => setIsAdding(false)}
                            onSubmit={addItem}
                        />
                        </div>
                    )}
                </DndProvider>
            </div>
        :   <EmptyMenu addItem={addItem} />;
}
