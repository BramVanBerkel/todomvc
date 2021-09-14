(function (window) {
	'use strict';

	window.todoStore = {
		todos: JSON.parse(localStorage.getItem('todo-store') || '[]'),

		save() {
			localStorage.setItem('todo-store', JSON.stringify(this.todos));
		},
	};

	window.todoApp = () => {
		return {
			...todoStore,

			editingTodo: null,

			cachedTodo: null,

			newTodo: '',

			filter: 'all',

			get filteredTodos() {
				return {
					'all': this.todos,
					'active': this.availableTodos,
					'completed': this.completedTodos,
				}[this.filter]
			},

			get availableTodos() {
				return this.todos.filter((todo) => !todo.done)
			},

			get completedTodos() {
				return this.todos.filter((todo) => todo.done)
			},

			addTodo() {
				if(this.newTodo.trim() === '') return;

				this.todos.push({name: this.newTodo, done: false})

				this.newTodo = '';

				this.save()
			},

			removeTodo(todo) {
				this.todos.splice(this.todos.indexOf(todo), 1)

				this.save()
			},

			toggleTodoComplete(todo) {
				todo.done = !todo.done;

				this.save();
			},

			editTodo(todo) {
				todo.cachedBody = todo.body;

				this.editingTodo = todo;
			},

			cancelEditTodo(todo) {
				todo.body = todo.cachedBody;

				this.editingTodo = null;

				delete todo.cachedBody;
			},

			finishEditTodo(todo) {
				if (todo.name.trim() === '') {
					return this.removeTodo(todo);
				}

				this.editingTodo = null;

				this.save();
			},

			clearCompleted() {
				this.todos = this.availableTodos

				this.save()
			},

			toggleTodos() {
				let allComplete = this.availableTodos.length > 0

				this.todos.forEach((todo) => todo.done = allComplete)

				this.save()
			},
		}
	}

})(window);
