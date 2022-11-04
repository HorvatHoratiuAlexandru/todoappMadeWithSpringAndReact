import React from "react";

export default function ListEntries(props){
    const[renameState, setRenameState] = React.useState(false);
    const[formState, setFormState] = React.useState({
        id: props.data.id,
        name: props.data.name
    })

    function callSetSelectedList(){
        props.selectList(props.data.id);
    }

    function editToggle(){
        setRenameState((old) => !old);
    }

    function handdleEditForm(event){
        setFormState((old) => {
            return {
                ...old,
                name: event.target.value
            }
        });
    }

    function submitUpdateList(event){
        event.preventDefault();
        setRenameState((old) => !old);
        props.updateList(formState);
    }

    function deleteListEntry(){
        props.deleteList(props.data.id);
    }
    

    return(
        <div>

            {!renameState && <div>
                <p onClick={callSetSelectedList}>{props.data.name}</p>

                {props.selectedList === props.data.id &&
                    <button
                        onClick={editToggle}
                    >rename</button>
                }
                {props.selectedList === props.data.id &&
                    <button
                        onClick={deleteListEntry}
                    >delete</button>
                }   
            </div>}

            {renameState && <div>
                <form onSubmit={submitUpdateList}>
                    <input 
                    type="text"
                    placeholder={formState.name}
                    value={formState.name}
                    onChange={handdleEditForm}
                    />
                    <button>save</button>
                </form>
                <button
                    onClick={editToggle}
                >cancel</button>
            </div>}
                     
        </div>
    );
}