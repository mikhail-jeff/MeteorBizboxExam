import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';

export default class TodoInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todo: '',
			editing: false,
		};
	}

	render() {
		const { todo, handleSubmit, handleChange, editing, todoError } = this.props;

		return (
			<form onSubmit={handleSubmit}>
				<TextField
					floatingLabelText='Add new todo'
					type='text'
					value={todo}
					onChange={handleChange}
					errorText={todoError ? 'This field is required' : ''}
				/>

				<RaisedButton
					type='submit'
					primary={true}
					label={editing ? 'EDIT' : 'ADD'}
				/>
			</form>
		);
	}
}
