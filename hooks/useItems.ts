import { Dispatch, SetStateAction } from "react";
import { AddItem, EditItem, MenuItem, RemoveItem } from "@/app/page";

export default function useItems(
    setItems: Dispatch<SetStateAction<MenuItem[]>>,
    setIsAdding: Dispatch<SetStateAction<boolean>>
) {
    const addItem: AddItem = (item) => {
        setItems((prevState) => [...prevState, item]);
        setIsAdding(false);
    };
    const removeItem: RemoveItem = (id) =>
        setItems((prevState) => prevState.filter((item) => item.id !== id));

    const editItem: EditItem = (updatedItem) => {
        setItems((items) =>
            items.map((item) => {
                if (updatedItem.id === item.id) {
                    return updatedItem;
                }
                return item;
            })
        );
    };

    return { addItem, removeItem, editItem };
}
