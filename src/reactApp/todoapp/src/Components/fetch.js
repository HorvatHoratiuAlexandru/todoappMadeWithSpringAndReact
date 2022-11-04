function sendNewList(newList){
    fetch("http://localhost:8080/api/saveList", 
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newList)
    }).then(()=>setStateMachine("loaded")).catch((err) => {
      setStateMachine("error");
      console.log(err);
    });
  }

  //delete list func
  function deleteList(listId){
    fetch("http://localhost:8080/api/list/delete/" + listId, 
    {
      method:'DELETE'
    }).then(()=>setStateMachine((old) =>{
      return {...old, selectedList:0, machine: "loaded"};
    })).catch((err) => {
      setStateMachine((old) => {return {...old, machine: "loaded"}});
      console.log(err);
    });
  }

  //update list name
  function updateList(updatedList){
    
    fetch("http://localhost:8080/api/updateList", 
    {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedList)
    }).then(()=>setStateMachine((old) => {return {...old, machine: "loaded"}})).catch((err) => {
      setStateMachine("error");
      console.log(err);
    });
  }

  function todosToGet(listId){
    if(listId === stateMachine.selectedList){
      setStateMachine((old) => {return {...old, selectedList:0, machine: "loaded"}});
    }else{
      setStateMachine((old) => {return {...old, selectedList:listId, machine: "loaded"}});
  }
  }
  console.log(stateMachine.selectedList);
  console.log(todos);
  function createTodo(newTodo){
    fetch("http://localhost:8080/api/saveTodo", 
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...newTodo, lid : stateMachine.selectedList})
    }).then(()=>setStateMachine("loaded")).catch((err) => {
      setStateMachine("error");
      console.log(err);
    });}

    function updateTodo(updatedTodo){
      fetch("http://localhost:8080/api/updateTodo", 
    {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...updatedTodo})
    }).then(()=> setStateMachine("loaded")).catch((err) => {
      setStateMachine("error");
      console.log(err);
    });}

    ///useEfect
    fetch("http://localhost:8080/api/todos/" + stateMachine.selectedList).then(res => res.json())
      .then(data => setTodos(data))
      .catch((err)=>{
      setStateMachine((old) => {return {...old, machine: "error"}});
      console.log(err);
      });

    fetch("http://localhost:8080/api/lists").then(res => res.json())
    .then(data => setListName(data)).then(()=>setStateMachine((old) => {return {...old, machine: "idle"}}));
    