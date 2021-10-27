import { useState, useRef, useEffect } from 'react';
import { ReactComponent as Search } from './images/search.svg';
import Images from './Images';
import InfiniteScroll from 'react-infinite-scroll-component';

function Home() {
	const [result, setResult] = useState([]);
	const [query, setQuery] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [count, setCount] = useState(0);
	const [page, setPage] = useState(1);
	const [next, setNext] = useState();
	let inputFocus = useRef();

	useEffect(() => {
		randomImages();
		inputFocus.current.focus();
	}, []);

	const fetchQuery = async () => {
		setLoading(true)
		try {
			const data = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
				method: 'GET',
				headers: {
					'Authorization': '563492ad6f91700001000001853f5d570a8044be9eea3302d626f9f2',
				},
			});
			const fetchImages = await data.json();
			const {photos} = fetchImages;
			if(photos) {
				setLoading(false);
				setResult(photos);
			}
		}
		catch(err) {
			setLoading(false);
			setError(err);
		}
	}

	const randomImages = async () => {
		setLoading(true)
		try {
			const data = await fetch(`https://api.pexels.com/v1/curated?page=${page}&per_page=${count}`, {
				method: 'GET',
				headers: {
					'Authorization': '563492ad6f91700001000001853f5d570a8044be9eea3302d626f9f2',
				},
			});
			console.log(`https://api.pexels.com/v1/curated?page=${page}&per_page=${count}`);
			const showImages = await data.json();
			const { photos, next_page } = showImages;

			if(photos) {
				// console.log(photos);
				setLoading(false);
				//setResult([...result,...photos])
				setResult(prevState =>[...prevState, ...photos]);

				setNext(next_page)
			}
			setPage((prevState) => prevState + 1);
		}
		catch(err) {
			setLoading(false);
			setError(err);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchQuery()
	}

	const handleSelect = (event) => {
		const selectOption = event.target.value;
		// console.log(selectOption)
		setCount(selectOption)
	}

	return (
		<div className="">
			<div className="banner">
				<h1>Search Images</h1>
				<form className="search-form" onSubmit={(e) => handleSubmit(e)}>
					<div class="form-group">
						<Search className="search-icon" />
						<input type="text" value={query} ref={inputFocus} onChange={(e) => setQuery(e.target.value)} className="form-control" name="search" placeholder="Search Images" />
					</div>
				</form>
			</div>

			<div>
				<select name="page" id="page" onChange={handleSelect}>
					<option value="">select count</option>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="40">40</option>
				</select>
			</div>

			<InfiniteScroll
				dataLength={result.length}
				next={randomImages}
				hasMore={next !==null}
				loader={<span className="loader-icon"></span>}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
			>
				<div>
					{/* {
						loading ? <div className="loader"><span className="loader-icon"></span></div>
							:
						} */}
						<Images result={result} />
				</div>
			</InfiniteScroll>
			{error ? <div ><b>{error.code}</b></div> : ''} 
		</div>
	);
}

export default Home;
