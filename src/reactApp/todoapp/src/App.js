
import React from 'react';
import SideBar from './Components/SideBar';
import Content from './Components/Content';

function App() {
  //list state
  const [listNames, setListName] = React.useState(
    [{}]
  );
  //todo state
  const [todos, setTodos] = React.useState(
    [{}]
  )

  //getter
  React.useEffect(
    () => {
      fetch("http://localhost:8080/api/lists").then(res => res.json())
      .then(data => setListName(data));
    }
  , [listNames, todos]);
  
  //create list func
  function sendNewList(newList){
    fetch("http://localhost:8080/api/saveList", 
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newList)
    });
    fetch("http://localhost:8080/api/lists").then(res => res.json())
      .then(data => setListName(data));
  }

  //delete list func
  function deleteList(listId){
    fetch("http://localhost:8080/api/list/delete/" + listId, 
    {
      method:'DELETE'
    })
    fetch("http://localhost:8080/api/lists").then(res => res.json())
      .then(data => setListName(data));
     
  }

  return (
    <React.StrictMode>
    <div className="App">
      <SideBar
      lists = {listNames}
      addList = {sendNewList}
      deleteList = {deleteList}
      />
      <Content />
    </div>
    </React.StrictMode>
  );
}

export default App;
