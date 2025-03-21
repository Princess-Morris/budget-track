import React, { useState } from "react";
import CreateList from "../form/CreateList";

import './budget-list.css'

interface listProps {
    category: "Groceries" | "Laundry" | "Beddings" | "Outfits" | "Tfare" | "Giftings" | "Vacation" | "Outings" | "Repairs";
    description: string;
    amount: number;
    dateTime: string;
}


export default function BudgetList() {
    const list: listProps[] = []

    const [allList, setAllList] = useState<listProps[]>(list)

    const [formData, setFormData] = useState<listProps>({
        category: "Groceries",
        description: "",
        amount: 0,
        dateTime: ""
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
            category: 'Groceries',
            description: "",
            amount: 0,
            dateTime: ""
        })
    }

    return (
        <div className="form-and-list">
            <div className="form-wrapper">
            <CreateList
                category={formData.category}
                description={formData.description}
                amount={formData.amount}
                dateTime={formData.dateTime}
                handleChange={handleChange}
                handleSubmit={handleSubmit} />

            </div>
            
            <div className="list-wrapper">
                {allList.map((list, key) => (
                    <div className="list" key={key}>
                        <h3>Category: <span className="text">{list.category} </span> </h3>
                        <h3>Description: <span className="text">{list.description} </span> </h3>
                        <h3>Amount($): <span className="text">{list.amount} </span> </h3>
                        <h3>Date & Time: <span className="text">{list.dateTime} </span> </h3>
                        <br />
                    </div>
                ))}
            </div>

        </div>
    )
}