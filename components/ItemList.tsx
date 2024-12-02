import SortableItem from "@/components/dnd/SortableItem";
import Item from "@/components/item/Item";
import { EditItem, MenuItem, RemoveItem } from "@/components/Home";

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
