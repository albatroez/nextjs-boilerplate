import { useSortable } from "@dnd-kit/sortable";
import Item, { ItemProps } from "@/components/item/Item";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({
    item,
    removeItem,
    editItem,
    roundTop,
}: ItemProps) {
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
