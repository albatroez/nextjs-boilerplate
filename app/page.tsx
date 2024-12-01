"use client";

import EmptyMenu from "@/components/EmptyMenu";
import { useState } from "react";
import ItemList from "@/components/ItemList";
import MenuItemForm, { FormData } from "@/components/MenuItemForm";

export type MenuItem = FormData & { id: number };

export default function Home() {
    const [isAdding, setIsAdding] = useState(false);
    const [items, setItems] = useState<MenuItem[]>([]);
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
    }

    return items.length > 0 ?
            <div>
                <ItemList
                    items={items}
                    // addItem={addItem}
                    removeItem={removeItem}
                    editItem={editItem}
                    isRoot={true}
                />
                <button onClick={() => setIsAdding((prevState) => !prevState)}>
                    Dodaj pozycję menu
                </button>
                {isAdding && (
                    <MenuItemForm
                        onCancel={() => setIsAdding(false)}
                        onSubmit={addItem}
                    />
                )}
            </div>
        :   <EmptyMenu addItem={addItem} />;
}
