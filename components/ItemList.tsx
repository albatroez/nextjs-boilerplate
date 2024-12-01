import { useState } from "react";
import MenuItemForm, { FormData } from "@/components/MenuItemForm";
import Drag from "@/components/icons/Drag";
import { MenuItem } from "@/app/page";

function Actions({ onClickAdd }) {
    return (
        <section className="ml-auto">
            <button>Usuń</button>
            <button>Edytuj</button>
            <button type={"button"} onClick={onClickAdd}>
                Dodaj
            </button>
        </section>
    );
}

function Item({ item  }) {
    const [isAdding, setIsAdding] = useState(false);
    const [subItems, setSubItems] = useState<MenuItem[]>([]);
    const addItem = (item: FormData, id: number) =>
        setSubItems((prevState) => [...prevState, { ...item, id }]);
    return (
        <section className="border">
            <div className="flex">
                <Drag />
                <div>
                    <p>{item.label}</p>
                    <p>{item.url}</p>
                </div>
                <Actions onClickAdd={() => setIsAdding(true)} />
            </div>
            <ItemList
                items={subItems}
                addItem={addItem}
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

export default function ItemList({ items, addItem, isRoot = false }) {
    const [isAdding, setIsAdding] = useState(false);
    return (
        <div className={isRoot ? '' : 'ml-2'}>
            {items.map((item) => (
                <Item key={item.id} item={item} />
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
