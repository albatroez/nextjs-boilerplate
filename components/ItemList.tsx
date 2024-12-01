import SortableItem from "@/components/dnd/SortableItem";
import { EditItem, MenuItem, RemoveItem } from "@/app/page";

export default function ItemList({
    items,
    removeItem,
    editItem,
    isRoot = false,
}: {
    items: MenuItem[];
    removeItem: RemoveItem;
    editItem: EditItem;
    isRoot?: boolean;
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
