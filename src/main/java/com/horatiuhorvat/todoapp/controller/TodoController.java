package com.horatiuhorvat.todoapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.horatiuhorvat.todoapp.model.TodoList;
import com.horatiuhorvat.todoapp.repository.TodoListRepo;

@RestController
public class TodoController {
	
	private final TodoListRepo todoListRepo;
	
	@Autowired
	public TodoController(TodoListRepo todoListRepo) {
		super();
		this.todoListRepo = todoListRepo;
	}


	@RequestMapping(value = "/api/Lists")
	public List<TodoList> getAllLists() {
		return todoListRepo.getAll();
	}
	
	@RequestMapping(value = "/api/List{id}")
	public TodoList getListById(@PathVariable(value = "id") int ListId) {
		return todoListRepo.getById(ListId);
	}
	
	@PostMapping(value = "/api/saveList")
	public String saveList(@RequestBody TodoList todoListToSave) {
		todoListRepo.createNewList(todoListToSave);
		return "OK";
	}
	
	@PutMapping(value = "/api/updateList{id}")
	public String updateList(@PathVariable(value = "id") int ListId, @RequestBody TodoList todoListToUpdate) {
		todoListRepo.updateList(ListId, todoListToUpdate);
		return "OK";
	}
	
	@DeleteMapping(value = "api/List/delete/{id}")
	public String deleteList(@PathVariable(value = "id") int ListId) {
		todoListRepo.deleteListById(ListId);
		return "OK";
	}

}
