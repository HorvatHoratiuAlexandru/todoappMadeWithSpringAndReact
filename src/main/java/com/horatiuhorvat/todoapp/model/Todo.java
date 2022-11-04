package com.horatiuhorvat.todoapp.model;

public class Todo {
	
	private int id;
	private int lid;
	private int state;
	private String description;
	
	
	
	public Todo(int id, int lid, int state, String description) {
		super();
		this.id = id;
		this.lid = lid;
		this.state = state;
		this.description = description;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setLid(int lid) {
		this.lid = lid;
	}
	public void setState(int state) {
		this.state = state;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getId() {
		return id;
	}
	public int getLid() {
		return lid;
	}
	public int getState() {
		return state;
	}
	public String getDescription() {
		return description;
	}
	
	
	
	
}
