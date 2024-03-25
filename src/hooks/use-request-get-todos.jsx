import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTodos = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		const todoDbRef = ref(db, 'todos');
		setIsLoading(true);

		return onValue(todoDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || [];

			setTodos(loadedTodos);
			setIsLoading(false);
		});
	}, []);
	return {
		isLoading,
		todos,
	};
};
