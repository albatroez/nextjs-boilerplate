import { closestCenter, DndContext, DragEndEvent, SensorDescriptor, SensorOptions } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PropsWithChildren } from "react";
import { MenuItem } from "@/app/page";

type Props = {
    sensors: SensorDescriptor<SensorOptions>[];
    handleDragEnd: (event: DragEndEvent) => void;
    items: MenuItem[]
}

export default function DndProvider({ sensors, handleDragEnd, items, children }: PropsWithChildren<Props>) {
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {children}
            </SortableContext>
        </DndContext>
    );
}
