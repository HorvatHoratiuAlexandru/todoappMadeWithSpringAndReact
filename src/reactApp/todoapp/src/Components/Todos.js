import React from "react";
import TodoEntry from './TodoEntry';

export default function Todos(props){

    const[newTodoState, setNewTodoState] = React.useState({
        id: 0,
        lid: 0,
        state: 0,
        description: ""
    });

    const todosEntries = props.todoData.map((entryData) => {
        return(
            <TodoEntry
            key = {entryData.id}
            data = {entryData}
            deleteTodo = {props.funcDeleteTodo}
            updateTodo = {props.funcUpdateTodo}
            />
        );
    });

    function handleTodoForm(event){
        setNewTodoState((old)=>{
            return {
                ...old,
                description: event.target.value
            }
        });
    }
    
    function submitNewTodo(event){
        event.preventDefault();
        props.funcAddTodo(newTodoState);
    }
    return(
        <div className="Todos">
            <form onSubmit={submitNewTodo}>
                <input 
                type="text"
                placeholder="new todo"
                value={newTodoState.description}
                onChange={handleTodoForm}
                />
                <button>add</button>
            </form>
            {todosEntries}
            
        </div>
    );
}