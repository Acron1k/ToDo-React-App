import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddNewTodo = () => {
	const [isCreating, setIsCreating] = useState(false);
	const requestAddNewToDo = (newTodo) => {
		setIsCreating(true);
		const todoDbRef = ref(db, 'todos');

		push(todoDbRef, {
			title: newTodo,
			completed: false,
		})
			.then((response) => {
				console.log(`Задачка добавлена. Ответ сервера: ${response}`);
			})
			.catch((error) => {
				console.error(error);
			})

			.finally(() => setIsCreating(false));
		// try {
		// 	fetch('http://localhost:3000/todos', {
		// 		method: 'POST',
		// 		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		// 		body: JSON.stringify({
		// 			title: `Новая задачка ${Date.now()}`,
		// 			completed: false,
		// 		}),
		// 	})
		// 		.then((rawResponse) => rawResponse.json())
		// 		.then((response) => {
		// 			console.log(`Задачка добавлена. Ответ сервера: ${response}`);
		// 			refreshTodos();
		// 		})

		// 		.finally(() => setIsCreating(false));
		// } catch (error) {
		// 	console.error('Ошибка при добавлении задачи:', error);
		// }
	};

	return {
		requestAddNewToDo,
		isCreating,
	};
};
