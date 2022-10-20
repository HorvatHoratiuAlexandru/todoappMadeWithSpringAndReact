package com.horatiuhorvat.todoapp.model;

public class TodoList {
	private int id;
	private String name;
	
	public TodoList(int TodoListId, String TodoListName) {
		this.id = TodoListId;
		this.name = TodoListName;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	
	
}
