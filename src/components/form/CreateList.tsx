import Spinner from "../spinner";
import "./create-list.css"

interface formProps {
    id: string;
    category: string;
    description: string;
    amount: number;
    dateTime: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    disabled: boolean;
    error: string
}

export default function CreateList({ id, category, description, amount, dateTime, handleChange, handleSubmit, disabled, error }: formProps) {


    return (
        <form className="form"
            onSubmit={handleSubmit}
        >
            <p className="error">{error}</p>
            <div className="input">
                <label>Description: </label>

                <textarea
                    className="text-area"
                    placeholder="I got a ..."
                    name="description"
                    value={description}
                    onChange={handleChange}
                >

                </textarea>
            </div>

            <div className="input">
                <label>Amount: </label>
                <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={handleChange}
                />
            </div>

            <div className="input">
                <label>Date & Time: </label>
                <input
                    type="Date"
                    name="dateTime"
                    value={dateTime}
                    onChange={handleChange}
                />
            </div>

            <div className="input">
                <label>Category: </label>
                <select
                    value={category}
                    name="category"
                    onChange={handleChange}
                >
                    <option value="">Choose Category</option>
                    <option value="Food">Food</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Beddings">Beddings</option>
                    <option value="Outfits">Outfits</option>
                    <option value="Home Items">Home Items</option>
                    <option value="Gadgets" >Gadgets</option>
                    <option value="Tfare">Tfare</option>
                    <option value="Giftings">Giftings</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Outings">Outings</option>
                    <option value="Repairs">Repairs</option>

                </select>
            </div>


            <button 
            disabled={disabled} 
            type="submit">
                {disabled && <Spinner />}
                {id ? "update Item" : "Add To List"}</button>

        </form>
    )
}