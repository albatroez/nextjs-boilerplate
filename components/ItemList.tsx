import SortableItem from "@/components/dnd/SortableItem";
import { EditItem, MenuItem, RemoveItem } from "@/app/page";
import Item from "@/components/item/Item";

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
                    id={item.id}
                    renderItem={(props) => (
                        <Item
                            item={item}
                            roundTop={isRoot && index === 0}
                            removeItem={removeItem}
                            editItem={editItem}
                            {...props.listeners}
                            {...props.attributes}
                        />
                    )}
                />
            ))}
        </div>
    );
}
