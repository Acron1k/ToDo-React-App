import { useState } from 'react';

export const useRequestToogleTodoCompletion = (refreshTodos) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const toggleTodoCompletion = (id, newData) => {
		setIsUpdating(true);
		try {
			fetch(`http://localhost:3000/todos/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					completed: newData,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((response) => {
					console.log(`Задачка изменена. Ответ сервера:`, response);
					refreshTodos();
				})

				.finally(() => setIsUpdating(false));
		} catch (error) {
			console.error('Ошибка при обновлении задачи:', error);
		}
	};

	return {
		toggleTodoCompletion,
		isUpdating,
	};
};
