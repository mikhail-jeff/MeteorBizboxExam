import { Meteor } from 'meteor/meteor';
import { Todos } from './TodoCollections';

Meteor.publish('allTodos', function () {
	return Todos.find();
});
