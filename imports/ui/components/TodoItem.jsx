import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class TodoItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todo: '',
			inputValue: '',
		};
	}

	// * toggle check
	toggleChecked() {
		Meteor.call('toggleTodo', this.props.todo._id, this.props.todo.complete);
	}

	// * handle delete
	handleDelete() {
		Meteor.call('deleteTodo', this.props.todo._id);
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
						onClick={() => this.handleEdit(todo)}
						backgroundColor='#009000'
						label='Edit'
					/>
					<RaisedButton
						onClick={this.handleDelete.bind(this)}
						backgroundColor='red'
						label='Delete'
						style={{ marginLeft: '5px' }}
					/>
				</div>
			</div>
		);
	}
}
