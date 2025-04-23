import React, { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import CreateList from "../form/CreateList";

import './budget-list.css'
import Item from "../item/Item";

export interface listProps {
    id: string;
    category: "" | "Food" | "Groceries" | "Laundry" | "Beddings" | "Outfits" | "Household" | "Gadgets" | "Tfare" | "Giftings" | "Vacation" | "Outings" | "Repairs";
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

    const [listOfTimeUpdated, setListOfTimeUpdated] = useState<string[]>([]);

    const [changeCardColor, setChangeCardColor] = useState<string | undefined>(undefined);
    const [timeUpdated, setTimeUpdated] = useState<string | undefined>("today");


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
        setFormData((prev) => ({
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
                setListOfTimeUpdated((prev: string[]) => ([...prev, formData.id]));


                // setHideUpdatedText(!hideUpdatedText)

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
            const response = await fetch(`${api}/delete/${id}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                throw new Error("Failed to delete item")
            }
            setAllList(prev => prev.filter((list) => (list.id !== id)))


        } catch (err) {
            setError("Error deleting item. Please try again")
            console.error("Error deleting item: ", err)
        } finally {
            setDeleteText(undefined)
        }
    }

    const handleEdit = (list: listProps, id: string) => {

        setChangeCardColor(id);
        setFormData(list);

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

    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          console.log("changing")
    }

    return (
        <>
        <div className="search-wrapper">
            <input 
            className="input-search"
            type="text" 
            placeholder="Search with description..."
            onChange={handleSearch}
            />
        </div>
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
                    <Item
                        list={list}
                        changeCardColor={changeCardColor}
                        handleDelete={handleDelete}
                        deleteText={deleteText}
                        handleEdit={handleEdit}
                        listOfTimeUpdated={listOfTimeUpdated}
                        timeUpdated={timeUpdated}
                    />
                ))}
            </div>

        </div>
        </> 
    )
}