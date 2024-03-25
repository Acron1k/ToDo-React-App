import { useState } from 'react';
import {
	useRequestAddNewTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestToogleTodoCompletion,
} from './hooks';
import styles from './App.module.css';

function App() {
	const [inputText, setInputText] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const { isLoading, todos } = useRequestGetTodos();

	const { requestAddNewToDo, isCreating } = useRequestAddNewTodo(refreshTodos);

	const { requestDeleteToDo, isDeleting } = useRequestDeleteTodo(refreshTodos);

	const { toggleTodoCompletion, isUpdating } = useRequestToogleTodoCompletion(refreshTodos);

	return (
		<div className={styles.app}>
			<form>
				<input
					type="text"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					className={styles.inputNewTodo}
				/>
				<button onClick={() => requestAddNewToDo(inputText)} disabled={isLoading} className={styles.addButton}>
					Добавть новую тудушку
				</button>
			</form>
			<br />
			<div className={styles.todosList}>
				{isLoading || isCreating || isDeleting || isUpdating ? (
					<div className={styles.loader}></div>
				) : (
					Object.entries(todos).map(([id, { title, completed }]) => (
						<div key={id} className={styles.todoElement}>
							<p className={styles.todoText}>{title}</p>
							<input
								type="checkbox"
								checked={completed}
								onChange={() => {
									toggleTodoCompletion(id, !completed);
								}}
								disabled={isUpdating}
								className={styles.todoControl}
							/>
							<button
								disabled={isDeleting}
								onClick={() => requestDeleteToDo(id)}
								className={styles.todoControl}
							>
								Удалить
							</button>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default App;
