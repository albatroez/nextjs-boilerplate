import { useState } from "react";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import MenuItemForm from "@/components/MenuItemForm";
import Drag from "@/components/icons/Drag";
import Actions from "@/components/item/Actions";
import DndProvider from "@/components/dnd/DndProvider";
import ItemList from "@/components/ItemList";
import useItems from "@/hooks/useItems";
import { EditItem, MenuItem, RemoveItem } from "@/components/Home";

type ItemProps = {
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
    const {
        addItem: addSubItem,
        editItem: editSubItem,
        removeItem: removeSubItem,
    } = useItems(setSubItems, setIsAdding);

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
                    className={`flex items-center border-b bg-white p-2 gap-2${roundTop ? "rounded-t-lg" : ""}`}
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
                <div className={"m-2 ml-4"}>
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
