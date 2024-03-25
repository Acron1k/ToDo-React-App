import { useState } from 'react';
import {
	useRequestAddNewTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestToogleTodoCompletion,
} from './hooks';
import styles from './App.module.css';

function App() {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const { isLoading, todos } = useRequestGetTodos();

	const { requestAddNewToDo, isCreating } = useRequestAddNewTodo(refreshTodos);

	const { requestDeleteToDo, isDeleting } = useRequestDeleteTodo(refreshTodos);

	const { toggleTodoCompletion, isUpdating } = useRequestToogleTodoCompletion(refreshTodos);

	return (
		<div className={styles.app}>
			<button onClick={requestAddNewToDo} disabled={isLoading}>
				Добавть новую тудушку
			</button>
			<br />
			{isLoading || isCreating || isDeleting || isUpdating ? (
				<div className={styles.loader}></div>
			) : (
				Object.entries(todos).map(([id, { title, completed }]) => (
					<div key={id}>
						{id}. {title}
						<input
							type="checkbox"
							checked={completed}
							onChange={() => {
								toggleTodoCompletion(id, !completed);
							}}
							disabled={isUpdating}
						/>
						<button disabled={isDeleting} onClick={() => requestDeleteToDo(id)}>
							Удалить
						</button>
					</div>
				))
			)}
		</div>
	);
}

export default App;
