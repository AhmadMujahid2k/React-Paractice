import { useState } from "react";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

export default function App() {
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [friends, setFriends] = useState(initialFriends);
    const [selectFriend, setSelectFrind] = useState(null);

    function handleSelection(friend) {
        setSelectFrind((cur) => (cur?.id === friend.id ? null : friend));
        setShowAddFriend(false);
    }

    function handleAddFriend(newfriend) {
        setFriends((friends) => [...friends, newfriend]);
        setShowAddFriend(false);
    }

    function handleShowAddFriend() {
        setShowAddFriend(!showAddFriend);
    }

    function handleSplitBill(value) {
        setFriends((friends) =>
            friends.map((friend) =>
                friend.id === selectFriend.id
                    ? { ...friends, balance: friend.balance + value }
                    : friend
            )
        );
    }

    return (
        <div className='app'>
            <div className='sidebar'>
                <FriendsList
                    friends={friends}
                    onSelection={handleSelection}
                    selectFriend={selectFriend}
                />
                {showAddFriend && (
                    <FormAddFriend onAddFriend={handleAddFriend} />
                )}
                <Button onClick={handleShowAddFriend}>
                    {showAddFriend ? "Close" : "Add Friend"}
                </Button>
            </div>
            {selectFriend && (
                <FormSplitBill
                    selectFriend={selectFriend}
                    handleSplitBill={handleSplitBill}
                />
            )}
        </div>
    );
}

function FriendsList({ friends, onSelection, selectFriend }) {
    return (
        <ul>
            {friends.map((friend) => (
                <Friend
                    friend={friend}
                    onSelection={onSelection}
                    selectFriend={selectFriend}
                    key={friend.id}
                />
            ))}
        </ul>
    );
}

function Friend({ friend, onSelection, selectFriend }) {
    const isSelected = selectFriend?.id === friend.id;
    return (
        <li className={isSelected ? "selected" : ""}>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (
                <p className='red'>
                    You owe {friend.name} {Math.abs(friend.balance)}$
                </p>
            )}
            {friend.balance > 0 && (
                <p className='green'>
                    {friend.name} owes you {Math.abs(friend.balance)}$
                </p>
            )}
            {friend.balance === 0 && <p>You and {friend.name} are even.</p>}

            <Button onClick={() => onSelection(friend)}>
                {isSelected ? "Close" : "Select"}
            </Button>
        </li>
    );
}

function Button({ children, onClick }) {
    return (
        <button onClick={onClick} className='button'>
            {children}
        </button>
    );
}

function FormAddFriend({ onAddFriend }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    function handleSubmit(e) {
        e.preventDefault();

        const id = crypto.randomUUID();
        if (!name || !image) return;
        const newFriend = {
            name,
            image: `${image}?=${id}`,
            balance: 0,
            id: crypto.randomUUID(),
        };

        onAddFriend(newFriend);
        setName("");
        setImage("https://i.pravatar.cc/48");
    }
    return (
        <form className='form-add-friend' onSubmit={handleSubmit}>
            <lable>Friend name</lable>
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}></input>
            <lable>Image url</lable>
            <input
                type='text'
                value={image}
                onChange={(e) => setImage(e.target.value)}></input>
            <Button>Add</Button>
        </form>
    );
}

function FormSplitBill({ selectFriend, handleSplitBill }) {
    const [bill, setBill] = useState("");
    const [paidByUser, setPaidByUser] = useState("");
    const paidByFriend = bill ? bill - paidByUser : "";
    const [whoIsPaying, setWhoIsPaying] = useState("user");

    function handleSubmit(e) {
        e.preventDefault();

        if (!bill || !paidByUser) return;
        handleSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
    }
    return (
        <form className='form-split-bill' onSubmit={handleSubmit}>
            <h2>Split a bill will {selectFriend.name}</h2>
            <lable>Bill Value</lable>
            <input
                type='text'
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}></input>
            <lable>Your Expense</lable>
            <input
                type='text'
                value={paidByUser}
                onChange={(e) =>
                    setPaidByUser(
                        Number(e.target.value) > bill
                            ? paidByUser
                            : Number(e.target.value)
                    )
                }></input>
            <lable>{selectFriend.name}'s Expense</lable>
            <input type='text' disabled value={paidByFriend}></input>
            <lable>Who is paying the bill</lable>
            <select
                value={whoIsPaying}
                onChange={(e) => setWhoIsPaying(e.target.value)}>
                <option value='user'>You</option>
                <option value='friend'>{selectFriend.name}</option>
            </select>
            <Button>Split Bill</Button>
        </form>
    );
}
