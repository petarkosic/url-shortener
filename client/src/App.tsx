import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
	const [longUrl, setLongUrl] = useState<string>('');
	const [data, setData] = useState<any>(null);
	const [history, setHistory] = useState<string[]>([]);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setHistory((prevHistory) => [...prevHistory, longUrl]);
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
			{history.length > 0 && (
				<div className='history'>
					<p>History:</p>
					{history.map((url, index) => (
						<li key={index}>
							<Link to={url} target='_blank'>
								{url}
							</Link>
						</li>
					))}
				</div>
			)}
			<div className='form__container'>
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
		</div>
	);
}

export default App;
