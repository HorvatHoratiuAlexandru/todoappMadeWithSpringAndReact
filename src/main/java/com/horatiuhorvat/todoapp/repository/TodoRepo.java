package com.horatiuhorvat.todoapp.repository;

import java.util.List;

import com.horatiuhorvat.todoapp.model.Todo;

public interface TodoRepo {
	
	public List<Todo> getAll();
	public Todo getById(int todoId);
	public void updateTodo(Todo toUpdateTodo);
	public void deleteTodo(Todo toDeleteTodo);
	public void addTodo(Todo toAddTodo);
}
