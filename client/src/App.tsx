import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { motion } from 'framer-motion';

function App() {
	const [longUrl, setLongUrl] = useState<string>('');
	const [data, setData] = useState<any>(null);
	const [history, setHistory] = useState<string[]>([]);
	const [error, setError] = useState<string>('');

	const bottomOfHistoryRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			if (longUrl) {
				const fetchData = await fetch('http://localhost:5000/api', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ longUrl }),
				});
				if (fetchData.status !== 200) {
					setError(fetchData.statusText);
					setData(null);
					setLongUrl('');
					return;
				}
				setError('');
				const resData = await fetchData.json();
				setData(resData);
				setLongUrl('');
				setHistory((prevHistory) => [...prevHistory, longUrl]);
			} else {
				setError('Please enter a valid URL');
				setData(null);
				setLongUrl('');
			}
		} catch (error: any) {
			console.log(error.message);
			setError(error.message);
		}
	}

	useEffect(() => {
		if (bottomOfHistoryRef.current) {
			bottomOfHistoryRef.current.scrollIntoView({
				behavior: 'smooth',
			});
		}
		if (inputRef.current) {
			inputRef?.current?.focus();
		}
	}, [history]);

	return (
		<div className='App'>
			{history.length > 0 && (
				<div className='history__container'>
					<p>History:</p>
					<div
						className='history'
						style={{ overflowY: history.length > 20 ? 'scroll' : 'auto' }}
					>
						{history.map((url, index) => (
							<motion.li
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.2 }}
								key={index}
							>
								<Link to={url} target='_blank'>
									{url}
								</Link>
							</motion.li>
						))}
						<div ref={bottomOfHistoryRef}></div>
					</div>
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
							ref={inputRef}
						/>
						<button type='submit'>Submit</button>
					</form>
				</div>
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className='data__value'
				>
					{error && <p className='error'>{error}</p>}

					<Link to={data?.hashValue} target='_blank'>
						{data?.hashValue}
					</Link>
				</motion.div>
			</div>
		</div>
	);
}

export default App;
