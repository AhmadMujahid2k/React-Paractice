import { useState } from "react";
import Logo from "./components/Logo";
import PackingList from "./components/PackingList";
import Form from "./components/Form";
import Stats from "./components/Stats";

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(newitem) {
        setItems((items) => [...items, newitem]);
    }

    function handleDeleteItems(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handlePackedItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    function handleClearItems() {
        const confirmed = window.confirm(
            "Are you sure you want to delete items?"
        );
        if (confirmed) setItems([]);
    }

    return (
        <div className='app'>
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItems={handleDeleteItems}
                onPackedItems={handlePackedItem}
                onClearItems={handleClearItems}
            />
            <Stats items={items} />
        </div>
    );
}
