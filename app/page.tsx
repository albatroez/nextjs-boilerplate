"use client";

import EmptyMenu from "@/components/EmptyMenu";
import { useState } from "react";
import ItemList from "@/components/ItemList";

export default function Home() {
    const [items, setItems] = useState([]);

    return items.length > 0 ? <ItemList /> : <EmptyMenu />;
}
