package com.horatiuhorvat.todoapp.repository;

import java.util.List;

import com.horatiuhorvat.todoapp.model.Todo;

public interface TodoRepo {
	
	public List<Todo> getAll(int listId);
	public void updateTodo(Todo toUpdateTodo);
	public void deleteTodo(int todoId);
	public void addTodo(Todo toAddTodo);
	public void deleteTodoByList(int listId);
}
