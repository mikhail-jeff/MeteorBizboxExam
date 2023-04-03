import NotificationSystem from 'react-notification-system';

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import RaisedButton from 'material-ui/RaisedButton';

export default class TodoItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todo: '',
			inputValue: '',
		};

		this.notificationSystem = React.createRef();
	}

	// * handle delete
	handleDelete() {
		Meteor.call('deleteTodo', this.props.todo._id);

		const notification = this.notificationSystem.current;

		notification.addNotification({
			title: 'Delete Complete!',
			message: `${this.props.todo.text} deleted successfully!!`,
			level: 'success',
			autoDismiss: 5,
			position: 'tc',
		});

		console.log(`${this.props.todo.text} has been deleted`);
	}

	// * toggle check
	toggleChecked() {
		Meteor.call('toggleTodo', this.props.todo._id, this.props.todo.complete);

		if (!this.props.todo.complete) {
			const notification = this.notificationSystem.current;
			notification.addNotification({
				title: 'Marked complete!',
				message: `${this.props.todo.text} has been marked complete!`,
				level: 'success',
				autoDismiss: 2,
				position: 'tc',
			});
		} else {
			const notification = this.notificationSystem.current;
			notification.addNotification({
				title: 'Marked incomplete!',
				message: `${this.props.todo.text} has been marked incomplete!`,
				level: 'success',
				autoDismiss: 2,
				position: 'tc',
			});
		}
	}

	// * handle edit
	handleEdit(todo) {
		const { editText } = this.props;

		editText(todo);
	}

	render() {
		const { todo } = this.props;

		return (
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
				<div>
					<ul style={{ margin: 'auto 0' }}>
						<li>
							<input
								type='checkbox'
								readOnly
								checked={todo.complete}
								onClick={this.toggleChecked.bind(this)}
							/>
							<label>{todo.text}</label>
						</li>
					</ul>
				</div>

				<div>
					<RaisedButton
						label='Edit'
						backgroundColor='green'
						onClick={() => this.handleEdit(todo)}
					/>

					<RaisedButton
						label='Delete'
						backgroundColor='red'
						onClick={this.handleDelete.bind(this)}
					/>
					<NotificationSystem ref={this.notificationSystem} />
				</div>
			</div>
		);
	}
}
