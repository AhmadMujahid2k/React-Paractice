export default function Stats({ items }) {
    if (!items.length)
        return (
            <p className='stats'>
                <em>Start Adding some items to your packing list</em>
            </p>
        );

    const numItems = items.length;
    const numPacked = items.filter((items) => items.packed === true).length;
    const percentage = Math.round((numPacked / numItems) * 100);
    return (
        <footer className='stats'>
            <em>
                {percentage === 100
                    ? `You got everthing! Ready to go`
                    : `You have ${numItems} items on your list, and you already packed
                ${numPacked} (${percentage}%)`}
            </em>
        </footer>
    );
}
