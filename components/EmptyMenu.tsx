import { useState } from "react";
import MenuItemForm from "@/components/MenuItemForm";
import AddCircle from "@/components/icons/AddCircle";
import { AddItem } from "@/components/Home";

export default function EmptyMenu({ addItem }: { addItem: AddItem }) {
    const [isAdding, setIsAdding] = useState(false);
    const goBack = () => setIsAdding(false);

    return isAdding ?
            <MenuItemForm
                onCancel={goBack}
                onDelete={goBack}
                onSubmit={addItem}
                isEditing={false}
            ></MenuItemForm>
        :   <section
                className={
                    "grid justify-items-center rounded-lg bg-zinc-100 p-4"
                }
            >
                <h1 className={"text-xl font-bold"}>Menu jest puste</h1>
                <p className={"text-sm"}>
                    W tym menu nie ma jeszcze żadnych linków.
                </p>
                <button
                    className="mt-4 flex items-center gap-1 rounded-lg border bg-droplo-purple p-2 font-bold text-white"
                    onClick={() => setIsAdding(true)}
                >
                    <AddCircle />
                    Dodaj pozycję menu
                </button>
            </section>;
}
