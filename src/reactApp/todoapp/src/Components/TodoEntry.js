import React from "react";

export default function TodoEntry(props){

    function deleteTodoEntry(){
        props.deleteTodo(props.data.id);
    }

    function checkTodoEntry(){
        props.updateTodo({
            ...props.data,
            state: 1
        });
    }
    return(
        <div>
            <p>{props.data.description}</p>
            {props.data.state === 0 &&
            <button
                onClick={checkTodoEntry}
            >check</button>}
            <button
                onClick={deleteTodoEntry}
            >delete</button>
        </div>
    );

}