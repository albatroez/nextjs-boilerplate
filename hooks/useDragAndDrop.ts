import {
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { Dispatch, SetStateAction } from "react";

export function useDragAndDrop<T extends { id: UniqueIdentifier }>(
    setItems: Dispatch<SetStateAction<T[]>>
) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(
                    (item) => item.id === active.id
                );
                const newIndex = items.findIndex(
                    (item) => item.id === over?.id
                );

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return { sensors, handleDragEnd };
}
