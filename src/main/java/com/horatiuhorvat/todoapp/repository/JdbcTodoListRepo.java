package com.horatiuhorvat.todoapp.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.horatiuhorvat.todoapp.model.TodoList;

@Repository
public class JdbcTodoListRepo implements TodoListRepo{
	
	JdbcTemplate	jdbcTemplate;
	
	

	public JdbcTodoListRepo(JdbcTemplate jdbcTemplate) {
		super();
		this.jdbcTemplate = jdbcTemplate;
	}

	@Override
	public List<TodoList> getAll() {
		
		return jdbcTemplate.query("select * from todoapp.todolist", this::mapRowToTodoList);
	}

	@Override
	public TodoList getById(int listId) {
		// TODO Auto-generated method stub
		List<TodoList> queryList = jdbcTemplate.query("select * from todoapp.todolist where id = ?",this::mapRowToTodoList,listId);
		return queryList.get(0);

	}

	@Override
	public void deleteListById(int listId) {
		// TODO Auto-generated method stub
		jdbcTemplate.update("delete from todoapp.todolist where id=?", listId);
	}

	@Override
	public void createNewList(TodoList listToCreate) {
		// TODO Auto-generated method stub
		jdbcTemplate.update("insert into todoapp.todolist (name) values (?)",listToCreate.getName());
	}

	@Override
	public void updateList(TodoList listToUpdate) {
		// TODO Auto-generated method stub
		jdbcTemplate.update("update todoapp.todolist set name = ? where id=?", listToUpdate.getName(), listToUpdate.getId());
	}
	
	private TodoList mapRowToTodoList(ResultSet row, int rowNum) throws SQLException{
		
		return new TodoList(row.getInt("id"),row.getString("name"));
	}


}
