"use client";
import { useState } from "react";
import MenuItemForm from "@/components/MenuItemForm";
import AddCircle from "@/components/icons/AddCircle";

export default function EmptyMenu({ addItem }) {
    const [isAdding, setIsAdding] = useState(false);
    const goBack = () => setIsAdding(false);

    return isAdding ?
            <MenuItemForm onCancel={goBack} onSubmit={addItem}></MenuItemForm>
        :   <section
                className={
                    "grid justify-items-center p-4 bg-zinc-100 rounded-lg"
                }
            >
                <h1 className={"text-xl font-bold"}>Menu jest puste</h1>
                <p className={"text-sm"}>
                    W tym menu nie ma jeszcze żadnych linków.
                </p>
                <button
                    className="flex items-center gap-1 border text-white rounded-lg p-2 mt-4 bg-droplo-purple font-bold"
                    onClick={() => setIsAdding(true)}
                >
                    <AddCircle/>
                    Dodaj pozycję menu
                </button>
            </section>;
}
