"use client";
import { useState } from "react";
import MenuItemForm, { FormData } from "@/components/MenuItemForm";
import Drag from "@/components/icons/Drag";
import { MenuItem } from "@/app/page";

function Actions({ onClickAdd, onClickDelete, onClickEdit }) {
    return (
        <section className="ml-auto">
            <button onClick={onClickDelete}>Usuń</button>
            <button onClick={onClickEdit}>Edytuj</button>
            <button type={"button"} onClick={onClickAdd}>
                Dodaj
            </button>
        </section>
    );
}

function Item({ item, removeItem, editItem }) {
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [subItems, setSubItems] = useState<MenuItem[]>([]);
    const addSubItem = (item: FormData, id: number) => {
        setSubItems((prevState) => [...prevState, { ...item, id }]);
        setIsAdding(false);
    };
    const removeSubItem = (id: number) =>
        setSubItems((prevState) => prevState.filter((item) => item.id !== id));
    const editSubItem = (updatedItem: MenuItem) => {
        setSubItems((items) =>
            items.map((item) => {
                if (updatedItem.id === item.id) {
                    return updatedItem;
                }
                return item;
            })
        );
    };

    const editItemAndResetForm = (updatedItem) => {
        editItem(updatedItem);
        setIsEditing(false)
    }

    return (
        <section className="border">
            {isEditing ?
                <MenuItemForm
                    onCancel={() => setIsEditing(false)}
                    onSubmit={editItemAndResetForm}
                    item={item}
                    isEditing={isEditing}
                />
            :   <div className="flex">
                    <Drag />
                    <div>
                        <p>{item.label}</p>
                        <p>{item.url}</p>
                    </div>
                    <Actions
                        onClickAdd={() => setIsAdding(true)}
                        onClickDelete={() => removeItem(item.id)}
                        onClickEdit={() => setIsEditing(true)}
                    />
                </div>
            }
            <ItemList
                items={subItems}
                addItem={addSubItem}
                removeItem={removeSubItem}
                editItem={editSubItem}
            />
            {isAdding && (
                <MenuItemForm
                    onCancel={() => setIsAdding(false)}
                    onSubmit={addSubItem}
                />
            )}
        </section>
    );
}

export default function ItemList({
    items,
    removeItem,
    editItem,
    isRoot = false,
}) {
    return (
        <div className={isRoot ? "" : "ml-2"}>
            {items.map((item) => (
                <Item
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    editItem={editItem}
                />
            ))}
        </div>
    );
}
