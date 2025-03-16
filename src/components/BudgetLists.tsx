import React, { useState } from "react";
import CreateList from "./CreateList";

interface listProps {
    category: "Kitchen Items" | "Laundry Items" | "Beddings";
    description: string;
    amount: number;
    dateTime: string;
}


export default function BudgetList() {
    const list: listProps[] = []

    const [allList, setAllList] = useState<listProps[]>(list)

    const [formData, setFormData] = useState<listProps>({
        category: "Kitchen Items",
        description: "",
        amount: 0,
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
            amount: 0,
            dateTime: ""
        })
    }

    return (
        <div>
            {allList.map((list, key) => (
                <div key={key}>
                    <h2>Category: {list.category} </h2>
                    <h2>Description: {list.description} </h2>
                    <h2>Amount($): {list.amount} </h2>
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