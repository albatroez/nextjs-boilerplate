"use client";
import { useState } from "react";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import useItems from "@/hooks/useItems";
import DndProvider from "@/components/dnd/DndProvider";
import ItemList from "@/components/ItemList";
import MenuItemForm, { FormData } from "@/components/MenuItemForm";
import EmptyMenu from "@/components/EmptyMenu";

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
            <div className={"rounded-lg border bg-zinc-100"}>
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
                        className={"m-2 rounded-lg border bg-white p-2"}
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
