import { useState } from "react";
import MenuItemForm from "@/components/MenuItemForm";

export default function EmptyMenu() {
    const [isAdding, setIsAdding] = useState(false);
    const goBack = () => setIsAdding(false);

    return isAdding ?
            <MenuItemForm
                onCancel={goBack}
                onSubmit={() => undefined}
            ></MenuItemForm>
        :   <section className={"grid justify-items-center"}>
                <h1>Menu jest puste</h1>
                <p>W tym menu nie ma jeszcze żadnych linków</p>
                <button
                    className="border rounded p-2"
                    onClick={() => setIsAdding(true)}
                >
                    Dodaj pozycję menu
                </button>
            </section>;
}
