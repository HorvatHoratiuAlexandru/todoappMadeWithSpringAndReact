package com.horatiuhorvat.todoapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.horatiuhorvat.todoapp.model.Todo;
import com.horatiuhorvat.todoapp.model.TodoList;
import com.horatiuhorvat.todoapp.repository.TodoListRepo;
import com.horatiuhorvat.todoapp.repository.TodoRepo;
@CrossOrigin
@RestController
public class TodoController {
	
	private final TodoListRepo todoListRepo;
	private final TodoRepo	todoRepo;
	
	@Autowired
	public TodoController(TodoListRepo todoListRepo, TodoRepo	todoRepo) {
		super();
		this.todoListRepo = todoListRepo;
		this.todoRepo = todoRepo;
	}

	//GET requests
	
	@RequestMapping(value = "/api/lists")
	public List<TodoList> getAllLists() {
		return todoListRepo.getAll();
	}
	
	@RequestMapping(value = "/api/todos/{id}")
	public List<Todo> getAllTodoByListId(@PathVariable(value = "id") int ListId){
		return todoRepo.getAll(ListId);
	}
	
	@RequestMapping(value = "/api/list{id}")
	public TodoList getListById(@PathVariable(value = "id") int ListId) {
		return todoListRepo.getById(ListId);
	}
	
	//CREATE requests
	
	@PostMapping(value = "/api/saveList")
	public String saveList(@RequestBody TodoList todoListToSave) {
		todoListRepo.createNewList(todoListToSave);
		return "OK";
	}
	
	@PostMapping(value = "/api/saveTodo")
	public String saveTodo(@RequestBody Todo todoToSave) {
		todoRepo.addTodo(todoToSave);
		return "OK";
	}
	
	//UPDATE requests
	
	@PutMapping(value = "/api/updateList")
	public String updateList(@RequestBody TodoList todoListToUpdate) {
		todoListRepo.updateList(todoListToUpdate);
		return "OK";
	}
	
	@PutMapping(value = "/api/updateTodo")
	public String updateTodo(@RequestBody Todo todoToUpdate) {
		todoRepo.updateTodo(todoToUpdate);
		return "OK";
	}
	
	//DELETE requests
	
	@DeleteMapping(value = "api/list/delete/{id}")
	public String deleteList(@PathVariable(value = "id") int ListId) {
		todoListRepo.deleteListById(ListId);
		todoRepo.deleteTodoByList(ListId);
		return "OK";
	}
	
	@DeleteMapping(value = "api/todo/delete/{id}")
	public String deleteTodo(@PathVariable(value = "id") int TodoId) {
		todoRepo.deleteTodo(TodoId);
		return "OK";
	}

}
