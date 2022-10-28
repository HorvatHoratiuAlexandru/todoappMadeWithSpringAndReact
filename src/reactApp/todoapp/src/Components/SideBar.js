import React from "react";
import ListName from "./ListName"
import "./sideBar.css"

export default function SideBar(props) {
    const [formState,setFormState] = React.useState({id:0,name:""});
    function delOnClick(){
        props.deleteList();
    }
    const li = props.lists.map((lsname)=>{
        return <ListName
            lName = {lsname}
            dList = {props.deleteList}
        />
    });

    function handleListNameForm(event){
        const {name, value, type, checked} = event.target
        setFormState((old)=>{
           
            return {
                ...old,
                id: 0,
                [name]: value
            }
        })
    }

    function handleListNameSubmit(event){
        event.preventDefault();
        props.addList(formState);
    }

    return(
        <div className="sideBar">
            <form onSubmit={handleListNameSubmit}>
                <input 
                type="text" 
                placeholder="name"
                onChange={handleListNameForm}
                name ="name"
                value={formState.name}
                />
                <button>new list</button>
            </form>
            <ul className="sideBar--liContainer" >
                {li}
            </ul>
        </div>
    );
}