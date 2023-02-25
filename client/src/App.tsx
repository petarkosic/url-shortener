import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
	const [longUrl, setLongUrl] = useState<string>('');
	const [data, setData] = useState<any>(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (longUrl) {
			const fetchData = await fetch('http://localhost:5000/api', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ longUrl }),
			});
			const resData = await fetchData.json();
			setData(resData);
			setLongUrl('');
		}
	}

	return (
		<div className='App'>
			<div className='form__wrapper'>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						value={longUrl}
						onChange={(e) => setLongUrl(e.target.value)}
						placeholder='Enter URL'
					/>
					<button type='submit'>Submit</button>
				</form>
			</div>
			<div className='data__value'>
				<Link to={data?.hashValue} target='_blank'>
					{data?.hashValue}
				</Link>
			</div>
		</div>
	);
}

export default App;
