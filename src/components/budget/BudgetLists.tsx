import React, { FormEvent, useState } from "react";
import CreateList from "../form/CreateList";

import './budget-list.css'

interface listProps {
    id: string;
    category: "" | "Groceries" | "Laundry" | "Beddings" | "Outfits" | "Tfare" | "Giftings" | "Vacation" | "Outings" | "Repairs";
    description: string;
    amount: number;
    dateTime: string;
}


export default function BudgetList() {
    const list: listProps[] = [
        {
            id: "1",
            category: "Beddings",
            description: "got 3 heavy blankets",
            amount: 3000,
            dateTime: "2025-11-03"
        },

        {
            id: "2",
            category: "Groceries",
            description: "got a pack of milk shake",
            amount: 15000,
            dateTime: "2025-04-03",
        },

        {
            id: "3",
            category: "Repairs",
            description: "Flooring design",
            amount: 13000,
            dateTime: "2025-11-05",
        }
    ]

    const [allList, setAllList] = useState<listProps[]>(list)

    const [formData, setFormData] = useState<listProps>({
        id: "",
        category: "",
        description: "",
        amount: 0,
        dateTime: ""
    })

    const [changeColor, setChangeColor] = useState<string | undefined>(undefined);
    const [updateText, setUpdateText] = useState<string | undefined>(undefined);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formData.category === "" && formData.amount === 0) return

        if (formData.id) {
            setAllList(prev => prev.map((item) => item.id === formData.id ? formData : item))
            // console.log(formData.id)

            setChangeColor(undefined)
            setUpdateText(formData.id)

        } else {
            const newItem = {
                ...formData,
                id: Date.now().toString()
            }
            setAllList(prev => [...prev, newItem])
            // console.log(newItem.id)
        }

        setFormData({
            id: "",
            category: "",
            description: "",
            amount: 0,
            dateTime: ""
        })
    }

    const handleDelete = (id: string) => {
        setAllList(allList.filter((list) => (list.id !== id)))
    }

    const handleEdit = (list: listProps, id: string | undefined) => {
        setFormData(list)
        setChangeColor(id)
    }

    return (
        <div className="form-and-list">
            <div className="form-wrapper">
                <CreateList
                    id={formData.id}
                    category={formData.category}
                    description={formData.description}
                    amount={formData.amount}
                    dateTime={formData.dateTime}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit} />

            </div>

            <div className="list-wrapper">
                {allList.map((list, key) => (
                    <div className={`list ${changeColor === list.id && "update-item"}`} key={key}>
                        <h3>Category: <span className="text">{list.category} </span> </h3>
                        <h3>Description: <span className="text">{list.description} </span> </h3>
                        <h3>Amount($): <span className="text">{list.amount} </span> </h3>
                        <h3>Date & Time: <span className="text">{list.dateTime} </span> </h3>
                        <div
                            onClick={() => handleDelete(list.id)}
                            className="delete-wrapper">
                            x
                        </div>
                        <div
                            onClick={() => handleEdit(list, list.id)}
                            className="edit-icon-wrapper"
                        >
                            !
                        </div>
                        {changeColor === list.id && <p className="updating-text">Updating...</p> }
                        {/* <p className="updated-text">{updateText}</p> */}
                        {updateText === list.id &&  <p className="updated-text">Updated</p> }
                    </div>
                ))}
            </div>

        </div>
    )
}