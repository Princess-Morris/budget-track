interface listProps{
    category: "Kitchen Items" | "Laundry Items" | "Beddings";
    description: string;
    amount: string;
    dateTime: string
}

const list: listProps[] = [
    { 
        category: "Kitchen Items",
        description: "Purchases two dozens of eggs",
        amount: "11, 000",
        dateTime: "Tues"
    },

    { 
        category: "Laundry Items", 
        description: "Purchases an a tablet of canoe soap",
        amount: "700",
        dateTime: "Fri"
    },
    { 
        category: "Beddings", 
        description: "Purchases a pack of pillow-cover sheets",
        amount: "5, 000",
        dateTime: "Sat"
    }

]

export default function BudgetList() {
    return (
        <div>
            {list.map((list) => (
                <div>
                <h2>Category: {list.category} </h2>
                <h2>Description: {list.description} </h2>
                <h2>Amount: {list.amount} </h2>
                <h2>Date & Time: {list.dateTime} </h2>
                <br />
                </div> 
            ))}
        </div>
    )
}