import "./show-form.css"

interface showFormProps{
    handleShowForm: () => void;
    showForm: boolean;
}

export default function ShowForm({handleShowForm, showForm}: showFormProps ){
    return (
        <button
        className="plus-sign"
        onClick={handleShowForm}>
        {!showForm ? "+" : "All"}
    </button>
    )
}