import React, { Component } from 'react';

import { Todos } from '../api/TodoCollections';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Header from './components/Header';
import RaisedButton from 'material-ui/RaisedButton';

export default class App extends TrackerReact(Component) {
	constructor(props) {
		super(props);

		this.state = {
			todos: [],
			todo: '',
			todoError: '',
			editing: false,
			selectedTodo: null,
			subscription: {
				todos: Meteor.subscribe('allTodos'),
			},
		};
	}

	// * handle change
	handleChange = (e) => {
		this.setState({
			todo: e.target.value,
			todoError: e.target.value === '',
		});
	};

	// * fetch all todos
	todos() {
		return Todos.find({}, { sort: { createdAt: -1 } }).fetch();
	}

	// * handle submit
	handleSubmit(e) {
		e.preventDefault();

		const newTodo = this.state.todo.trim();

		if (newTodo === '') {
			this.setState({ todoError: true });
		} else {
			if (!this.state.editing) {
				Meteor.call('addTodo', newTodo);
			} else {
				Meteor.call('updateTodo', this.state.selectedTodo, newTodo);
			}
		}

		this.setState({
			todo: '',
			editing: false,
			selectedTodo: null,
		});
	}

	// * delete all todos
	deleteAllTodos() {
		Meteor.call('deleteAllTodos');
	}

	// * edit todo
	editText(todo) {
		this.setState({
			todo: todo.text,
			editing: true,
			selectedTodo: todo,
		});
	}

	render() {
		const allTodos = this.todos();

		return (
			<div style={{ width: '350px', margin: 'auto', padding: '50px', borderRadius: '5px', backgroundColor: '#eee', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
				<Header todos={allTodos} />
				<hr />

				<TodoInput
					todo={this.state.todo}
					handleChange={this.handleChange.bind(this)}
					handleSubmit={this.handleSubmit.bind(this)}
					editing={this.state.editing}
					todoError={this.state.todoError}
				/>

				<TodoList
					todos={this.todos()}
					editText={this.editText.bind(this)}
				/>

				<hr />
				<div style={{ marginTop: '20px' }}>
					<RaisedButton
						label='Clear List'
						primary={true}
						fullWidth={true}
						onClick={this.deleteAllTodos.bind(this)}
					/>
				</div>
			</div>
		);
	}
}
