import React from 'react';
import Todos from './Components/Todos';
import './Components/style.css';
import TodoLists from './Components/TodoLists';

let newList = {
  id: 0,
  name: ""
};
let newTodo = {
  id: 0, 
  lid: 0, 
  state: 0, 
  description: ""
};

function App() {
  const [appData, setAppData] = React.useState({
    stateMachine: "loaded",
    selectedList: 0,
    listsData: [],
    todosData: []
  });



  React.useEffect( () => {
    console.log("Effect");
    async function fetchData(){
      const listsFetch = await fetch("http://localhost:8080/api/lists")
      .then(res => res.json());
      const todosFetch = await fetch("http://localhost:8080/api/todos/" + appData.selectedList)
      .then(res => res.json());
      
      setAppData((old) => {
        return {
          ...old,
          stateMachine: "idle",
          listsData: listsFetch,
          todosData: todosFetch
        }
      });
    }

    async function postNewList(){
      const postList = await fetch("http://localhost:8080/api/saveList", 
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newList)
      })

      setAppData((old) => {
        return {
          ...old,
          stateMachine: "loaded"
        }
      })
    }

    async function putUpdateList(){
      const putList = await fetch("http://localhost:8080/api/updateList", 
      {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newList)
      })

      setAppData((old) => {
        return {
          ...old,
          stateMachine: "loaded"
        }
      });
    }

    async function deleteListRq(){
      const delList = await fetch("http://localhost:8080/api/list/delete/" + newList.id, 
      {
        method:'DELETE'
      });
      setAppData((old) => {
        return {
          ...old,
          selectedList: 0,
          stateMachine: "loaded"
        }
      });
    }

    async function postNewTodo(){
      const postTodo = await fetch("http://localhost:8080/api/saveTodo", 
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...newTodo, lid : appData.selectedList})
      });

      setAppData((old) => {
        return {
          ...old,
          stateMachine: "loaded"
        }
      })
    }

    async function deleteTodoRq(){
      const delTodo = await fetch("http://localhost:8080/api/todo/delete/" + newTodo.id, 
      {
        method:'DELETE'
      });

      setAppData((old) => {
        return {
          ...old,
          stateMachine: "loaded"
        }
      });
    }

    async function putUpdateTodo(){
      const putTodo = await fetch("http://localhost:8080/api/updateTodo", 
      {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...newTodo})
      });

      setAppData((old) => {
        return {
          ...old,
          stateMachine: "loaded"
        }
      });
    }

    if(appData.stateMachine === "loaded"){
      fetchData();
    }
    if(appData.stateMachine === "newList"){
      postNewList();
    }
    if(appData.stateMachine === "updateList"){
      putUpdateList();
    }
    if(appData.stateMachine === "deleteList"){
      deleteListRq();
    }
    if(appData.stateMachine === "newTodo"){
      postNewTodo();
    }
    if(appData.stateMachine === "deleteTodo"){
      deleteTodoRq();
    }
    if(appData.stateMachine === "updateTodo"){
      putUpdateTodo();
    }
    
  }, [appData.stateMachine]);

  //..........functions.........\\

  function setSelectedList(listId){
    if(listId === appData.selectedList){
      setAppData((old) => {
        return {
          ...old,
          selectedList: 0,
          stateMachine: "loaded"
        }
      })
    }else{
      setAppData((old) => {
        return {
          ...old,
          selectedList: listId,
          stateMachine: "loaded"
        }
      })
    }
  }

  function addNewList(list){
    newList = {...list};
    setAppData((old) => {
      return {
        ...old,
        stateMachine: "newList"
      }
    })
  }

  function updateList(list){
    newList = {...list};
    setAppData((old) => {
      return {
        ...old,
        stateMachine: "updateList"
      }
    })
  }

  function deleteList(listId){
    newList = {...newList, id: listId};
    setAppData((old) => {
      return {
        ...old,
        stateMachine: "deleteList"
      }
    })
  }

  function addNewTodo(todo){
    newTodo = {...todo};
    setAppData((old) => {
      return {
        ...old,
        stateMachine: "newTodo"
      }
    })
  }

  function deleteTodo(todoId){
    newTodo = {...newTodo, id: todoId};
    setAppData((old) => {
      return {
        ...old,
        stateMachine: "deleteTodo"
      }
    });
  }

  function updateTodo(todo){
    newTodo = {...todo};
    setAppData((old) => {
      return {
        ...old,
        stateMachine: "updateTodo"
      }
    });
  }

  return (
    <div className='App'>
  
     <TodoLists 
     listData = {appData.listsData}
     selectedListData = {appData.selectedList}
     funcSetSelectedList = {setSelectedList}
     funcAddList = {addNewList}
     funcUpdateList = {updateList}
     funcDeleteList = {deleteList}
     />
    {appData.selectedList != 0 &&
    
     <Todos  
     todoData = {appData.todosData}
     funcAddTodo = {addNewTodo}
     funcDeleteTodo = {deleteTodo}
     funcUpdateTodo = {updateTodo}
     />}
    </div>
    );
}

export default App;
