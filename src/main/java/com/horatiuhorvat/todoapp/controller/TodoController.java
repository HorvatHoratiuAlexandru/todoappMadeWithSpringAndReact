package com.horatiuhorvat.todoapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
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

}
