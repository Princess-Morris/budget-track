import React, { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import CreateList from "../form/CreateList";

import './budget-list.css'
import Item from "../item/Item";
import SearchField from "../search/SearchField";
import ShowForm from "../show-form/ShowForm";

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

    const [allList, setAllList] = useState<listProps[]>([]);
    const [originalList, setOriginalList] = useState<listProps[]>([]);

    // const [shouldRefetch, setShouldRefresh] = useState<boolean>(false);

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

    // useEffect(() => {
    //    if (shouldRefetch){
    //     fetchItems()
    //     setShouldRefresh(false)
    //    }
    // }, [shouldRefetch])



    const fetchItems = async () => {
        try {
            // console.log("about to fetch");
            const res = await fetch(`${api}/all`);
            const items = await res.json();
            setAllList(items)
            setOriginalList(items)
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
                setListOfTimeUpdated((prev: string[]) => ([formData.id, ...prev]));

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

                await fetchItems()
                // setAllList([newItem, ...originalList])
                // console.log(allList)
                setSearchInput("")

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

        if (!showForm) {
            setShowForm(true)
        }
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

    const [searchInput, setSearchInput] = useState<string>("")
    const [showForm, setShowForm] = useState<boolean>(false);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value
        setSearchInput(value);

        if (e.target.value === "") {
            setAllList(originalList)
        } else {
            const filtered = originalList.filter((item) => item.description.toLowerCase().includes(value.toLowerCase()))
            setAllList(filtered)
        }

    }

    const handleShowForm = () => {
        setShowForm(!showForm)
        setChangeCardColor(undefined)
        // setAllList(originalList)
        fetchItems()
        setSearchInput("")
        setFormData({
            id: "",
            category: "",
            description: "",
            amount: 0,
            dateTime: ""
        })
    }


    return (
        <>
            <div className="top-wrapper">
                <ShowForm
                    handleShowForm={handleShowForm}
                    showForm={showForm}
                />
                <SearchField
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                />

            </div>
            <div className="form-and-list">
                {
                    showForm ? (
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
                    ) : null
                }


                <div className="list-wrapper">
                    {allList.map((list) => (
                        <Item
                            key={list.id}
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