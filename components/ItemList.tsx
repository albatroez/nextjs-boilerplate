"use client";
import { useState } from "react";
import MenuItemForm, { FormData } from "@/components/MenuItemForm";
import Drag from "@/components/icons/Drag";
import { MenuItem } from "@/app/page";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import DndProvider from "@/components/DndProvider";

function Actions({ onClickAdd, onClickDelete, onClickEdit }) {
    return (
        <section className="ml-auto border rounded-lg">
            <button className={"border-r px-2 py-1 hover:bg-zinc-100"} onClick={onClickDelete}>Usuń</button>
            <button className={"border-r px-2 py-1 hover:bg-zinc-100"} onClick={onClickEdit}>Edytuj</button>
            <button className={"px-2 py-1 hover:bg-zinc-100"} type={"button"} onClick={onClickAdd}>
                Dodaj pozycję menu
            </button>
        </section>
    );
}

function SortableItem({ item, removeItem, editItem, roundTop }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Item
                item={item}
                removeItem={removeItem}
                editItem={editItem}
                roundTop={roundTop}
                {...attributes}
                {...listeners}
            />
        </div>
    );
}

function Item({ item, removeItem, editItem, roundTop, ...rest }) {
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [subItems, setSubItems] = useState<MenuItem[]>([]);
    const { sensors, handleDragEnd } = useDragAndDrop(setSubItems);
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
        setIsEditing(false);
    };

    return (
        <section className="bg-zinc-100">
            {isEditing ?
                <MenuItemForm
                    onCancel={() => setIsEditing(false)}
                    onDelete={() => removeItem(item.id)}
                    onSubmit={editItemAndResetForm}
                    item={item}
                    isEditing={isEditing}
                />
            :   <div className={ `flex bg-white border-b p-2 items-center gap-2${roundTop ? ' rounded-t-lg' : ''}` }>
                    <Drag {...rest} />
                    <div>
                        <p className={"text-lg"}>{item.label}</p>
                        <p className={"text-xs"}>{Boolean(item.url) ? item.url : '(brak linku)'}</p>
                    </div>
                    <Actions
                        onClickAdd={() => setIsAdding(true)}
                        onClickDelete={() => removeItem(item.id)}
                        onClickEdit={() => setIsEditing(true)}
                    />
                </div>
            }
            <DndProvider
                sensors={sensors}
                handleDragEnd={handleDragEnd}
                items={subItems}
            >
                <ItemList
                    items={subItems}
                    addItem={addSubItem}
                    removeItem={removeSubItem}
                    editItem={editSubItem}
                    isEditingFromParent={isEditing}
                />
            </DndProvider>
            {isAdding && (
                <div className={"ml-4 m-2"}>
                <MenuItemForm
                    onCancel={() => setIsAdding(false)}
                    onSubmit={addSubItem}
                />
                </div>
            )}
        </section>
    );
}

export default function ItemList({
    items,
    removeItem,
    editItem,
    isEditingFromParent = false,
    isRoot = false,
}) {
    return (
        <div className={isRoot ? "" : "ml-8"}>
            {items.map((item, index) => (
                <SortableItem
                    key={item.id}
                    item={item}
                    roundTop={isRoot && index === 0}
                    removeItem={removeItem}
                    editItem={editItem}
                />
            ))}
        </div>
    );
}
