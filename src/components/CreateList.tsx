interface formProps{
    category: string;
    description: string;
    amount: string;
    dateTime: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleSubmit: (e: any) => void
}

export default function CreateList({ category, description, amount, dateTime, handleChange, handleSubmit}: formProps) {


    // const handleSubmit = (e: any) => {
    //     console.log("adding")
    // }

    return (
        <form onSubmit={handleSubmit}>
            <label>Category: </label>
            <select 
            value={category} 
            name="category"
            onChange={handleChange}
            >
                <option value="Kitchen Items">Kitchen Items</option>
                <option value="Laundry Items">Laundry Items</option>
                <option value="Beddings">Beddings</option>

            </select>
            <br /> <br />

            <label>Description: </label>
            <input 
            type="text" 
            name="description"
            value={description}
            onChange={handleChange}
            /> 
            <br /> <br />

            <label>Amount: </label>
            <input 
            type="text"
            name="amount" 
            value={amount}
            onChange={handleChange}
            /> 
            <br /> <br />

            <label>Date & Time: </label>
            <input 
            type="text"
            name="dateTime" 
            value={dateTime}
            onChange={handleChange}
            /> 
            <br /> <br />

            <button type="submit">Add To List</button>

        </form>
    )
}