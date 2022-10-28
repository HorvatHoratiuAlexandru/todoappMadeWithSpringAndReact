package com.horatiuhorvat.todoapp.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.horatiuhorvat.todoapp.model.Todo;
import com.horatiuhorvat.todoapp.model.TodoList;

@Repository
public class JdbcTodoRepo implements TodoRepo {
	
	JdbcTemplate	jdbcTemplate;
	
	public JdbcTodoRepo(JdbcTemplate jdbcTemplate) {
		super();
		this.jdbcTemplate = jdbcTemplate;
	}

	@Override
	public List<Todo> getAll(int listId) {
		// TODO Auto-generated method stub
		return jdbcTemplate.query("select * from todoapp.todo where listid=?", this::mapRowToTodo, listId);
	}


	@Override
	public void updateTodo(Todo toUpdateTodo) {
		// TODO Auto-generated method stub
		jdbcTemplate.update("update todoapp.todo set description = ? state = ? where id=?", toUpdateTodo.getDescription(), toUpdateTodo.getState(), toUpdateTodo.getId());
	}

	@Override
	public void deleteTodo(int todoId) {
		// TODO Auto-generated method stub
		jdbcTemplate.update("delete from todoapp.todo where id=?", todoId);
	}

	@Override
	public void addTodo(Todo toAddTodo) {
		// TODO Auto-generated method stub
		jdbcTemplate.update("insert into todoapp.todo (description, listid)", toAddTodo.getDescription(), toAddTodo.getLid());
	}

	private Todo mapRowToTodo(ResultSet row, int rowNum) throws SQLException{
		
		return new Todo(row.getInt("listid"), row.getInt("state"), row.getString("description"));
	}

	@Override
	public void deleteTodoByList(int listId) {
		// TODO Auto-generated method stub
		jdbcTemplate.update("delete from todoapp.todo where listid=?", listId);
	}
}
