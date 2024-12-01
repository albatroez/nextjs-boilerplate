"use client";

import EmptyMenu from "@/components/EmptyMenu";
import { useState } from "react";
import ItemList from "@/components/ItemList";
import MenuItemForm, { FormData } from "@/components/MenuItemForm";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import DndProvider from "@/components/dnd/DndProvider";
import useItems from "@/hooks/useItems";

export type MenuItem = FormData & { id: number };
export type RemoveItem = (id: number) => void;
export type EditItem = (updatedItem: MenuItem) => void;
export type AddItem = (item: MenuItem) => void;

export default function Home() {
    const [isAdding, setIsAdding] = useState(false);
    const [items, setItems] = useState<MenuItem[]>([]);
    const { sensors, handleDragEnd } = useDragAndDrop(setItems);
    const { addItem, editItem, removeItem } = useItems(setItems, setIsAdding);

    return items.length > 0 ?
            <div className={"bg-zinc-100 rounded-lg border"}>
                <DndProvider
                    sensors={sensors}
                    handleDragEnd={handleDragEnd}
                    items={items}
                >
                    <ItemList
                        items={items}
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
                                onDelete={() => setIsAdding(false)}
                                onSubmit={addItem}
                                isEditing={false}
                            />
                        </div>
                    )}
                </DndProvider>
            </div>
        :   <EmptyMenu addItem={addItem} />;
}
