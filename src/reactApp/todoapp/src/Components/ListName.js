import React from "react";
 
export default function list(props){
    return(<div className="sideBar--namesContainer">
        <li 
        key={props.lName.id}  
        className="sideBar--listNames">{props.lName.name}</li>
        <button 
        className="sideBar--delete"
        onClick={() => props.dList(props.lName.id)}
        >Delete</button>
        </div>);
}