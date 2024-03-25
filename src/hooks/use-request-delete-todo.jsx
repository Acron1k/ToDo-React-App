import { useState } from 'react';

export const useRequestDeleteTodo = (refreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const requestDeleteToDo = (id) => {
		setIsDeleting(true);
		try {
			fetch(`http://localhost:3000/todos/${id}`, {
				method: 'DELETE',
			})
				.then((rawResponse) => rawResponse.json())
				.then((response) => {
					console.log(`Задачка удалена. Ответ сервера: ${response}`);
					refreshTodos();
				})

				.finally(() => setIsDeleting(false));
		} catch (error) {
			console.error('Ошибка при добавлении задачи:', error);
		}
	};

	return {
		requestDeleteToDo,
		isDeleting,
	};
};
