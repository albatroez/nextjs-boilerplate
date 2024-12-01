"use client";

import EmptyMenu from "@/components/EmptyMenu";
import { useState } from "react";
import ItemList from "@/components/ItemList";
import { FormData } from "@/components/MenuItemForm";

export type MenuItem = FormData & { id: number };

export default function Home() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const addItem = (item: FormData, id: number) =>
        setItems((prevState) => [...prevState, { ...item, id }]);
    const removeItem = (id: number) => setItems((prevState) => prevState.filter((item) => item.id !== id))

    return items.length > 0 ?
            <ItemList items={items} addItem={addItem} removeItem={removeItem} isRoot={true} />
        :   <EmptyMenu addItem={addItem} />;
}
