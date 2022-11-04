import React from "react";
import ListEntries from "./ListEntry";

export default function TodoLists(props){

    const [newListState, setNewListState] = React.useState({
        id:0,
        name: ""
    });
    
    const listEntries = props.listData.map((entrieData) =>{
        return (
            <ListEntries 
                key = {entrieData.id}
                data = {entrieData}
                selectList = {props.funcSetSelectedList}
                selectedList = {props.selectedListData}
                updateList = {props.funcUpdateList}
                deleteList = {props.funcDeleteList}
            />
        );
    });

    function handleListForm(event){
        setNewListState((old)=>{
            return {...old,
            name: event.target.value
            }
        })
    }

    function submitNewList(event){
        event.preventDefault();
        props.funcAddList(newListState);
    }


    
    return(
        <div className="TodoLists">
            <form onSubmit={submitNewList}>
                <input
                type="text"
                placeholder="new list"
                value = {newListState.name}
                onChange = {handleListForm}
                />
                <button>add</button>
            </form>
            {listEntries} 
            
        </div>
    );
}