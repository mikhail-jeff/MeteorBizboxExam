import React, { Component } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
	render() {
		const { todos, handleEdit, editText } = this.props;

		return (
			<div>
				<h3>Todo List</h3>

				{todos.length > 0 ? (
					<div>
						{todos.map((todo) => (
							<TodoItem
								key={todo._id}
								todo={todo}
								todos={todos}
								handleEdit={handleEdit}
								editText={editText}
							/>
						))}
					</div>
				) : (
					<p>No todos found!</p>
				)}
			</div>
		);
	}
}
