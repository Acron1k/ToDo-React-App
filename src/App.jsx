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
				{isLoading || isCreating || isDeleting ? (
					<div className={styles.loader}></div>
				) : (
					Object.entries(todos).map(([id, { title, completed }]) => (
						<div key={id} className={styles.todoElement}>
							<div className={styles.checkboxContainer}>
								<input
									type="checkbox"
									className={styles.check}
									onChange={() => toggleTodoCompletion(id, !completed)}
									checked={completed}
									id={id}
									disabled={isUpdating}
								/>
								<label htmlFor={id} className={styles.label}>
									<svg width="500" height="50" viewBox="0 0 500 50" className={styles.svg}>
										<rect
											x="15"
											y="20"
											width="25"
											height="25"
											stroke="black"
											fill="none"
											strokeOpacity=".5"
										/>
										<g transform="translate(0,-1002.3622)">
											<path
												d="m 15,1033 c 11,-9 27,2 39,-1 4,-1 7,-3 12,-3 11,0 20,2 30,7 5,2 42,2 48,0 4,-2 8,-3 13,-6 7,-3 26,0 35,0 14,0 28,-3 42,-3 37,0 73,6 107,-2 6,-1 18,-0.01 24,2 3,1 7,-0 11,0 21,4 42,2 63,-4 14,-4 49,12 55,7"
												stroke="black"
												fill="none"
												strokeWidth="3"
												className={styles.path2}
											/>
										</g>
									</svg>
								</label>
							</div>
							<span className={styles.taskText}>{title}</span>
							<button
								disabled={isDeleting}
								onClick={() => requestDeleteToDo(id)}
								className={styles.todoControl}
							>
								Удалить
							</button>
						</div>
					))
					// Object.entries(todos).map(([id, { title, completed }]) => (
					// 	<div key={id} className={styles.todoElement}>
					// 		<p className={styles.todoText}>{title}</p>
					// 		<input
					// 			type="checkbox"
					// 			checked={completed}
					// 			onChange={() => {
					// 				toggleTodoCompletion(id, !completed);
					// 			}}
					// 			disabled={isUpdating}
					// 			className={styles.todoControl}
					// 		/>
					// 		<button
					// 			disabled={isDeleting}
					// 			onClick={() => requestDeleteToDo(id)}
					// 			className={styles.todoControl}
					// 		>
					// 			Удалить
					// 		</button>
					// 	</div>
				)}
			</div>
		</div>
	);
}

export default App;
