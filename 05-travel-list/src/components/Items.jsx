export default function Item({ item, onDeleteItems, onPackedItems }) {
    return (
        <li>
            <input
                type='checkbox'
                value={item.packed}
                onChange={() => onPackedItems(item.id)}
            />
            <span
                className='items'
                style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.description} {item.quantity}
            </span>
            <button onClick={() => onDeleteItems(item.id)}>❌</button>
        </li>
    );
}
