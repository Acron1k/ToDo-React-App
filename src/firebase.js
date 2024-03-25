import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAJMWGnEc3E7FpvMSveZTU5U9fdaYI6i-Q',
	authDomain: 'todoproject-3762b.firebaseapp.com',
	projectId: 'todoproject-3762b',
	storageBucket: 'todoproject-3762b.appspot.com',
	messagingSenderId: '561690888783',
	appId: '1:561690888783:web:18e9eb6994156b346c383a',
	databaseURL: 'https://todoproject-3762b-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
