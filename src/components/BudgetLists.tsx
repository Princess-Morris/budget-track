import React, { useState } from "react";
import CreateList from "./CreateList";

interface listProps {
    category: "Kitchen Items" | "Laundry Items" | "Beddings";
    description: string;
    amount: string;
    dateTime: string;
}


export default function BudgetList() {
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

    const [allList, setAllList] = useState<listProps[]>(list)

    const [formData, setFormData] = useState<listProps>({
        category: "Kitchen Items",
        description: "",
        amount: "",
        dateTime: ""
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: any) => {
        console.log("adding")
        e.preventDefault()
        setAllList([...allList, formData])    
        console.log("added")
        setFormData({
            category: 'Kitchen Items',
            description: "",
            amount: "",
            dateTime: ""
        })
    }

    return (
        <div>
            {allList.map((list, key) => (
                <div key={key}>
                    <h2>Category: {list.category} </h2>
                    <h2>Description: {list.description} </h2>
                    <h2>Amount: {list.amount} </h2>
                    <h2>Date & Time: {list.dateTime} </h2>
                    <br />
                </div>
            ))}
            <CreateList
                category={formData.category}
                description={formData.description}
                amount={formData.amount}
                dateTime={formData.dateTime}
                handleChange={handleChange}
                handleSubmit={handleSubmit} />
        </div>
    )
}