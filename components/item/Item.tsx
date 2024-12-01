import { useState } from "react";
import { AddItem, EditItem, MenuItem, RemoveItem } from "@/app/page";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import MenuItemForm from "@/components/MenuItemForm";
import Drag from "@/components/icons/Drag";
import Actions from "@/components/item/Actions";
import DndProvider from "@/components/dnd/DndProvider";
import ItemList from "@/components/ItemList";

export type ItemProps = {
    item: MenuItem;
    removeItem: RemoveItem;
    editItem: EditItem;
    roundTop: boolean;
};

export default function Item({
    item,
    removeItem,
    editItem,
    roundTop,
    ...rest
}: ItemProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [subItems, setSubItems] = useState<MenuItem[]>([]);
    const { sensors, handleDragEnd } = useDragAndDrop(setSubItems);
    const addSubItem: AddItem = (item) => {
        setSubItems((prevState) => [...prevState, item]);
        setIsAdding(false);
    };
    const removeSubItem: RemoveItem = (id: number) =>
        setSubItems((prevState) => prevState.filter((item) => item.id !== id));
    const editSubItem: EditItem = (updatedItem: MenuItem) => {
        setSubItems((items) =>
            items.map((item) => {
                if (updatedItem.id === item.id) {
                    return updatedItem;
                }
                return item;
            })
        );
    };

    const editItemAndResetForm: EditItem = (updatedItem) => {
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
            :   <div
                    className={`flex bg-white border-b p-2 items-center gap-2${roundTop ? " rounded-t-lg" : ""}`}
                >
                    <Drag {...rest} />
                    <div>
                        <p className={"text-lg"}>{item.label}</p>
                        <p className={"text-xs"}>
                            {Boolean(item.url) ? item.url : "(brak linku)"}
                        </p>
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
                    removeItem={removeSubItem}
                    editItem={editSubItem}
                />
            </DndProvider>
            {isAdding && (
                <div className={"ml-4 m-2"}>
                    <MenuItemForm
                        onCancel={() => setIsAdding(false)}
                        onDelete={() => setIsAdding(false)}
                        onSubmit={addSubItem}
                        isEditing={false}
                    />
                </div>
            )}
        </section>
    );
}
