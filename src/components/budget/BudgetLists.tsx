import React, { FormEvent, useEffect, useState } from "react";
import CreateList from "../form/CreateList";

import './budget-list.css'

interface listProps {
    id: string;
    category: "" | "Food" | "Groceries" | "Laundry" | "Beddings" | "Outfits" | "Home Items" | "Gadgets" | "Tfare" | "Giftings" | "Vacation" | "Outings" | "Repairs";
    description: string;
    amount: number;
    dateTime: string;
}


export default function BudgetList() {
    const list: listProps[] = [
        // {
        //     id: "1",
        //     category: "Beddings",
        //     description: "got 3 heavy blankets",
        //     amount: 3000,
        //     dateTime: "2025-11-03"
        // },

    ]

    const [allList, setAllList] = useState<listProps[]>(list)

    const [formData, setFormData] = useState<listProps>({
        id: "",
        category: "",
        description: "",
        amount: 0,
        dateTime: ""
    })

    const [changeCardColor, setChangeCardColor] = useState<string | undefined>(undefined);
    const [updatedText, setUpdatedText] = useState<string | undefined>(undefined);
    const [timeUpdated, setTimeUpdated] = useState<string | undefined>(undefined);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [deleteText, setDeleteText] = useState<string | undefined>(undefined);

    const today = new Date().toString()
    const api = "http://localhost:8080/api/cart"

    useEffect(() => {
        fetchItems()
    }, [])


    const fetchItems = async () => { 
        try {
            // console.log("about to fetch");
            const res = await fetch(`${api}/all`);
            const items = await res.json();
            setAllList(items)
            // console.log(items)
            // console.log("fetched.......")
        } catch (err) {
            console.error("Error fetching items: ", err)
        }

    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData((prev) =>  ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (formData.category === "" && formData.amount === 0) {
            setError("Please fill out category and amount");
            setLoading(false);
            return
        }

        setError("");
        setLoading(true);

        try {
            let response;
            if (formData.id) {
                response = await fetch(`${api}/update/${formData.id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })

                if (!response.ok) {
                    throw new Error("Something went wrong, try again");
                }

                const updateItem = await response.json();
                setAllList(prev => prev.map((item) => formData.id === item.id ? updateItem : item))
                setFormData({
                    id: "",
                    category: "",
                    description: "",
                    amount: 0,
                    dateTime: ""
                })

                setChangeCardColor(undefined)
                setUpdatedText(formData.id)

            } else {
                response = await fetch(`${api}/add`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })

                if (!response.ok) {
                    throw new Error("Something went wrong, try again");
                }

                const newItem = await response.json()

                setAllList(prev => ([...prev, newItem]))

                // await fetchItems()
                setFormData({
                    id: "",
                    category: "",
                    description: "",
                    amount: 0,
                    dateTime: ""
                })
            }
        } catch (err) {
            setError(err instanceof Error
                ? err.message
                : "Network Error"
            )
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        setDeleteText(id)

        try {
          const response =  await fetch(`${api}/delete/${id}`, {
                method: "DELETE"
            })

            if(!response.ok){
                throw new Error("Failed to delete item")
            }
            setAllList(prev => prev.filter((list) => (list.id !== id)))


        } catch (err) {
            setError("Error deleting item. Please try again")
            console.error("Error deleting item: ", err)
        } finally{
            setDeleteText(undefined)
        }
    }

    const handleEdit = (list: listProps, id: string | undefined) => {

        setChangeCardColor(id)
        setFormData(list)

        if (changeCardColor === id) {
            setChangeCardColor(undefined)
            setFormData({
                id: "",
                category: "",
                description: "",
                amount: 0,
                dateTime: ""
            })
        }


        if (updatedText === id) {
            setUpdatedText(undefined)
        }
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
                    handleSubmit={handleSubmit}
                    disabled={loading}
                    error={error}
                />

            </div>

            <div className="list-wrapper">
                {allList.map((list) => (
                    <div
                        key={list.id}
                        className={`list ${changeCardColor === list.id && "update-item"}`}>
                        <h3>Category: <span className="text">{list.category} </span> </h3>
                        <h3>Description: <span className="text">{list.description} </span> </h3>
                        <h3>Amount($): <span className="text">{list.amount} </span> </h3>
                        <h3>Date & Time: <span className="text">{list.dateTime} </span> </h3>
                        <div
                            onClick={() => handleDelete(list.id)}
                            className="delete-wrapper"
                            style={{display: deleteText === list.id ? "none" : "" }}
                            >
                           {deleteText === list.id  ? "Deleting" : "x"} 
                        </div>
                        <div
                            onClick={() => handleEdit(list, list.id)}
                            className="edit-icon-wrapper"
                        >
                            !
                        </div>
                        {changeCardColor === list.id && <p className="updating-text">Updating...</p>}
                        {updatedText === list.id && <p className="updated-text">Updated</p>}


                        {/* {formData.dateTime.toString() === today && <p className="today">today</p> } */}
                    </div>
                ))}
            </div>

        </div>
    )
}