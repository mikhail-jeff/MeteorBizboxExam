const { Todos } = require('./TodoCollections');

Meteor.methods({
	// * ADD TODO
	addTodo(todo) {
		Todos.insert({
			text: todo,
			complete: false,
			createdAt: new Date(),
		});
	},

	// * TOGGLE CHECK
	toggleTodo(id, status) {
		Todos.update(id, {
			$set: {
				complete: !status,
			},
		});
	},

	// * UPDATE TODO
	updateTodo(selectedTodo, newTodo) {
		Todos.update(selectedTodo._id, {
			$set: {
				text: newTodo,
				complete: false,
			},
		});
	},

	// * DELETE SINGLE TASK
	deleteTodo(id) {
		Todos.remove(id);
	},

	// * DELETE ALL TASKS
	deleteAllTodos() {
		Todos.remove({});
	},
});
