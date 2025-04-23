import { listProps } from "../budget/BudgetLists";
import "./item.css";

interface ItemsProps {
    list: listProps
    changeCardColor: string | undefined;
    handleDelete: (id: string) => void;
    deleteText: string | undefined;
    handleEdit: (list: listProps, id: string) => void;
    listOfTimeUpdated: string[];
    timeUpdated: string | undefined;
}

export default function Item({ 
     list,
    changeCardColor, 
    handleDelete,
    deleteText,
    handleEdit,
    listOfTimeUpdated,
    timeUpdated 

}: ItemsProps) {
    return (
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
                        style={{ display: deleteText === list.id ? "none" : "" }}
                    >
                        {deleteText === list.id ? "Deleting" : "x"}
                    </div>
                    <div
                        onClick={() => handleEdit(list, list.id)}
                        className="edit-icon-wrapper"
                    >
                        !
                    </div>
                    {changeCardColor === list.id ? <p className="updating-text">Updating...</p> : listOfTimeUpdated.includes(list.id) && <p className="updated-text">Updated {timeUpdated} </p>}

                </div>
    )
}
