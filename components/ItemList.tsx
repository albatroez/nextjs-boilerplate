import { useState } from "react";
import MenuItemForm, { FormData } from "@/components/MenuItemForm";
import Drag from "@/components/icons/Drag";
import { MenuItem } from "@/app/page";

function Actions({ onClickAdd, removeItem }) {
    return (
        <section className="ml-auto">
            <button onClick={removeItem}>Usuń</button>
            <button>Edytuj</button>
            <button type={"button"} onClick={onClickAdd}>
                Dodaj
            </button>
        </section>
    );
}

function Item({ item, removeItem }) {
    const [isAdding, setIsAdding] = useState(false);
    const [subItems, setSubItems] = useState<MenuItem[]>([]);
    const addItem = (item: FormData, id: number) =>
        setSubItems((prevState) => [...prevState, { ...item, id }]);
    const removeSubItem = (id: number) => setSubItems((prevState) => prevState.filter((item) => item.id !== id))
    return (
        <section className="border">
            <div className="flex">
                <Drag />
                <div>
                    <p>{item.label}</p>
                    <p>{item.url}</p>
                </div>
                <Actions onClickAdd={() => setIsAdding(true)} removeItem={() => removeItem(item.id)} />
            </div>
            <ItemList
                items={subItems}
                addItem={addItem}
                removeItem={removeSubItem}
            />
            {isAdding && (
                <MenuItemForm
                    onCancel={() => setIsAdding(false)}
                    onSubmit={addItem}
                />
            )}
        </section>
    );
}

export default function ItemList({ items, addItem, removeItem, isRoot = false }) {
    const [isAdding, setIsAdding] = useState(false);
    return (
        <div className={isRoot ? '' : 'ml-2'}>
            {items.map((item) => (
                <Item key={item.id} item={item} removeItem={removeItem} />
            ))}
            {isRoot && (
                <button onClick={() => setIsAdding((prevState) => !prevState)}>
                    Dodaj pozycję menu
                </button>
            )}
            {isAdding && (
                <MenuItemForm
                    onCancel={() => setIsAdding(false)}
                    onSubmit={addItem}
                />
            )}
        </div>
    );
}
