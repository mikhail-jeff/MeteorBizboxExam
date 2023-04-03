import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Todos } from '../api/TodoCollections';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Header from './components/Header';
import RaisedButton from 'material-ui/RaisedButton';

import NotificationSystem from 'react-notification-system';

const style = { maxWidth: '800px', margin: 'auto', padding: '50px', borderRadius: '5px', backgroundColor: '#eee', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' };

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

		this.notificationSystem = React.createRef();
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

			const notification = this.notificationSystem.current;
			notification.addNotification({
				title: 'Input field is required!',
				message: 'Please fillout the textfield.',
				level: 'error',
				autoDismiss: 2,
				position: 'tc',
			});
		} else {
			if (!this.state.editing) {
				Meteor.call('addTodo', newTodo);

				const notification = this.notificationSystem.current;

				notification.addNotification({
					title: 'Add Complete',
					message: `${newTodo} added successfully!`,
					level: 'success',
					autoDismiss: 2,
					position: 'tc',
				});
			} else {
				Meteor.call('updateTodo', this.state.selectedTodo, newTodo);

				const notification = this.notificationSystem.current;

				notification.addNotification({
					title: 'Update Complete',
					message: `${newTodo} updated successfully!`,
					level: 'success',
					autoDismiss: 2,
					position: 'tc',
				});
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

		if (this.todos().length < 1) {
			const notification = this.notificationSystem.current;
			notification.addNotification({
				title: 'Todo lists is already empty!',
				message: 'No lists to clear',
				level: 'success',
				autoDismiss: 2,
				position: 'tc',
			});
		} else {
			const notification = this.notificationSystem.current;
			notification.addNotification({
				title: 'Todo lists cleared!',
				message: 'All todo has been deleted!',
				level: 'success',
				autoDismiss: 2,
				position: 'tc',
			});
		}
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
			<div style={style}>
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
						primary
						fullWidth
						onClick={this.deleteAllTodos.bind(this)}
					/>
					<NotificationSystem ref={this.notificationSystem} />
				</div>
			</div>
		);
	}
}
