import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type AdditionalProps = {
    attributes: DraggableAttributes;
    listeners: SyntheticListenerMap | undefined;
};
export default function SortableItem({
    id,
    renderItem,
}: {
    id: number;
    renderItem: ({ attributes, listeners }: AdditionalProps) => ReactNode;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    if (transform) {
        transform.scaleY = 1;
    }
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {renderItem({ attributes, listeners })}
        </div>
    );
}
