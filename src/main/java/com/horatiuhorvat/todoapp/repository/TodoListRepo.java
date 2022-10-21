package com.horatiuhorvat.todoapp.repository;

import java.util.List;

import com.horatiuhorvat.todoapp.model.TodoList;

public interface TodoListRepo {
	
	public List<TodoList> getAll ();
	public TodoList getById (int listId);
	public void deleteListById (int listId);
	public void createNewList (TodoList listToCreate);
	public void updateList(int listToUpdateId, TodoList listToUpdate);

}
